// Build-time sitemap generation.
//
// The route list comes from lib/seo-data.js -- the same registry the prerender
// step and the client-side <head> hook read -- so the sitemap cannot drift from
// the routes the site actually serves. Adding a route to that registry is the
// only thing needed to get it prerendered, titled and listed here.
//
// vite-plugin-sitemap was considered and skipped: it wants the route list
// declared again in vite.config.js, which is a second place to keep in sync with
// the router, and this build already resolves the routes for prerendering.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const { PRERENDER_ROUTES, SEO, SITE_URL } = await import(
  path.join(root, '.ssr-dist', 'entry-server.js')
);

// Per-route hints. Anything unlisted gets the default.
const HINTS = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/services': { priority: '0.9', changefreq: 'monthly' },
  '/scoping-call': { priority: '0.9', changefreq: 'monthly' },
  '/platform': { priority: '0.8', changefreq: 'monthly' },
  '/where-we-work': { priority: '0.8', changefreq: 'monthly' },
  '/about': { priority: '0.7', changefreq: 'monthly' },
  '/blog': { priority: '0.6', changefreq: 'weekly' },
  '/credits': { priority: '0.3', changefreq: 'yearly' },
  '/privacy': { priority: '0.3', changefreq: 'yearly' },
  '/terms': { priority: '0.3', changefreq: 'yearly' },
  '/cookie-policy': { priority: '0.3', changefreq: 'yearly' },
};
const DEFAULT = { priority: '0.7', changefreq: 'monthly' };

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// A sitemap must only advertise indexable URLs. Anything flagged noindex in the
// registry (the thank-you page, the 404) is excluded.
const routes = PRERENDER_ROUTES.filter((r) => !SEO[r]?.noindex);

const body = routes
  .map((r) => {
    const { priority, changefreq } = HINTS[r] || DEFAULT;
    const loc = esc(SITE_URL + (r === '/' ? '/' : r));
    return `  <url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

await fs.writeFile(path.join(dist, 'sitemap.xml'), xml, 'utf8');
console.log(`sitemap: ${routes.length} urls -> dist/sitemap.xml`);
for (const r of routes) console.log(`  ${SITE_URL}${r === '/' ? '/' : r}`);

const excluded = PRERENDER_ROUTES.filter((r) => SEO[r]?.noindex);
if (excluded.length) console.log(`  (excluded as noindex: ${excluded.join(', ')})`);
