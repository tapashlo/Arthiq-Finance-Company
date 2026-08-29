/**
 * Hero: revenue against plan.
 *
 * The canonical FP&A chart — what you said you would do, what you actually
 * did, and the gap. Ghost bars are plan, solid bars are actual, and the line
 * is cumulative variance against plan.
 *
 * Series generated deterministically at module scope so server and client
 * render identically. Figures are illustrative.
 */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Row = { month: string; plan: number; actual: number };

const ROWS: Row[] = (() => {
  const rnd = lcg(20260901);
  let plan = 640_000;
  const out: Row[] = [];
  for (let i = 0; i < 12; i++) {
    // Plan compounds steadily; actual wobbles around it, soft mid-year.
    // Slightly ahead of plan overall, with a soft patch mid-year — the shape
    // of a company that is executing, not one that misses every month.
    const drag = i >= 4 && i <= 6 ? -0.055 : 0;
    const actual = plan * (1 + drag + (rnd() - 0.1) * 0.085);
    out.push({ month: MONTHS[i], plan, actual });
    plan *= 1.038;
  }
  return out;
})();

const totalPlan = ROWS.reduce((a, r) => a + r.plan, 0);
const totalActual = ROWS.reduce((a, r) => a + r.actual, 0);
const attainment = (totalActual / totalPlan) * 100;
const variance = totalActual - totalPlan;

/** Running variance, as a share of cumulative plan. */
const CUM = (() => {
  let p = 0;
  let a = 0;
  return ROWS.map((r) => {
    p += r.plan;
    a += r.actual;
    return ((a - p) / p) * 100;
  });
})();

const W = 840;
const H = 430;
const PAD = { top: 40, right: 66, bottom: 46, left: 10 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const MAX = Math.max(...ROWS.flatMap((r) => [r.plan, r.actual])) * 1.14;

const slot = PLOT_W / ROWS.length;
const barW = Math.min(slot * 0.34, 26);
const bx = (i: number) => PAD.left + slot * (i + 0.5);
const by = (v: number) => PAD.top + (1 - v / MAX) * PLOT_H;

const vMax = Math.max(...CUM.map(Math.abs), 3);
const vy = (v: number) => PAD.top + PLOT_H * 0.5 - (v / vMax) * (PLOT_H * 0.34);

const varPath = CUM.map((v, i) => `${i ? "L" : "M"}${bx(i).toFixed(1)} ${vy(v).toFixed(1)}`).join("");

const money = (n: number) => `$${(n / 1_000_000).toFixed(2)}M`;

export function HeroChart() {
  return (
    <figure className="overflow-hidden rounded-xl border border-rule bg-white shadow-deep">
      <figcaption className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-rule px-6 pt-6 pb-5 md:px-8">
        <div>
          <p className="label flex items-center gap-2.5 text-ink-faint">
            <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-blue" />
            Revenue vs plan · FY26
          </p>
          <p className="display mt-3.5 text-xl text-navy md:text-2xl">
            What you planned, what landed
          </p>
        </div>
        <div className="flex items-end gap-7">
          <div>
            <p className="tnum display text-3xl leading-none text-navy md:text-4xl">
              {attainment.toFixed(1)}%
            </p>
            <p className="label mt-2.5 text-ink-faint">Of plan</p>
          </div>
          <div>
            <p className={`tnum display text-3xl leading-none md:text-4xl ${variance >= 0 ? "text-gain" : "text-loss"}`}>
              {variance >= 0 ? "+" : "−"}{money(Math.abs(variance))}
            </p>
            <p className="label mt-2.5 text-ink-faint">Variance</p>
          </div>
        </div>
      </figcaption>

      <div className="px-3 pt-3 pb-1">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
          aria-label={`Monthly revenue against plan for FY26, finishing at ${attainment.toFixed(1)} percent of plan, a variance of ${money(variance)}.`}>
          <g aria-hidden="true">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <g key={f}>
                <line x1={PAD.left} x2={W - PAD.right + 8} y1={by(MAX * f)} y2={by(MAX * f)}
                  stroke="var(--color-rule-soft)" strokeWidth="1" />
                <text x={W - PAD.right + 18} y={by(MAX * f) + 4} fontSize="12" fill="var(--color-ink-faint)" className="tnum">
                  ${((MAX * f) / 1000).toFixed(0)}K
                </text>
              </g>
            ))}
          </g>

          {ROWS.map((r, i) => {
            const ahead = r.actual >= r.plan;
            return (
              <g key={r.month}>
                {/* Plan — ghost bar behind */}
                <rect x={bx(i) - barW} y={by(r.plan)} width={barW * 2} height={PAD.top + PLOT_H - by(r.plan)}
                  rx="3" fill="var(--color-canvas-deep)" className="chart-bar"
                  style={{ animationDelay: `${i * 45}ms`, transformOrigin: "bottom" }} />
                {/* Actual — solid, narrower, in front */}
                <rect x={bx(i) - barW * 0.56} y={by(r.actual)} width={barW * 1.12}
                  height={PAD.top + PLOT_H - by(r.actual)} rx="3"
                  fill={ahead ? "var(--color-blue)" : "var(--color-loss)"}
                  className="chart-bar" style={{ animationDelay: `${180 + i * 45}ms`, transformOrigin: "bottom" }} />
              </g>
            );
          })}

          {/* Cumulative variance */}
          <line x1={PAD.left} x2={W - PAD.right + 8} y1={vy(0)} y2={vy(0)}
            stroke="var(--color-navy)" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
          <path d={varPath} pathLength={1} className="chart-line" fill="none"
            stroke="var(--color-navy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <g className="chart-node" style={{ animationDelay: "2.2s" }}>
            <circle className="chart-halo" cx={bx(11)} cy={vy(CUM[11])} r="6" fill="var(--color-navy)" />
            <circle cx={bx(11)} cy={vy(CUM[11])} r="5" fill="#fff" />
            <circle cx={bx(11)} cy={vy(CUM[11])} r="3.5" fill="var(--color-navy)" />
          </g>

          <g aria-hidden="true" fontSize="12" fill="var(--color-ink-faint)">
            {ROWS.map((r, i) => (
              <text key={r.month} x={bx(i)} y={H - 16} textAnchor="middle">{r.month}</text>
            ))}
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-rule px-6 py-4 md:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Key className="bg-canvas-deep" label="Plan" />
          <Key className="bg-blue" label="Actual, at or above" />
          <Key className="bg-loss" label="Actual, below" />
          <Key className="bg-navy" label="Cumulative variance" />
        </div>
        <p className="label-sm text-ink-faint">Illustrative</p>
      </div>
    </figure>
  );
}

function Key({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[0.8125rem] text-ink-faint">
      <span aria-hidden="true" className={`block h-2.5 w-2.5 rounded-sm ${className}`} />
      {label}
    </span>
  );
}
