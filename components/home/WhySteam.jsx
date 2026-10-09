import { Reveal } from "@/components/motion/Reveal";

// Block 7: why steam can use less fuel. No efficiency percentages on the homepage.
// TODO(confirm): Ignis-specific efficiency figure and the "around half"
// operating-cost claim before publishing any number here.
export const STEAM_CALLOUTS = [
  "Enclosed, insulated generator.",
  "One heat source for the whole kitchen.",
  "Indirect heating in jacketed kettles.",
];

// Firewood → enclosed generator → steam line → jacketed vessels → food, with the
// three numbered callouts. Every stage is labelled in text.
export function SteamDiagram() {
  const stages = [
    { x: 10, label: ["Firewood"] },
    { x: 165, label: ["Enclosed", "generator"], n: 1 },
    { x: 320, label: ["Steam line"], n: 2 },
    { x: 475, label: ["Jacketed", "vessels"], n: 3 },
    { x: 630, label: ["Food"] },
  ];
  return (
    <figure className="diagram">
      <svg viewBox="0 0 760 190" role="img" aria-labelledby="steam-title steam-desc" className="diagram-svg">
        <title id="steam-title">How a centralised steam kitchen works</title>
        <desc id="steam-desc">
          Firewood feeds an enclosed, insulated generator (callout 1). One heat source sends steam
          along a steam line to the whole kitchen (callout 2). Jacketed vessels heat food indirectly
          (callout 3), and the food is cooked.
        </desc>
        <defs>
          <marker id="steam-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#14140f" />
          </marker>
        </defs>
        {stages.map((s, i) => (
          <g key={s.x}>
            <rect x={s.x} y="60" width="120" height="80" rx="12" className={`dg-box${s.n ? " dg-box--primary" : ""}`} />
            {s.label.map((t, j) => (
              <text
                key={t}
                x={s.x + 60}
                y={s.label.length === 1 ? 105 : 96 + j * 22}
                textAnchor="middle"
                className={`dg-label${s.n ? " dg-label--on-primary" : ""}`}
              >
                {t}
              </text>
            ))}
            {s.n && (
              <g>
                <circle cx={s.x + 60} cy="30" r="17" className="dg-callout" />
                <text x={s.x + 60} y="36" textAnchor="middle" className="dg-callout-n">{s.n}</text>
              </g>
            )}
            {i < stages.length - 1 && (
              <line x1={s.x + 120} y1="100" x2={s.x + 153} y2="100" className="dg-line" markerEnd="url(#steam-arrow)" />
            )}
          </g>
        ))}
      </svg>
      <figcaption>
        <ol className="callout-list">
          {STEAM_CALLOUTS.map((c, i) => (
            <li key={c}><span className="callout-n" aria-hidden="true">{i + 1}</span>{c}</li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}

export function WhySteam() {
  return (
    <section id="why-steam" className="section">
      <div className="wrap split">
        <Reveal className="section-head">
          <h2>Why can steam use less fuel?</h2>
          <p>
            An open fire sends a large share of its heat into the surrounding air. A centralised
            steam system contains combustion in an enclosed generator and transfers heat through
            steam to the cooking vessels. One heat source can serve several cooking points, and
            indirect heating delivers heat evenly through the vessel walls. More of the energy
            bought as fuel goes into cooking rather than being lost around the kitchen.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <SteamDiagram />
        </Reveal>
      </div>
    </section>
  );
}
