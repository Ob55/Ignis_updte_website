import { useParams } from 'react-router-dom';
import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { Button } from '@/components/ui/Button';
import { TodoPlaceholder } from '@/components/ui/Cards';
import { getFieldNote } from '@/content/field-notes';
import NotFound from '@/pages/NotFound';

// One Field Notes story. Renders headline, type tag, audience tags and the
// service link. `draftBrief` is an internal outline and is NEVER rendered;
// body / keyNumber / lesson render only once written (see content/field-notes.js).
export default function FieldNote() {
  const { slug } = useParams();
  const s = getFieldNote(slug);
  useSeo(seoFor(s ? `/our-work/field-notes/${slug}` : '/404'));
  if (!s) return <NotFound />;

  return (
    <>
      <PageHero eyebrow="Field Notes" segments={[s.headline]} image={s.heroImage || HERO.firewood.src} imageAlt={s.heroImage ? s.heroImageAlt : HERO.firewood.alt} />
      <section className="section">
        <div className="wrap prose">
          <div className="tag-row" aria-label="Story type and audience">
            <span className="tag tag--self">{s.type}</span>
            <span className="tag">Audience: {s.audience.join(', ')}</span>
          </div>
          {s.body ? (
            <>
              {s.body.map((para) => <p key={para}>{para}</p>)}
              {s.keyNumber && <p className="lead"><strong>{s.keyNumber}</strong></p>}
              {s.lesson && <p><strong>The lesson:</strong> {s.lesson}</p>}
            </>
          ) : (
            // TODO(data): facts and photos for this story (outline in draftBrief, content/field-notes.js).
            <TodoPlaceholder>
              This field note is being written. Stories are published once the underlying facts,
              figures and photographs have been checked.
            </TodoPlaceholder>
          )}
          <div className="btn-row">
            <Button to={s.serviceLink.to} variant="secondary">{s.serviceLink.label}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
