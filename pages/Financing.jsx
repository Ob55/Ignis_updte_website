import { useSeo } from '@/lib/seo';
import { seoFor } from '@/lib/seo-data';
import { PageHero } from '@/components/chrome/PageHero';
import { HERO } from '@/content/hero-images';
import { Reveal } from '@/components/motion/Reveal';
import { Button, PartnerButton } from '@/components/ui/Button';
import { TodoPlaceholder } from '@/components/ui/Cards';

// /financing — linked from homepage Block 6 and What We Do.
// Never write "no upfront cost" anywhere on this page.
// TODO(confirm): which financing sources Ignis can access, whether any deposit is
// required, whether the illustrative steam figure includes the CESA payment (D1, D2).

// CESA flow: capital → Ignis → system → institution → service payment → repayment.
// Every box and arrow carries a text label so the flow reads without colour.
function CesaDiagram() {
  return (
    <figure className="diagram">
      <svg viewBox="0 0 780 380" role="img" aria-labelledby="cesa-title cesa-desc" className="diagram-svg">
        <title id="cesa-title">How a Clean Energy Service Agreement works</title>
        <desc id="cesa-desc">
          Grants, concessional loans, results-based finance and carbon finance provide capital to Ignis.
          Ignis structures, installs, operates and monitors the system via CleanCookIQ, and delivers a
          steam system to the institution. The institution makes a service payment under the CESA, set
          against its existing fuel budget, and repayment flows back to the funders.
        </desc>
        <defs>
          <marker id="cesa-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#14140f" />
          </marker>
        </defs>
        {/* funders */}
        <rect x="10" y="20" width="230" height="130" rx="14" className="dg-box" />
        <text x="125" y="50" textAnchor="middle" className="dg-label">Funders</text>
        <text x="125" y="76" textAnchor="middle" className="dg-label dg-label--small">Grants · Concessional loans</text>
        <text x="125" y="98" textAnchor="middle" className="dg-label dg-label--small">Results-based finance</text>
        <text x="125" y="120" textAnchor="middle" className="dg-label dg-label--small">Carbon finance</text>
        {/* capital arrow */}
        <line x1="240" y1="70" x2="397" y2="70" className="dg-line" markerEnd="url(#cesa-arrow)" />
        <text x="318" y="60" textAnchor="middle" className="dg-label dg-label--small">1 Capital</text>
        {/* Ignis */}
        <rect x="400" y="20" width="370" height="130" rx="14" className="dg-box dg-box--primary" />
        <text x="585" y="56" textAnchor="middle" className="dg-label dg-label--on-primary">Ignis</text>
        <text x="585" y="86" textAnchor="middle" className="dg-label dg-label--small dg-label--on-primary">Structures, installs, operates</text>
        <text x="585" y="110" textAnchor="middle" className="dg-label dg-label--small dg-label--on-primary">and monitors via CleanCookIQ</text>
        {/* install arrow */}
        <line x1="585" y1="150" x2="585" y2="227" className="dg-line" markerEnd="url(#cesa-arrow)" />
        <text x="595" y="195" className="dg-label dg-label--small">2 Steam system installed</text>
        {/* institution */}
        <rect x="400" y="230" width="370" height="110" rx="14" className="dg-box" />
        <text x="585" y="270" textAnchor="middle" className="dg-label">Institution</text>
        <text x="585" y="298" textAnchor="middle" className="dg-label dg-label--small">Existing fuel budget</text>
        {/* payment arrow back */}
        <line x1="400" y1="285" x2="243" y2="285" className="dg-line" markerEnd="url(#cesa-arrow)" />
        <text x="320" y="270" textAnchor="middle" className="dg-label dg-label--small">3 Service payment</text>
        <text x="320" y="306" textAnchor="middle" className="dg-label dg-label--small">(CESA)</text>
        {/* repayment */}
        <rect x="10" y="230" width="230" height="110" rx="14" className="dg-band" />
        <text x="125" y="275" textAnchor="middle" className="dg-label">4 Repayment</text>
        <text x="125" y="301" textAnchor="middle" className="dg-label dg-label--small">flows back to funders</text>
        <line x1="125" y1="230" x2="125" y2="153" className="dg-line" markerEnd="url(#cesa-arrow)" />
      </svg>
    </figure>
  );
}

function Section({ id, n, title, children }) {
  return (
    <section id={id} className="section section--tight">
      <div className="wrap prose">
        <Reveal>
          <h2><span className="section-n" aria-hidden="true">{n}</span> {title}</h2>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export default function Financing() {
  useSeo(seoFor('/financing'));
  return (
    <>
      <PageHero
        eyebrow="Financing"
        image={HERO['financing'].src}
        imageAlt={HERO['financing'].alt}
        segments={['Financing the transition from the energy budget', { text: 'you already have.', className: 'serif grad-flame' }]}
        sub="Institutional clean cooking requires capital for equipment, installation and implementation. Ignis works to structure financing so that the institution's transition can be repaid over time through a service arrangement linked to the energy expenditure it already carries."
      />
      <section className="section section--tight">
        <div className="wrap prose">
          <p className="lead">
            The exact structure depends on the institution, the project economics, the capital
            source and the programme design. Where applicable, capital may combine grants,
            concessional finance, results-based mechanisms or carbon-related finance. Availability
            and terms are assessed project by project.
          </p>
        </div>
      </section>

      <Section id="why-financing" n="1" title="Why financing is needed">
        <p>Clean-cooking equipment still requires capital.</p>
        {/* TODO(content): expand "Why financing is needed". */}
        <TodoPlaceholder />
      </Section>

      <Section id="service-model" n="2" title="What changes under a service model">
        <p>The institution does not necessarily fund all capital upfront.</p>
        {/* TODO(content): expand "What changes under a service model". */}
        <TodoPlaceholder />
      </Section>

      <Section id="capital-sources" n="3" title="Where capital may come from">
        {/* TODO(confirm): list only the financing sources Ignis can actually access (decision D1). */}
        <TodoPlaceholder>The sources listed here are being confirmed.</TodoPlaceholder>
      </Section>

      <Section id="how-cesa-works" n="4" title="How the CESA works">
        <p>Capital, installation, service payment, repayment.</p>
        <CesaDiagram />
        {/* TODO(content): CESA explanation text. */}
      </Section>

      <Section id="economics" n="5" title="What determines the economics">
        <ul className="tick-list">
          <li>Fuel baseline</li>
          <li>Meal volume</li>
          <li>System design</li>
          <li>Contract term</li>
          <li>Capital cost</li>
          <li>Operating performance</li>
        </ul>
        {/* TODO(content): one line on each factor. */}
      </Section>

      <Section id="for-financiers" n="6" title="What financiers receive">
        <ul className="tick-list">
          <li>Validated demand</li>
          <li>Project economics</li>
          <li>Portfolio data</li>
          <li>Performance evidence</li>
        </ul>
        {/* TODO(content): one line on each deliverable. */}
      </Section>

      <section className="section">
        <div className="wrap">
          <div className="closing-cta">
            <h2>Talk to us about financing.</h2>
            <div className="btn-row btn-row--center">
              {/* The ONLY place on the site "Discuss a Programme" is allowed. */}
              <Button to="/talk-to-ignis?role=development-partner#partner" variant="primary">Discuss a Programme</Button>
              <PartnerButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
