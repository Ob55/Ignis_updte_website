import { sourceById } from "@/content/sources";

// "Share of fuel energy reaching the pot" — THIRD-PARTY figures only, for the
// What We Do page (never the homepage). Horizontal bars on a single 0–100% axis,
// value printed on every bar, category named in text, so nothing relies on colour.
// No Ignis bar: TODO(confirm): Ignis's own measured steam-system efficiency before
// publishing any figure for it.
const BARS = [
  { label: "Open fire (field average)", value: 11, text: "11%", tone: "orange", sourceId: 5 },
  { label: "Open fire (well tended, lab)", value: 25, low: 20, high: 30, text: "20–30%", tone: "orange-light", sourceId: 6 },
  { label: "Improved institutional stove (manufacturer's claim)", value: 62, text: "62%", tone: "emerald", sourceId: 7 },
];

const ARIA =
  "Bar chart: share of fuel energy reaching the pot. Open fire, field average: 11 percent. " +
  "Open fire, well tended, in the lab: 20 to 30 percent. Improved institutional stove, " +
  "manufacturer's claim: 62 percent.";

export function EfficiencyChart() {
  return (
    <figure className="eff-chart">
      <h3 className="eff-title" id="eff-title">Share of fuel energy reaching the pot</h3>
      <div className="eff-plot" role="img" aria-label={ARIA}>
        {BARS.map((b) => (
          <div key={b.label} className="eff-row">
            <span className="eff-label">{b.label}</span>
            <div className="eff-track" title={`${b.label}: ${b.text}`}>
              <span className={`eff-bar eff-bar--${b.tone}`} style={{ width: `${b.value}%` }} />
              {b.low != null && (
                <span className="eff-range" style={{ left: `${b.low}%`, width: `${b.high - b.low}%` }} />
              )}
              <span className="eff-value" style={{ left: `${b.high ?? b.value}%` }}>{b.text}</span>
            </div>
          </div>
        ))}
        <div className="eff-axis" aria-hidden="true">
          {[0, 25, 50, 75, 100].map((t) => <span key={t} style={{ left: `${t}%` }}>{t}%</span>)}
        </div>
      </div>
      <figcaption>
        <p className="eff-caption">
          At 11% efficiency, a kitchen burns about nine times the wood its food actually needs; at
          62%, about 1.6 times. The 62% is a manufacturer&apos;s claim for an improved institutional
          stove, included for comparison only.
        </p>
        <p className="eff-sources">
          Third-party figures, not Ignis measurements. Sources:{" "}
          {BARS.map((b, i) => (
            <span key={b.sourceId}>{i > 0 && " · "}{sourceById[b.sourceId].label}</span>
          ))}
        </p>
      </figcaption>
    </figure>
  );
}
