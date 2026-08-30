import { project, allScenarios, sanitise, DEFAULTS, HORIZON, type Assumptions } from "../src/lib/model.ts";

let failures = 0;
const fail = (m: string) => { console.log("  FAIL " + m); failures++; };

// Deterministic pseudo-random assumption sets, including nasty ones.
function lcg(seed: number) { let s = seed; return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296; }
const rnd = lcg(20260830);
const pick = (lo: number, hi: number) => lo + rnd() * (hi - lo);

const cases: Assumptions[] = [DEFAULTS];
for (let i = 0; i < 400; i++) {
  cases.push({
    startingMrr: pick(0, 3_000_000),
    growthRate: pick(0, 0.5),
    churnRate: pick(0, 0.4),
    expansionRate: pick(0, 0.15),
    grossMargin: pick(-0.2, 0.98),
    headcount: Math.round(pick(0, 800)),
    hiresPerMonth: pick(-3, 25),
    avgSalary: pick(0, 600_000),
    otherOpex: pick(0, 2_000_000),
    salesMarketingPct: pick(0, 2),
    startingCash: pick(0, 200_000_000),
    dso: pick(0, 200),
    dpo: pick(0, 200),
    annualPrepayShare: pick(0, 1),
    acv: pick(1, 500_000),
  });
}
// Degenerate cases that should not explode.
cases.push({ ...DEFAULTS, startingMrr: 0, growthRate: 0, churnRate: 0, expansionRate: 0 });
cases.push({ ...DEFAULTS, churnRate: 0, expansionRate: 0, acv: 1 });
cases.push({ ...DEFAULTS, startingCash: 0, salesMarketingPct: 0, otherOpex: 0, headcount: 0 });
cases.push({ ...DEFAULTS, growthRate: 1, churnRate: 0.9, grossMargin: -1 });
cases.push({ ...DEFAULTS, dso: 0, dpo: 0, annualPrepayShare: 0 });
cases.push({ ...DEFAULTS, hiresPerMonth: -3 });

console.log(`Checking ${cases.length} assumption sets x ${HORIZON} months`);

const EPS = 1e-6;
let worstImbalance = 0;
let worstBridge = 0;

for (const [ci, c] of cases.entries()) {
  const { months, metrics } = project(c);
  const a = sanitise(c);
  if (months.length !== HORIZON) fail(`case ${ci}: wrong month count`);

  let priorCash = a.startingCash;
  for (const m of months) {
    // 1. The balance sheet balances.
    const imbalance = Math.abs(m.totalAssets - (m.totalLiabilities + m.totalEquity));
    const scale = Math.max(1, Math.abs(m.totalAssets));
    worstImbalance = Math.max(worstImbalance, imbalance / scale);
    if (imbalance / scale > EPS) {
      fail(`case ${ci} month ${m.i}: assets ${m.totalAssets} != L+E ${m.totalLiabilities + m.totalEquity}`);
    }

    // 2. Assets and liabilities are the sum of their parts.
    if (Math.abs(m.totalAssets - (m.cash + m.accountsReceivable)) > EPS * scale) fail(`case ${ci} m${m.i}: assets components`);
    if (Math.abs(m.totalLiabilities - (m.accountsPayable + m.deferredRevenue)) > EPS * scale) fail(`case ${ci} m${m.i}: liability components`);
    if (Math.abs(m.totalEquity - (m.paidInCapital + m.retainedEarnings)) > EPS * scale) fail(`case ${ci} m${m.i}: equity components`);

    // 3. The cash flow bridge explains the change in cash exactly.
    const bridge = m.netIncome - m.changeInAr + m.changeInAp + m.changeInDeferred;
    const bridgeErr = Math.abs(bridge - m.netCashFlow);
    worstBridge = Math.max(worstBridge, bridgeErr / Math.max(1, Math.abs(m.netCashFlow)));
    if (bridgeErr > EPS * Math.max(1, Math.abs(m.netCashFlow))) fail(`case ${ci} m${m.i}: bridge`);
    if (Math.abs(m.cash - (priorCash + m.netCashFlow)) > EPS * Math.max(1, Math.abs(m.cash))) fail(`case ${ci} m${m.i}: cash roll-forward`);
    priorCash = m.cash;

    // 4. P&L internal consistency.
    if (Math.abs(m.grossProfit - (m.revenue - m.cogs)) > EPS * scale) fail(`case ${ci} m${m.i}: gross profit`);
    if (Math.abs(m.totalOpex - (m.personnel + m.salesMarketing + m.otherOpex)) > EPS * scale) fail(`case ${ci} m${m.i}: opex sum`);
    if (Math.abs(m.ebitda - (m.grossProfit - m.totalOpex)) > EPS * scale) fail(`case ${ci} m${m.i}: ebitda`);
    if (m.netIncome !== m.ebitda) fail(`case ${ci} m${m.i}: net income should equal ebitda`);

    // 5. Revenue build ties.
    const mrrTie = m.openingMrr + m.newMrr + m.expansionMrr - m.churnedMrr;
    if (m.mrr > 0 && Math.abs(m.mrr - mrrTie) > EPS * Math.max(1, m.mrr)) fail(`case ${ci} m${m.i}: mrr build`);
    if (Math.abs(m.arr - m.mrr * 12) > EPS * Math.max(1, m.arr)) fail(`case ${ci} m${m.i}: arr`);

    // 6. Nothing is NaN.
    for (const [k, v] of Object.entries(m)) {
      if (typeof v === "number" && Number.isNaN(v)) fail(`case ${ci} m${m.i}: ${k} is NaN`);
    }
    if (m.mrr < 0) fail(`case ${ci} m${m.i}: negative MRR`);
    if (m.headcount < 0 && a.hiresPerMonth >= 0) fail(`case ${ci} m${m.i}: negative headcount`);
  }

  for (const [k, v] of Object.entries(metrics)) {
    if (typeof v === "number" && Number.isNaN(v)) fail(`case ${ci}: metric ${k} is NaN`);
  }

  // 7. Runway agrees with the cash curve.
  const firstNeg = months.find((m) => m.cash < 0);
  if (firstNeg && !Number.isFinite(metrics.runwayMonths)) fail(`case ${ci}: cash goes negative but runway is Infinity`);
  if (!firstNeg && Number.isFinite(metrics.runwayMonths)) fail(`case ${ci}: cash never negative but runway is finite`);
  if (firstNeg && metrics.cashOutDate?.getTime() !== firstNeg.date.getTime()) fail(`case ${ci}: cash-out date mismatch`);
  if (Number.isFinite(metrics.runwayMonths)) {
    if (metrics.runwayMonths < 0 || metrics.runwayMonths > HORIZON) fail(`case ${ci}: runway ${metrics.runwayMonths} out of range`);
  }
}

