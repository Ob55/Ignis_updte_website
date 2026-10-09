import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { Reveal } from '@/components/motion/Reveal';

const LINKS = [
  { to: '/what-we-do', label: 'What We Do', sub: 'Institutional Steam, Electric Cooking, Clean-Cooking Programmes' },
  { to: '/cleancookiq', label: 'CleanCookIQ', sub: 'The data behind every decision' },
  { to: '/who-we-work-with', label: 'Who We Work With', sub: 'Find the page for your role' },
  { to: '/talk-to-ignis', label: 'Talk to Ignis', sub: 'Request an Assessment or Partner with Ignis' },
];

export default function NotFound() {
  useSeo(seoFor('/404'));
  return (
    <>
      <PageHero
        eyebrow="404"
        image={HERO['kisumu'].src}
        imageAlt={HERO['kisumu'].alt}
        segments={['This page has', { text: 'gone cold.', className: 'serif grad-flame' }]}
        sub="The page you were looking for does not exist or has moved. Here is the way back."
      />
      <section className="section">
        <div className="wrap">
          <div className="service-grid">
            {LINKS.map((l, i) => (
              <Reveal key={l.to} delay={i * 70}>
                <Link to={l.to} className="service-card glass serve-link">
                  <span className="k">{l.label}</span>
                  <p>{l.sub}</p>
                  <span className="serve-link-cta">Go <ArrowUpRight size={15} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
