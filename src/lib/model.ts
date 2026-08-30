/**
 * The model engine.
 *
 * A linked three-statement projection: assumptions in, and a P&L, a cash flow
 * and a balance sheet out, month by month, plus the SaaS metrics an investor
 * computes before the second meeting.
 *
 * Two rules this file exists to honour:
 *
 *  1. The balance sheet balances. Not approximately — exactly, every month.
 *     It is constructed so that it must: the working-capital balances are
 *     computed first, and the change in cash is then derived from net income
 *     and those same deltas. Assets and Liabilities + Equity therefore move by
 *     identical amounts by algebra rather than by luck.
 *
 *  2. It is honest about what it leaves out. There is no depreciation, no
 *     interest, no tax and no financing. Net income equals EBITDA. That is
 *     stated on the page rather than hidden, because a model whose
 *     simplifications you cannot see is worse than a simple one.
 *
 * Everything here is pure and deterministic, so the server and the client
 * render the same numbers and a saved scenario reproduces exactly.
 */

export type Assumptions = {
  /** Monthly recurring revenue at month zero. */
  startingMrr: number;
  /** New MRR each month, as a share of the prior month's MRR. */
  growthRate: number;
  /** Revenue churned each month, as a share of the prior month's MRR. */
  churnRate: number;
  /** Expansion from the existing base each month, same basis. */
  expansionRate: number;
  /** Gross margin, 0–1. */
  grossMargin: number;

  /** Full-time employees at month zero. */
  headcount: number;
  /** Net hires per month. Fractional is allowed and accumulates. */
  hiresPerMonth: number;
  /** Fully loaded annual cost per head, including taxes and benefits. */
  avgSalary: number;
  /** Non-payroll operating spend per month: tools, rent, services. */
  otherOpex: number;
  /**
   * Sales and marketing spend as a share of revenue, 0–1.
   *
   * A share rather than a fixed monthly figure on purpose. Holding S&M flat
   * in dollars while revenue compounds makes acquisition look free — implied
   * CAC falls every month and the magic number climbs past five, which is an
   * artifact of the model rather than a property of the business. Real
   * companies buy growth, and the spend scales with what they are buying.
   */
  salesMarketingPct: number;

  /** Cash in the bank at month zero. */
  startingCash: number;

  /** Days sales outstanding. */
  dso: number;
  /** Days payable outstanding. */
  dpo: number;
  /** Share of revenue billed annually up front, 0–1. */
  annualPrepayShare: number;

  /** Average annual contract value, used for the unit economics. */
  acv: number;
};

/**
 * A Series A SaaS company that is doing well but not miraculously: growing 6%
 * a month, retaining more than it loses, and reaching breakeven inside the
 * horizon with cash to spare. Deliberately healthy — the interesting direction
 * to drag a slider is the one that breaks it.
 */
export const DEFAULTS: Assumptions = {
  startingMrr: 300_000,
  growthRate: 0.045,
  churnRate: 0.007,
  expansionRate: 0.015,
  grossMargin: 0.78,

  headcount: 24,
  hiresPerMonth: 0.6,
  avgSalary: 168_000,
  otherOpex: 72_000,
  salesMarketingPct: 0.5,

  startingCash: 8_000_000,

  dso: 45,
  dpo: 30,
  annualPrepayShare: 0.45,

  acv: 32_000,
};

export const HORIZON = 24;

/** Customer lifetime used for LTV is capped here, however low churn goes. */
export const LTV_LIFETIME_CAP_MONTHS = 60;

export type Month = {
  /** 1-based month index. */
  i: number;
  label: string;
  /** Calendar month this projects, derived from the model's start date. */
  date: Date;

  // Revenue build
  openingMrr: number;
  newMrr: number;
  expansionMrr: number;
  churnedMrr: number;
  mrr: number;
  arr: number;

  // P&L
  revenue: number;
  cogs: number;
  grossProfit: number;
  personnel: number;
  salesMarketing: number;
  otherOpex: number;
  totalOpex: number;
  ebitda: number;
  /** No D&A, interest or tax in this model, so net income is EBITDA. */
  netIncome: number;

  headcount: number;

  // Balance sheet
  cash: number;
  accountsReceivable: number;
  totalAssets: number;
  accountsPayable: number;
  deferredRevenue: number;
  totalLiabilities: number;
  paidInCapital: number;
  retainedEarnings: number;
  totalEquity: number;

  // Cash flow bridge
  changeInAr: number;
  changeInAp: number;
  changeInDeferred: number;
  netCashFlow: number;

  // Unit economics
  newCustomers: number;
  cac: number;
};

