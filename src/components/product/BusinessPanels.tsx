/**
 * ArthIQ Business and FP&A — the two panels that carry those pages.
 *
 * The scenario figures tie to the Ask ArthIQ example that explains them: the
 * same $6.3M of cash, the same $332K base burn, the same $118K a month that a
 * ten percent revenue miss adds. If a reader checks one against the other they
 * find the same company. All of it is invented.
 */

import { Axis, PanelHead, VIZ } from "./panel";

/* ----------------------------------------------------------- P&L summary -- */

type Row = {
  label: string;
  actual: number;
  plan: number;
  /** Subtotals get a rule above and heavier type. */
  total?: boolean;
};

const PL: Row[] = [
  { label: "Revenue", actual: 2_410, plan: 2_300 },
  { label: "Cost of revenue", actual: -554, plan: -552 },
  { label: "Gross profit", actual: 1_856, plan: 1_748, total: true },
  { label: "Sales and marketing", actual: -642, plan: -610 },
  { label: "Research and development", actual: -868, plan: -820 },
  { label: "General and administrative", actual: -298, plan: -286 },
  { label: "Operating income", actual: 48, plan: 32, total: true },
];

const money = (v: number) =>
  v < 0 ? `(${Math.abs(v).toLocaleString("en-US")})` : v.toLocaleString("en-US");

export function ReportingPanel() {
  return (
    <div className="panel on-panel overflow-hidden">
      <PanelHead title="Profit and loss" meta="Q3 FY26 · $000s" />
      <div className="p-4 sm:p-6">
        <table className="w-full text-sm">
          <caption className="sr-only">
            Quarterly profit and loss against plan, in thousands of dollars.
          </caption>
          <thead>
            <tr className="label-sm text-white/40">
              <th scope="col" className="pb-3 text-left font-semibold">
                Line
              </th>
              <th scope="col" className="pb-3 text-right font-semibold">
                Actual
              </th>
              <th scope="col" className="hidden pb-3 text-right font-semibold sm:table-cell">
                Plan
              </th>
              <th scope="col" className="pb-3 text-right font-semibold">
                Var
              </th>
            </tr>
          </thead>
          <tbody className="tnum">
            {PL.map((r) => {
              const variance = r.actual - r.plan;
              // A smaller negative number is a cost overrun, not an improvement.
              const good = r.actual < 0 ? variance > 0 : variance >= 0;
              return (
                <tr
                  key={r.label}
                  className={
                    r.total
                      ? "border-t border-[color:var(--color-panel-rule)] font-semibold text-white"
                      : "text-white/75"
                  }
                >
                  <th
                    scope="row"
                    className={`py-2.5 pr-3 text-left font-normal ${r.total ? "font-semibold text-white" : "text-white/75"}`}
                  >
                    {r.label}
                  </th>
                  <td className="py-2.5 text-right whitespace-nowrap">{money(r.actual)}</td>
                  <td className="hidden py-2.5 text-right whitespace-nowrap text-white/45 sm:table-cell">
                    {money(r.plan)}
                  </td>
                  <td
                    className="py-2.5 text-right whitespace-nowrap"
                    style={{ color: good ? VIZ.mint : VIZ.coral }}
                  >
                    {variance >= 0 ? "+" : "−"}
                    {Math.abs(variance).toLocaleString("en-US")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="mt-5 border-t border-[color:var(--color-panel-rule)] pt-4 text-xs leading-relaxed text-white/45">
          Gross margin 77.0% against 76.0% planned. Operating income is ahead
          despite $92K of opex overrun, $68K of which is payroll timing rather
          than a change in the hiring plan.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- scenarios -- */

const CASH_NOW = 6_300; // $000s
const FLOOR = 2_000;
const HORIZON = 24; // months from August 2026

const SCENARIOS = [
  { name: "Upside", burn: 240, colour: VIZ.mint },
  { name: "Base", burn: 332, colour: VIZ.blue },
  { name: "Downside", burn: 450, colour: VIZ.coral },
] as const;

const TICKS = [
  { i: 0, label: "Aug 26" },
  { i: 6, label: "Feb 27" },
  { i: 12, label: "Aug 27" },
  { i: 18, label: "Feb 28" },
  { i: 24, label: "Aug 28" },
];

/** Months of runway, to one decimal, from a flat monthly burn. */
const runway = (burn: number) => CASH_NOW / burn;

export function ScenarioPanel() {
  const W = 660;
  const H = 218;
  const P = { t: 16, r: 2, b: 8, l: 2 };
  const max = CASH_NOW * 1.06;
  const x = (m: number) => P.l + (m / HORIZON) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);

  return (
    <div className="panel on-panel overflow-hidden">
      <PanelHead title="Cash runway by scenario" meta="$000s" />
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <div className="label-sm text-white/45">Runway, base case</div>
            <div className="tnum display mt-2.5 text-3xl leading-none text-white sm:text-4xl">
              19 months
            </div>
          </div>
          <div className="pb-1 text-right">
            <div className="tnum text-sm text-white/70">March 2028</div>
            <div className="label-sm mt-1.5 text-white/40">Cash-out date</div>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="mt-4 h-auto w-full"
          role="img"
          aria-label="Cash balance over twenty-four months under upside, base and downside scenarios, against a two million dollar board floor."
        >
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

          {/* Board floor. Crossing it is the event, not running out. */}
          <line
            x1={P.l}
            x2={W - P.r}
            y1={y(FLOOR)}
            y2={y(FLOOR)}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
          {SCENARIOS.map((s, si) => {
            // Stop each line at zero. A cash curve that continues below the
            // axis and recovers is the classic mock-up tell.
            const end = Math.min(HORIZON, runway(s.burn));
            const d = `M${x(0)} ${y(CASH_NOW)} L${x(end).toFixed(1)} ${y(Math.max(0, CASH_NOW - s.burn * end)).toFixed(1)}`;
            return (
              <g key={s.name}>
                <path
                  className="chart-line"
                  style={{ animationDelay: `${200 + si * 180}ms` }}
                  d={d}
                  pathLength={1}
                  fill="none"
                  stroke={s.colour}
                  strokeWidth={s.name === "Base" ? 3 : 2}
                  strokeLinecap="round"
                />
                {end < HORIZON && (
                  <circle
                    cx={x(end)}
                    cy={y(0)}
                    r="4"
                    fill={s.colour}
                    stroke="var(--color-panel)"
                    strokeWidth="2"
                  />
                )}
              </g>
            );
          })}

        </svg>

        <Axis labels={TICKS.map((t) => t.label)} align="edge" everyOnMobile={2} />

        <ul className="mt-5 grid gap-2 border-t border-[color:var(--color-panel-rule)] pt-4 sm:grid-cols-3">
          {SCENARIOS.map((s) => (
            <li key={s.name} className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.colour }}
              />
              <span className="label-sm text-white/55">{s.name}</span>
              <span className="tnum ml-auto text-sm text-white sm:ml-0">
                {runway(s.burn).toFixed(0)} mo
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3.5 flex items-center gap-2.5 text-xs text-white/45">
          <span aria-hidden="true" className="block h-px w-6 shrink-0 border-t border-dashed border-white/50" />
          ${(FLOOR / 1000).toFixed(1)}M board floor — the covenant, not zero
        </p>
      </div>
    </div>
  );
}
