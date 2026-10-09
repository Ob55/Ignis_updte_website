import { Reveal } from "@/components/motion/Reveal";
import { IconCard } from "@/components/ui/Cards";
import { audiences } from "@/content/audiences";

// Block 11: the ONLY place on the homepage where stakeholders are listed.
// One link per card.
export function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Who we work with</h2>
        </Reveal>
        <div className="card-grid card-grid--5" style={{ marginTop: 40 }}>
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
