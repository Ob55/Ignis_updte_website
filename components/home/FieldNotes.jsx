import { Reveal } from "@/components/motion/Reveal";
import { StoryCard } from "@/components/ui/Cards";
import { publishedFieldNotes } from "@/content/field-notes";

// Block 14: Field Notes launch stories (stub pages until facts and photos exist).
export function FieldNotes() {
  return (
    <section id="field-notes" className="section">
      <div className="wrap">
        <div className="split split--media">
          <Reveal className="section-head">
            <h2>Field Notes from live sites.</h2>
            <p>
              What happens when the clean-cooking transition meets the realities of an operating
              kitchen? We publish field observations, fuel data, engineering lessons, financing
              insights and project stories from the work we do.
            </p>
          </Reveal>
          <Reveal className="feature-photo" delay={120}>
            <img src="/img/hero/likoni-cook.jpg" alt="A cook at work among large pots in a kitchen in Likoni, Mombasa" loading="lazy" />
          </Reveal>
        </div>
        <div className="card-grid card-grid--stories" style={{ marginTop: 40 }}>
          {publishedFieldNotes.map((s, i) => (
            <Reveal key={s.slug} delay={i * 50}>
              <StoryCard story={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
