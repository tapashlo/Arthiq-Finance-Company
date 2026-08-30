/**
 * The three ArthIQ product lines, the pricing built on them, and the example
 * Ask ArthIQ answers.
 *
 * One shape for all three lines so the home page, the nav and the pricing
 * table can render them from the same source and never drift.
 *
 * PLACEHOLDER — every figure, price and example answer below is invented for
 * design purposes. Replace before launch.
 */

export type Line = {
  slug: "personal" | "business" | "fpa";
  href: string;
  /** Full product name, e.g. "ArthIQ Personal". */
  name: string;
  /** Just the qualifier — used in nav and tabs. */
  short: string;
  /** Who it is for, as the home page section labels it. */
  audience: string;
  tagline: string;
  lede: string;
  /** Meta description for the page. */
  description: string;
  /** CSS colour token that identifies the line across the site. */
  accent: string;
  /** Short feature names — the chip row on the home page. */
  chips: readonly string[];
  /** The long form of the same features. */
  capabilities: readonly { title: string; body: string }[];
  /** Three small proof points shown under the page hero. */
  proof: readonly { value: string; label: string }[];
};

export const lines: readonly Line[] = [
  {
    slug: "personal",
    href: "/personal",
    name: "ArthIQ Personal",
    short: "Personal",
    audience: "For you",
    tagline: "Your money, organised and explained.",
    lede:
      "Every account in one picture, categorised properly, with the three numbers that actually decide things kept current: what you are worth, what you keep, and what you can commit to.",
    description:
      "Budgeting, cash flow, net worth, goals, investments and debt payoff in one clear picture — with a person to ask when the number needs a decision behind it.",
    accent: "var(--color-viz-mint)",
    chips: ["Budgeting", "Cash flow", "Net worth", "Goals", "Investments", "Debt"],
    capabilities: [
      {
        title: "Budgeting that survives February",
        body: "Categories built from how you actually spend rather than a template, with the annual and quarterly bills spread across the year so a surplus in March is not an illusion you pay for in April.",
      },
      {
        title: "Cash flow you can plan against",
        body: "Money in, money out, and what is genuinely left — computed on a full twelve months rather than a good week. It is a smaller number than most people expect, and it is the one every commitment has to fit inside.",
      },
      {
        title: "Net worth, tracked monthly",
        body: "Everything you own against everything you owe, on one line, moving month over month. The level is noise. The slope is the only honest scoreboard for whether the last year went the way you think it did.",
      },
      {
        title: "Goals with a date attached",
        body: "A deposit, a sabbatical, tuition, the emergency fund. Each one gets a target, a monthly contribution and an arrival date that updates as your cash flow does — so you find out in month two, not month twenty.",
      },
      {
        title: "Investments, seen whole",
        body: "Brokerages, retirement accounts and equity in one allocation view, with fees surfaced. We show you what you hold and what it costs you to hold it. We do not pick investments and we take nothing from anyone who does.",
      },
      {
        title: "A debt payoff order",
        body: "Every balance, rate and minimum in one table, with the payoff sequence that costs least in interest and the one that clears accounts fastest — the real trade-off, priced, instead of a rule of thumb.",
      },
    ],
    proof: [
      { value: "18 min", label: "Median setup" },
      { value: "3 numbers", label: "On one screen" },
      { value: "Read-only", label: "Every connection" },
    ],
  },
  {
    slug: "business",
    href: "/business",
    name: "ArthIQ Business",
    short: "Business",
    audience: "For your business",
    tagline: "Books that close. Reports you trust.",
    lede:
      "Accounting done properly and reporting built on top of it, so the monthly numbers arrive in the first week and mean the same thing every time.",
    description:
      "Accounting, financial reporting, budgeting, forecasting, variance analysis and KPI dashboards for owner-run and growing companies across the United States.",
    accent: "var(--color-viz-blue)",
    chips: [
      "Accounting",
      "Financial reporting",
      "Budgeting",
      "Forecasting",
      "Variance analysis",
      "KPI dashboards",
    ],
    capabilities: [
      {
        title: "Accounting and a fast close",
        body: "Bookkeeping, reconciliation and a written close calendar with an owner and a deadline for every task. Most companies arrive at nineteen days and land under seven within a quarter, because the constraint is sequencing rather than effort.",
      },
      {
        title: "Financial reporting that ties out",
        body: "P&L, balance sheet and cash flow that agree with each other and with the bank, produced on the same days every month, in a format your lender and your board both accept without a follow-up email.",
      },
      {
        title: "Budgeting with the people who spend",
        body: "Department owners build their own numbers against agreed targets. Budgets handed down get ignored; budgets built by the person accountable for them get defended, which is the entire point.",
      },
      {
        title: "Forecasting on drivers, not guesses",
        body: "A rolling forecast that runs on the handful of things that actually move your business, so changing one assumption takes a minute rather than a weekend, and cash lands where the operations say it should.",
      },
      {
        title: "Variance analysis that names a cause",
        body: "Not that you missed by $136,000 — that new business and expansion were ahead, and churn plus discounting took more than both together. Different sentence, different owner, different meeting.",
      },
      {
        title: "KPI dashboards, always current",
        body: "The dozen numbers that run the company, defined once and refreshed automatically. No more decks assembled the night before with three versions of gross margin in them.",
      },
    ],
    proof: [
      { value: "6 days", label: "Median close" },
      { value: "Day 7", label: "Reports in hand" },
      { value: "Fixed fee", label: "Never hourly" },
    ],
  },
  {
    slug: "fpa",
    href: "/fpa",
    name: "ArthIQ FP&A",
    short: "FP&A",
    audience: "For growing companies",
    tagline: "The finance team behind the decision.",
    lede:
      "Planning, scenarios and management reporting run by people who have sat in the seat — for companies that have outgrown a bookkeeper and are not ready for a full in-house team.",
    description:
      "Outsourced FP&A, scenario planning, management reporting, Power BI and fractional CFO support for venture-backed and growing companies.",
    accent: "var(--color-viz-violet)",
    chips: [
      "FP&A",
      "Scenario planning",
      "Management reporting",
      "Power BI",
      "Fractional finance",
    ],
    capabilities: [
      {
        title: "Driver-based planning",
        body: "A three-statement model built on operating drivers — pipeline, conversion, ramp, churn, the hiring plan — instead of a grid of typed-in numbers. One input change flows through revenue, headcount, cash and the balance sheet at once.",
      },
      {
        title: "Scenario planning",
        body: "Base, upside and downside held side by side, with the cash-out date under each. Board conversations that start from a range are shorter and better than ones that start from a single number somebody has to defend.",
      },
      {
        title: "Management reporting",
        body: "The monthly pack your leadership team reads before the meeting: what happened, why, what it implies, and the two or three decisions that need airtime. Circulated on a schedule, not the night before.",
      },
      {
        title: "Power BI and the data layer",
        body: "We build the models and the pipelines behind them — ledger, billing, CRM and payroll joined once, refreshed nightly, with definitions written down so a metric means the same thing in March as in January.",
      },
      {
        title: "Fractional CFO",
        body: "Someone in the seat for board meetings, lender conversations, pricing decisions and the raise. Not a report writer — an operator who has run finance inside a company and will tell you when you are wrong.",
      },
      {
        title: "Board and investor reporting",
        body: "The pack, the pre-read and the update, plus a data room kept diligence-ready year round rather than assembled in a panic. Metrics computed the way the person across the table will compute them.",
      },
    ],
    proof: [
      { value: "94%", label: "Forecast accuracy" },
      { value: "3 people", label: "On every account" },
      { value: "Seed–Series C", label: "Typical stage" },
    ],
  },
] as const;

