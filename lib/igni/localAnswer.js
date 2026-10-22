// Igni's free tier: answers simple questions in the browser from the site's own
// content, and decides when a question is complex enough to need the AI
// (api/chat.js). No dependencies, so it runs in the browser and in `npm test`.
//
//   const ask = createAnswerer({ faqs, intents, kb });
//   ask("What is Asili?")  -> { kind: "local", text, links, source }
//   ask("My school serves 900 meals a day, what would we save?")
//                          -> { kind: "ai", reason: "complex" }
//
// Order: complexity check -> hand-written intents and the FAQ -> a keyword
// search over the page sections in content/igni-kb.json. Anything without a
// confident match goes to the AI rather than guessing.

const STOP = new Set(
  ("a an the is are was were be been am do does did doing have has had i me you your yours we us it its " +
   "this that these those of for to in on at by with from and or but if so as about into than then " +
   "what which how when can could would will shall may might must tell know please there here any some " +
   "ignis igni work works get got want need like just also more much very really give show let").split(" ")
);
// Keep "much" meaningful next to cost words ("how much does it cost").
const COST_CONTEXT = /\b(cost|price|pay|bei)\b/;

const SYNONYMS = {
  price: "cost", pricing: "cost", costs: "cost", bei: "cost", charge: "cost",
  kuni: "firewood", wood: "firewood", charcoal: "firewood",
  jiko: "stove", cooker: "asili", epc: "asili", "pressure-cooker": "asili",
  finance: "financ", financed: "financ", financing: "financ", funding: "financ", fund: "financ", loan: "financ",
  located: "location", where: "where", office: "office",
  litres: "litre", liters: "litre", liter: "litre", l: "litre",
  watts: "watt", w: "watt", volts: "volt", voltage: "volt",
  programmes: "programme", programs: "programme", program: "programme", modes: "programme",
  kenya: "kenya", africa: "africa",
};

export function stem(w) {
  if (SYNONYMS[w]) return SYNONYMS[w];
  let s = w;
  if (s.length > 5 && s.endsWith("ing")) s = s.slice(0, -3);
  else if (s.length > 4 && s.endsWith("ed")) s = s.slice(0, -2);
  else if (s.length > 4 && s.endsWith("es") && !s.endsWith("ses")) s = s.slice(0, -2);
  else if (s.length > 3 && s.endsWith("s") && !s.endsWith("ss")) s = s.slice(0, -1);
  return SYNONYMS[s] || s;
}

export function tokens(text, { keepStop = false } = {}) {
  const words = String(text).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(Boolean);
  const costy = COST_CONTEXT.test(words.join(" "));
  return words
    .filter((w) => keepStop || !STOP.has(w) || (w === "much" && costy))
    .map(stem);
}

// ---- complexity: questions that should go to the AI ------------------------
const CALC = /\b(save|saving|savings|calculat\w*|estimat\w*|compar\w*|versus|vs|differen\w*|why|explain|recommend\w*|should (i|we)|plan|payback|roi|how long would|how much (would|will|could|can we|can i))\b/;
const PERSONAL = /\b(my|our)\s+(school|hospital|kitchen|institution|county|college|university|prison|facility|organi[sz]ation|company|church|hotel|restaurant|home|house|family|budget)\b/;
const FOLLOW_UP = /^(and|but|so|also|what about|how about)\b|\b(it|that|this|they|them|those)\b/;

export function complexity(question, { lastWasAi = false } = {}) {
  const q = question.toLowerCase().trim();
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 18) return "long";
  if ((q.match(/\?/g) || []).length > 1) return "multi-part";
  if (/\d/.test(q)) return "numbers";
  if (CALC.test(q)) return "reasoning";
  if (PERSONAL.test(q)) return "personal";
  if (lastWasAi && FOLLOW_UP.test(q)) return "follow-up";
  return null;
}

// ---- matching ----------------------------------------------------------------
// Question words are kept (they help "where is your office"), but a match made
// only of them ("who ...") is not a match.
const QWORDS = new Set(["who", "where", "why", "when"]);

function scoreSet(qt, targetTokens) {
  if (!qt.length || !targetTokens.size) return { score: 0, matched: 0 };
  const hits = qt.filter((t) => targetTokens.has(t));
  if (!hits.some((t) => !QWORDS.has(t))) return { score: 0, matched: 0, covQ: 0 };
  const matched = hits.length;
  const covQ = matched / qt.length;
  const covT = Math.min(1, matched / targetTokens.size);
  return { score: matched ? 0.6 * covQ + 0.4 * covT : 0, matched, covQ };
}

