import { ArrowUpRight, Gauge, Flame, Timer, ShieldCheck, Banknote } from "lucide-react";
import { useSeo } from "@/lib/seo";
import { seoFor } from "@/lib/seo-data";
import { PageHero } from "@/components/chrome/PageHero";
import { Reveal } from "@/components/motion/Reveal";

// CleanCookIQ is the standalone measurement, reporting and verification (MRV)
// platform. This page tells its story in-site; the live tool lives off-site.
const CLEANCOOKIQ_URL = "https://cleancookiq.com/";

const STEPS = [
  { icon: Gauge, h: "Commissioning baseline", p: "Monitoring starts the day a kitchen goes live, capturing the fuel baseline every later saving is measured against." },
  { icon: Flame, h: "Fuel savings", p: "Firewood and steam consumption are tracked continuously, so the reduction against baseline is a measured number, not an estimate." },
  { icon: Timer, h: "Uptime", p: "System availability is logged at every site, proving the infrastructure is actually running when meals are cooked." },
  { icon: ShieldCheck, h: "Verified impact", p: "Savings, emissions avoided and uptime are reconciled into a verified record for each institution." },
  { icon: Banknote, h: "Payment trigger", p: "The verified data is what triggers payment and what financiers rely on to release and reconcile funds." },
];

export default function CleanCookIQ() {
  useSeo(seoFor('/platform'));
  return (
    <>
      <PageHero
        eyebrow="CleanCookIQ"
        segments={["Measured, reported,", { text: "verified.", className: "serif grad-flame" }]}
        sub="Our standalone measurement, reporting and verification platform. Digital monitoring runs from commissioning, tracking fuel savings, uptime and verified impact at every site, the data that triggers payment and that financiers rely on."
        image="/img/cleancookiq.jpg"
        imageAlt="A live monitoring dashboard tracking fuel savings and uptime"
      />

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Why it exists</span>
            <h2>The data layer under every institution.</h2>
            <p>
              Clean cooking only pays for itself if the savings can be proven. CleanCookIQ turns
              live kitchen performance into a verifiable record, so institutions, delivery partners
              and financiers all read from the same numbers.
            </p>
          </Reveal>

          <div className="step-grid" style={{ marginTop: 44 }}>
            {STEPS.map(({ icon: Icon, h, p }, i) => (
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

      <section className="section">
        <div className="wrap">
          <div className="fin-grid">
            <Reveal>
              <div className="fin-card glass">
                <span className="ey">For institutions</span>
                <h3>Proof your budget is working.</h3>
                <p>
                  Every site gets a transparent record of fuel saved and uptime delivered, so the
                  switch to clean energy is auditable, not anecdotal.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="fin-card glass">
                <span className="ey">For financiers</span>
                <h3>The number payments run on.</h3>
                <p>
                  Verified performance data is the trigger for disbursement and reconciliation,
                  giving funders confidence that impact is real before capital moves.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="kitchen-cta kitchen-cta--center glass">
            <div>
              <span className="k">CleanCookIQ</span>
              <h3>See the platform.</h3>
              <p>Explore the live measurement, reporting and verification platform.</p>
            </div>
            <a className="btn btn-flame" href={CLEANCOOKIQ_URL} target="_blank" rel="noopener noreferrer">
              Explore CleanCookIQ <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
