import { Layers, Wrench, Wallet, Activity } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

// Two pillars, each folding in the supporting point that belongs to it:
// management pairs with verification, implementation pairs with the funding model.
const PILLARS = [
  {
    icon: Layers,
    h: "Programme management",
    p: "We design, run and verify clean energy programmes for governments, donors, counties and corporates.",
    sub: {
      icon: Activity,
      h: "Measured and verified",
      p: "Digital monitoring from commissioning through CleanCookIQ, the trigger for verified savings.",
    },
  },
  {
    icon: Wrench,
    h: "Programme implementation",
    p: "We deliver and operate projects for institutions and financiers, from assessment to verified performance.",
    sub: {
      icon: Wallet,
      h: "No upfront capital",
      p: "Institutions pay a fixed fee from existing fuel budgets. Ownership transfers at the end of term.",
    },
  },
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
        <div className="teaser-grid teaser-grid--pillars" style={{ marginTop: 44 }}>
          {PILLARS.map(({ icon: Icon, h, p, sub }, i) => {
            const SubIcon = sub.icon;
            return (
              <Reveal key={h} delay={i * 80}>
                <div className="teaser-card glass pillar-card">
                  <div className="disc glass" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                  <div className="pillar-sub">
                    <div className="pillar-sub-icon" aria-hidden="true">
                      <SubIcon size={18} strokeWidth={1.6} />
                    </div>
                    <div>
                      <h4>{sub.h}</h4>
                      <p>{sub.p}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
