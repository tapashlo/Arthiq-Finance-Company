/**
 * Site content.
 *
 * PLACEHOLDER CONTENT — every name, figure, address, quote and statistic below
 * is invented for design purposes. Replace before launch. Nothing here has been
 * reviewed for regulatory compliance.
 */

export const site = {
  name: "Arthiq",
  legalName: "Arthiq Wealth Management, LLC",
  tagline: "Wealth management, reconsidered.",
  description:
    "Arthiq is a fee-only fiduciary wealth manager in San Francisco. Portfolio management and retirement and tax planning for California families.",
  url: "https://arthiq.com",
  founded: 2016,
  address: {
    line1: "1 Sansome Street, Suite 3500",
    city: "San Francisco",
    state: "CA",
    zip: "94104",
  },
  phone: "(415) 555-0142",
  phoneHref: "tel:+14155550142",
  email: "hello@arthiq.com",
  custodian: "Schwab Advisor Services",
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

/* ---------------------------------------------------------------- stats -- */

export const stats = [
  { value: "$1.24B", label: "Assets under advice", note: "as of Jun 30, 2026" },
  { value: "382", label: "Client households", note: "across 14 states" },
  { value: "0.65%", label: "Starting annual fee", note: "declining with scale" },
  { value: "9", label: "Years fee-only", note: "founded 2016" },
] as const;

/* ------------------------------------------------------------- services -- */

export const services = [
  {
    slug: "investment-management",
    number: "01",
    title: "Portfolio & investment management",
    summary:
      "A single portfolio built around your whole balance sheet, managed with low turnover and constant attention to what you keep after tax.",
    detail:
      "We build one portfolio across every account you hold — taxable, retirement, trust, donor-advised — and manage it as a single balance sheet rather than a set of unrelated buckets. Allocation is set against your actual spending horizon, not a risk questionnaire score.",
    points: [
      {
        title: "Whole-balance-sheet allocation",
        body: "One target allocation, implemented across every account, with asset location chosen so tax-inefficient holdings sit where they cost least.",
      },
      {
        title: "Systematic tax-loss harvesting",
        body: "Positions are reviewed daily for harvesting opportunities and paired with correlated replacements, with wash-sale rules tracked across household accounts.",
      },
      {
        title: "Direct indexing at scale",
        body: "For taxable portfolios above $500,000 we hold the index directly, which turns a single fund line into hundreds of individual loss-harvesting opportunities.",
      },
      {
        title: "Concentrated position management",
        body: "Multi-year diversification plans for a single large holding, coordinated with exchange funds, charitable vehicles and your tax bracket.",
      },
      {
        title: "Rebalancing with a tolerance band",
        body: "We rebalance when an asset class drifts outside its band, not on a calendar. Fewer trades, less realized gain, same risk control.",
      },
      {
        title: "Private market access",
        body: "Where it fits the plan, access to institutional private credit, real assets and venture funds normally closed to individual investors.",
      },
    ],
  },
  {
    slug: "retirement-tax-planning",
    number: "02",
    title: "Retirement & tax planning",
    summary:
      "A multi-decade projection of income, taxes and withdrawals — revisited every year, and used to decide what actually happens this April.",
    detail:
      "Planning at Arthiq is a running model, not a bound document. We project your income, brackets and required distributions out through your nineties, then work backwards to the decisions in front of you this year.",
    points: [
      {
        title: "Multi-year tax projection",
        body: "A year-by-year bracket model that shows where the low-tax windows fall — usually between retirement and the start of required distributions.",
      },
      {
        title: "Roth conversion sequencing",
        body: "We fill the low brackets deliberately in those windows, sized against IRMAA thresholds and the tax rate your heirs are likely to face.",
      },
      {
        title: "Withdrawal order design",
        body: "Which account funds each year of spending, chosen to smooth lifetime tax rather than to minimize the current return.",
      },
      {
        title: "Social Security timing",
        body: "Claiming analysis run against your own longevity assumptions and, for couples, the survivor benefit that outlives the first claim.",
      },
      {
        title: "Charitable strategy",
        body: "Donor-advised fund bunching, appreciated-share gifting and qualified charitable distributions, timed to the years they are worth the most.",
      },
      {
        title: "Annual return coordination",
        body: "We work directly with your CPA, deliver a tax-planning memo each autumn, and review the filed return each spring for what to change.",
      },
    ],
  },
] as const;

/* ----------------------------------------------------------- philosophy -- */

export const philosophy = [
  {
    title: "Evidence over narrative",
    body: "Allocation decisions come from long-run evidence about how asset classes behave, not from a view on the next two quarters. We have no house forecast, because we have never found one worth charging for.",
  },
  {
    title: "After-tax is the only return",
    body: "A pre-tax number is a marketing figure. Asset location, harvesting, holding periods and withdrawal order are treated as part of the investment process, not as a clean-up exercise in April.",
  },
  {
    title: "Cost compounds in both directions",
    body: "We build with broad, low-cost funds and hold them. Turnover is a cost, spreads are a cost, and our own fee is a cost — so we publish it plainly and let it decline as a relationship grows.",
  },
  {
    title: "Fewer, better decisions",
    body: "Most of the value in this work sits in a handful of choices: how much risk, in what accounts, funded in what order. We spend our time there, and leave the rest alone.",
  },
] as const;

export const notDoing = [
  "We do not sell insurance, annuities or proprietary products.",
  "We do not accept commissions, referral fees or revenue sharing.",
  "We do not time markets or run tactical overlays.",
  "We do not lock clients into contracts. Leave with 30 days' notice.",
] as const;

/* ----------------------------------------------------------------- team -- */

export const team = [
  {
    name: "Maya Lindqvist, CFA",
    role: "Founder & Chief Investment Officer",
    initials: "ML",
    bio: "Founded Arthiq in 2016 after eleven years building multi-asset portfolios at a Bay Area endowment. Chairs the investment committee and owns the allocation framework every client portfolio is built from.",
    detail: "Previously: multi-asset portfolio management, university endowment. CFA charterholder.",
  },
  {
    name: "Daniel Okonkwo, CFP®",
    role: "Partner, Head of Planning",
    initials: "DO",
    bio: "Leads the planning practice and the projection model behind it. Joined from a national wealth manager where the planning process, in their words, produced beautiful documents nobody opened twice.",
    detail: "Previously: senior planner, national RIA. CERTIFIED FINANCIAL PLANNER™ professional.",
  },
  {
    name: "Priya Raman, CPA",
    role: "Director of Tax Strategy",
    initials: "PR",
    bio: "Runs multi-year projections, conversion sequencing and charitable timing, and coordinates directly with each client's CPA through filing season.",
    detail: "Previously: private client tax, Big Four. Licensed CPA in California.",
  },
  {
    name: "Thomas Auger, CFA",
    role: "Portfolio Manager",
    initials: "TA",
    bio: "Implements the allocation day to day: harvesting, rebalancing bands, direct indexing and the trade blotter. Watches drift so clients do not have to.",
    detail: "Previously: fixed income trading desk. CFA charterholder.",
  },
  {
    name: "Grace Whitfield",
    role: "Director of Client Experience",
    initials: "GW",
    bio: "Owns onboarding, transfers and the reporting clients actually read. Has moved more than 300 accounts between custodians without losing a cost basis yet.",
    detail: "Previously: client operations, independent RIA.",
  },
  {
    name: "Ben Ortiz",
    role: "Associate Adviser",
    initials: "BO",
    bio: "Supports planning work across the practice, prepares projection updates ahead of annual reviews, and is the first person most clients reach on a weekday morning.",
    detail: "Previously: financial planning analyst. CFP® candidate.",
  },
] as const;

/* --------------------------------------------------------------- process -- */

export const process = [
  {
    step: "01",
    title: "Introductory call",
    duration: "45 minutes",
    body: "A conversation, not a pitch. What you own, what you are deciding, and whether we are the right firm for it. No documents required.",
  },
  {
    step: "02",
    title: "Financial review",
    duration: "2 weeks",
    body: "We read your statements, tax returns and estate documents, then come back with what we see — including anything already working well.",
  },
  {
    step: "03",
    title: "Plan & portfolio proposal",
    duration: "1 session",
    body: "The projection, the proposed allocation, the transition cost in realized gains, and our fee. Everything on one page before anything moves.",
  },
  {
    step: "04",
    title: "Transition",
    duration: "3–6 weeks",
    body: "Accounts move in kind to your custodian. We stage sales across tax years where it saves you money, and you approve every realized gain.",
  },
  {
    step: "05",
    title: "Ongoing",
    duration: "Continuous",
    body: "Quarterly reporting, an autumn tax memo, an annual plan update, and a direct line the rest of the year.",
  },
] as const;

/* ---------------------------------------------------------- testimonials -- */

export const testimonials = [
  {
    quote:
      "We came in with nine accounts at four institutions and no idea what we actually owned. Six weeks later it was one portfolio, and the tax bill on the transition was smaller than the fee.",
    name: "R. and J. Whitmore",
    detail: "Clients since 2021 · Palo Alto",
  },
  {
    quote:
      "The conversion schedule they built has saved us more than their fee every year since. Nobody had ever shown us the bracket math on a single page before.",
    name: "Karen Ellsworth",
    detail: "Client since 2019 · Marin County",
  },
  {
    quote:
      "What I value most is what they talk me out of. Twice now they have told me a move was not worth the tax, which is not what my last advisor was paid to say.",
    name: "Marcus Delgado",
    detail: "Client since 2018 · San Francisco",
  },
] as const;

export const testimonialDisclosure =
  "The statements above are from current clients of Arthiq Wealth Management, LLC. No cash or non-cash compensation was provided in exchange for these statements. A client's experience is not necessarily representative of the experience of other clients, and these statements are not a guarantee of any future result or outcome. Because these individuals are clients, a material conflict of interest exists: clients have an incentive to describe their experience favorably. Names shown are illustrative placeholders for design purposes.";

/* ------------------------------------------------------------------ faq -- */

export const faqs = [
  {
    q: "Is there an account minimum?",
    a: "We generally work with households above $1.5 million in investable assets, which is where our planning work tends to pay for itself. It is a guideline rather than a rule — if your situation is a fit, the number is negotiable, and we will say so on the first call.",
  },
  {
    q: "How exactly are you paid?",
    a: "A single annual fee, charged quarterly as a percentage of assets we manage, starting at 0.65% and declining at each breakpoint above $3 million. That is our only source of revenue. We receive no commissions, no referral payments, no revenue sharing and no compensation of any kind from fund providers.",
  },
  {
    q: "Are you a fiduciary all of the time?",
    a: "Yes. Arthiq is a registered investment adviser and owes a fiduciary duty of care and loyalty to every client in every interaction. That standard does not switch off when a product is discussed, because we do not sell products.",
  },
  {
    q: "Who actually holds my money?",
    a: "Your assets are custodied at Schwab Advisor Services in accounts titled in your name. Arthiq never takes possession of client funds. We have trading and fee-deduction authority; we cannot move money to a third party.",
  },
  {
    q: "How long does it take to switch from my current advisor?",
    a: "Three to six weeks in most cases. Accounts transfer in kind wherever possible, so you stay invested through the move. We handle the paperwork with your current firm, and we will tell you before the transition what it costs in realized gains.",
  },
  {
    q: "What will the tax bill be to move my portfolio?",
    a: "We calculate it before you commit and show it in the proposal. In taxable accounts we usually keep low-basis positions rather than sell them, then work the portfolio toward its target over several tax years using new contributions and harvested losses.",
  },
  {
    q: "How often will we actually talk?",
    a: "Formally: an annual plan review, an autumn tax-planning session and quarterly reporting. Informally, as often as you need — there is no meter running, and we would rather hear about a decision before you make it.",
  },
  {
    q: "What happens if I want to leave?",
    a: "Thirty days' written notice, no termination fee, no surrender charges, nothing to unwind. The accounts are already in your name; you tell the custodian who advises them.",
  },
] as const;

/* -------------------------------------------------------------- insights -- */

export type Article = {
  slug: string;
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
    slug: "the-window-between-retirement-and-rmds",
    title: "The window between retirement and required distributions",
    dek: "For most households the lowest-tax years of an entire lifetime arrive uninvited, last about a decade, and are usually spent doing nothing.",
    category: "Tax planning",
    date: "2026-07-14",
    displayDate: "July 14, 2026",
    readingTime: "6 min read",
    author: "Priya Raman, CPA",
    body: [
      "There is a stretch in most financial lives that almost nobody plans for. Employment income has stopped. Social Security has not started, or has been deliberately deferred. Required minimum distributions are still years away. Taxable income, for the first time since early adulthood, is close to nothing.",
      "It is the cheapest tax environment a household will ever occupy, and it typically lasts somewhere between five and twelve years.",
      "Most people spend it drawing down their taxable brokerage account, because that is the intuitive order: spend the money you have already paid tax on, and leave the retirement accounts alone to grow. It feels disciplined. It is often the single most expensive default in retirement.",
      "The problem is what happens on the other side. Every dollar left in a traditional IRA keeps compounding into a balance that will eventually be forced out under the required distribution rules — and forced out on top of Social Security, on top of pension income, and at whatever bracket that combination produces. A household that carefully avoided the 12% bracket in its sixties can find itself permanently in the 24% bracket in its seventies, with no remaining flexibility.",
      "The alternative is to treat those empty years as capacity to be filled rather than a bill to be avoided. Deliberately realize income — through Roth conversions, or by harvesting long-term gains at the zero rate — up to the top of whichever bracket the projection says is cheap. Pay tax now, at a rate you have chosen, instead of later, at a rate the schedule chooses for you.",
      "Two constraints matter more than the bracket table itself. The first is IRMAA: the Medicare premium surcharge is a cliff, not a ramp, and crossing a threshold by a single dollar raises premiums for a full year. The second is the rate your beneficiaries will face. Under the ten-year distribution rule, an inherited traditional IRA typically lands on adult children during their peak earning years. If their bracket is higher than yours, converting at your rate is a transfer of value to them at a discount.",
      "None of this is a reason to convert everything. Filling a bracket is not the same as ignoring one, and conversions have a way of feeling productive well past the point where they are. The work is arithmetic: project the income, find the windows, size the conversions to the ceiling and stop.",
      "It is also the reason we build a year-by-year projection before we build a portfolio. You cannot see a window like this from a single year's return. You can only see it on a chart that runs to age ninety-five.",
    ],
  },
  {
    slug: "what-direct-indexing-is-actually-for",
    title: "What direct indexing is actually for",
    dek: "It is not a way to beat the index. It is a way to keep more of it — and only in a taxable account, only above a certain size.",
    category: "Portfolio construction",
    date: "2026-06-02",
    displayDate: "June 2, 2026",
    readingTime: "5 min read",
    author: "Thomas Auger, CFA",
    body: [
      "Direct indexing has picked up a marketing problem. Described badly, it sounds like an attempt to improve on the index by choosing among its members. That is not what it does, and a firm that pitches it that way is describing active management with a friendlier name.",
      "What direct indexing actually changes is granularity. Hold an index fund and you own one line item; when the market rises, that line rises, and there is nothing to harvest. Hold the same index as several hundred individual positions and the picture underneath is very different. In almost any year — including strong ones — a meaningful share of those positions is below its cost basis. Each one is a realizable loss.",
      "Those losses have a straightforward use. They offset realized gains elsewhere in the household: the diversification of a concentrated stock position, the rebalancing trade you would otherwise have deferred, the capital gain distribution from a fund you cannot control. Losses beyond that offset ordinary income up to the annual limit and carry forward indefinitely.",
      "The mechanism has real limits, and they are worth stating plainly. Harvesting defers tax; it does not erase it. Selling at a loss lowers your basis in the replacement, so the gain reappears later. The benefit is the value of the deferral, plus the rate arbitrage if you eventually realize at a lower rate or never realize at all because the position is donated or receives a step-up.",
      "The benefit also decays. A portfolio's harvesting yield is highest in its first few years, when positions are near their purchase price and dispersion around basis is wide. As the whole portfolio appreciates, fewer holdings sit below basis and there is less to harvest. Anyone modelling a constant annual benefit for twenty years is modelling something that does not happen.",
      "Which leaves a narrow but genuine set of conditions. It belongs only in taxable accounts — in an IRA there is no gain to offset and the entire exercise is pointless. It needs enough capital to hold the index with reasonable tracking error, which in practice means starting somewhere above half a million dollars. And it is worth most to households with gains to offset: a concentrated position, an anticipated liquidity event, a portfolio that needs to be moved toward its target over several years.",
      "Where all three hold, it is one of the few things in this business that reliably adds after-tax return without adding risk. Where they do not, it is an index fund with more moving parts and a higher fee.",
    ],
  },
  {
    slug: "rebalancing-bands-beat-calendars",
    title: "Rebalancing bands beat calendars",
    dek: "Rebalancing on a date is a decision made by a date. Rebalancing on drift is a decision made by the portfolio.",
    category: "Portfolio construction",
    date: "2026-04-21",
    displayDate: "April 21, 2026",
    readingTime: "4 min read",
    author: "Maya Lindqvist, CFA",
    body: [
      "Most portfolios are rebalanced on a schedule: quarterly, or annually, or whenever the review meeting happens to land. It is an easy policy to administer and a difficult one to defend, because the calendar has no information about the portfolio.",
      "A date-driven rebalance does two unhelpful things. It trades when nothing has moved, realizing gains and paying spreads to correct a drift of half a percent. And it waits when something has moved, leaving a portfolio meaningfully off target for months because the appointed day has not arrived.",
      "A band policy inverts that. Each asset class is given a tolerance around its target — five percentage points for a large allocation, proportionally tighter for a small one — and the portfolio is only traded when a class actually leaves its band. In a quiet year that may mean no rebalancing trades at all. In a volatile one it may mean three, each of them prompted by a real deviation.",
      "The risk control is better, because drift is bounded by the band rather than by the calendar. The trading is lower, because most quarters do not produce a breach. And in taxable accounts the difference compounds: every avoided trade is an unrealized gain that stays unrealized.",
      "The refinement that matters most is doing it with cash flows first. A dividend, a contribution or a scheduled withdrawal can be directed to the underweight or away from the overweight, correcting drift without a sale. In practice this handles a large share of rebalancing in accounts that are still receiving money, at no tax cost whatsoever.",
      "None of this is exotic. It is the difference between a policy that serves the portfolio and one that serves the operations calendar.",
    ],
  },
  {
    slug: "reading-your-own-tax-return",
    title: "Reading your own tax return",
    dek: "Four lines on a filed return tell you most of what a planner would want to know about the year you just had.",
    category: "Tax planning",
    date: "2026-03-09",
    displayDate: "March 9, 2026",
    readingTime: "5 min read",
    author: "Priya Raman, CPA",
    body: [
      "A filed return is usually treated as the end of something. It is more useful as a diagnostic — the single densest summary of a household's financial year that exists, and the document we read first when someone new comes in.",
      "Start with taxable income, and find the bracket it lands in. Not the marginal rate on the last dollar earned, but the distance to the top of the current bracket. That gap is the room available for a Roth conversion or a gain realization this year, and it is the number the entire planning conversation runs on.",
      "Then look at capital gain distributions from funds you did not sell. These are gains you were allocated by a manager's trading, and paid tax on without making a decision. A large figure here in a taxable account is a sign the portfolio is holding the wrong vehicles in the wrong place.",
      "Third, check whether you itemized or took the standard deduction. Households that take the standard deduction and still give to charity are usually giving inefficiently — the gift produces no tax benefit at all. Bunching several years of giving into one through a donor-advised fund fixes it, and costs nothing but timing.",
      "Fourth, look at qualified versus ordinary dividends, and at interest income. Ordinary income thrown off by holdings sitting in a taxable account, when the same holdings could sit in an IRA, is the clearest asset-location error there is, and one of the easiest to correct.",
      "Anyone can read these four lines on their own return in about ten minutes. Doing it in March, when the year is still young enough to change, is worth considerably more than doing it in December.",
    ],
  },
  {
    slug: "the-fee-conversation",
    title: "The fee conversation nobody starts",
    dek: "Advisory fees are quoted as a percentage and paid in dollars. The gap between those two framings is where a great deal hides.",
    category: "The firm",
    date: "2026-01-27",
    displayDate: "January 27, 2026",
    readingTime: "4 min read",
    author: "Daniel Okonkwo, CFP®",
    body: [
      "A fee of one percent sounds like a rounding error. On a four million dollar portfolio it is forty thousand dollars a year, deducted quarterly, and most clients never see it as a single number because it never appears as one.",
      "We think the number should be stated in dollars at least once a year, and we do it. Not because our fee is unusually low — it is ordinary for the work — but because a fee that is never expressed plainly is a fee that never has to justify itself.",
      "There is a second figure worth as much attention: total cost. The advisory fee is only part of it. Underlying fund expense ratios, trading spreads, custodial charges and the tax drag of unnecessary turnover all come out of the same return. A firm charging 0.75% while holding funds that cost 0.60% is more expensive than one charging 1.00% and holding funds that cost 0.04%.",
      "The third figure is what the fee replaces. If an advisory relationship consists of an annual meeting and a model portfolio, it is competing directly with a target-date fund that costs a tenth as much, and it will lose that comparison every time. The work has to be worth its price on its own terms — the conversion schedule, the harvesting, the asset location, the decision someone was talked out of.",
      "We publish our schedule, we show the dollar amount, and we would rather a prospective client run that comparison before signing than after. Some of them conclude they do not need us. That is a reasonable outcome, and it is a better one than discovering it in year four.",
    ],
  },
];

