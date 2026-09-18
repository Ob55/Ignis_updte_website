// Post-build prerender. Renders every route to real static HTML so crawlers and
// AI agents that do not run JavaScript see the actual page text and per-route
// meta tags, instead of an empty <div id="root">.
//
// Deliberately dependency-free: vite-react-ssg requires a Vite 6/7 major upgrade
// (or a broken react-router peer on the pinned version), and vite-plugin-prerender
// is unmaintained and pulls in Puppeteer. react-dom/server + StaticRouter are
// already in the tree and do the same job.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const { render, head, PRERENDER_ROUTES } = await import(
  path.join(root, '.ssr-dist', 'entry-server.js')
);

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

// Strip the placeholder head tags baked into index.html; each route supplies its own.
const STRIP = [
  /\s*<title>[\s\S]*?<\/title>/,
  /\s*<meta\s+name="description"[\s\S]*?\/>/,
  /\s*<link rel="canonical"[^>]*\/>/,
  /\s*<meta property="og:[^>]*\/>/g,
  /\s*<meta name="twitter:[^>]*\/>/g,
];

function pageHtml(route, appHtml) {
  let out = template;
  for (const re of STRIP) out = out.replace(re, '');
  out = out.replace('</head>', `  ${head(route)}\n  </head>`);
  // Mount point: real markup instead of an empty shell. The data-prerendered
  // flag is what main.jsx keys off to choose hydrateRoot over createRoot -- the
  // dev shell also has child nodes (a <noscript>), so "has children" is not a
  // safe signal on its own.
  out = out.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root" data-prerendered="true">${appHtml}</div>`
  );
  return out;
}

const routes = [...PRERENDER_ROUTES];
let written = 0;
for (const route of routes) {
  const appHtml = render(route);
  if (!appHtml || appHtml.length < 200) {
    throw new Error(`prerender: ${route} produced ${appHtml?.length ?? 0} bytes of markup`);
  }
  const file =
    route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, pageHtml(route, appHtml), 'utf8');
  written++;
  console.log(`  prerendered ${route.padEnd(34)} ${appHtml.length} bytes`);
}

// Vercel serves dist/404.html for unmatched paths with a real 404 status.
const notFound = render('/this-route-does-not-exist');
await fs.writeFile(path.join(dist, '404.html'), pageHtml('/404', notFound), 'utf8');
console.log(`  prerendered /404 (404.html)              ${notFound.length} bytes`);

console.log(`prerender: ${written + 1} files written`);