function excerpt(text, qt, max = 340) {
  const sentences = text.replace(/\n/g, ". ").split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 20);
  const ranked = sentences
    .map((s, i) => { const st = tokens(s); return { s, i, hits: qt.filter((t) => st.includes(t)).length }; })
    .sort((a, b) => b.hits - a.hits || a.i - b.i);
  const picked = [];
  let len = 0;
  for (const r of ranked) {
    if (!r.hits && picked.length) break;
    if (len + r.s.length > max && picked.length) break;
    picked.push(r);
    len += r.s.length;
  }
  return picked.sort((a, b) => a.i - b.i).map((r) => r.s.replace(/\.\.$/, ".")).join(" ");
}

export function createAnswerer({ faqs = [], intents = [], kb = [] }) {
  const targets = [
    ...intents.map((it) => ({ type: "intent", it, toks: new Set(it.keywords.map((k) => stem(k.toLowerCase()))) })),
    ...faqs.map(([q, a]) => ({ type: "faq", q, a, toks: new Set(tokens(q)) })),
  ];

  // BM25-lite over KB sections (title + section heading weighted in).
  const docs = kb.map((e) => {
    const toks = [...tokens(`${e.title} ${e.section} ${e.section}`), ...tokens(e.text)];
    const tf = new Map();
    for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
    return { e, tf, len: toks.length };
  });
  const avgLen = docs.reduce((n, d) => n + d.len, 0) / (docs.length || 1);
  const df = new Map();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1);
  const bm25 = (qt, d) =>
    qt.reduce((s, t) => {
      const f = d.tf.get(t);
      if (!f) return s;
      const idf = Math.log(1 + (docs.length - df.get(t) + 0.5) / (df.get(t) + 0.5));
      return s + idf * ((f * 2.2) / (f + 1.2 * (0.25 + 0.75 * (d.len / avgLen))));
    }, 0);

  return function ask(question, { lastWasAi = false } = {}) {
    const q = String(question || "").trim();
    if (!q) return { kind: "none" };
    const all = tokens(q, { keepStop: true });
    const qt = tokens(q);

    // Greetings and thanks: tiny messages made only of small-talk words.
    for (const t of targets) {
      if (t.type === "intent" && t.it.small && all.length <= 4 && all.every((w) => t.toks.has(w) || STOP.has(w))) {
        return { kind: "local", id: t.it.id, text: t.it.text, links: t.it.links || [] };
      }
    }

    const hard = complexity(q, { lastWasAi });
    if (hard) return { kind: "ai", reason: hard };

    // Exact phrasings an intent claims ("who do you work with").
    for (const t of targets) {
      if (t.type === "intent" && t.it.phrases?.some((re) => re.test(q))) {
        return { kind: "local", id: t.it.id, text: t.it.text, links: t.it.links || [], source: t.it.source, images: t.it.images || [] };
      }
    }

    // Intents and FAQ.
    let best = null;
    let second = 0;
    for (const t of targets) {
      if (t.type === "intent" && t.it.small) continue;
      const r = scoreSet(qt, t.toks);
      if (!best || r.score > best.score) { second = best ? best.score : 0; best = { ...r, t }; }
      else if (r.score > second) second = r.score;
    }
    if (best && best.covQ >= 0.5 && best.score >= 0.55 && best.score - second >= 0.03) {
      const { t } = best;
      return t.type === "intent"
        ? { kind: "local", id: t.it.id, text: t.it.text, links: t.it.links || [], source: t.it.source, images: t.it.images || [] }
        : { kind: "local", id: "faq", text: t.a, links: [], source: { url: "/talk-to-ignis", title: "Talk to Ignis: FAQ" } };
    }

    // Page sections: only when every content word of a short question appears
    // in one section and that section clearly beats the rest.
    if (qt.length >= 1 && qt.length <= 6 && docs.length) {
      const ranked = docs.map((d) => ({ d, s: bm25(qt, d) })).sort((a, b) => b.s - a.s);
      const [top, next] = ranked;
      const allIn = top && qt.every((t) => top.d.tf.has(t));
      if (top && top.s > 0 && allIn && (!next || top.s >= next.s * 1.25)) {
        const text = excerpt(top.d.e.text, qt);
        if (text.length >= 40) {
          return { kind: "local", id: "page", text, links: [], source: { url: top.d.e.url, title: top.d.e.section === "Overview" ? top.d.e.title : top.d.e.section } };
        }
      }
    }

    return { kind: "ai", reason: "no-match" };
  };
}
