import { Reveal } from "@/components/motion/Reveal";
import { approvedPartners } from "@/content/partners";

// About → Partners. Logos render only once each partner's approval is recorded
// in content/partners.js (TODO(partner-approval)).
export function AboutPartners() {
  return (
    <section id="partners" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Built with the sector, not around it.</h2>
          <p>
            We collaborate with public institutions, counties, development partners, financial
            institutions, technology providers and sector organisations to move clean-cooking
            projects from opportunity to implementation.
          </p>
        </Reveal>
        {approvedPartners.length > 0 && (
          <ul className="logo-row" style={{ marginTop: 40 }}>
            {approvedPartners.map((p) => (
              <li key={p.src}><img src={p.src} alt={p.name} loading="lazy" /></li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
