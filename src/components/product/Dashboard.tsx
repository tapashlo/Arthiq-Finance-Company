"use client";

/**
 * The ArthIQ dashboard mock — the hero of the site.
 *
 * One panel, two tabs: the same discipline applied to a household's money and
 * to a company's. That switch is the whole positioning in a single control,
 * which is why it is the first thing on the page.
 *
 * Every series is generated deterministically at module scope so the server
 * and the client render identical markup. All figures are invented.
 */

import { useRef, useState } from "react";
import { Axis, Delta, Tile, VIZ } from "./panel";

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/* ------------------------------------------------------------- net worth -- */

const NET_WORTH_NOW = 186_420;
const NET_WORTH_YOY = 8.4;

/** Thirteen month-end observations: one year, inclusive of both ends. */
const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

/**
 * Net worth over the year the panel reports on.
 *
 * A noisy multiplicative walk, then tilted in log space so the line passes
 * exactly through both figures printed beside it: today's balance, and the
 * value a year back implied by the headline change. Removing the walk's own
 * trend between those two points and adding the desired one leaves the shape
 * intact and pins the ends, so the chart can never disagree with the numbers.
 */
const NET_WORTH = (() => {
  const rnd = lcg(90210);
  const n = MONTHS.length;
  const last = n - 1;

  const raw = [0];
  for (let i = 1; i < n; i++) {
    // A soft patch in the winter, so the line is not a straight ramp.
    const shock = i >= 5 && i <= 7 ? -0.021 : 0;
    raw.push(raw[i - 1] + Math.log(1 + 0.0074 + shock + (rnd() - 0.5) * 0.02));
  }

  const from = Math.log(NET_WORTH_NOW / (1 + NET_WORTH_YOY / 100));
  const to = Math.log(NET_WORTH_NOW);
  const slopeRaw = (raw[last] - raw[0]) / last;
  const slopeTgt = (to - from) / last;

  return raw.map((v, i) => Math.exp(v - (raw[0] + slopeRaw * i) + (from + slopeTgt * i)));
})();

const NW_TICKS = MONTHS.filter((_, i) => i % 3 === 0);

function NetWorthChart() {
  const W = 660;
  const H = 170;
  const P = { t: 10, r: 2, b: 6, l: 2 };
  const lo = Math.min(...NET_WORTH) * 0.985;
  const hi = Math.max(...NET_WORTH) * 1.01;
  const x = (i: number) => P.l + (i / (NET_WORTH.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - lo) / (hi - lo)) * (H - P.t - P.b);

  const line = NET_WORTH.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(NET_WORTH.length - 1).toFixed(1)} ${H - P.b} L${P.l} ${H - P.b} Z`;
  const endX = x(NET_WORTH.length - 1);
  const endY = y(NET_WORTH[NET_WORTH.length - 1]);

  return (
    <>
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Net worth over the last twelve months, ending at $${NET_WORTH_NOW.toLocaleString("en-US")}, up ${NET_WORTH_YOY}% over the past year.`}
    >
      <defs>
        <linearGradient id="nw-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-viz-mint)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--color-viz-mint)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0.25, 0.5, 0.75].map((f) => (
        <line
          key={f}
          x1={P.l}
          x2={W - P.r}
          y1={P.t + f * (H - P.t - P.b)}
          y2={P.t + f * (H - P.t - P.b)}
          stroke={VIZ.rule}
          strokeWidth="1"
        />
      ))}

      <path className="chart-area" d={area} fill="url(#nw-fill)" />
      <path
        className="chart-line"
        d={line}
        pathLength={1}
        fill="none"
        stroke={VIZ.mint}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle className="chart-halo" cx={endX} cy={endY} r="5" fill={VIZ.mint} />
      <circle cx={endX} cy={endY} r="4" fill={VIZ.mint} stroke="var(--color-panel)" strokeWidth="2" />

    </svg>
    <Axis labels={NW_TICKS} align="edge" />
    </>
  );
}

/* --------------------------------------------------------------- revenue -- */

const REV_MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

/** Monthly revenue against the board-approved budget, in thousands. */
const REVENUE = (() => {
  const rnd = lcg(31337);
  let budget = 612;
  return REV_MONTHS.map(() => {
    const b = budget;
    budget *= 1.031;
    // Mostly at or above plan, with two soft months — the shape a real year has.
    return { budget: b, actual: b * (0.955 + rnd() * 0.13) };
  });
})();

