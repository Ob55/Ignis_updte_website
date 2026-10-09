import { ArrowUpRight, ClipboardList, ScanSearch, Handshake, Wrench, Activity } from "lucide-react";
import { useSeo } from "@/lib/seo";
import { seoFor } from "@/lib/seo-data";
import { PageHero } from "@/components/chrome/PageHero";
import { HERO } from "@/content/hero-images";
import { Reveal } from "@/components/motion/Reveal";
import { Button, RequestAssessmentButton, PartnerButton } from "@/components/ui/Button";
import { TodoPlaceholder } from "@/components/ui/Cards";

// CleanCookIQ is Ignis's data and decision infrastructure. The full platform
// workflow lives on this page only (never on the homepage). Financier-specific
// language is allowed here.
const CLEANCOOKIQ_URL = "https://cleancookiq.com/";

// Screenshots of the live platform's public pages (cleancookiq.com).
const PLATFORM_SHOTS = [
  {
    src: "/img/cleancookiq/map.jpg", h: 750, href: "https://cleancookiq.com/map",
    title: "National Institution Map",
    text: "Every institution in the clean-cooking pipeline, by type, county and stage.",
    alt: "CleanCookIQ National Institution Map: a map of Kenya with clustered institution markers and filters for schools, hospitals, county and stage",
  },
  {
    src: "/img/cleancookiq/intelligence.jpg", h: 697, href: "https://cleancookiq.com/intelligence",
    title: "Clean Cooking Intelligence",
    text: "Institutions by primary fuel, institution mix and pipeline stage, filterable by county.",
    alt: "CleanCookIQ Intelligence dashboard: summary figures, a bar chart of institutions by primary cooking fuel and a donut chart of institution types",
  },
  {
    src: "/img/cleancookiq/counties.jpg", h: 697, href: "https://cleancookiq.com/counties",
    title: "County Intelligence",
    text: "A profile for each of Kenya's 47 counties: institutions tracked, dominant fuels and suppliers.",
    alt: "CleanCookIQ County Intelligence page: county cards grouped by region, with filters for region and dominant fuel",
  },
];

// How the platform works: the five stages exactly as cleancookiq.com describes them
// ("Five steps. One fully tracked kitchen."). The ten detailed workflow steps from
// the content spec (Onboard → Verify) sit under the stage they belong to.
const STAGES = [
  { n: "01", icon: ClipboardList, title: "Register", steps: ["Onboard", "Collect"],
    text: "Institutions share their cooking details: current fuel, meals served, budget, and location." },
  { n: "02", icon: ScanSearch, title: "Assess", steps: ["Validate", "Assess"],
    text: "We assess each institution and work out the best clean cooking option for them." },
  { n: "03", icon: Handshake, title: "Match & Finance", steps: ["Model", "Match", "Contract"],
    text: "We connect ready institutions with vetted suppliers and interested funders." },
  { n: "04", icon: Wrench, title: "Install", steps: ["Deploy"],
    text: "Equipment is installed and progress is tracked in real time." },
  { n: "05", icon: Activity, title: "Monitor", steps: ["Monitor", "Verify"],
    text: "After installation, we track performance and produce impact and carbon reports." },
];

export default function CleanCookIQ() {
  useSeo(seoFor("/cleancookiq"));
  return (
    <>
      <PageHero
        eyebrow="CleanCookIQ"
        segments={["CleanCookIQ: the data behind", { text: "every decision.", className: "serif grad-flame" }]}
        sub="CleanCookIQ is Ignis's digital infrastructure for collecting, validating, analysing and managing institutional clean-cooking transition data."
        image={HERO['cleancookiq-kitchen'].src}
        imageAlt={HERO['cleancookiq-kitchen'].alt}
      />

      <section id="platform" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>The platform.</h2>
            <p>
              Clean cooking only pays for itself if the results can be shown. CleanCookIQ turns
              kitchen data into a record that institutions, technology providers, financiers and
              programme partners can all read from.
            </p>
          </Reveal>
          {/* Live screenshots of cleancookiq.com (captured Oct 2026). Re-capture when the platform UI changes. */}
          <div className="card-grid card-grid--3 platform-shots" style={{ marginTop: 32 }}>
            {PLATFORM_SHOTS.map((s) => (
              <figure key={s.src} className="platform-shot">
                <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.title}: open on cleancookiq.com`}>
                  <img src={s.src} alt={s.alt} loading="lazy" width="1200" height={s.h} />
                </a>
                <figcaption>
                  <strong>{s.title}</strong>
                  <span>{s.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>How it works.</h2>
            <p>
              Five steps. One fully tracked kitchen. From sign-up to monitoring, every move is
              captured against the same shared record.
            </p>
          </Reveal>
          <Reveal as="ol" className="cciq-flow" delay={80}>
            {STAGES.map(({ n, icon: Icon, title, steps, text }) => (
              <li key={n} className="cciq-stage">
                <div className="cciq-stage-head">
                  <span className="cciq-stage-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.8} /></span>
                  <span className="cciq-stage-n">Step {n}</span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <ul className="cciq-substeps" aria-label={`${title} workflow steps`}>
                  {steps.map((st) => <li key={st}>{st}</li>)}
                </ul>
              </li>
            ))}
          </Reveal>
          <p className="cciq-flow-foot">
            The full workflow: Onboard, Collect, Validate, Assess, Model, Match, Contract, Deploy,
            Monitor, Verify.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="card-grid card-grid--3">
            <article id="for-institutions" className="audience-panel">
              <h2>For Institutions</h2>
              <p>
                A clear, costed transition pathway. Every site gets a transparent record of energy use
                and system performance, so the switch to clean cooking is auditable, not anecdotal.
              </p>
            </article>
            <article id="for-financiers" className="audience-panel">
              <h2>For Financiers</h2>
              <p>
                Structured information, project economics and performance evidence. Validated demand
                and monitored performance give funders portfolio-level data to assess projects before
                capital moves and to track them afterwards.
              </p>
            </article>
            <article id="for-governments" className="audience-panel">
              <h2>For Governments &amp; Partners</h2>
              <p>Portfolio-level visibility of demand and transition progress.</p>
              {/* TODO(content): expand "For Governments & Partners". */}
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="closing-cta">
            <h2>See the platform.</h2>
            <p>
              <a className="text-link" href={CLEANCOOKIQ_URL} target="_blank" rel="noopener noreferrer">
                Visit cleancookiq.com <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </p>
            <div className="btn-row btn-row--center">
              <RequestAssessmentButton />
              <PartnerButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