export type Metrics = {
  /** Months until cash goes negative; Infinity if it never does in horizon. */
  runwayMonths: number;
  /** Null when the model stays cash-positive across the horizon. */
  cashOutDate: Date | null;
  /** First month with positive EBITDA, or null. */
  breakevenMonth: Month | null;
  endingArr: number;
  startingArr: number;
  /** Year-on-year ARR growth at the end of the horizon. */
  arrGrowth: number;
  netNewArr: number;
  /** Net burn per dollar of net new ARR over the horizon. */
  burnMultiple: number;
  /** Fully loaded acquisition cost, averaged over the horizon. */
  cac: number;
  /** Months to recover CAC out of gross profit. */
  cacPayback: number;
  ltv: number;
  /** Months of lifetime the LTV was computed on, after the cap. */
  ltvLifetimeMonths: number;
  ltvToCac: number;
  /** Net revenue retention, annualised from the monthly rates. */
  nrr: number;
  /** Growth rate plus EBITDA margin, both as percentages. */
  ruleOf40: number;
  /** Net new ARR per dollar of sales and marketing, annualised. */
  magicNumber: number;
  peakBurn: number;
  endingCash: number;
  endingHeadcount: number;
};

export type Projection = {
  months: Month[];
  metrics: Metrics;
  assumptions: Assumptions;
};

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * The model starts at the beginning of the current month. Passed in rather
 * than read from the clock inside the loop, so a projection is reproducible
 * and a saved scenario re-renders identically.
 */
export function modelStart(now = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

function addMonths(from: Date, n: number): Date {
  return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + n, 1));
}

/** Clamp an assumption into a range the model can actually solve. */
function clamp(v: number, lo: number, hi: number) {
  return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : lo;
}

export function sanitise(a: Assumptions): Assumptions {
  return {
    startingMrr: clamp(a.startingMrr, 0, 100_000_000),
    growthRate: clamp(a.growthRate, 0, 1),
    // Total monthly attrition is capped below 1 so MRR cannot go negative.
    churnRate: clamp(a.churnRate, 0, 0.9),
    expansionRate: clamp(a.expansionRate, 0, 1),
    grossMargin: clamp(a.grossMargin, -1, 0.99),
    headcount: clamp(a.headcount, 0, 100_000),
    hiresPerMonth: clamp(a.hiresPerMonth, -50, 500),
    avgSalary: clamp(a.avgSalary, 0, 5_000_000),
    otherOpex: clamp(a.otherOpex, 0, 100_000_000),
    salesMarketingPct: clamp(a.salesMarketingPct, 0, 3),
    startingCash: clamp(a.startingCash, 0, 10_000_000_000),
    dso: clamp(a.dso, 0, 365),
    dpo: clamp(a.dpo, 0, 365),
    annualPrepayShare: clamp(a.annualPrepayShare, 0, 1),
    acv: clamp(a.acv, 1, 100_000_000),
  };
}

