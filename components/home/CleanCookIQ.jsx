import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

// Block 8: CleanCookIQ, short. The platform step sequence lives on /cleancookiq
// only — never on the homepage.
export function CleanCookIQ() {
  return (
    <section id="cleancookiq" className="section">
      <div className="wrap">
        <Reveal className="callout-panel">
          <h2>CleanCookIQ: the data behind every decision.</h2>
          <p>
            CleanCookIQ is Ignis&apos;s digital infrastructure for collecting, validating, analysing
            and managing institutional clean-cooking transition data. For institutions, it supports
            a clear, costed transition pathway. For financiers and programme partners, it provides
            structured information, project economics and performance evidence. For governments,
            it gives portfolio-level visibility of demand and transition progress.
          </p>
          <div className="btn-row">
            <Button to="/cleancookiq" variant="primary">Explore CleanCookIQ</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
