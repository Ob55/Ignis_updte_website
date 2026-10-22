// Serverless endpoint (Vercel /api) for Igni, the site chat assistant. The
// browser answers simple questions itself (lib/igni/localAnswer.js); only the
// complex ones arrive here and go to Claude. Server-only: reads
// ANTHROPIC_API_KEY from the environment, never exposed to the client.
//
// Response: Server-Sent Events. `data: {"t":"delta","text":"..."}` while the
// answer streams, then `data: {"t":"done"}`. Errors and limits arrive as a
// normal message so the chat UI never shows a raw error.
import { createRequire } from "node:module";
import Anthropic from "@anthropic-ai/sdk";
import { createRateLimiter, incrementDaily } from "../scripts/rateLimit.mjs";
import { originAllowed, clientIp } from "../scripts/originAllowed.mjs";
import { FAQS } from "../content/faqs.js";
import { INTENTS } from "../content/igni-intents.js";
import { SITE } from "../lib/site.js";
import { IGNI_IMAGES } from "../content/igni-images.js";
import { IGNI_LANGS } from "../content/igni-i18n.js";

const require = createRequire(import.meta.url);
const KB = require("../content/igni-kb.json");

const MODEL = "claude-haiku-5-5";
const isLimited = createRateLimiter({ prefix: "ignis:chat", max: 20 });

// ---- prompt (frozen: no timestamps or per-request data, so it caches) -------
const RULES = `You are Igni, the website assistant for Ignis (Ignis Innovation Limited), a Kenyan company that helps schools, hospitals and other institutions move from firewood to clean, efficient cooking.

How to answer:
- Use only the Ignis website content provided below. If the answer isn't there, say you don't have that detail and point the visitor to the team (WhatsApp/phone ${SITE.phone}, email ${SITE.email}, or /talk-to-ignis).
- Never invent numbers, prices, savings, partners, projects or timelines. Figures the site marks as illustrative must be called illustrative. For costs, savings or sizing for a specific institution, explain what the site says and recommend a kitchen assessment (/talk-to-ignis#assessment).
- The Asili electric pressure cooker has no published price; say so and offer the contact options.
- Stay on Ignis, its solutions and clean cooking. Politely decline anything unrelated.
- Reply in the visitor's language: the language they write in, or the one a system note names. Keep Ignis, Asili, CleanCookIQ and page names as they are.
- Be brief and warm: two to five short sentences or a short list. Link pages as markdown links with site paths, e.g. [Electric Cooking](/what-we-do/electric-cooking).
- Never ask for or repeat personal details (names, phone numbers, emails, ID numbers).
- You can show the visitor a picture: put [[image:ID]] on its own line, using only an ID from <images>. Show at most two, and only when a picture genuinely helps (they ask what something looks like, or the answer is about Asili, steam kitchens, CleanCookIQ or the problem with firewood). Never describe a picture you did not show.
- Your reply may be read aloud, so write plain sentences; avoid tables and long lists.`;

function knowledge() {
  const pages = KB.map((e) => `### ${e.title} - ${e.section} (${e.url})\n${e.text}`).join("\n\n");
  const faq = FAQS.map(([q, a]) => `Q: ${q}\nA: ${a}`).join("\n\n");
  const facts = INTENTS.filter((i) => !i.small).map((i) => `- ${i.text}`).join("\n");
  const images = IGNI_IMAGES.map((i) => `- ${i.id}: ${i.about}`).join("\n");
  return `<website_content>\n${pages}\n</website_content>\n\n<faq>\n${faq}\n</faq>\n\n<key_facts>\n${facts}\n</key_facts>\n\n<images>\n${images}\n</images>`;
}
const SYSTEM = [
  { type: "text", text: RULES },
  { type: "text", text: knowledge(), cache_control: { type: "ephemeral" } },
];

let client = null;
// ANTHROPIC_WORKSPACE_ID is only needed when the key is not scoped to a
// workspace (the API then requires the anthropic-workspace-id header).
const getClient = () =>
  (client ??= new Anthropic(
    process.env.ANTHROPIC_WORKSPACE_ID ? { defaultHeaders: { "anthropic-workspace-id": process.env.ANTHROPIC_WORKSPACE_ID } } : {}
  ));

// ---- input validation --------------------------------------------------------
const MAX_Q = 1000;
const MAX_HISTORY_TURNS = 8;
const MAX_HISTORY_CHARS = 6000;

