/**
 * Client dashboard mock data.
 *
 * PLACEHOLDER — no real company, figure or document is represented here.
 */

export const account = {
  company: "Northwind Systems",
  asOf: "August 27, 2026",
  arr: 6_420_000,
  arrChange: 4.1,
  netBurn: 214_000,
  burnChange: -8.3,
  runwayMonths: 19,
  headcount: 94,
  headcountPlan: 98,
  lead: "Daniel Okonkwo",
  closeDays: 6,
} as const;

export const views = [
  { name: "Company", active: true },
  { name: "Sales" },
  { name: "Engineering" },
  { name: "Marketing" },
  { name: "G&A" },
] as const;

export const kpis = [
  { name: "ARR", value: "$6.42M", delta: 4.1, good: true, note: "vs last month" },
  { name: "Net burn", value: "$214K", delta: -8.3, good: true, note: "monthly" },
  { name: "Runway", value: "19 mo", delta: 1.0, good: true, note: "at current burn" },
  { name: "Burn multiple", value: "1.3×", delta: -0.2, good: true, note: "trailing quarter" },
] as const;

export const spend = [
  { dept: "Engineering", budget: 986_000, actual: 942_000 },
  { dept: "Sales", budget: 704_000, actual: 771_000 },
  { dept: "Marketing", budget: 312_000, actual: 358_000 },
  { dept: "Customer Success", budget: 268_000, actual: 251_000 },
  { dept: "G&A", budget: 244_000, actual: 259_000 },
] as const;

export const activity = [
  { date: "Aug 26", label: "August close completed", detail: "6 days · on calendar", tone: "credit" },
  { date: "Aug 22", label: "Q3 re-forecast published", detail: "ARR raised 2.4%", tone: "credit" },
  { date: "Aug 14", label: "Marketing variance flagged", detail: "+$46K over plan", tone: "debit" },
  { date: "Aug 04", label: "Board pack circulated", detail: "72h before meeting", tone: "neutral" },
  { date: "Jul 29", label: "Headcount plan updated", detail: "2 reqs deferred to Q4", tone: "neutral" },
] as const;

export const documents = [
  { name: "Q3 2026 Board Pack", date: "Aug 04, 2026", kind: "PDF · 3.1 MB" },
  { name: "FY26 Operating Model v14", date: "Aug 22, 2026", kind: "XLSX · 4.8 MB" },
  { name: "August Close Checklist", date: "Aug 26, 2026", kind: "PDF · 220 KB" },
  { name: "Metric Definitions v3", date: "Jun 11, 2026", kind: "PDF · 180 KB" },
] as const;

/** Twenty-four months of ARR, ending at the current figure. */
export const arrSeries = (() => {
  const n = 24;
  const start = 3_180_000;
  const growth = Math.pow(account.arr / start, 1 / (n - 1));
  const wobble = [0, .01, -.014, .006, .02, -.011, .003, .015, -.022, .008, .017,
    -.006, .012, .004, -.018, .014, .007, .019, -.009, .005, .011, -.004, .008, 0];
  return Array.from({ length: n }, (_, i) =>
    Math.round(start * Math.pow(growth, i) * (1 + wobble[i])));
})();
