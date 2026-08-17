import { Boxes, Flame, Gauge, Wrench } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const ITEMS = [
  { icon: Boxes, h: "Institutional Cookers", p: "Steam-based systems for high-volume, smoke-free cooking." },
  { icon: Flame, h: "LPG & Clean Fuels", p: "Hybrid fuel solutions for low-emission institutional kitchens." },
  { icon: Gauge, h: "Energy Efficiency", p: "Cut energy waste by up to 60% with advanced cooking technology." },
  { icon: Wrench, h: "Maintenance & Support", p: "Ongoing training, telemetry, and after-sales service." },
];

// Key Highlights, solutions engineered for safety, performance and operations.
export function Highlights() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Key highlights</span>
          <h2>Engineered for safety, performance, and institutional operations.</h2>
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