function RevenueChart() {
  const W = 660;
  const H = 172;
  // No side padding: the HTML axis below is an even grid across the full
  // width, and the bands have to line up with it exactly.
  const P = { t: 12, r: 0, b: 8, l: 0 };
  const max = Math.max(...REVENUE.map((d) => Math.max(d.actual, d.budget))) * 1.12;
  const band = (W - P.l - P.r) / REVENUE.length;
  const bw = band * 0.52;
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  const base = H - P.b;

  return (
    <>
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Monthly revenue against budget for the last twelve months. Nine months at or above plan."
    >
      <line x1={P.l} x2={W - P.r} y1={base} y2={base} stroke={VIZ.rule} strokeWidth="1" />

      {REVENUE.map((d, i) => {
        const cx = P.l + band * (i + 0.5);
        const ahead = d.actual >= d.budget;
        return (
          <g key={REV_MONTHS[i]}>
            {/* Budget shown as a ghost column, so "behind plan" is visible as a gap. */}
            <rect
              x={cx - bw / 2}
              y={y(d.budget)}
              width={bw}
              height={base - y(d.budget)}
              rx="3"
              fill="rgba(255,255,255,0.07)"
            />
            <rect
              className="chart-bar"
              style={{ animationDelay: `${300 + i * 55}ms` }}
              x={cx - bw / 2}
              y={y(d.actual)}
              width={bw}
              height={Math.max(2, base - y(d.actual))}
              rx="3"
              fill={ahead ? VIZ.blue : VIZ.coral}
              opacity={ahead ? 0.95 : 0.9}
            />
            {/* Plan marker — the line the column is trying to clear. */}
            <line
              x1={cx - bw / 2 - 3}
              x2={cx + bw / 2 + 3}
              y1={y(d.budget)}
              y2={y(d.budget)}
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1.5"
            />
          </g>
        );
      })}

    </svg>
    <Axis labels={REV_MONTHS} everyOnMobile={3} />
    </>
  );
}

/* ----------------------------------------------------------------- views -- */

const PERSONAL_TILES = [
  { label: "Income", value: "$14,850", delta: "+2.1%", dir: "up" as const, accent: VIZ.blue },
  { label: "Expenses", value: "$9,320", delta: "+6.4%", dir: "down" as const, accent: VIZ.amber },
  { label: "Free cash flow", value: "$5,530", delta: "−4.4%", dir: "down" as const, accent: VIZ.mint },
];

const BUSINESS_TILES = [
  { label: "Revenue", value: "$2.41M", delta: "+4.8%", dir: "up" as const, accent: VIZ.blue },
  { label: "Budget", value: "$2.30M", note: "Q3 plan", accent: VIZ.violet },
  { label: "Forecast", value: "$9.84M", note: "FY26", accent: VIZ.mint },
  { label: "Variance", value: "+$110K", delta: "Ahead", dir: "up" as const, accent: VIZ.amber },
];

const BUSINESS_ROWS = [
  { label: "Cash runway", value: "19 mo" },
  { label: "Expenses", value: "$1.86M" },
  { label: "Profit", value: "$548K" },
  { label: "Accounts receivable", value: "$412K" },
];

const TABS = [
  { id: "personal", label: "Personal" },
  { id: "business", label: "Business" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Dashboard({ className = "" }: { className?: string }) {
  const [tab, setTab] = useState<TabId>("personal");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Roving arrow-key selection, which is what role="tab" promises a screen
  // reader the control will do.
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const next =
      e.key === "ArrowRight" ? (i + 1) % TABS.length
      : e.key === "ArrowLeft" ? (i - 1 + TABS.length) % TABS.length
      : null;
    if (next === null) return;
    e.preventDefault();
    setTab(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className={`panel on-panel overflow-hidden ${className}`}>
      <header className="flex items-center gap-3 border-b border-[color:var(--color-panel-rule)] px-4 py-3 sm:px-5 sm:py-4">
        <span aria-hidden="true" className="hidden shrink-0 gap-1.5 sm:flex">
          {[VIZ.coral, VIZ.amber, VIZ.mint].map((c) => (
            <span key={c} className="block h-2.5 w-2.5 rounded-full opacity-60" style={{ backgroundColor: c }} />
          ))}
        </span>

        <div className="seg shrink-0" role="tablist" aria-label="Dashboard view">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`dash-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`dash-panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`label ${tab === t.id ? "bg-white text-[color:var(--color-panel)]" : "text-white/55 hover:text-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <span className="label-sm ml-auto shrink-0 text-white/35">August 2026</span>
      </header>

      <div className="p-4 sm:p-6">
        {tab === "personal" ? (
          <div key="personal" className="panel-in" role="tabpanel" id="dash-panel-personal" aria-labelledby="dash-tab-personal">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <div>
                <div className="label-sm text-white/45">Net worth</div>
                <div className="tnum display mt-2.5 text-3xl leading-none text-white sm:text-4xl">
                  ${NET_WORTH_NOW.toLocaleString("en-US")}
                </div>
              </div>
              <div className="flex items-center gap-2 pb-1">
                <Delta value={`${NET_WORTH_YOY}%`} dir="up" />
                <span className="text-xs text-white/40">past 12 months</span>
              </div>
            </div>

            <div className="mt-4">
              <NetWorthChart />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {PERSONAL_TILES.map((t) => (
                <Tile key={t.label} {...t} />
              ))}
            </div>
          </div>
        ) : (
          <div key="business" className="panel-in" role="tabpanel" id="dash-panel-business" aria-labelledby="dash-tab-business">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {BUSINESS_TILES.map((t) => (
                <Tile key={t.label} {...t} />
              ))}
            </div>

            <div className="mt-4">
              <RevenueChart />
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-6 border-t border-[color:var(--color-panel-rule)] pt-4 sm:grid-cols-4">
              {BUSINESS_ROWS.map((r) => (
                <div key={r.label} className="flex min-w-0 items-baseline justify-between gap-2 py-1.5">
                  <dt className="truncate text-xs text-white/45">{r.label}</dt>
                  <dd className="tnum shrink-0 text-sm font-semibold text-white">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
