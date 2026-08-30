/**
 * Company content.
 *
 * ArthIQ is positioned as a financial intelligence layer rather than an
 * accounting firm: the same discipline applied to a household's money and to
 * a company's, delivered by people but presented like a product. The three
 * product lines live in `lines.ts`; everything here is the company around
 * them.
 *
 * PLACEHOLDER — every name, figure, client and quote below is invented for
 * design purposes. Replace before launch.
 */

export const site = {
  name: "ArthIQ",
  legalName: "ArthIQ Financial Intelligence, LLC",
  tagline: "Know your numbers. Plan what\u2019s next.",
  subtitle: "Financial intelligence for your business and your life.",
  description:
    "ArthIQ brings accounting, budgeting, forecasting and money management together into one clear financial picture \u2014 for your household, your business, and the decisions in front of both.",
  url: "https://arthiq.com",
  founded: 2019,
  /** Remote-first across the United States \u2014 no office to publish. */
  based: "Remote across the United States",
  hours: "Monday to Friday, 8am\u20136pm in every US time zone",
  phone: "(555) 018-2200",
  phoneHref: "tel:+15550182200",
  email: "hello@arthiq.com",
} as const;

export const nav = [
  { href: "/personal", label: "Personal" },
  { href: "/business", label: "Business" },
  { href: "/fpa", label: "FP&A" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

/* ---------------------------------------------------------------- stats -- */

export const stats = [
  { value: "4,800+", label: "Households and companies", note: "in all fifty states" },
  { value: "$1.9B", label: "Cash flow analysed", note: "in the last twelve months" },
  { value: "6 days", label: "Median monthly close", note: "down from nineteen at onboarding" },
  { value: "94%", label: "Forecast accuracy", note: "revenue, trailing four quarters" },
] as const;

/* ----------------------------------------------------------- principles -- */

export const principles = [
  {
    title: "One picture, not twelve logins",
    body: "Money problems are usually assembly problems. The information exists \u2014 in a bank, a ledger, a payroll system, a spreadsheet somebody owns \u2014 and nobody has put it in one place. That assembly is the first thing we do and the thing everything else rests on.",
  },
  {
    title: "Plain language, defensible numbers",
    body: "A number you cannot explain is a number you will not act on. We write in sentences, not jargon, and every figure traces back to a source you can open. Friendly and rigorous are not opposites.",
  },
  {
    title: "Definitions before dashboards",
    body: "Most reporting problems are definition problems. What counts as revenue, as savings, as a fixed cost \u2014 we write it down once, then build the view. It is why our numbers stop moving between meetings.",
  },
  {
    title: "A person owns your account",
    body: "The dashboards are the surface. Behind them is an accountant, an analyst and, at the FP&A tier, a CFO \u2014 people you know by name who answer on Thursday when the decision is Friday.",
  },
] as const;

export const notDoing = [
  "We never take custody of your money. Connections are read-only.",
  "We are not a registered investment adviser and we do not pick investments.",
  "We take no commissions, referral fees or vendor kickbacks. Ever.",
  "We do not sell or share your financial data with anyone.",
  "We do not lock you in. Month to month, cancel any time.",
] as const;

/* ----------------------------------------------------------------- team -- */

export const team = [
  { name: "Maya Lindqvist", role: "Founder & Chief Executive", initials: "ML", bio: "Ran finance through two Series C rounds and one acquisition before founding ArthIQ on a simple observation: the household and the company had the same problem, and only one of them had good tools.", detail: "Previously VP Finance at a Series D infrastructure company." },
  { name: "Daniel Okonkwo", role: "Partner, Fractional CFO", initials: "DO", bio: "Sits in the CFO seat for four companies at a time. Runs board meetings, raise processes and the conversations founders would rather not have alone.", detail: "Previously CFO at two venture-backed marketplaces." },
  { name: "Nina Boateng", role: "Head of ArthIQ Personal", initials: "NB", bio: "Built the household side of the practice. Believes personal finance advice fails because it is delivered as rules rather than as a picture of your actual money.", detail: "CFP\u00ae. Previously a planner at a national wealth firm." },
  { name: "Priya Raman", role: "Head of Analytics", initials: "PR", bio: "Owns the metrics layer: cohort models, unit economics and the pipelines that keep them honest between board meetings. Also owns what Ask ArthIQ is allowed to claim.", detail: "Previously data lead in a growth-stage fintech." },
  { name: "Thomas Auger", role: "Director of Accounting", initials: "TA", bio: "Runs the monthly cycle across the client base \u2014 close, reconciliation, variance review \u2014 and rebuilds charts of accounts that stopped making sense three years ago.", detail: "CPA. Previously controller at a public SaaS company." },
  { name: "Grace Whitfield", role: "Head of Client Operations", initials: "GW", bio: "Owns onboarding: connections, categories, close calendar. Has taken more than sixty companies from spreadsheet chaos to a six-day close.", detail: "Previously controller at a Series B company." },
] as const;

/* --------------------------------------------------------------- process -- */

export const process = [
  {
    step: "01",
    title: "Connect",
    duration: "20 minutes",
    body: "Link your accounts and your ledger, read-only. Banks, cards, payroll, billing, the general ledger \u2014 whatever you already use. Nothing changes on your side and nothing moves money.",
  },
  {
    step: "02",
    title: "Baseline",
    duration: "Week one",
    body: "We assemble the picture: categories cleaned, chart of accounts pruned, metric definitions written down. You get a first read on where the money actually goes, which is usually the uncomfortable part.",
  },
  {
    step: "03",
    title: "The monthly rhythm",
    duration: "Ongoing",
    body: "Books closed, variance explained, forecast re-run, dashboard refreshed. Same days every month, so decisions stop waiting on numbers that have not landed yet.",
  },
  {
    step: "04",
    title: "Decisions",
    duration: "Whenever they come up",
    body: "The house, the hire, the price change, the raise. Ask ArthIQ for the arithmetic in seconds, or ask the person who owns your account for the judgement behind it.",
  },
] as const;

/* ---------------------------------------------------------- testimonials -- */

export const testimonials = [
  {
    quote: "I run a nine-person studio and my own household on the same brain. Having both in one place stopped a specific bad habit \u2014 paying myself irregularly because I could never tell what the business could actually spare.",
    name: "Dana Ruiz",
    detail: "Founder \u00b7 design studio, Texas",
  },
  {
    quote: "The monthly close went from nineteen days to six in a quarter. The bigger change is that our department heads now argue about their own numbers, which they never did when finance owned them.",
    name: "Karen Ellsworth",
    detail: "Chief Operating Officer \u00b7 marketplace, Series A",
  },
  {
    quote: "We went into our Series B with a model our lead investor\u2019s analyst could not break. That has never happened to me before, and it changed the tone of the whole process.",
    name: "Rachel Whitmore",
    detail: "Co-founder & Chief Executive \u00b7 infrastructure, Series B",
  },
] as const;

export const testimonialDisclosure =
  "Names, companies and quotations above are illustrative placeholders created for design purposes and do not describe real clients or real engagements.";

/* ------------------------------------------------------------------ faq -- */

export const faqs = [
  {
    q: "Is ArthIQ software, or is it people?",
    a: "Both, and the order matters. People do the work \u2014 accountants, analysts and, at the FP&A tier, a fractional CFO. The dashboards are how that work reaches you: one place to see the picture instead of a PDF in your inbox once a month. You are hiring a finance team that happens to have a good interface, not buying a tool and hoping you find the time.",
  },
  {
    q: "Do you hold my money or move it?",
    a: "No. Every connection is read-only. We can see balances and transactions; we cannot initiate a transfer, pay a bill or trade a security, and there is no path in the product that would let us. We are not a bank, a broker or a custodian, and we are not a registered investment adviser.",
  },
  {
    q: "Why offer personal and business finance together?",
    a: "Because most owners already run both and nobody helps them see the seam. What the business can pay you, what a slow quarter does to your mortgage, whether to take a distribution or leave the cash in \u2014 those are single questions with two sets of books behind them. Plenty of clients use only one side, and that is fine.",
  },
  {
    q: "Do you replace my accountant or bookkeeper?",
    a: "On ArthIQ Business we can do the bookkeeping ourselves, or work alongside whoever does it now \u2014 your call. What we will not do is file your taxes or issue an audit opinion. We are not a licensed public accounting firm, and when a return or an audit is needed we work with your CPA rather than pretending to be one.",
  },
  {
    q: "What is Ask ArthIQ, exactly?",
    a: "A question box over your own numbers. You type a question in plain English \u2014 why payroll ran over, what a ten percent revenue drop does to runway \u2014 and it answers with the arithmetic and the transactions or line items behind it. Every answer shows its sources. It explains what happened and what the numbers imply; it does not tell you what to do, and a person on your account is a message away when the judgement matters more than the maths.",
  },
  {
    q: "How is my data protected?",
    a: "Connections are read-only and token-based, so we never hold your banking credentials. Data is encrypted in transit and at rest, access is scoped to the people on your account, and we sell nothing to anyone \u2014 no data brokers, no advertising, no lead resale. You can disconnect an account or delete your data at any time.",
  },
  {
    q: "How much does it cost?",
    a: "ArthIQ Personal is a flat monthly subscription. Business and FP&A are fixed monthly fees quoted after a short call, based on transaction volume, entity count and reporting cadence \u2014 not on hours. The number we quote is the number you pay, and it does not change without a conversation.",
  },
  {
    q: "What if I want to leave?",
    a: "Thirty days\u2019 notice, month to month, no termination fee. You keep the model, the cleaned-up chart of accounts, the definitions and an export of everything. It was built for you, not rented to you.",
  },
] as const;

/* -------------------------------------------------------------- insights -- */

export type Article = {
  slug: string;
  image: "dashboard" | "meeting" | "trading" | "desk" | "skyline" | "workshop";
  title: string;
  dek: string;
  category: string;
  date: string;
  displayDate: string;
  readingTime: string;
  author: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "the-only-three-numbers",
    image: "skyline",
    title: "The only three numbers in personal finance",
    dek: "Budgeting apps show you two hundred figures. Almost every decision a household actually makes turns on three of them, and most people cannot name their own.",
    category: "Personal",
    date: "2026-08-25",
    displayDate: "August 25, 2026",
    readingTime: "5 min read",
    author: "Nina Boateng",
    body: [
      "Ask someone what they spent on groceries last month and they will guess within twenty dollars. Ask them their net worth and you get a pause, then a range wide enough to drive a car through. We have built an entire category of software that is extremely good at the question that does not matter much and quiet about the three that do.",
      "The first is net worth: everything you own minus everything you owe, measured monthly. Not because the number itself is interesting \u2014 on any given day it is mostly noise from markets you do not control \u2014 but because its slope is the only honest scoreboard for whether the last twelve months went the way you think they did. Income can rise while net worth flattens. That is worth knowing early rather than at fifty.",
      "The second is free cash flow: what is left after everything, including the bills that arrive quarterly and the ones that arrive annually and the ones you have mentally classified as unusual for six years running. Most households compute this optimistically by leaving out the lumpy items, then wonder why the surplus never appears in the account. Take a full year, divide by twelve, and use that number instead. It is smaller and it is real.",
      "The third is your savings rate: free cash flow as a percentage of take-home pay. This is the one that actually predicts outcomes, because it is scale-free. It lets you compare this year to last year after a raise, and it is the only one of the three you can move deliberately in a single month.",
      "What makes them useful together is that they answer different questions. Savings rate tells you whether the machine is working. Free cash flow tells you what you can commit to \u2014 a mortgage payment, a car, a tuition bill. Net worth tells you whether the first two have been true for long enough to matter yet.",
      "The house question is the clearest case. Nobody can answer whether you can afford a given price from your salary alone, because salary is not the constraint. The constraint is what monthly payment survives inside your real free cash flow after taxes, insurance, maintenance and the fact that a house generates its own expenses. Run it against the honest number and the answer usually arrives in under a minute, in one direction or the other.",
      "None of this requires a budget in the sense most people mean \u2014 the envelope system that gets abandoned in week three. It requires knowing three numbers and watching their trend. If your money app cannot tell you all three in one screen, it is showing you the wrong two hundred figures.",
    ],
  },
  {
    slug: "the-burn-multiple-is-the-only-number",
    image: "trading",
    title: "The burn multiple is the only number that survives a down round",
    dek: "Growth rate gets you the meeting. Capital efficiency gets you the term sheet — and it is the one metric founders systematically fail to compute honestly.",
    category: "Metrics",
    date: "2026-08-11",
    displayDate: "August 11, 2026",
    readingTime: "6 min read",
    author: "Priya Raman",
    body: [
      "There is a number every growth-stage investor computes before the second meeting, and most founders arrive without having computed it themselves. It is net burn divided by net new ARR: the burn multiple. It answers one question — how many dollars did you consume to manufacture a dollar of recurring revenue?",
      "Below 1.0 is exceptional. Between 1.0 and 1.5 is strong. Between 1.5 and 2.0 is fine at early stage and worrying at Series B. Above 3.0, the conversation stops being about growth and starts being about control.",
      "The reason founders get it wrong is rarely dishonesty. It is that both halves of the fraction are easy to compute generously. Net burn gets quoted excluding a one-off, or on a good month rather than a trailing average. Net new ARR gets quoted gross, ignoring churn and contraction, which is the single most common error and often moves the multiple by half a turn.",
      "Compute it the way the person across the table will: trailing twelve months, net burn including every cash cost, net new ARR after churn and contraction. Then compute it again quarterly, because a company improving from 2.4 to 1.6 over four quarters tells a completely different story from one sitting flat at 2.0, and the trend is what actually gets discussed.",
      "The deeper reason to track it internally is that it is the cleanest single test of whether your growth is bought or earned. Revenue growth can be purchased with sales headcount and discounting almost indefinitely, right up until it cannot. The burn multiple prices that purchase in real time.",
      "It is also the metric most responsive to decisions you already control. Extending payback by tightening discounting, killing a channel that never converted, delaying two hires by a quarter — each moves the multiple within a quarter or two, which is faster than almost anything else on the dashboard.",
      "None of which means optimising it to the exclusion of everything else. A company with a burn multiple of 0.6 and 20% annual growth is efficient and going nowhere. The point is to know the number, know its trend, and be able to defend both without a spreadsheet open.",
    ],
  },
  {
    slug: "your-forecast-is-a-grid-not-a-model",
    image: "dashboard",
    title: "Your forecast is a grid, not a model",
    dek: "If changing one assumption means editing forty cells, you do not have a financial model. You have a picture of one moment's opinion.",
    category: "Forecasting",
    date: "2026-07-02",
    displayDate: "July 2, 2026",
    readingTime: "5 min read",
    author: "Maya Lindqvist",
    body: [
      "Almost every startup forecast we are handed in a finance audit has the same defect. It looks like a model — tabs, formulas, a summary page — but the numbers are typed in. Revenue for month fourteen is a value somebody chose, not an output of anything.",
      "The test is simple and slightly cruel. Ask the owner to raise sales headcount by two people starting in March and show you the effect on cash. If the answer takes more than about ninety seconds, the model is a grid.",
      "A driver-based model inverts the structure. You do not forecast revenue; you forecast the things that produce revenue. Reps hired, ramp time, quota, attainment, win rate, average contract value, churn. Revenue falls out. Cost of sales falls out of headcount. Cash falls out of both, plus collection timing.",
      "The immediate payoff is speed of iteration, and it changes the character of planning meetings. When a scenario takes ninety seconds instead of an afternoon, people ask more questions, and the questions get better. Nobody asks the fourth follow-up when each one costs someone a day.",
      "The second payoff is diagnostic. When a driver-based forecast misses, you can see which driver missed. Revenue came in eleven percent light because attainment was sixty-two percent against a plan of seventy-five, not because of some undifferentiated shortfall. That is an actionable finding; \"we missed revenue\" is not.",
      "The third payoff shows up in diligence. An analyst who can trace your revenue line back to a hiring plan and a conversion rate believes the model. One who finds a hardcoded number in month fourteen starts checking everything else, and that is an expensive mood to create.",
      "Building one is less work than it sounds — usually two to three weeks for a company under fifty people. The hard part is not the mechanics. It is agreeing on which eight or ten drivers actually run the business, which is a management conversation wearing a spreadsheet costume.",
    ],
  },
  {
    slug: "close-the-books-in-six-days",
    image: "workshop",
    title: "How to close the books in six days",
    dek: "A three-week close is not an accounting problem. It is a sequencing problem, and it is costing you the first half of every month.",
    category: "Operations",
    date: "2026-05-19",
    displayDate: "May 19, 2026",
    readingTime: "5 min read",
    author: "Grace Whitfield",
    body: [
      "Companies that close in three weeks are not doing three weeks of work. They are doing about five days of work spread across three weeks, because nothing starts until the thing before it finishes and nobody owns the queue.",
      "The cost is not the accounting hours. It is that management spends the first half of every month making decisions on last quarter's information, and by the time the numbers land there are only ten days left to react before the cycle repeats.",
      "The fix begins with a written close calendar: every task, an owner, a deadline expressed in business days from month end, and its dependencies. Most companies have never written this down, and the act of writing it exposes that four tasks are waiting on one person who did not know they were blocking.",
      "Then move work before month end. Accruals for recurring items can be templated in advance. Vendor invoices can be chased in the last week of the month rather than the first week of the next. Prepaid schedules and depreciation can be rolled forward before the period closes. In most companies a third of close work does not require the month to be over.",
      "Then set a materiality threshold and honour it. Teams routinely spend two days chasing a variance smaller than the rounding on the board deck. Write the threshold down, get the CEO to agree to it once, and stop relitigating it every month.",
      "Then separate the close from the analysis. The books closing and the variance review are different deliverables with different audiences. Waiting to publish because the commentary is not written keeps the whole company waiting on a paragraph.",
      "Six days is achievable for most venture-backed companies under two hundred people. The constraint is almost never accounting capability. It is that nobody has been given the job of making the close fast, so it stays exactly as slow as it has always been.",
    ],
  },
  {
    slug: "board-decks-that-get-read",
    image: "meeting",
    title: "Board decks that actually get read",
    dek: "Sixty slides sent the night before produce a meeting about the slides. Twelve sent on Friday produce a meeting about the business.",
    category: "Reporting",
    date: "2026-03-24",
    displayDate: "March 24, 2026",
    readingTime: "4 min read",
    author: "Daniel Okonkwo",
    body: [
      "The board deck is the most-produced and least-examined artifact in startup finance. Most are assembled under time pressure, sent hours before the meeting, and function as a script for a presentation rather than a document anyone reads.",
      "The single highest-leverage change is timing. Send the pack seventy-two hours ahead with an explicit request that directors read it before the meeting. This one change does more than any redesign, because it converts the first forty minutes from a recital into a discussion.",
      "The second is structure. Open with the three decisions or discussions you want from the meeting. Not an agenda — the actual questions. Directors read differently when they know what is being asked of them.",
      "The third is subtraction. Every recurring chart should justify its place annually. Most decks accumulate slides that were added for one meeting three years ago and now function as furniture. If a chart has not prompted a question in four meetings, cut it and see whether anyone notices.",
      "The fourth is candour about misses, early and in your own words. A miss you surface on slide four with a cause and a plan is a management update. The same miss discovered by a director on slide thirty is a credibility event, and you will spend the rest of the meeting on it.",
      "Twelve to fifteen slides, sent three days out, opening with the decisions. It is not a complicated format. What makes it hard is that it requires knowing what you want from the meeting before you build the deck, and most decks are built to fill a slot rather than to get an answer.",
    ],
  },
  {
    slug: "what-a-finance-audit-finds",
    image: "desk",
    title: "What a finance audit finds in the first two weeks",
    dek: "Across a hundred and forty engagements, the same five problems turn up in nearly every company — and none of them are accounting errors.",
    category: "Operations",
    date: "2026-01-15",
    displayDate: "January 15, 2026",
    readingTime: "5 min read",
    author: "Thomas Auger",
    body: [
      "We start every engagement with a two-week audit of the finance function: the model, the close, the systems, the metric definitions. It is meant to be uncomfortable, and the striking thing is how little the findings vary between companies.",
      "First, the same metric has more than one definition in active use. ARR in the board deck does not match ARR in the sales dashboard, usually because one includes services revenue or counts contracts at signature rather than start. Nobody is wrong; nobody wrote it down.",
      "Second, the model has hardcoded values in the forecast period. Almost always. Frequently the person who put them there has left, and nobody remaining is willing to change them because nobody knows what they were compensating for.",
      "Third, the chart of accounts has grown without pruning. Departments that no longer exist, accounts created for a single transaction in 2023, cost centres that map to nothing. This is why departmental reporting takes four days and why the numbers shift depending on who pulls them.",
      "Fourth, the close has no written owner per task. Everyone knows roughly what they do; nobody knows what they are blocking. This is the single largest driver of close duration and the cheapest to fix.",
      "Fifth, cohort data exists but has never been assembled. The raw information is sitting in the billing system, and no one has built the retention curve, which means pricing and expansion decisions are being made on aggregate averages that hide everything interesting.",
      "None of these are failures of competence. They are what happens when a finance function grows by accretion while the company is busy doing something more urgent. They are also all fixable in a quarter, which is the more useful half of the finding.",
    ],
  },
] as const as Article[];

export const disclosures = [
  {
    title: "What ArthIQ is",
    body: "ArthIQ Financial Intelligence, LLC provides accounting, bookkeeping, financial planning and analysis, management reporting and personal money-management services, delivered together with software we operate. We are not a bank, a broker-dealer, a custodian, a registered investment adviser, a licensed public accounting firm or a law firm.",
  },
  {
    title: "We do not hold or move your money",
    body: "All account connections are read-only. ArthIQ cannot initiate transfers, pay bills, place trades or take custody of any asset. Balances and transactions are shown for analysis only, and may lag your institution.",
  },
  {
    title: "Nothing here is advice",
    body: "Content on this site \u2014 including every example answer shown for Ask ArthIQ \u2014 is general information for illustration. It does not account for your circumstances and should not be relied on as the basis for an investment, tax, borrowing, hiring or fundraising decision. Speak to a qualified professional about your situation.",
  },
  {
    title: "Ask ArthIQ",
    body: "Ask ArthIQ produces explanations and arithmetic from your own data. It can be wrong, it does not know anything you have not connected, and it is not a substitute for professional judgement. Every answer shows its sources so you can check the work. It does not recommend investments.",
  },
  {
    title: "The dashboards and work examples",
    body: "Every dashboard, chart, table and figure shown on this website is invented for illustration. They show the shape and structure of what we produce \u2014 a net-worth trend, a variance bridge, a cohort grid \u2014 not the results of any real client or engagement.",
  },
  {
    title: "Figures shown",
    body: "All statistics, client names, team members, testimonials, prices and example numbers on this site are illustrative placeholders created for design purposes. They do not represent actual engagements, actual people or actual results.",
  },
] as const;
