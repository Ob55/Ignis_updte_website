import { Navigate, useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { audiences, getAudience } from '@/content/audiences';

// A single "Who we serve" audience page (/who-we-serve/<id>). Content comes from
// content/audiences.js. Unknown slugs fall back to the hub.
export default function Audience() {
  const { audience: id } = useParams();
  const a = getAudience(id);

  useSeo({
    title: a ? `${a.eyebrow} | Who We Serve | IGNIS` : 'Who We Serve | IGNIS',
    description: a ? a.intro : 'Institutions, industry, financiers and delivery partners, connected by one energy services model.',
    path: a ? `/who-we-serve/${a.id}` : '/who-we-serve',
  });

  if (!a) return <Navigate to="/who-we-serve" replace />;

  const others = audiences.filter((o) => o.id !== a.id);

  return (
    <>
      <PageHero eyebrow={a.eyebrow} segments={a.segments} sub={a.intro} />

      <section className="section">
        <div className="wrap">
          <div className="service-grid">
            {a.points.map((pt, i) => (
              <Reveal key={pt.k} delay={i * 80}>
                <div className="service-card glass">
                  <h3>{pt.k}</h3>
                  <p>{pt.p}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="serve-more">
            <span className="eyebrow">Who else we serve</span>
            <div className="serve-more-links">
              {others.map((o) => (
                <Link key={o.id} to={`/who-we-serve/${o.id}`} className="serve-more-link">
                  {o.eyebrow} <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
