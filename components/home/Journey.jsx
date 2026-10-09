import { Reveal } from "@/components/motion/Reveal";
import { Stepper } from "@/components/ui/Stepper";
import { JOURNEY } from "@/content/journey";

// Block 3: the ONLY six-step journey on the homepage.
export function Journey() {
  return (
    <section id="how-it-works" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>From demand to measurable results.</h2>
        </Reveal>
        <Reveal delay={80} style={{ marginTop: 40 }}>
          <Stepper steps={JOURNEY} label="How Ignis works, six steps" />
        </Reveal>
        <p className="section-kicker">
          <em>Every step runs on CleanCookIQ, our data and decision infrastructure.</em>
        </p>
      </div>
    </section>
  );
}
