import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';

const LINKS = [
  { to: '/solutions', label: 'Solutions', sub: 'How the model works, end to end' },
  { to: '/who-we-serve', label: 'Who we serve', sub: 'Institutions, industry, financiers, partners' },
  { to: '/about', label: 'About', sub: 'The company and the team' },
  { to: '/contact', label: 'Book an assessment', sub: 'Send us your kitchen' },
];

export default function NotFound() {
  useSeo({
    title: 'Page not found | IGNIS',
    description: 'The page you are looking for could not be found. Explore IGNIS clean energy services for institutions across Africa.',
    path: '/404',
    noindex: true,
  });
  return (
    <>
      <PageHero
        eyebrow="404"
        segments={['This page has', { text: 'gone cold.', className: 'serif grad-flame' }]}
        sub="The page you were looking for does not exist or has moved. Here is the way back."
      />
      <section className="section" style={{ paddingTop: 0 }}>
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