// 8. Scenarios are ordered: downside never ends with more cash than upside.
for (const c of cases.slice(0, 60)) {
  const [down, base, up] = allScenarios(c).map((s) => s.projection.metrics.endingArr);
  if (!(down <= base + 1e-6 && base <= up + 1e-6)) fail(`scenario ordering: ${down} ${base} ${up}`);
}

// 9. Determinism: same inputs, same output.
const start = new Date(Date.UTC(2026, 7, 1));
if (JSON.stringify(project(DEFAULTS, start)) !== JSON.stringify(project(DEFAULTS, start))) fail("not deterministic");

console.log(`  worst relative balance-sheet imbalance: ${worstImbalance.toExponential(2)}`);
console.log(`  worst relative cash-bridge error:       ${worstBridge.toExponential(2)}`);

// Readout on the defaults, so the headline numbers are eyeballed too.
const d = project(DEFAULTS, start);
const m = d.metrics;
console.log("\nDefaults:");
console.log(`  ending ARR      ${(m.endingArr / 1e6).toFixed(2)}M   (from ${(m.startingArr / 1e6).toFixed(2)}M)`);
console.log(`  12-mo growth    ${(m.arrGrowth * 100).toFixed(0)}%`);
console.log(`  runway          ${Number.isFinite(m.runwayMonths) ? m.runwayMonths.toFixed(1) + " mo" : "24+ mo"}`);
console.log(`  ending cash     ${(m.endingCash / 1e6).toFixed(2)}M`);
console.log(`  burn multiple   ${m.burnMultiple.toFixed(2)}`);
console.log(`  CAC             $${Math.round(m.cac).toLocaleString()}`);
console.log(`  CAC payback     ${m.cacPayback.toFixed(1)} mo`);
console.log(`  LTV/CAC         ${m.ltvToCac.toFixed(1)}x`);
console.log(`  NRR             ${(m.nrr * 100).toFixed(0)}%`);
console.log(`  rule of 40      ${m.ruleOf40.toFixed(0)}`);
console.log(`  magic number    ${m.magicNumber.toFixed(2)}`);
console.log(`  breakeven       ${m.breakevenMonth ? m.breakevenMonth.label : "not within 24 months"}`);
console.log(`  ending HC       ${m.endingHeadcount}`);

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
