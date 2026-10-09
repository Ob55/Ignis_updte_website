import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

// Block 12: Built in Kenya. No stakeholder list here (Block 11 only).
export function BuiltInKenya() {
  return (
    <section id="built-in-kenya" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>Built in Kenya. Designed for African markets.</h2>
          <p>
            Our work in Kenya is helping us build a practical model for institutional clean-cooking
            transition: assess real demand, structure projects, connect the right technology and
            finance, deliver the transition and measure what happens. We are building from Kenyan
            delivery experience towards a model that can work across African markets.
          </p>
        </Reveal>
        <div className="btn-row">
          <Button to="/where-we-work" variant="secondary">See Where We Work</Button>
        </div>
      </div>
    </section>
  );
}