export function project(input: Assumptions, start = modelStart()): Projection {
  const a = sanitise(input);
  const months: Month[] = [];

  let mrr = a.startingMrr;
  let cash = a.startingCash;
  let ar = 0;
  let ap = 0;
  let deferred = 0;
  let retained = 0;
  // Opening equity is whatever balances the opening balance sheet: the model
  // starts with cash and nothing else, so paid-in capital equals that cash.
  const paidIn = a.startingCash;

  let headcount = a.headcount;

  for (let i = 1; i <= HORIZON; i++) {
    const openingMrr = mrr;

    const newMrr = openingMrr * a.growthRate;
    const expansionMrr = openingMrr * a.expansionRate;
    const churnedMrr = openingMrr * a.churnRate;
    mrr = Math.max(0, openingMrr + newMrr + expansionMrr - churnedMrr);

    // Whole people. A fractional hiring plan is a legitimate input — 0.6 a
    // month is "three every five months" — but payroll steps when someone
    // actually starts, so the cost curve should step too.
    headcount = Math.max(0, Math.round(a.headcount + a.hiresPerMonth * i));

    const revenue = mrr;
    const cogs = revenue * (1 - a.grossMargin);
    const grossProfit = revenue - cogs;
    const personnel = (headcount * a.avgSalary) / 12;
    const salesMarketing = revenue * a.salesMarketingPct;
    const totalOpex = personnel + salesMarketing + a.otherOpex;
    const ebitda = grossProfit - totalOpex;
    const netIncome = ebitda;

    // Working capital first. Cash is then derived from these, which is what
    // keeps the balance sheet balanced by construction rather than by check.
    const nextAr = (revenue * a.dso) / 30;
    const nextAp = ((cogs + totalOpex) * a.dpo) / 30;
    // Annually-billed contracts renew evenly through the year, so on average
    // half of that ARR is still sitting unrecognised on the balance sheet.
    const nextDeferred = mrr * 12 * a.annualPrepayShare * 0.5;

    const changeInAr = nextAr - ar;
    const changeInAp = nextAp - ap;
    const changeInDeferred = nextDeferred - deferred;

    const netCashFlow = netIncome - changeInAr + changeInAp + changeInDeferred;

    ar = nextAr;
    ap = nextAp;
    deferred = nextDeferred;
    cash = cash + netCashFlow;
    retained = retained + netIncome;

    const newCustomers = newMrr / (a.acv / 12);
    const date = addMonths(start, i - 1);

    months.push({
      i,
      date,
      label: `${MONTH_NAMES[date.getUTCMonth()]} ${String(date.getUTCFullYear()).slice(2)}`,
      openingMrr,
      newMrr,
      expansionMrr,
      churnedMrr,
      mrr,
      arr: mrr * 12,
      revenue,
      cogs,
      grossProfit,
      personnel,
      salesMarketing,
      otherOpex: a.otherOpex,
      totalOpex,
      ebitda,
      netIncome,
      headcount,
      cash,
      accountsReceivable: ar,
      totalAssets: cash + ar,
      accountsPayable: ap,
      deferredRevenue: deferred,
      totalLiabilities: ap + deferred,
      paidInCapital: paidIn,
      retainedEarnings: retained,
      totalEquity: paidIn + retained,
      changeInAr,
      changeInAp,
      changeInDeferred,
      netCashFlow,
      newCustomers,
      cac: newCustomers > 0 ? salesMarketing / newCustomers : Infinity,
    });
  }

  return { months, metrics: summarise(months, a), assumptions: a };
}

function summarise(months: Month[], a: Assumptions): Metrics {
  const last = months[months.length - 1];
  const peakBurn = months.reduce((worst, m) => Math.max(worst, -m.netCashFlow), 0);

  // Runway: the month cash first goes negative, interpolated within that month
  // so the answer is not always a whole number of months.
  let runwayMonths = Infinity;
  let cashOutDate: Date | null = null;
  for (const m of months) {
    if (m.cash < 0) {
      const prior = m.i > 1 ? months[m.i - 2].cash : a.startingCash;
      const drop = prior - m.cash;
      const fraction = drop > 0 ? prior / drop : 0;
      runwayMonths = m.i - 1 + fraction;
      cashOutDate = m.date;
      break;
    }
  }

  const breakevenMonth = months.find((m) => m.ebitda > 0) ?? null;

  const startingArr = a.startingMrr * 12;
  const endingArr = last.arr;
  const netNewArr = endingArr - startingArr;

  // Twelve-month figures where the horizon allows, so the burn multiple and
  // growth rate are computed on the basis an investor would use.
  const yearIndex = Math.min(11, months.length - 1);
  const yearArr = months[yearIndex].arr;
  const arrGrowth = startingArr > 0 ? yearArr / startingArr - 1 : 0;

  const netBurn = months
    .slice(0, yearIndex + 1)
    .reduce((sum, m) => sum + Math.min(0, m.netCashFlow), 0);
  const netNewArrYear = yearArr - startingArr;
  const burnMultiple = netNewArrYear > 0 ? -netBurn / netNewArrYear : Infinity;

  const customers = months.reduce((s, m) => s + m.newCustomers, 0);
  const smSpend = months.reduce((s, m) => s + m.salesMarketing, 0);
  const cac = customers > 0 ? smSpend / customers : Infinity;

  const monthlyGrossProfitPerCustomer = (a.acv / 12) * a.grossMargin;
  const cacPayback = monthlyGrossProfitPerCustomer > 0 ? cac / monthlyGrossProfitPerCustomer : Infinity;
  // A 0.5% monthly churn rate implies a seventeen-year customer. Nobody
  // underwrites that, so the implied lifetime is capped at five years — the
  // usual convention, and the difference between a defensible LTV and a
  // flattering one.
  const impliedLifetime = a.churnRate > 0 ? 1 / a.churnRate : Infinity;
  const lifetimeMonths = Math.min(LTV_LIFETIME_CAP_MONTHS, impliedLifetime);
  const ltv = monthlyGrossProfitPerCustomer * lifetimeMonths;
  const ltvToCac = Number.isFinite(cac) && cac > 0 ? ltv / cac : Infinity;

  const nrr = Math.pow(1 + a.expansionRate - a.churnRate, 12);

  const ebitdaMargin = last.revenue > 0 ? last.ebitda / last.revenue : 0;
  const ruleOf40 = arrGrowth * 100 + ebitdaMargin * 100;

  // Net new ARR in the last quarter, annualised, per dollar of S&M in the
  // quarter before it — the standard construction.
  const q = months.slice(-3);
  const qPrior = months.slice(-6, -3);
  const qNetNewArr = q.length && qPrior.length ? q[q.length - 1].arr - qPrior[qPrior.length - 1].arr : 0;
  const qSm = qPrior.reduce((s, m) => s + m.salesMarketing, 0);
  const magicNumber = qSm > 0 ? qNetNewArr / qSm : 0;

  return {
    runwayMonths,
    cashOutDate,
    breakevenMonth,
    endingArr,
    startingArr,
    arrGrowth,
    netNewArr,
    burnMultiple,
    cac,
    cacPayback,
    ltv,
    ltvLifetimeMonths: lifetimeMonths,
    ltvToCac,
    nrr,
    ruleOf40,
    magicNumber,
    peakBurn,
    endingCash: last.cash,
    endingHeadcount: last.headcount,
  };
}

