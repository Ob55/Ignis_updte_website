import { Reveal } from "@/components/motion/Reveal";

// Where Ignis works. Every entry carries a status label (Active, Programme,
// Market development, Pipeline) and the date that status applies from.
// TODO(data): confirm each country's status and add its `since` date
// ("[month, year]"). A date renders only once it is filled in.
export const COUNTRIES = [
  { flag: "🇰🇪", name: "Kenya", status: "Active", since: null },
  { flag: "🇪🇹", name: "Ethiopia", status: "Market development", since: null },
  { flag: "🇸🇱", name: "Sierra Leone", status: "Market development", since: null },
  { flag: "🇲🇿", name: "Mozambique", status: "Market development", since: null },
  { flag: "🇺🇬", name: "Uganda", status: "Market development", since: null },
];

export function Geography() {
  return (
    <section id="presence" className="section">
      <div className="wrap">
        <div className="geo-grid">
          {COUNTRIES.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <div className="geo-card glass">
                <span className="geo-flag" aria-hidden="true">{c.flag}</span>
                <div>
                  <h2 className="geo-name">{c.name}</h2>
                  <span className="geo-status">
                    <span className="dot" aria-hidden="true" /> {c.status}
                    {c.since && <> · since {c.since}</>}
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
