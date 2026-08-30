/**
 * ArthIQ Personal — the four views the household side of the product is built
 * around: what you keep, where it goes, what you are saving for, and what you
 * owe.
 *
 * Figures agree with each other on purpose. The category deltas here are the
 * same ones the Ask ArthIQ example explains, and the monthly totals are the
 * ones on the hero dashboard, so a reader who checks finds one household
 * rather than four unrelated mock-ups. All of it is invented.
 */

import { Axis, Delta, PanelHead, VIZ } from "./panel";

/* ------------------------------------------------------------- cash flow -- */

const CF_MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

/** Income split into what went out and what stayed. August ties to the hero. */
const CASH_FLOW = [
  { income: 14_180, spend: 8_640 },
  { income: 14_180, spend: 9_010 },
  { income: 14_320, spend: 9_880 },
  { income: 16_940, spend: 11_260 },
  { income: 14_320, spend: 8_420 },
  { income: 14_320, spend: 8_150 },
  { income: 14_540, spend: 8_760 },
  { income: 14_540, spend: 9_140 },
  { income: 14_540, spend: 8_390 },
  { income: 14_850, spend: 8_980 },
  { income: 14_850, spend: 8_710 },
  { income: 14_850, spend: 9_320 },
].map((m) => ({ ...m, free: m.income - m.spend }));

const AVG_FREE = Math.round(CASH_FLOW.reduce((a, m) => a + m.free, 0) / CASH_FLOW.length);

export function CashFlowPanel() {
  const W = 660;
  const H = 192;
  // No side padding: the HTML axis below is an even grid across the full
  // width, and the bands have to line up with it exactly.
  const P = { t: 14, r: 0, b: 8, l: 0 };
  const max = Math.max(...CASH_FLOW.map((m) => m.income)) * 1.08;
  const band = (W - P.l - P.r) / CASH_FLOW.length;
  const bw = band * 0.54;
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  const base = H - P.b;

  return (
    <div className="panel on-panel overflow-hidden">
      <PanelHead title="Cash flow" meta="Trailing 12 months" />
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <div className="label-sm text-white/45">Free cash flow, August</div>
            <div className="tnum display mt-2.5 text-3xl leading-none text-white sm:text-4xl">$5,530</div>
          </div>
          <div className="pb-1 text-right">
            <div className="tnum text-sm text-white/70">${AVG_FREE.toLocaleString("en-US")}</div>
            <div className="label-sm mt-1.5 text-white/40">12-month average</div>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-4 h-auto w-full"
          role="img"
          aria-label="Monthly income split into spending and free cash flow, over the last twelve months."
        >
          <line x1={P.l} x2={W - P.r} y1={base} y2={base} stroke={VIZ.rule} strokeWidth="1" />

          {CASH_FLOW.map((m, i) => {
            const cx = P.l + band * (i + 0.5);
            return (
              <g key={CF_MONTHS[i]} className="chart-bar" style={{ animationDelay: `${140 + i * 55}ms` }}>
                <rect
                  x={cx - bw / 2}
                  y={y(m.spend)}
                  width={bw}
                  height={base - y(m.spend)}
                  rx="3"
                  fill="rgba(255,255,255,0.13)"
                />
                <rect
                  x={cx - bw / 2}
                  y={y(m.income)}
                  width={bw}
                  height={y(m.spend) - y(m.income)}
                  rx="3"
                  fill={VIZ.mint}
                  opacity="0.92"
                />
              </g>
            );
          })}

        </svg>

        <Axis labels={CF_MONTHS} everyOnMobile={3} />

        <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[color:var(--color-panel-rule)] pt-4">
          <Key colour={VIZ.mint} label="Kept" />
          <Key colour="rgba(255,255,255,0.2)" label="Spent" />
        </ul>
      </div>
    </div>
  );
}

function Key({ colour, label }: { colour: string; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: colour }} />
      <span className="label-sm text-white/50">{label}</span>
    </li>
  );
}

/* ------------------------------------------------------------ categories -- */

const CATEGORIES: {
  name: string;
  amount: number;
  colour: string;
  delta?: string;
  dir: "up" | "down" | "flat";
}[] = [
  { name: "Housing", amount: 2_850, colour: VIZ.blue, dir: "flat" as const },
  { name: "Food and dining", amount: 1_410, colour: VIZ.mint, delta: "+$310", dir: "down" as const },
  { name: "Travel", amount: 1_180, colour: VIZ.violet, delta: "+$780", dir: "down" as const },
  { name: "Everything else", amount: 1_300, colour: "rgba(255,255,255,0.22)", delta: "−$90", dir: "up" as const },
  { name: "Transport", amount: 840, colour: VIZ.amber, delta: "+$60", dir: "down" as const },
  { name: "Utilities", amount: 690, colour: VIZ.coral, delta: "+$190", dir: "down" as const },
  { name: "Health", amount: 640, colour: VIZ.blue, delta: "−$120", dir: "up" as const },
  { name: "Subscriptions", amount: 410, colour: VIZ.violet, delta: "+$110", dir: "down" as const },
];

