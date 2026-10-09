import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { Geography } from '@/components/home/Geography';
import { RequestAssessmentButton, PartnerButton } from '@/components/ui/Button';

// Where We Work — reached from homepage Block 12 ("See Where We Work").
// Status labels: Active, Programme, Market development, Pipeline.
// TODO(content): one-line definition of each status label.
export default function WhereWeWork() {
  useSeo(seoFor('/where-we-work'));
  return (
    <>
      <PageHero
        eyebrow="Where We Work"
        segments={['Built in Kenya.', { text: 'Designed for African markets.', className: 'serif grad-flame' }]}
        sub="We are building from Kenyan delivery experience towards a model that can work across African markets."
        image={HERO.kisumu.src}
        imageAlt={HERO.kisumu.alt}
      />
      <Geography />
      <section className="section section--tight">
        <div className="wrap">
          <div className="btn-row">
            <RequestAssessmentButton />
            <PartnerButton />
          </div>
        </div>
      </section>
    </>
  );
}
