import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { RequestAssessmentButton } from "@/components/ui/Button";
import { fuelModels } from "@/content/fuel-models";

// Block 6: savings and financing. Figures come from the school model in
// content/fuel-models.js (KES 3.6M firewood vs KES 1.62M steam). Keep the word
// "illustrative" visible. Never write "no upfront cost".
// TODO(confirm): which financing sources Ignis can access, whether any deposit is
// required, whether KES 1.62M includes the CESA payment (decisions D1, D2).
const school = fuelModels.find((m) => m.id === "school");
const toM = (kes) => `KES ${(kes / 1e6).toLocaleString("en-KE", { maximumFractionDigits: 2 })}M`;

export function Savings() {
  const current = school.annualFirewoodKes;
  const steam = school.annualSteamKes;
  const diff = current - steam;
  const pct = Math.round((diff / current) * 100);
  const steamShare = (steam / current) * 100;

  return (
    <section id="savings" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>What could your transition save?</h2>
        </Reveal>

        <Reveal className="savings-panel" delay={80}>
          {/* Left: the two annual costs on one shared scale */}
          <div className="savings-compare">
            <div className="savings-compare-head">
              <h3>Annual cooking-fuel cost</h3>
              <span className="savings-tag">Illustrative</span>
            </div>
            <dl className="savings-bars">
              <div className="savings-row">
                <dt>Current firewood spend</dt>
                <dd>
                  <span className="savings-track" aria-hidden="true">
                    <span className="savings-bar savings-bar--wood" style={{ width: "100%" }} />
                  </span>
                  <span className="savings-amt">{toM(current)} a year</span>
                </dd>
              </div>
              <div className="savings-row">
                <dt>Illustrative Ignis steam scenario</dt>
                <dd>
                  <span className="savings-track" aria-hidden="true">
                    <span className="savings-bar savings-bar--steam" style={{ width: `${steamShare}%` }} />
                    <span className="savings-gap" style={{ left: `${steamShare}%`, width: `${100 - steamShare}%` }}>
                      <span>saved</span>
                    </span>
                  </span>
                  <span className="savings-amt">{toM(steam)} a year</span>
                </dd>
              </div>
            </dl>
            <div className="savings-scale" aria-hidden="true">
              <span>KES 0</span>
              <span>{toM(current)}</span>
            </div>
          </div>

          {/* Right: the headline difference */}
          <div className="savings-result on-dark">
            <span className="savings-result-k">Potential difference</span>
            <span className="savings-result-v">{toM(diff)}</span>
            <span className="savings-result-unit">a year</span>
            <span className="savings-result-pct">{pct}%</span>
          </div>
        </Reveal>

        <p className="savings-note">
          Illustrative example based on a 1,200-learner boarding school at 2026 firewood prices.
          Actual savings depend on site conditions, meal volumes, fuel prices, system design and
          operating performance.
        </p>

        <div className="savings-foot">
          <div className="savings-finance">
            <Accordion title="How is the transition financed?">
              <p>
                The equipment and installation have an upfront capital requirement. Where approved
                and available, Ignis can structure third-party capital, potentially including grants,
                concessional finance, results-based finance or carbon finance, with the institution
                repaying through a Clean Energy Service Agreement linked to its existing energy budget.
              </p>
              <p>
                <Link className="text-link" to="/financing">How it&apos;s financed</Link>
              </p>
            </Accordion>
          </div>
          <RequestAssessmentButton />
        </div>
      </div>
    </section>
  );
}