const SPEND_TOTAL = CATEGORIES.reduce((a, c) => a + c.amount, 0);
const SPEND_MAX = Math.max(...CATEGORIES.map((c) => c.amount));

export function CategoriesPanel() {
  return (
    <div className="panel on-panel overflow-hidden">
      <PanelHead title="Where it went" meta="August 2026" />
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div className="tnum display text-3xl leading-none text-white sm:text-4xl">
            ${SPEND_TOTAL.toLocaleString("en-US")}
          </div>
          <div className="flex items-center gap-2 pb-1">
            <Delta value="+$1,240" dir="down" />
            <span className="text-xs text-white/40">vs 6-month average</span>
          </div>
        </div>

        <ul className="mt-5 space-y-3.5">
          {CATEGORIES.map((c) => (
            <li key={c.name}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate text-sm text-white/80">{c.name}</span>
                <span className="flex shrink-0 items-baseline gap-2.5">
                  {c.delta && <Delta value={c.delta} dir={c.dir} />}
                  <span className="tnum text-sm font-semibold text-white">
                    ${c.amount.toLocaleString("en-US")}
                  </span>
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(c.amount / SPEND_MAX) * 100}%`, backgroundColor: c.colour }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- goals -- */

const GOALS = [
  { name: "Emergency fund", saved: 24_640, target: 28_000, eta: "Full in February 2027", status: "On track" as const },
  { name: "House deposit", saved: 61_800, target: 150_000, eta: "On track for November 2028", status: "On track" as const },
  { name: "Sabbatical", saved: 8_700, target: 30_000, eta: "Four months later than planned", status: "Behind" as const },
  { name: "College fund", saved: 19_400, target: 120_000, eta: "On track for 2039", status: "On track" as const },
];

export function GoalsPanel() {
  return (
    <div className="panel on-panel overflow-hidden">
      <PanelHead title="Goals" meta="Updated nightly" />
      <div className="p-4 sm:p-6">
        <ul className="space-y-5">
          {GOALS.map((g) => {
            const pct = Math.round((g.saved / g.target) * 100);
            const behind = g.status === "Behind";
            return (
              <li key={g.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-white">{g.name}</span>
                  <span className="tnum text-sm text-white/70">
                    ${g.saved.toLocaleString("en-US")}
                    <span className="text-white/35"> / ${g.target.toLocaleString("en-US")}</span>
                  </span>
                </div>
                <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: behind ? VIZ.amber : VIZ.mint,
                    }}
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="label-sm"
                    style={{ color: behind ? VIZ.amber : VIZ.mint }}
                  >
                    {pct}% · {g.status}
                  </span>
                  <span className="min-w-0 truncate text-xs text-white/40">{g.eta}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ debt -- */

const DEBTS = [
  { name: "Auto loan", balance: 18_400, rate: "6.9%", min: "$420" },
  { name: "Student loan", balance: 21_900, rate: "4.5%", min: "$260" },
  { name: "Card — travel", balance: 4_180, rate: "22.4%", min: "$110" },
];

const DEBT_TOTAL = DEBTS.reduce((a, d) => a + d.balance, 0);

const STRATEGIES = [
  { name: "Highest rate first", interest: 6_140, time: "4 yr 2 mo", best: true },
  { name: "Smallest balance first", interest: 7_020, time: "4 yr 5 mo", best: false },
];

export function DebtPanel() {
  const worst = Math.max(...STRATEGIES.map((s) => s.interest));

  return (
    <div className="panel on-panel overflow-hidden">
      <PanelHead title="Debt" meta="3 accounts" />
      <div className="p-4 sm:p-6">
        <div className="tnum display text-3xl leading-none text-white sm:text-4xl">
          ${DEBT_TOTAL.toLocaleString("en-US")}
        </div>
        <p className="mt-2 text-xs text-white/40">Total owed across all accounts</p>

        <ul className="mt-5 divide-y divide-[color:var(--color-panel-rule)] border-y border-[color:var(--color-panel-rule)]">
          {DEBTS.map((d) => (
            <li key={d.name} className="flex items-center justify-between gap-3 py-3">
              <span className="min-w-0">
                <span className="block truncate text-sm text-white/85">{d.name}</span>
                <span className="tnum mt-1 block text-xs text-white/40">
                  {d.rate} · {d.min} minimum
                </span>
              </span>
              <span className="tnum shrink-0 text-sm font-semibold text-white">
                ${d.balance.toLocaleString("en-US")}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <p className="label-sm text-white/45">Payoff order, priced</p>
          <ul className="mt-3.5 space-y-3">
            {STRATEGIES.map((s) => (
              <li key={s.name}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="min-w-0 truncate text-sm text-white/80">{s.name}</span>
                  <span className="tnum shrink-0 text-sm text-white">
                    ${s.interest.toLocaleString("en-US")}
                    <span className="text-white/35"> · {s.time}</span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(s.interest / worst) * 100}%`,
                      backgroundColor: s.best ? VIZ.mint : VIZ.coral,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-white/45">
            Paying the 22.4% card first saves $880 in interest and clears three
            months sooner. The other order closes an account in year one, which
            is worth something too — this is the trade, priced.
          </p>
        </div>
      </div>
    </div>
  );
}
