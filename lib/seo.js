import { useEffect } from 'react';
import { SITE } from '@/lib/site';

// Lightweight per-route SEO for the SPA: unique <title>, meta description,
// canonical, and Open Graph / Twitter tags. Replaces the older useTitle.
function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setRobots(content) {
  upsertMeta('name', 'robots', content || 'index,follow');
}

export function useSeo({ title, description, path = '/', image = '/og-default.png', noindex = false }) {
  useEffect(() => {
    const url = SITE.url + path;
    const img = image.startsWith('http') ? image : SITE.url + image;
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);
    setRobots(noindex ? 'noindex,nofollow' : 'index,follow');
    // Open Graph
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:type', 'website');
    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);
  }, [title, description, path, image, noindex]);
}
