import { Reveal } from "@/components/motion/Reveal";
import { publishedCaseStudies } from "@/content/case-studies";

// Renders only permission-cleared case studies. If none are published yet,
// shows a branded placeholder instead of empty space (PRD FR-04).
export function CaseStudies() {
  return (
    <section id="case-studies" className="section" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Case studies</span>
          <h2>Live work, published as permissions land.</h2>
          <p>Where we work, with whom, and what we deliver. We publish a project only once the counterparty approves.</p>
        </Reveal>

        {publishedCaseStudies.length > 0 ? (
          <div className="service-grid" style={{ marginTop: 44 }}>
            {publishedCaseStudies.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <article className="service-card glass">
                  <span className="k">{c.eyebrow}</span>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  <span className="case-metric">{c.metric}</span>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="case-empty glass" style={{ marginTop: 44 }}>
            <p>First named case studies publish soon. Meanwhile, see the field log below.</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
