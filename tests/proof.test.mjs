// Run with: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { formatProofValue, selectProofMetrics, PROOF_METRICS } from "../content/proof.js";

test("display formatter never rounds up", () => {
  assert.equal(formatProofValue(312), "300+");
  assert.equal(formatProofValue(298), "298"); // never "300+"
  assert.equal(formatProofValue(300), "300");
  assert.equal(formatProofValue(99), "99");
  assert.equal(formatProofValue(4250), "4,000+");
  assert.equal(formatProofValue(1950), "1,950");
  assert.equal(formatProofValue(55.9, "%"), "55%");
  // exhaustive: the shown number never exceeds the real value
  for (let n = 1; n <= 20000; n++) {
    const shown = Number(formatProofValue(n).replace(/[^0-9]/g, ""));
    assert.ok(shown <= n, `${n} displayed as ${formatProofValue(n)}`);
  }
});

const m = (key, type, extra = {}) => ({ key, label: key, type, value: 10, definition: "d", asOf: "May 2027", verified: true, ...extra });

test("strip hidden until three metrics are verified", () => {
  assert.deepEqual(selectProofMetrics(PROOF_METRICS), []); // shipped data: nothing verified
  assert.deepEqual(selectProofMetrics([m("a", "pipeline"), m("b", "delivery")]), []);
  assert.equal(selectProofMetrics([m("a", "pipeline"), m("b", "delivery"), m("c", "impact")]).length, 3);
});

test("unverified, null or undefined-definition metrics never count", () => {
  const set = [m("a", "pipeline"), m("b", "delivery"), m("c", "impact", { verified: false }),
    m("d", "impact", { value: null }), m("e", "impact", { definition: null }), m("f", "impact", { value: 0 })];
  assert.deepEqual(selectProofMetrics(set), []);
});

test("at most four, mixing types rather than only pipeline", () => {
  const set = [m("p1", "pipeline"), m("p2", "pipeline"), m("p3", "pipeline"), m("p4", "pipeline"),
    m("d1", "delivery"), m("i1", "impact")];
  const keys = selectProofMetrics(set).map((x) => x.key);
  assert.equal(keys.length, 4);
  assert.ok(keys.includes("d1") && keys.includes("i1"));
});
