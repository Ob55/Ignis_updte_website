// Reusable programme journey: horizontal on desktop, vertical on mobile.
// Each step has a status, shown by colour AND a text label, with a legend:
//   completed → Emerald fill, white text   ("Completed")
//   proposed  → Orange fill, DARK text     ("Proposed next step") — never white on orange
//   future    → light grey, dark outline, dark text ("Future phase")
export const STEP_STATUS = {
  completed: "Completed",
  proposed: "Proposed next step",
  future: "Future phase",
};

export function ProgrammeJourney({ steps, title = "Programme journey" }) {
  const used = Object.keys(STEP_STATUS).filter((s) => steps.some((st) => st.status === s));
  return (
    <figure className="journey">
      <figcaption className="journey-title">{title}</figcaption>
      <ul className="journey-legend" aria-label="Legend">
        {used.map((s) => (
          <li key={s}><span className={`journey-swatch journey-swatch--${s}`} aria-hidden="true" />{STEP_STATUS[s]}</li>
        ))}
      </ul>
      <ol className="journey-steps">
        {steps.map((st, i) => (
          <li key={st.label} className={`journey-step journey-step--${st.status}`}>
            <span className="journey-n" aria-hidden="true">{i + 1}</span>
            <span className="journey-label">{st.label}</span>
            <span className="journey-status">{STEP_STATUS[st.status]}</span>
          </li>
        ))}
      </ol>
    </figure>
  );
}
