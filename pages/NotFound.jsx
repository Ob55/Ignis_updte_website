import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';

const LINKS = [
  { to: '/services', label: 'Solutions', sub: 'How the model works, end to end' },
  { to: '/where-we-work', label: 'Where we work', sub: 'Institutions, industry, financiers, partners' },
  { to: '/about', label: 'About', sub: 'The company and the team' },
  { to: '/scoping-call', label: 'Book an assessment', sub: 'Send us your kitchen' },
];

export default function NotFound() {
  useSeo(seoFor('/404'));
  return (
    <>
      <PageHero
        eyebrow="404"
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
