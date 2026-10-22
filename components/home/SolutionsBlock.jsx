import { Reveal } from "@/components/motion/Reveal";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { OFFERS } from "@/content/offers";

// Block 5: the three offers. Card actions repeat the card name exactly
// ("Explore Institutional Steam"). They are styled as card links, not buttons,
// so the section keeps to the two-buttons-per-section rule.
// Electric Cooking copy is pending decision D5 — see TODO(confirm) in content/offers.js.
// Each card leads with a photo; the Electric Cooking card shows the Asili cooker
// (a studio shot, so it sits contained on its own backdrop rather than cropped).
export function SolutionsBlock() {
  return (
    <section id="solutions" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Solutions built for real operating conditions.</h2>
        </Reveal>
        <div className="card-grid card-grid--3" style={{ marginTop: 40 }}>
          {OFFERS.map((o, i) => (
            <Reveal key={o.slug} delay={i * 70}>
              <article className="offer-card offer-card--media">
                {o.image && (
                  <figure className={`offer-media${o.image.product ? " offer-media--product" : ""}`}>
                    <img src={o.image.src} alt={o.image.alt} loading="lazy" decoding="async" width="720" height="450" />
                    {o.image.product && <figcaption className="offer-tag">Featuring Asili</figcaption>}
                  </figure>
                )}
                <h3>{o.name}</h3>
                <p>{o.body}</p>
                <Link className="card-link" to={`/what-we-do/${o.slug}`}>
                  Explore {o.name} <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="section-kicker">
          <em>We don&apos;t just install equipment. We manage the transition.</em>
        </p>
      </div>
    </section>
  );
}
