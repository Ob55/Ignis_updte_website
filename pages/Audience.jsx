import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { Reveal } from '@/components/motion/Reveal';
import { RequestAssessmentButton, PartnerButton } from '@/components/ui/Button';
import { TodoPlaceholder } from '@/components/ui/Cards';
import { audiences, getAudience } from '@/content/audiences';
import NotFound from '@/pages/NotFound';

// One audience page (/who-we-work-with/<id>), driven by content/audiences.js.
export default function Audience() {
  const { audience: id } = useParams();
  const a = getAudience(id);

  useSeo(seoFor(a ? `/who-we-work-with/${a.id}` : '/404'));
  if (!a) return <NotFound />;

  const others = audiences.filter((o) => o.id !== a.id);

  return (
    <>
      <PageHero eyebrow={a.eyebrow} segments={a.segments} sub={a.intro} image={a.image} imageAlt={a.imageAlt} />

      <section className="section">
        <div className="wrap">
          {a.points.length > 0 ? (
            <div className="card-grid card-grid--3">
              {a.points.map((pt, i) => (
                <Reveal key={pt.k} delay={i * 80}>
                  <div className="icon-card">
                    <h2 className="icon-card-title">{pt.k}</h2>
                    <p>{pt.p}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            // TODO(content): body copy for this audience page.
            <TodoPlaceholder />
          )}

          <div className="btn-row">
            {a.id === 'institutions' ? <RequestAssessmentButton /> : <PartnerButton role={a.id} />}
          </div>

          <div className="serve-more">
            <h2 className="serve-more-h">Who else we work with</h2>
            <div className="serve-more-links">
              {others.map((o) => (
                <Link key={o.id} to={`/who-we-work-with/${o.id}`} className="serve-more-link">
                  {o.eyebrow} <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
