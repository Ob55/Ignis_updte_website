// Numbered step flow: horizontal on desktop, a vertical timeline on mobile (CSS).
// Every step shows its one-line explanation beneath the label, so the whole
// journey reads at a glance. When wrapped in <Reveal>, the nodes, connectors and
// text animate in step by step (see .stepper rules in styles/components.css).
export function Stepper({ steps, label }) {
  return (
    <ol className="stepper" aria-label={label}>
      {steps.map((s) => (
        <li key={s.n} className="stepper-step">
          <div className="stepper-head">
            <span className="stepper-n" aria-hidden="true">{s.n}</span>
            <h3 className="stepper-label">{s.label}</h3>
          </div>
          <p className="stepper-text">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