export const disclosures = [
  {
    title: "Investment advisory",
    body: "Arthiq Wealth Management, LLC is a registered investment adviser. Registration does not imply a certain level of skill or training, and does not constitute an endorsement by any securities regulator. Advisory services are offered only to residents of states in which the firm is registered or exempt from registration.",
  },
  {
    title: "No investment advice on this site",
    body: "Nothing on this website is investment, legal or tax advice, or an offer or solicitation to buy or sell any security. Content is general in nature and does not account for your objectives, financial situation or needs. Consult a qualified professional before acting on anything you read here.",
  },
  {
    title: "Performance and risk",
    body: "All investing involves risk, including the possible loss of principal. Past performance is not indicative of, and does not guarantee, future results. No strategy, including asset allocation, diversification or tax-loss harvesting, assures a profit or protects against loss in a declining market.",
  },
  {
    title: "Tax matters",
    body: "Arthiq does not prepare tax returns and does not provide legal advice. Tax strategies described here depend on individual circumstances and on tax law that may change. Coordinate with your CPA or attorney before implementing any strategy discussed on this site.",
  },
  {
    title: "Figures shown",
    body: "All statistics, holdings, performance figures, client names, team members and testimonials appearing on this site are illustrative placeholders created for design purposes. They do not represent actual accounts, actual persons or actual results.",
  },
] as const;
