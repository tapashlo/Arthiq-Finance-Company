/**
 * Site content.
 *
 * PLACEHOLDER — every name, figure, client and quote below is invented for
 * design purposes. Replace before launch.
 */

export const site = {
  name: "ArthIQ",
  legalName: "ArthIQ Advisory, LLC",
  tagline: "Financial planning and analysis for companies that move fast.",
  description:
    "ArthIQ is an outsourced FP&A and fractional CFO team for venture-backed startups across the United States. Forecasting, board reporting, budgeting and unit economics — run by people who have sat in the seat.",
  url: "https://arthiq.com",
  founded: 2019,
  /** Remote-first across the United States — no office to publish. */
  based: "Remote across the United States",
  hours: "Monday to Friday, 8am–6pm in every US time zone",
  phone: "(555) 018-2200",
  phoneHref: "tel:+15550182200",
  email: "hello@arthiq.com",
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "How we work" },
  { href: "/insights", label: "Insights" },
  { href: "/work", label: "Our work" },
] as const;

/* ---------------------------------------------------------------- stats -- */

export const stats = [
  { value: "140+", label: "Startups supported", note: "in 34 states" },
  { value: "$2.8B", label: "Capital raised by clients", note: "with our models in the room" },
  { value: "6 days", label: "Median close", note: "down from 19 at onboarding" },
  { value: "94%", label: "Forecast accuracy", note: "revenue, trailing 4 quarters" },
] as const;

/* ------------------------------------------------------------- services -- */

export const services = [
  {
    slug: "forecasting",
    number: "01",
    title: "Driver-based forecasting",
    summary:
      "A model that runs on the handful of drivers that actually move your business, so changing an assumption takes a minute rather than a weekend.",
    detail:
      "We rebuild your forecast around operating drivers — pipeline coverage, conversion, ramp, churn, headcount plan — instead of a grid of hardcoded numbers. One input change flows through revenue, headcount, cash and the balance sheet at once.",
    points: [
      { title: "Three-statement model", body: "P&L, balance sheet and cash flow that actually tie out, with a documented driver tree behind every line." },
      { title: "Scenario branches", body: "Base, upside and downside held side by side, so board conversations start from a range rather than a single number." },
      { title: "Hiring plan integration", body: "Headcount by role and start date, fully loaded with taxes and benefits, driving both cost and capacity." },
      { title: "Rolling re-forecast", body: "Updated monthly against actuals, so the plan reflects the business as it is rather than as it was in January." },
      { title: "Runway and raise timing", body: "Cash-out date under each scenario, and the milestones you need to hit before the next round." },
      { title: "Sensitivity analysis", body: "Which assumptions actually matter, ranked — so you know where to spend management attention." },
    ],
  },
  {
    slug: "board-reporting",
    number: "02",
    title: "Board & investor reporting",
    summary:
      "The pack your board actually reads: a clear narrative, the metrics that matter, and no surprises in the room.",
    detail:
      "We build and run the monthly and quarterly reporting rhythm — the numbers, the commentary and the pre-read. Directors get the story before the meeting, so the meeting is about decisions.",
    points: [
      { title: "Monthly investor update", body: "A tight narrative with KPIs, cash position, hiring and asks — sent on a schedule your investors can rely on." },
      { title: "Board deck and pre-read", body: "Financials, plan-versus-actual and the two or three decisions that need airtime, circulated 72 hours ahead." },
      { title: "KPI definitions", body: "Every metric defined once and applied consistently, so numbers stop changing between decks." },
      { title: "Data room readiness", body: "Historicals, cohorts and the model kept in diligence-ready shape year round, not assembled in a panic." },
      { title: "Cap table and dilution", body: "Scenario modelling for the next round, option pool refreshes and what each outcome means for founders." },
      { title: "Audit and diligence support", body: "We sit alongside your auditors and your acquirer's team so the process does not stall your operators." },
    ],
  },
  {
    slug: "budgeting",
    number: "03",
    title: "Budgeting & variance analysis",
    summary:
      "Department owners who understand their numbers, and a monthly variance review that explains the gap instead of just reporting it.",
    detail:
      "Budgets fail when they are handed down. We build them with the people who spend the money, then close the loop every month with a variance review that gets to cause, not just size.",
    points: [
      { title: "Bottom-up build", body: "Department owners build their own budgets against agreed targets, so nobody is surprised by their own number." },
      { title: "Monthly variance review", body: "Plan versus actual by department, with the drivers behind each gap and an owner for each action." },
      { title: "Spend controls", body: "Approval thresholds and vendor review that slow down the right decisions and none of the others." },
      { title: "Headcount governance", body: "Requisition tracking against the approved plan, so hiring drift is visible in week one rather than quarter three." },
      { title: "Close calendar", body: "A documented close with owners and deadlines. Most clients go from three weeks to under one." },
      { title: "Systems and data hygiene", body: "Chart of accounts, cost centres and integrations set up so the reporting builds itself." },
    ],
  },
  {
    slug: "unit-economics",
    number: "04",
    title: "Metrics & unit economics",
    summary:
      "CAC, payback, cohort retention and the burn multiple — computed the way your investors compute them, and trusted because the definitions hold.",
    detail:
      "Most startups have metrics. Fewer have metrics they can defend under diligence. We rebuild them from source data with definitions written down, then benchmark you against the stage you are actually at.",
    points: [
      { title: "Cohort retention", body: "Logo and revenue retention by cohort, so expansion and churn stop cancelling each other out in the average." },
      { title: "CAC and payback", body: "Fully loaded acquisition cost by channel and segment, with payback measured on gross profit rather than revenue." },
      { title: "Burn multiple", body: "Net burn per dollar of net new ARR — the number that decides whether the next round is a conversation or a negotiation." },
      { title: "Contribution margin", body: "Unit economics after support, hosting and payment costs, so pricing decisions rest on something real." },
      { title: "Benchmarking", body: "Where you sit against comparable companies at your stage, and which gaps are worth closing before you raise." },
      { title: "Metric definitions", body: "One written definition per metric, versioned, so a number means the same thing in March as it did in January." },
    ],
  },
] as const;

