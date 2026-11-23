// Post-build guard: fail the build (and so the Vercel deploy) if any page could
// render unstyled. Every HTML file must carry its styles inline and every
// /assets/ file it references must exist in this build.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

async function htmlFiles(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const errors = [];
const files = await htmlFiles(dist);
for (const file of files) {
  const rel = path.relative(dist, file);
  const html = await fs.readFile(file, 'utf8');
  if (!/<style>[\s\S]{1000,}?<\/style>/.test(html)) errors.push(`${rel}: no inlined stylesheet`);
  if (/<link rel="stylesheet"[^>]*href="\/assets\//.test(html)) errors.push(`${rel}: still links an external /assets/*.css`);
  for (const [, ref] of html.matchAll(/(?:src|href)="\/assets\/([^"?#]+)"/g)) {
    try { await fs.access(path.join(dist, 'assets', ref)); }
    catch { errors.push(`${rel}: references missing /assets/${ref}`); }
  }
}

if (errors.length) {
  console.error(`verify-build: ${errors.length} problem(s)\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(`verify-build: ${files.length} HTML files OK (styles inlined, all assets present)`);
