// Post-prerender step: builds Igni's knowledge base from the prerendered pages
// in dist/, so the chat assistant says exactly what the site says. Each page's
// <main> is split into sections at every <h2>; each section becomes one entry
// { url, title, section, text } in content/igni-kb.json. The JSON is committed
// so api/chat.js always has it, and rebuilt on every `npm run build`. A
// compact copy is written to dist/igni-kb.json for the browser.
//
// Dependency-free on purpose (like prerender.mjs): the markup is our own
// prerendered HTML, so a few regexes are enough.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const out = path.join(root, 'content', 'igni-kb.json');

const { PRERENDER_ROUTES } = await import(path.join(root, '.ssr-dist', 'entry-server.js'));

// Pages that carry no facts worth answering from.
const SKIP = new Set(['/thank-you', '/credits', '/404']);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", apos: "'", nbsp: ' ', rsquo: "'", lsquo: "'", ldquo: '"', rdquo: '"', ndash: '–', mdash: '—', hellip: '…' };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
    return ENTITIES[e] ?? ENTITIES[e.toLowerCase()] ?? m;
  });

// Drop aria-hidden elements (decorative labels, bar charts) the way screen
// readers do: their text reads wrongly out of visual context, e.g. the "saved"
// label on the savings bar next to the steam scenario's running cost.
function stripHidden(html) {
  const open = /<([a-z][a-z0-9]*)\b[^>]*\baria-hidden="true"[^>]*>/gi;
  let out = html;
  let m;
  while ((m = open.exec(out))) {
    const tag = m[1].toLowerCase();
    const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    re.lastIndex = m.index + m[0].length;
    let depth = 1;
    let end = out.length;
    let t;
    if (!m[0].endsWith('/>')) {
      while (depth && (t = re.exec(out))) {
        depth += t[1] ? -1 : 1;
        if (!depth) end = re.lastIndex;
      }
    } else end = m.index + m[0].length;
    out = out.slice(0, m.index) + ' ' + out.slice(end);
    open.lastIndex = m.index;
  }
  return out;
}

function toText(html) {
  return decode(
    stripHidden(html)
      .replace(/<(script|style|noscript|svg|button|nav)[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<div class="todo-placeholder"[\s\S]*?<\/div>/gi, ' ')
      .replace(/<(br|\/p|\/li|\/h[1-6]|\/dt|\/dd|\/div|\/figcaption|\/summary)[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/[ \t ]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

const entries = [];
for (const route of PRERENDER_ROUTES) {
  if (SKIP.has(route)) continue;
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
  let html;
  try { html = await fs.readFile(file, 'utf8'); } catch { continue; }
  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [, route])[1]).replace(/\s*\|\s*Ignis\s*$/, '').trim();
  const main = (html.match(/<main id="main"[^>]*>([\s\S]*?)<\/main>/) || [])[1];
  if (!main) continue;

  // Split at each <h2>; the part before the first h2 is the page intro (hero).
  const parts = main.split(/(?=<h2[\s>])/i);
  for (const part of parts) {
    const h2 = part.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const section = h2 ? toText(h2[1]) : 'Overview';
    const text = toText(h2 ? part.slice(h2[0].length) : part);
    if (text.length < 40) continue;
    entries.push({ url: route, title, section, text: text.slice(0, 2400) });
  }
}

if (entries.length < 20) throw new Error(`igni-kb: only ${entries.length} entries; prerendered pages missing?`);
await fs.writeFile(out, JSON.stringify(entries, null, 1) + '\n', 'utf8');
// The chat panel fetches this copy at runtime: the JS bundle is built before
// this step runs, so an imported copy would always be one build behind.
await fs.writeFile(path.join(dist, 'igni-kb.json'), JSON.stringify(entries), 'utf8');
const chars = entries.reduce((n, e) => n + e.text.length, 0);
console.log(`igni-kb: ${entries.length} sections from ${new Set(entries.map((e) => e.url)).size} pages, ${chars} chars -> content/igni-kb.json`);
