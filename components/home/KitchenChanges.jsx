import { Wind, Wallet, UtensilsCrossed, PackageX, Gauge, Leaf } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { IconCard } from "@/components/ui/Cards";

// Block 4: what changes in the kitchen. Wording is fixed; add no health claims.
const CHANGES = [
  { icon: Wind, title: "Cleaner air", text: "less smoke and open-fire exposure for cooks." },
  { icon: Wallet, title: "Predictable costs", text: "a structured service payment replaces unpredictable fuel purchasing." },
  { icon: UtensilsCrossed, title: "Reliable meals", text: "less dependence on wet wood and fire-starting time." },
  { icon: PackageX, title: "Less hassle", text: "less firewood storage, handling and delivery coordination." },
  { icon: Gauge, title: "Better visibility", text: "energy use and system performance are monitored instead of estimated." },
  { icon: Leaf, title: "Lighter footprint", text: "lower reliance on traditional biomass." },
];

export function KitchenChanges() {
  return (
    <section id="kitchen-changes" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>What changes in the kitchen?</h2>
        </Reveal>
        <div className="card-grid card-grid--3" style={{ marginTop: 40 }}>
          {CHANGES.map((c, i) => (
            <Reveal key={c.title} delay={i * 50}>
              <IconCard icon={c.icon} title={c.title}>
                {c.text.charAt(0).toUpperCase() + c.text.slice(1)}
              </IconCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
