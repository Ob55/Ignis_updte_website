import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { audiences } from '@/content/audiences';

// Hub for "Where we work": one card per audience, each routing to its own page
// at /where-we-work/<id>. The four audiences share one energy services model.
export default function WhoWeServe() {
  useSeo(seoFor('/where-we-work'));
  return (
    <>
      <PageHero
        eyebrow="Where we work"
        segments={['Four audiences,', { text: 'one model.', className: 'serif grad-flame' }]}
        sub="Institutions, industry, financiers and delivery partners, all connected by one energy services model funded from the fuel budgets institutions already spend. Kenya-proven, working across Africa."
        image="/img/kitchen.jpg"
        imageAlt="An institutional kitchen cooking at scale"
      />
      <section className="section">
        <div className="wrap">
          <div className="service-grid">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <Link to={`/where-we-work/${a.id}`} className="service-card glass serve-link">
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
