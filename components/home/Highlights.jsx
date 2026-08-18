import { Layers, Wrench, Wallet, Activity } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const ITEMS = [
  { icon: Layers, h: "Programme management", p: "We design, run and verify clean energy programmes for governments, donors, counties and corporates." },
  { icon: Wrench, h: "Programme implementation", p: "We deliver and operate projects for institutions and financiers, from assessment to verified performance." },
  { icon: Wallet, h: "No upfront capital", p: "Institutions pay a fixed fee from existing fuel budgets. Ownership transfers at the end of term." },
  { icon: Activity, h: "Measured and verified", p: "Digital monitoring from commissioning through CleanCookIQ, the trigger for verified savings." },
];

// Two pillars: what Ignis manages and what it implements, end to end.
export function Highlights() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Two pillars</span>
          <h2>One company, two pillars, end to end.</h2>
        </Reveal>
        <div className="teaser-grid" style={{ marginTop: 44 }}>
          {ITEMS.map(({ icon: Icon, h, p }, i) => (
            <Reveal key={h} delay={i * 80}>
              <div className="teaser-card glass">
                <div className="disc glass" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
