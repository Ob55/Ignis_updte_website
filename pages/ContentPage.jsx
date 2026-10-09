import { Link, useParams } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { RequestAssessmentButton, PartnerButton } from '@/components/ui/Button';
import { TodoPlaceholder } from '@/components/ui/Cards';
import { getOffer } from '@/content/offers';
import { getService } from '@/content/services';
import NotFound from '@/pages/NotFound';

// /what-we-do/<slug>: one page per offer (Institutional Steam, Electric Cooking,
// Clean-Cooking Programmes) and per service line. Bodies are stubs until the
// content is written.
export default function ContentPage() {
  const { slug } = useParams();
  const offer = getOffer(slug);
  const service = getService(slug);
  const item = offer || service;

  useSeo(seoFor(item ? `/what-we-do/${slug}` : '/404'));
  if (!item) return <NotFound />;

  const name = item.name;
  const intro = offer ? offer.body : service.intro;

  return (
    <>
      <PageHero eyebrow="What We Do" segments={[name]} sub={intro} image={HERO[item.hero].src} imageAlt={HERO[item.hero].alt} imageCredit={HERO[item.hero].credit} imagePosition={HERO[item.hero].position} />
      <section className="section">
        <div className="wrap prose">
          {/* TODO(content): full page body for this offer / service line. */}
          <TodoPlaceholder />
          {slug === 'institutional-steam' && (
            <p>
              See <Link className="text-link" to="/what-we-do#why-steam">why steam costs less</Link> and{' '}
              <Link className="text-link" to="/what-we-do#technical">the technical detail</Link>.
            </p>
          )}
          {slug === 'clean-cooking-programmes' && (
            <p>
              See <Link className="text-link" to="/financing">how the transition is financed</Link>.
            </p>
          )}
          <div className="btn-row">
            <RequestAssessmentButton />
            <PartnerButton />
          </div>
        </div>
      </section>
    </>
  );
}
