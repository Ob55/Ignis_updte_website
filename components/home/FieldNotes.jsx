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
            <img src="/img/field-notes-kitchen.jpg" alt="A cook in a hairnet and chef's whites working at a stove in a commercial kitchen" loading="lazy" width="1600" height="900" />
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
