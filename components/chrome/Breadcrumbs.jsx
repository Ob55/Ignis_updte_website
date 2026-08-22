import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { SITE } from '@/lib/site';
import { getAudience } from '@/content/audiences';

// Human labels for path segments. Audience slugs resolve from content.
const LABELS = {
  solutions: 'Solutions',
  'who-we-serve': 'Who we serve',
  about: 'About',
  blog: 'Insights',
  contact: 'Contact',
  privacy: 'Privacy',
  'thank-you': 'Thank you',
};

function labelFor(seg) {
  if (LABELS[seg]) return LABELS[seg];
  const a = getAudience(seg);
  if (a) return a.eyebrow;
  return seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
}

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const segs = pathname.split('/').filter(Boolean);

  // Build the trail: Home + each segment (cumulative path).
  const trail = [{ label: 'Home', to: '/' }];
  let acc = '';
  for (const s of segs) {
    acc += `/${s}`;
    trail.push({ label: labelFor(s), to: acc });
  }

  // BreadcrumbList JSON-LD, injected/cleaned per route.
  useEffect(() => {
    if (segs.length === 0) return;
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: trail.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t.label,
        item: SITE.url + (t.to === '/' ? '' : t.to),
      })),
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute('data-breadcrumb', 'true');
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
    return () => { el.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (segs.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.to}>
              {last ? (
                <span aria-current="page">{t.label}</span>
              ) : (
                <>
                  <Link to={t.to}>{t.label}</Link>
                  <ChevronRight size={13} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
