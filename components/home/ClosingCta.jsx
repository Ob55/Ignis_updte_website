import { Reveal } from "@/components/motion/Reveal";
import { RequestAssessmentButton, PartnerButton } from "@/components/ui/Button";

// Block 15: closing call to action.
export function ClosingCta() {
  return (
    <section id="next-step" className="section">
      <div className="wrap">
        <Reveal className="closing-cta">
          <h2>Ready to explore a transition?</h2>
          <p>Start with the conversation that fits your role.</p>
          <div className="btn-row btn-row--center">
            <RequestAssessmentButton />
            <PartnerButton />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