/* ----------------------------------------------------------- philosophy -- */

export const philosophy = [
  { title: "Operators, not reporters", body: "Everyone on this team has run finance inside a company. We are not producing a deliverable and leaving; we are in your Slack when a pricing decision needs a number by Thursday." },
  { title: "The model is a tool, not an artifact", body: "A forecast that takes a week to update is a forecast nobody updates. Ours are built to be changed — clearly structured, documented, and yours to keep." },
  { title: "Definitions before dashboards", body: "Most reporting problems are definition problems. We write down what each metric means before we build anything that displays it." },
  { title: "Fewer numbers, better understood", body: "A board deck with sixty charts hides the three that matter. We cut hard, and we make sure the survivors are defensible." },
] as const;

export const notDoing = [
  "We do not do bookkeeping — we work alongside your accountant.",
  "We do not sell software licences or take vendor referral fees.",
  "We do not hand you a model and disappear.",
  "We do not lock you in. Month to month, 30 days' notice.",
] as const;

/* ----------------------------------------------------------------- team -- */

export const team = [
  { name: "Maya Lindqvist", role: "Founder & Managing Partner", initials: "ML", bio: "Built and ran FP&A through two Series C rounds and one acquisition before founding ArthIQ. Owns the modelling standard every engagement is built on.", detail: "Previously VP Finance at a Series D infrastructure company." },
  { name: "Daniel Okonkwo", role: "Partner, Fractional CFO", initials: "DO", bio: "Sits in the CFO seat for four clients at a time. Runs board meetings, raise processes and the conversations founders would rather not have alone.", detail: "Previously CFO at two venture-backed marketplaces." },
  { name: "Priya Raman", role: "Director of Analytics", initials: "PR", bio: "Owns the metrics layer: cohort models, unit economics and the data pipelines that keep them honest between board meetings.", detail: "Previously data lead in a growth-stage fintech." },
  { name: "Thomas Auger", role: "Senior FP&A Manager", initials: "TA", bio: "Runs the monthly cycle across the client base — close, variance review, re-forecast — and rebuilds models that have stopped being usable.", detail: "Previously FP&A at a public SaaS company." },
  { name: "Grace Whitfield", role: "Head of Client Operations", initials: "GW", bio: "Owns onboarding: systems, chart of accounts, close calendar. Has taken more than sixty companies from spreadsheet chaos to a six-day close.", detail: "Previously controller at a Series B company." },
  { name: "Ben Ortiz", role: "FP&A Analyst", initials: "BO", bio: "Builds the models and the board packs, and is usually the first person to spot that a number moved before anyone asks why.", detail: "Previously investment banking, technology coverage." },
] as const;

/* --------------------------------------------------------------- process -- */

