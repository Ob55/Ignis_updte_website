import { Reveal } from "@/components/motion/Reveal";

const COUNTRIES = [
  { flag: "🇰🇪", name: "Kenya", status: "Active" },
  { flag: "🇪🇹", name: "Ethiopia", status: "Market development" },
  { flag: "🇸🇱", name: "Sierra Leone", status: "Market development" },
  { flag: "🇲🇿", name: "Mozambique", status: "Market development" },
  { flag: "🇺🇬", name: "Uganda", status: "Market development" },
];

// Our Geographical Presence, Kenya-proven and working across Africa.
export function Geography() {
  return (
    <section id="presence" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Where we work</span>
          <h2>Kenya-proven, working across Africa.</h2>
          <p>
            We deliver through on-ground teams and delivery partners, supporting institutional
            clean energy programmes with local delivery, maintenance and verification.
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
