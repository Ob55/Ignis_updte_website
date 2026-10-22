// Igni: which questions are answered locally (free) and which go to the AI.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createAnswerer, complexity } from "../lib/igni/localAnswer.js";
import { FAQS } from "../content/faqs.js";
import { INTENTS } from "../content/igni-intents.js";
import { createRateLimiter } from "../scripts/rateLimit.mjs";

const kb = JSON.parse(fs.readFileSync(new URL("../content/igni-kb.json", import.meta.url), "utf8"));
const ask = createAnswerer({ faqs: FAQS, intents: INTENTS, kb });

test("knowledge base covers the core pages", () => {
  assert.ok(kb.length >= 50, `only ${kb.length} sections`);
  const urls = new Set(kb.map((e) => e.url));
  for (const u of ["/", "/what-we-do", "/what-we-do/electric-cooking", "/cleancookiq", "/talk-to-ignis"]) {
    assert.ok(urls.has(u), `missing ${u}`);
  }
  assert.ok(!kb.some((e) => /being prepared/.test(e.text)), "placeholder text leaked into the KB");
  // aria-hidden chart labels must not leak: "saved" sat next to the steam running cost
  assert.ok(!kb.some((e) => /saved KES/.test(e.text)), "aria-hidden label leaked into the KB");
});

test("simple questions are answered locally from the site", () => {
  const cases = [
    ["What is Asili?", "asili", "/what-we-do/electric-cooking"],
    ["What is the capacity of Asili?", "asili-specs"],
    ["How much does Asili cost?", "asili-price"],
    ["Where is your office?", "location"],
    ["Who owns the equipment?", "faq"],
    ["How does financing work?", "faq"],
    ["Who do you work with?", "audiences"],
    ["What is CleanCookIQ?", "cleancookiq"],
    ["Where do you work?", "where-we-work"],
    ["hi", "greeting"],
    ["Habari", "greeting"],
  ];
  for (const [q, id, url] of cases) {
    const r = ask(q);
    assert.equal(r.kind, "local", `${q} -> ${r.kind} (${r.reason})`);
    assert.equal(r.id, id, `${q} -> ${r.id}`);
    if (url) assert.equal(r.source?.url, url);
  }
});

test("complex questions go to the AI", () => {
  const cases = [
    "My school serves 900 meals a day on firewood, how much could we save and how would financing work?",
    "Why is steam better than firewood?",
    "Compare Asili with an LPG cooker",
    "Our hospital kitchen uses charcoal, what should we do?",
    "What is the payback period? How long is the contract?",
  ];
  for (const q of cases) assert.equal(ask(q).kind, "ai", q);
  // a follow-up to an AI answer stays with the AI
  assert.equal(complexity("and what about that one?", { lastWasAi: true }), "follow-up");
});

test("questions in non-Latin scripts go to the AI, not the greeting", () => {
  // Amharic tokenises to nothing in the Latin-only matcher; that must not read as "hi".
  assert.equal(ask("አሲሊ ምንድን ነው?").kind, "ai");
});

test("question words alone are not a match", () => {
  // "who" must not pull "Who owns the equipment?"
  assert.notEqual(ask("Who is the CEO?").id, "faq");
});

test("chat rate limiter blocks after its budget (in-memory fallback)", async () => {
  const limited = createRateLimiter({ prefix: "test", max: 3 });
  const ip = `t-${Date.now()}`;
  const results = [];
  for (let i = 0; i < 5; i++) results.push(await limited(ip));
  assert.deepEqual(results, [false, false, false, true, true]);
});

test("spoken answers drop markdown, links, paths and image tags", async () => {
  const { speakable, looksSwahili } = await import("../lib/igni/useVoice.js");
  const s = speakable("**Asili** is our cooker. See [Electric Cooking](/what-we-do/electric-cooking) or /talk-to-ignis.\n[[image:asili-front]]\n- 6 L pot");
  assert.ok(s.startsWith("Asili is our cooker. See Electric Cooking"), s);
  assert.ok(!/\[|\]|\//.test(s), s);
  assert.ok(looksSwahili("Ignis husaidia shule kubadilisha kutoka kuni na kupika kwa ufanisi katika jiko"));
  assert.ok(!looksSwahili("Asili is an electric pressure cooker with a sealed lid."));
});

test("every picture Igni can show exists, and local answers carry valid ones", async () => {
  const { IGNI_IMAGES } = await import("../content/igni-images.js");
  const ids = new Set(IGNI_IMAGES.map((i) => i.id));
  for (const img of IGNI_IMAGES) {
    assert.ok(fs.existsSync(new URL(`../public${img.src}`, import.meta.url)), `missing ${img.src}`);
    assert.ok(img.alt && img.about, `${img.id} needs alt and about`);
  }
  for (const it of INTENTS) for (const id of it.images || []) assert.ok(ids.has(id), `${it.id} -> unknown image ${id}`);
  assert.deepEqual(ask("What is Asili?").images, ["asili-front"]);
});

test("every chat language has every interface string", async () => {
  const { IGNI_LANGS } = await import("../content/igni-i18n.js");
  const shape = (o) => Object.keys(o).sort().map((k) => (typeof o[k] === "object" && !Array.isArray(o[k]) ? `${k}{${shape(o[k])}}` : k)).join(",");
  const en = shape(IGNI_LANGS.en);
  for (const [k, l] of Object.entries(IGNI_LANGS)) {
    assert.equal(shape(l), en, `${k} is missing strings`);
    assert.equal(l.suggestions.length, 4, `${k} suggestions`);
    assert.ok(l.listen && l.speak.length, `${k} voice locales`);
  }
});
