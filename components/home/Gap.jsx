import { Reveal } from "@/components/motion/Reveal";

// Block 2: The gap — why Ignis exists. Ecosystem diagram: institutional demand
// → Ignis → technology / finance / programme partners, with CleanCookIQ as the
// data layer underneath. Every node carries a text label (not colour alone).
function EcosystemDiagram() {
  return (
    <figure className="diagram">
      <svg
        viewBox="0 0 760 330"
        role="img"
        aria-labelledby="eco-title eco-desc"
        className="diagram-svg"
      >
        <title id="eco-title">How Ignis connects the clean-cooking ecosystem</title>
        <desc id="eco-desc">
          Institutional demand flows to Ignis. Ignis connects it to technology providers,
          finance, and programme partners. CleanCookIQ sits underneath all of them as the data layer.
        </desc>
        <defs>
          <marker id="eco-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#14140f" />
          </marker>
        </defs>
        {/* demand */}
        <rect x="10" y="95" width="190" height="80" rx="14" className="dg-box" />
        <text x="105" y="130" className="dg-label" textAnchor="middle">Institutional</text>
        <text x="105" y="154" className="dg-label" textAnchor="middle">demand</text>
        <line x1="200" y1="135" x2="282" y2="135" className="dg-line" markerEnd="url(#eco-arrow)" />
        {/* Ignis */}
        <rect x="285" y="85" width="170" height="100" rx="16" className="dg-box dg-box--primary" />
        <text x="370" y="143" className="dg-label dg-label--on-primary" textAnchor="middle">Ignis</text>
        {/* partners */}
        <line x1="455" y1="120" x2="537" y2="47" className="dg-line" markerEnd="url(#eco-arrow)" />
        <line x1="455" y1="135" x2="537" y2="135" className="dg-line" markerEnd="url(#eco-arrow)" />
        <line x1="455" y1="150" x2="537" y2="222" className="dg-line" markerEnd="url(#eco-arrow)" />
        <rect x="540" y="15" width="210" height="62" rx="12" className="dg-box" />
        <text x="645" y="52" className="dg-label" textAnchor="middle">Technology</text>
        <rect x="540" y="104" width="210" height="62" rx="12" className="dg-box" />
        <text x="645" y="141" className="dg-label" textAnchor="middle">Finance</text>
        <rect x="540" y="193" width="210" height="62" rx="12" className="dg-box" />
        <text x="645" y="230" className="dg-label" textAnchor="middle">Programme partners</text>
        {/* data layer */}
        <rect x="10" y="272" width="740" height="48" rx="12" className="dg-band" />
        <text x="380" y="302" className="dg-label dg-label--small" textAnchor="middle">
          CleanCookIQ: the data layer underneath
        </text>
      </svg>
    </figure>
  );
}

export function Gap() {
  return (
    <section id="gap" className="section">
      <div className="wrap split">
        <Reveal className="section-head">
          <h2>The gap isn&apos;t the technology. It&apos;s the connection.</h2>
          <p>
            Institutions need cleaner, more affordable ways to cook. Technology providers need
            qualified institutional demand. Financiers need projects they can assess and support.
            Governments and development partners need reliable data on where the need exists,
            what solutions fit, and what happens after deployment.
          </p>
          <p>
            Ignis connects these pieces. We validate demand, structure projects, connect them to
            technology and financing, support implementation and measure the results.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <EcosystemDiagram />
        </Reveal>
      </div>
    </section>
  );
}