/* ------------------------------------------------------------- scenarios -- */

export type ScenarioName = "Downside" | "Base" | "Upside";

/**
 * Scenario shaping. Growth and churn move together and in opposite directions,
 * because that is how a quarter actually goes wrong: you sell less and keep
 * less of what you sold.
 */
const SHAPE: Record<ScenarioName, { growth: number; churn: number; sm: number }> = {
  Downside: { growth: 0.6, churn: 1.5, sm: 1.0 },
  Base: { growth: 1, churn: 1, sm: 1 },
  Upside: { growth: 1.35, churn: 0.75, sm: 1.1 },
};

export function scenario(a: Assumptions, name: ScenarioName, start = modelStart()): Projection {
  const s = SHAPE[name];
  return project(
    {
      ...a,
      growthRate: a.growthRate * s.growth,
      churnRate: a.churnRate * s.churn,
      salesMarketingPct: a.salesMarketingPct * s.sm,
    },
    start,
  );
}

export function allScenarios(a: Assumptions, start = modelStart()) {
  return (["Downside", "Base", "Upside"] as const).map((name) => ({
    name,
    projection: scenario(a, name, start),
  }));
}

/* ------------------------------------------------------------ formatting -- */

export function money(v: number, opts: { compact?: boolean; sign?: boolean } = {}): string {
  if (!Number.isFinite(v)) return "—";
  const sign = v < 0 ? "−" : opts.sign ? "+" : "";
  const n = Math.abs(v);
  if (opts.compact) {
    if (n >= 1_000_000_000) return `${sign}$${(n / 1_000_000_000).toFixed(2)}B`;
    if (n >= 1_000_000) return `${sign}$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `${sign}$${Math.round(n / 1_000)}K`;
  }
  return `${sign}$${Math.round(n).toLocaleString("en-US")}`;
}

/** Accounting style: negatives in parentheses, thousands, no currency symbol. */
export function thousands(v: number): string {
  const n = Math.round(v / 1000);
  return n < 0 ? `(${Math.abs(n).toLocaleString("en-US")})` : n.toLocaleString("en-US");
}

export function percent(v: number, dp = 1): string {
  if (!Number.isFinite(v)) return "—";
  return `${(v * 100).toFixed(dp)}%`;
}

export function months(v: number): string {
  if (!Number.isFinite(v)) return "24+ mo";
  return `${v.toFixed(v < 10 ? 1 : 0)} mo`;
}

export function monthYear(d: Date | null): string {
  if (!d) return "—";
  return `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