export const lineBySlug = Object.fromEntries(
  lines.map((l) => [l.slug, l]),
) as Record<Line["slug"], Line>;

/* -------------------------------------------------------------- pricing -- */

export type Plan = {
  slug: string;
  name: string;
  price: string;
  /** Suffix beside the price — "/month", "starting". */
  unit: string;
  cadence: string;
  blurb: string;
  features: readonly string[];
  href: string;
  cta: string;
  featured?: boolean;
};

export const plans: readonly Plan[] = [
  {
    slug: "personal",
    name: "ArthIQ Personal",
    price: "$18",
    unit: "/month",
    cadence: "Billed annually · $22 month to month",
    blurb: "One household, every account, in one picture.",
    features: [
      "Unlimited connected accounts",
      "Budgets, cash flow and net worth",
      "Goals, investments and debt payoff",
      "Ask ArthIQ on your own numbers",
      "Partner or spouse included",
      "Annual review with a planner",
    ],
    href: "/contact",
    cta: "Start free for 30 days",
  },
  {
    slug: "business",
    name: "ArthIQ Business",
    price: "$1,250",
    unit: "/month",
    cadence: "Starting. Fixed fee, quoted after a call",
    blurb: "Bookkeeping, close and reporting, run for you.",
    featured: true,
    features: [
      "Everything in Personal, for the owner",
      "Monthly bookkeeping and close",
      "P&L, balance sheet and cash flow",
      "Budget, forecast and variance review",
      "KPI dashboard, refreshed nightly",
      "A named accountant and analyst",
    ],
    href: "/contact",
    cta: "Book a 30-minute call",
  },
  {
    slug: "fpa",
    name: "ArthIQ FP&A",
    price: "$6,500",
    unit: "/month",
    cadence: "Starting. Scales with entities and cadence",
    blurb: "A finance team, including someone in the CFO seat.",
    features: [
      "Everything in Business",
      "Driver-based three-statement model",
      "Scenario planning and runway",
      "Board pack, pre-read and investor update",
      "Power BI dashboards and data layer",
      "Fractional CFO, analyst and manager",
    ],
    href: "/contact",
    cta: "Book a 30-minute call",
  },
] as const;

export const pricingNotes = [
  "Fixed monthly fees. We quote from transaction volume, entity count and reporting cadence — never from hours worked.",
  "Month to month with thirty days’ notice. No setup fee, no termination fee, no annual lock-in on Business or FP&A.",
  "You keep everything we build: the model, the chart of accounts, the definitions and a full export of your data.",
];

