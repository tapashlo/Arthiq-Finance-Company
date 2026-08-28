/**
 * Client portal mock data.
 *
 * PLACEHOLDER — no real account, holding, price or return is represented here.
 * Every figure is invented for a design demonstration.
 */

export const account = {
  household: "Whitmore Family",
  asOf: "August 27, 2026",
  totalValue: 4_182_640,
  dayChange: 12_418,
  dayChangePct: 0.298,
  ytdPct: 9.42,
  inceptionPct: 8.71,
  inceptionYear: 2021,
  harvestedYtd: 38_920,
  adviser: "Daniel Okonkwo, CFP®",
} as const;

export const accounts = [
  { name: "All accounts", value: 4_182_640, active: true },
  { name: "Joint taxable", value: 2_318_400 },
  { name: "R. Whitmore IRA", value: 1_046_190 },
  { name: "J. Whitmore Roth", value: 512_050 },
  { name: "Donor-advised fund", value: 306_000 },
] as const;

export const allocation = [
  { name: "US equity", target: 42, actual: 43.4, color: "#15543c" },
  { name: "International equity", target: 22, actual: 21.1, color: "#2a8a62" },
  { name: "Fixed income", target: 24, actual: 23.2, color: "#7f9a8b" },
  { name: "Real assets", target: 7, actual: 7.4, color: "#b08a3e" },
  { name: "Cash", target: 5, actual: 4.9, color: "#c3d2c8" },
] as const;

export const holdings = [
  { ticker: "VTI", name: "US Total Market Index", weight: 28.4, value: 1_187_870, change: 14.2 },
  { ticker: "DIRX", name: "Direct Index — US Large Cap", weight: 15.0, value: 627_400, change: 13.8 },
  { ticker: "VXUS", name: "Total International Index", weight: 21.1, value: 882_540, change: 7.9 },
  { ticker: "MUB", name: "Municipal Bond Index", weight: 14.8, value: 619_030, change: 3.1 },
  { ticker: "VGIT", name: "Intermediate Treasury Index", weight: 8.4, value: 351_340, change: 2.4 },
  { ticker: "VNQ", name: "Real Estate Index", weight: 4.2, value: 175_670, change: -1.8 },
  { ticker: "PDBC", name: "Diversified Commodity", weight: 3.2, value: 133_840, change: 5.6 },
  { ticker: "SPAXX", name: "Government Money Market", weight: 4.9, value: 204_950, change: 4.4 },
] as const;

export const activity = [
  { date: "Aug 26", label: "Tax-loss harvest — VXUS to IXUS", detail: "Realized loss $4,180", tone: "neutral" },
  { date: "Aug 19", label: "Dividend received", detail: "+$6,240", tone: "credit" },
  { date: "Aug 12", label: "Rebalance — US equity band breach", detail: "3 trades", tone: "neutral" },
  { date: "Aug 01", label: "Contribution — joint taxable", detail: "+$25,000", tone: "credit" },
  { date: "Jul 15", label: "Advisory fee — Q3", detail: "−$6,796", tone: "debit" },
] as const;

export const documents = [
  { name: "Q2 2026 Performance Report", date: "Jul 12, 2026", kind: "PDF · 1.2 MB" },
  { name: "2026 Tax Planning Memo", date: "Jun 28, 2026", kind: "PDF · 640 KB" },
  { name: "Roth Conversion Schedule 2026–2031", date: "May 04, 2026", kind: "PDF · 380 KB" },
  { name: "2025 Form 1099 Composite", date: "Feb 14, 2026", kind: "PDF · 2.1 MB" },
] as const;

/** Twenty quarters of portfolio value, ending at the current total. */
export const performance = (() => {
  const quarters = 22;
  const start = 2_480_000;
  const growth = Math.pow(account.totalValue / start, 1 / (quarters - 1));
  const wobble = [
    0, 0.012, -0.021, 0.008, 0.026, -0.014, 0.004, 0.019, -0.032, 0.011, 0.022,
    -0.008, 0.015, 0.006, -0.026, 0.018, 0.009, 0.024, -0.011, 0.007, 0.014, 0,
  ];
  return Array.from({ length: quarters }, (_, i) =>
    Math.round(start * Math.pow(growth, i) * (1 + wobble[i])),
  );
})();
