import { Reveal } from "@/components/motion/Reveal";
import { IconCard } from "@/components/ui/Cards";
import { audiences } from "@/content/audiences";

// Block 11: the ONLY place on the homepage where stakeholders are listed.
// One link per card.
export function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" className="section">
      <div className="wrap sticky-split">
        {/* Desktop: the heading stays pinned while the cards scroll past it. */}
        <div className="sticky-col">
          <Reveal className="section-head">
            <h2>Who we work with</h2>
          </Reveal>
        </div>
        <div className="card-grid card-grid--5 sticky-cards">
          {audiences.map((a, i) => (
            <Reveal key={a.id} delay={i * 50}>
              <IconCard
                icon={a.icon}
                title={a.eyebrow}
                to={`/who-we-work-with/${a.id}`}
                cta={`For ${a.eyebrow}`}
              >
                {a.card}
              </IconCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
