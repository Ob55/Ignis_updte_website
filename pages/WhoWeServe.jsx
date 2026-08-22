import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { audiences } from '@/content/audiences';

// Hub for "Who we serve": one card per audience, each routing to its own page
// at /who-we-serve/<id>. The four audiences share one energy services model.
export default function WhoWeServe() {
  useSeo({
    title: 'Who We Serve | IGNIS',
    description: 'Institutions, industry, financiers and delivery partners, all connected by one energy services model funded from the fuel budgets institutions already spend.',
    path: '/who-we-serve',
  });
  return (
    <>
      <PageHero
        eyebrow="Who we serve"
        segments={['Four audiences,', { text: 'one model.', className: 'serif grad-flame' }]}
        sub="Institutions, industry, financiers and delivery partners, all connected by one energy services model funded from the fuel budgets institutions already spend. Kenya-proven, working across Africa."
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="service-grid">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <Link to={`/who-we-serve/${a.id}`} className="service-card glass serve-link">
                  <span className="k">{a.eyebrow}</span>
                  <p>{a.blurb}</p>
                  <span className="serve-link-cta">
                    Explore <ArrowUpRight size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
