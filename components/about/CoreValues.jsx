import { Award, Leaf, HeartPulse, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const VALUES = [
  { icon: Award, h: "Excellence", p: "Delivering high-quality products and services that consistently exceed expectations." },
  { icon: Leaf, h: "Sustainability", p: "Championing clean energy and eco-friendly practices in every solution we deliver." },
  { icon: HeartPulse, h: "Impact", p: "Creating solutions that improve health, reduce fuel consumption, and uplift institutions." },
  { icon: Users, h: "Accessibility", p: "Making clean cooking attainable for institutions and households across diverse African contexts." },
];

export function CoreValues() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>What guides every deployment.</h2>
        </Reveal>
        <div className="teaser-grid" style={{ marginTop: 44 }}>
          {VALUES.map(({ icon: Icon, h, p }, i) => (
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
