import { Reveal } from "@/components/motion/Reveal";

const COUNTRIES = [
  { flag: "🇰🇪", name: "Kenya", status: "Active" },
  { flag: "🇹🇿", name: "Tanzania", status: "Active" },
  { flag: "🇺🇬", name: "Uganda", status: "Active" },
];

// Our Geographical Presence, East Africa operations.
export function Geography() {
  return (
    <section id="presence" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Where we work</span>
          <h2>Our geographical presence.</h2>
          <p>
            We operate across East Africa through on-ground teams and delivery partners, supporting
            institutional clean cooking and energy systems with local maintenance and training.
          </p>
        </Reveal>

        <div className="geo-grid" style={{ marginTop: 44 }}>
          {COUNTRIES.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <div className="geo-card glass">
                <span className="geo-flag" aria-hidden="true">{c.flag}</span>
                <div>
                  <h3>{c.name}</h3>
                  <span className="geo-status">
                    <span className="dot" /> {c.status}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