export const process = [
  { step: "01", title: "Diagnostic call", duration: "45 minutes", body: "What you are deciding, what your current numbers can and cannot answer, and whether we are the right team for it. No documents needed." },
  { step: "02", title: "Finance audit", duration: "2 weeks", body: "We review your model, close process, systems and metric definitions, then come back with what is working and what is quietly broken." },
  { step: "03", title: "Rebuild", duration: "3–5 weeks", body: "New driver-based model, cleaned-up chart of accounts, defined metrics and a documented close calendar. You own all of it." },
  { step: "04", title: "Monthly rhythm", duration: "Ongoing", body: "Close, variance review, re-forecast, investor update. Board pack and pre-read every quarter, with your CFO in the room." },
  { step: "05", title: "Raise support", duration: "As needed", body: "Data room, diligence responses and scenario modelling when the next round starts, without pulling your team off the roadmap." },
] as const;

/* ---------------------------------------------------------- testimonials -- */

export const testimonials = [
  { quote: "We went into our Series B with a model our lead investor's analyst could not break. That has never happened to me before, and it changed the tone of the whole process.", name: "Rachel Whitmore", detail: "Co-founder & CEO · infrastructure, Series B" },
  { quote: "Our close went from nineteen days to six in a quarter. The bigger change is that our department heads now argue about their own numbers, which they never did when finance owned them.", name: "Karen Ellsworth", detail: "COO · marketplace, Series A" },
  { quote: "What I value most is being told when I am wrong. They talked me out of a hiring plan last spring that would have cost us four months of runway for nothing.", name: "Marcus Delgado", detail: "Founder & CEO · developer tools, Seed" },
] as const;

export const testimonialDisclosure =
  "Names, companies and quotations above are illustrative placeholders created for design purposes and do not describe real clients or real engagements.";

/* ------------------------------------------------------------------ faq -- */

export const faqs = [
  { q: "How is this different from hiring a full-time finance lead?", a: "A strong Director of FP&A costs $220k–$280k fully loaded, takes three to five months to hire, and gives you one person's experience. We cost less, start in two weeks, and put a CFO, an FP&A manager and an analyst on your account. When you are ready for someone in-house, we help you hire them and hand over cleanly — that is a successful outcome, not a lost client." },
  { q: "What stage do you usually work with?", a: "Most clients are between Seed and Series C — roughly $1M to $50M in ARR. Below that, a good bookkeeper and a simple model are usually enough, and we will tell you so. Above it, you generally want a full in-house team, and we help you build it." },
  { q: "Do you replace our accountant or bookkeeper?", a: "No. They own the books; we own the forward-looking work — forecasting, planning, analysis and reporting. We work alongside them, and a clean monthly close from your bookkeeper is what makes our work possible." },
  { q: "How long until we see something useful?", a: "The finance audit lands in two weeks and is usually uncomfortable reading. A working driver-based model follows three to five weeks after that. The first board pack we produce end-to-end is typically your next quarterly meeting." },
  { q: "What tools do you work in?", a: "Your general ledger, whatever it is, plus a modelling layer. Most clients run on spreadsheets far longer than vendors would like you to believe, and we will not sell you a planning platform you do not need yet. When you do outgrow spreadsheets, we help you choose and implement." },
  { q: "Who actually does the work?", a: "The people on the team page. Each engagement gets a fractional CFO, an FP&A manager and an analyst. You will know all three by name, and none of them is a rotating pool." },
  { q: "What does it cost?", a: "Engagements start at $6,500 a month for a Seed-stage company on a monthly rhythm, and scale with complexity — entities, currencies, board cadence and raise activity. We quote a fixed monthly fee after the diagnostic call, and it does not change without a conversation." },
  { q: "What happens if we want to stop?", a: "Thirty days' notice, month to month, no termination fee. You keep the model, the documentation and the definitions — they were built for you, not rented to you." },
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
  { title: "Advisory services", body: "ArthIQ Advisory, LLC provides outsourced financial planning and analysis and fractional CFO services. We are not a registered investment adviser, a broker-dealer, a licensed public accounting firm or a law firm, and we do not provide investment advice, audit opinions, tax opinions or legal advice." },
  { title: "Nothing here is advice", body: "Content on this site is general information for illustration. It does not account for your circumstances and should not be relied on as the basis for a financial, hiring, fundraising or accounting decision. Speak to a qualified professional about your specific situation." },
  { title: "The work examples", body: "Every chart, table and figure in the work examples is invented for illustration. They show the shape and structure of what we produce — a forecast build, a variance bridge, a cohort grid — not the results of any real engagement." },
  { title: "Figures shown", body: "All statistics, client names, team members, testimonials and example numbers on this site are illustrative placeholders created for design purposes. They do not represent actual engagements, actual people or actual results." },
] as const;