function validate(body) {
  const question = typeof body.question === "string" ? body.question.trim() : "";
  if (!question) return { error: "Please type a question." };
  if (question.length > MAX_Q) return { error: "Please keep questions under 1,000 characters." };

  const raw = Array.isArray(body.history) ? body.history.slice(-MAX_HISTORY_TURNS) : [];
  const history = [];
  let chars = 0;
  for (const m of raw) {
    const role = m && (m.role === "user" || m.role === "assistant") ? m.role : null;
    const text = m && typeof m.text === "string" ? m.text.trim().slice(0, 1500) : "";
    if (!role || !text) continue;
    chars += text.length;
    if (chars > MAX_HISTORY_CHARS) break;
    // Merge consecutive same-role turns so roles alternate.
    const last = history[history.length - 1];
    if (last && last.role === role) last.content += `\n\n${text}`;
    else history.push({ role, content: text });
  }
  while (history.length && history[0].role !== "user") history.shift();
  if (history.length && history[history.length - 1].role === "user") history.pop();
  const lang = Object.hasOwn(IGNI_LANGS, body.lang) ? body.lang : "en";
  return { question, history, lang };
}

// ---- SSE helpers -------------------------------------------------------------
function startStream(res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders?.();
}
const send = (res, data) => res.write(`data: ${JSON.stringify(data)}\n\n`);
// Limits and failures go to the browser as a code (`fail` + reason), not text,
// so the chat panel can say it in the visitor's language (content/igni-i18n.js).
function failAndEnd(res, reason, text) {
  startStream(res);
  send(res, { t: "fail", reason, text });
  send(res, { t: "done" });
  res.end();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!originAllowed(req)) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }
  if (await isLimited(clientIp(req))) {
    failAndEnd(res, "rate");
    return;
  }

  const body = req.body || {};
  // Honeypot: real users never fill the hidden `company` field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    failAndEnd(res, "error");
    return;
  }
  const { error, question, history, lang } = validate(body);
  if (error) {
    failAndEnd(res, "invalid", error);
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("chat: ANTHROPIC_API_KEY is not set");
    failAndEnd(res, "error");
    return;
  }

  // Optional global budget: IGNI_DAILY_CAP AI answers per day (needs Upstash).
  const cap = Number(process.env.IGNI_DAILY_CAP || 0);
  if (cap > 0) {
    const n = await incrementDaily("ignis:chat:daily");
    if (n !== null && n > cap) {
      failAndEnd(res, "cap");
      return;
    }
  }

  startStream(res);
  // The language note is a mid-conversation system message, so the cached
  // system prompt stays identical for every language.
  const messages = [
    ...history,
    { role: "user", content: question },
    ...(lang !== "en" ? [{ role: "system", content: `The visitor chose ${IGNI_LANGS[lang].name} in the chat. Reply in ${IGNI_LANGS[lang].name}.` }] : []),
  ];

  // Stop paying for a reply nobody will read. Watch the response, not the
  // request: req "close" can fire once the body has been read, which would
  // cancel a reply the visitor is still waiting for.
  let stream = null;
  let gone = false;
  res.on("close", () => {
    if (!res.writableEnded) { gone = true; stream?.abort(); }
  });

  // The SDK retries failed connections itself; a stream that breaks after it
  // started is retried here once, but only if nothing reached the visitor yet.
  let sent = false;
  for (let attempt = 1; attempt <= 2 && !gone; attempt++) {
    try {
      stream = getClient().messages.stream({
        model: MODEL,
        max_tokens: 2048, // short chat answers; caps the cost of any one reply
        output_config: { effort: "low" },
        system: SYSTEM,
        messages,
      });
      for await (const event of stream) {
        if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
          sent = true;
          send(res, { t: "delta", text: event.delta.text });
        }
      }
      const final = await stream.finalMessage();
      if (final.stop_reason === "refusal") send(res, { t: "fail", reason: "refusal" });
      const u = final.usage || {};
      console.log(`chat: lang=${lang} in=${u.input_tokens} cache_read=${u.cache_read_input_tokens} cache_write=${u.cache_creation_input_tokens} out=${u.output_tokens} stop=${final.stop_reason}${attempt > 1 ? " (retry)" : ""}`);
      break;
    } catch (err) {
      if (gone || err instanceof Anthropic.APIUserAbortError) break;
      if (err instanceof Anthropic.RateLimitError) console.error("chat: Anthropic rate limit");
      else if (err instanceof Anthropic.AuthenticationError) console.error("chat: invalid ANTHROPIC_API_KEY");
      else if (err instanceof Anthropic.APIError) console.error(`chat: API error ${err.status}: ${err.message}`);
      else console.error("chat: failed", err?.message);
      const retryable = !sent && attempt === 1 && !(err instanceof Anthropic.AuthenticationError) && !(err instanceof Anthropic.BadRequestError);
      if (!retryable) { send(res, { t: "fail", reason: "error" }); break; }
    }
  }
  if (!gone) {
    send(res, { t: "done" });
    res.end();
  }
}
