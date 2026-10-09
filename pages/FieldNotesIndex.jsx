import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { StoryCard } from '@/components/ui/Cards';
// Publishing cadence (internal, not rendered): see PUBLISH_SCHEDULE in content/field-notes.js —
// launch with three stories, then publish monthly.
import { publishedFieldNotes } from '@/content/field-notes';

export default function FieldNotesIndex() {
  useSeo(seoFor('/our-work/field-notes'));
  return (
    <>
      <PageHero
        eyebrow="Insights / Field Notes"
        segments={['Field Notes from', { text: 'live sites.', className: 'serif grad-flame' }]}
        sub="What happens when the clean-cooking transition meets the realities of an operating kitchen? We publish field observations, fuel data, engineering lessons, financing insights and project stories from the work we do."
        image={HERO.firewood.src}
        imageAlt={HERO.firewood.alt}
      />
      <section className="section">
        <div className="wrap">
          <p className="lead" style={{ marginBottom: 32, maxWidth: '70ch' }}>
            Each field note follows one template: a headline, a photograph, one key number, one
            lesson learned, and a pointer to the related service. Stories are published once the
            underlying facts, figures and photographs have been checked.
          </p>
          <div className="card-grid card-grid--stories">
            {publishedFieldNotes.map((s) => <StoryCard key={s.slug} story={s} />)}
          </div>
        </div>
      </section>
    </>
  );
}
