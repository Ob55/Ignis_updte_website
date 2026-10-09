// Block 9 "Proof in numbers": the full metric set.
// Each metric: key, label, type ("pipeline" | "delivery" | "impact"), value
// (null until verified), definition (one line, rendered as a footnote), asOf
// ("[month, year]"), source (INTERNAL NOTE ONLY — never rendered), verified.
// Never enter an estimate. A metric renders only when verified === true AND it
// has a value, a definition and an asOf date (see publishable() below).
export const PROOF_METRICS = [
  {
    key: "institutionsVerified",
    label: "Institutions mapped and verified",
    type: "pipeline",
    value: null, definition: null, asOf: null, verified: false, // TODO(data)
    source: "CleanCookIQ records; Taita-Taveta verification",
  },
  {
    key: "countiesEngaged",
    label: "Counties engaged (with signed MoUs)",
    type: "pipeline",
    value: null, definition: null, asOf: null, verified: false,
    // TODO(confirm): signed status of each county MoU (e.g. Makueni) before counting it.
    source: "County MoUs, e.g. Makueni",
  },
  {
    key: "programmesDelivered",
    label: "Programmes delivered with partners",
    type: "pipeline",
    value: null, definition: null, asOf: null, verified: false,
    // TODO(partner-approval): IRENA / A2CT approval before counting Taita-Taveta publicly.
    source: "IRENA / A2CT Taita-Taveta",
  },
  {
    key: "systemsOperating",
    label: "Systems installed and operating",
    type: "delivery",
    value: null, definition: null, asOf: null, verified: false, // TODO(data)
    source: "Deployment records",
  },
  {
    key: "mealsDaily",
    label: "Meals cooked daily on Ignis systems",
    type: "delivery",
    value: null, definition: null, asOf: null, verified: false, // TODO(data)
    source: "Site monitoring",
  },
  {
    key: "firewoodDisplaced",
    label: "Firewood displaced (tonnes a year)",
    type: "impact",
    value: null, definition: null, asOf: null, verified: false, // TODO(data)
    source: "Monitoring, baseline surveys",
  },
  {
    key: "fuelCostSaving",
    label: "Average fuel-cost saving (%)",
    type: "impact",
    unit: "%",
    value: null, definition: null, asOf: null, verified: false, // TODO(data)
    source: "Monitoring against baseline",
  },
];

export const MIN_VERIFIED = 3; // the strip stays hidden below this
export const MAX_SHOWN = 4;

export const publishable = (m) =>
  m.verified === true &&
  typeof m.value === "number" && Number.isFinite(m.value) && m.value > 0 &&
  Boolean(m.definition) && Boolean(m.asOf);

// Pick up to MAX_SHOWN publishable metrics, preferring a mix of types: take one
// of each type in turn (pipeline → delivery → impact), in data order, until full.
// Returns [] unless at least MIN_VERIFIED metrics are publishable.
export function selectProofMetrics(metrics = PROOF_METRICS) {
  const ok = metrics.filter(publishable);
  if (ok.length < MIN_VERIFIED) return [];
  const queues = ["pipeline", "delivery", "impact"].map((t) => ok.filter((m) => m.type === t));
  const picked = [];
  while (picked.length < MAX_SHOWN && queues.some((q) => q.length)) {
    for (const q of queues) {
      if (q.length && picked.length < MAX_SHOWN) picked.push(q.shift());
    }
  }
  // keep the data order on screen
  return metrics.filter((m) => picked.includes(m));
}

// Honest display formatting. NEVER rounds up.
// "300+"-style compaction is used only when the value sits just above a round
// hundred (within 10%), so the "+" form is both rounded DOWN and close:
//   312 → "300+"   (300 ≤ 312, and 312 is within 10% of 300)
//   298 → "298"    (rounding down to "200+" would understate by a third,
//                   and "300+" would be rounding UP — so show it exactly)
//   300 → "300"    (exact round numbers are shown as is)
// Percentages are floored to a whole number: 55.9 → "55%".
// Tested in scripts/proof.test.mjs (npm test).
export function formatProofValue(value, unit) {
  if (unit === "%") return `${Math.floor(value)}%`;
  const n = Math.floor(value);
  if (n < 100) return n.toLocaleString("en-KE");
  const step = 10 ** (String(n).length - 1); // 312 → 100, 4,250 → 1,000
  const base = Math.floor(n / step) * step;
  if (base === n) return n.toLocaleString("en-KE");
  if ((n - base) / n <= 0.1) return `${base.toLocaleString("en-KE")}+`;
  return n.toLocaleString("en-KE");
}
