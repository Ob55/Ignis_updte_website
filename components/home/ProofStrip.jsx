import { Link } from "react-router-dom";
import { SHOW_PROOF_STRIP } from "@/content/flags";
import { selectProofMetrics, formatProofValue } from "@/content/proof";
import { ProofByProject } from "@/components/home/ProofByProject";

// Block 9: Proof in numbers. HIDDEN BY DEFAULT.
// Both gates must pass: SHOW_PROOF_STRIP is true AND at least three metrics in
// content/proof.js are verified (value + definition + asOf). At most four show,
// mixing pipeline / delivery / impact. Every number carries its definition and
// "As of" date as a numbered footnote (also exposed as a hover title).
// While the strip is hidden, the "proof by project" slot renders instead
// (itself empty until partner approvals exist).
// TODO(data): verified figures and definitions (decision D3).
export function ProofStrip() {
  const shown = SHOW_PROOF_STRIP ? selectProofMetrics() : [];
  if (shown.length === 0) return <ProofByProject />;

  return (
    <section id="proof" className="proof-strip on-dark">
      <div className="wrap">
        <h2>Proof in numbers.</h2>
        <dl className="proof-grid">
          {shown.map((m, i) => (
            <div key={m.key} className="proof-item">
              <dd className="proof-n" title={`${m.definition} As of ${m.asOf}.`}>
                {formatProofValue(m.value, m.unit)}
                <sup><a href={`#proof-def-${m.key}`} aria-label={`Definition ${i + 1}`}>{i + 1}</a></sup>
              </dd>
              <dt className="proof-l">{m.label}</dt>
            </div>
          ))}
        </dl>
        <ol className="proof-defs">
          {shown.map((m) => (
            <li key={m.key} id={`proof-def-${m.key}`}>
              {m.definition} As of {m.asOf}.
            </li>
          ))}
        </ol>
        <p className="proof-foot">
          <Link to="/our-work/methodology">How we measure</Link>
        </p>
      </div>
    </section>
  );
}