/* ---------------------------------------------------------- ask arthiq -- */

export type AskAnswer = {
  q: string;
  scope: "Personal" | "Business";
  /** The single number the answer resolves to. */
  headline: string;
  /** What that number is measured against. */
  unit: string;
  summary: string;
  /** Draw proportional bars — only where every row shares a unit. */
  bars: boolean;
  /**
   * What the rows mean, which decides how they are coloured. A cost breakdown
   * is not good or bad news, so painting it red would be editorialising.
   */
  tone: "change" | "cost" | "saving";
  rows: readonly { label: string; value: string; amount: number; dir: "up" | "down" }[];
  source: string;
};

export const askAnswers: readonly AskAnswer[] = [
  {
    q: "Why did my spending increase this month?",
    tone: "change",
    scope: "Personal",
    headline: "+$1,240",
    unit: "vs your six-month average",
    summary:
      "You spent 14% more than usual. Three categories account for nearly all of it, and two of them are one-offs that will not repeat next month.",
    bars: true,
    rows: [
      { label: "Travel — Lisbon flights and hotel", value: "+$780", amount: 780, dir: "up" },
      { label: "Dining — 9 more transactions than usual", value: "+$310", amount: 310, dir: "up" },
      { label: "Utilities — annual water true-up", value: "+$190", amount: 190, dir: "up" },
      { label: "Groceries", value: "−$40", amount: 40, dir: "down" },
    ],
    source: "412 transactions across 6 connected accounts.",
  },
  {
    q: "Can I afford a $750,000 house?",
    tone: "cost",
    scope: "Personal",
    headline: "$5,380",
    unit: "all-in per month, against $2,850 in rent today",
    summary:
      "Yes, but it narrows things. At 20% down and 6.4% over thirty years the move costs $2,530 a month more than renting. That fits inside your $5,530 of free cash flow — and takes your savings rate from 37% to 20%.",
    bars: true,
    rows: [
      { label: "Principal and interest", value: "$3,750", amount: 3750, dir: "up" },
      { label: "Property tax at 1.25%", value: "$780", amount: 780, dir: "up" },
      { label: "Insurance", value: "$310", amount: 310, dir: "up" },
      { label: "Maintenance and HOA", value: "$540", amount: 540, dir: "up" },
    ],
    source: "Your cash flow, twelve months. Rate as of this morning.",
  },
  {
    q: "Why is payroll 8% over budget?",
    tone: "change",
    scope: "Business",
    headline: "+$68,400",
    unit: "against an $855,000 quarterly plan",
    summary:
      "Two engineering hires started a month earlier than the plan assumed, and a contractor ran past the statement of work. An unfilled req gives a little back.",
    bars: true,
    rows: [
      { label: "Two hires started early", value: "+$41,200", amount: 41200, dir: "up" },
      { label: "Contractor beyond SOW", value: "+$21,800", amount: 21800, dir: "up" },
      { label: "Payroll tax true-up", value: "+$12,900", amount: 12900, dir: "up" },
      { label: "Open req unfilled", value: "−$7,500", amount: 7500, dir: "down" },
    ],
    source: "Traced to 3 cost centres in the general ledger.",
  },
  {
    q: "What happens if revenue falls 10%?",
    tone: "change",
    scope: "Business",
    headline: "14 months",
    unit: "of runway, down from 19",
    summary:
      "Net burn rises from $332K to $450K a month. You cross the $2M board floor in June 2027 rather than September 2027, and the Series B milestone slips a quarter unless the Q1 hiring plan slows — which is the decision this scenario is really about.",
    bars: false,
    rows: [
      { label: "Revenue, next twelve months", value: "−$1.84M", amount: 1, dir: "down" },
      { label: "Gross profit", value: "−$1.42M", amount: 1, dir: "down" },
      { label: "Net burn", value: "$332K → $450K / month", amount: 1, dir: "up" },
      { label: "Cash-out date", value: "Mar 2028 → Oct 2027", amount: 1, dir: "down" },
    ],
    source: "Base case re-run across 42 driver assumptions.",
  },
  {
    q: "Where can my business cut $50,000?",
    tone: "saving",
    scope: "Business",
    headline: "$52,300",
    unit: "identified, none of it headcount",
    summary:
      "Found across software, unused seats and two duplicate vendors. $31,000 of it is cancellable this month without anyone noticing on Monday.",
    bars: true,
    rows: [
      { label: "Duplicate tooling — 2 vendors", value: "$16,400", amount: 16400, dir: "down" },
      { label: "Unused seats — 47 licences", value: "$13,900", amount: 13900, dir: "down" },
      { label: "Renegotiable contracts", value: "$11,800", amount: 11800, dir: "down" },
      { label: "Shipping tier mismatch", value: "$6,300", amount: 6300, dir: "down" },
      { label: "Idle cloud resources", value: "$3,900", amount: 3900, dir: "down" },
    ],
    source: "1,284 vendor transactions over 12 months.",
  },
] as const;

export const askDisclosure =
  "Example answers, generated from invented data for illustration. Ask ArthIQ explains what your numbers show; it does not give investment, tax or legal advice.";
