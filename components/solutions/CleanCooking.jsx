import { useState } from "react";
import { Box } from "lucide-react";
import { solutions } from "@/content/solutions";
import { Reveal } from "@/components/motion/Reveal";
import { KitchenModal } from "@/components/solutions/KitchenModal";

export function CleanCooking() {
  const [open, setOpen] = useState(false);
  return (
    <section id="clean-cooking" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">What we provide</span>
          <h2>Clean cooking methods, built for every kitchen.</h2>
          <p>From the family stove to the institutional kitchen, cleaner heat, lower fuel bills, no smoke in the room.</p>
        </Reveal>

        <div className="service-grid" style={{ marginTop: 48 }}>
          {solutions.map(({ icon: Icon, tag, h, p }, i) => (
            <Reveal key={h} delay={i * 80}>
              <div className="service-card glass">
                <div className="disc glass" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.6} />
                </div>
                <span className="k">{tag}</span>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="kitchen-cta glass" delay={120}>
          <div>
            <span className="k">3D design</span>
            <h3>See how we design an institutional kitchen.</h3>
            <p>Interested? Explore a real IGNIS central-kitchen layout in interactive 3D.</p>
          </div>
          <button type="button" className="btn btn-flame" onClick={() => setOpen(true)}>
            <Box size={18} strokeWidth={1.8} style={{ marginRight: 8 }} />
            See our 3D kitchen design
          </button>
        </Reveal>
      </div>

      <KitchenModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
