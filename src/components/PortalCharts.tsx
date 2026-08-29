import { arrSeries, spend } from "@/lib/portal";

const W = 900;
const H = 280;
const PAD = { top: 24, right: 10, bottom: 32, left: 10 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const LO = Math.min(...arrSeries) * 0.92;
const HI = Math.max(...arrSeries) * 1.05;

const px = (i: number) => PAD.left + (i / (arrSeries.length - 1)) * PLOT_W;
const py = (v: number) => PAD.top + (1 - (v - LO) / (HI - LO)) * PLOT_H;

const PTS = arrSeries.map((v, i) => [px(i), py(v)] as const);

const line = (() => {
  let d = `M${PTS[0][0].toFixed(1)} ${PTS[0][1].toFixed(1)}`;
  for (let i = 0; i < PTS.length - 1; i++) {
    const [x0, y0] = PTS[i];
    const [x1, y1] = PTS[i + 1];
    const h = (x1 - x0) / 3;
    d += `C${(x0 + h).toFixed(1)} ${y0.toFixed(1)} ${(x1 - h).toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d;
})();

export function ArrChart() {
  const end = PTS[PTS.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
      aria-label={`ARR over 24 months, from $${(arrSeries[0] / 1e6).toFixed(2)} million to $${(arrSeries[arrSeries.length - 1] / 1e6).toFixed(2)} million.`}>
      <defs>
        <linearGradient id="arr-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g aria-hidden="true">
        {[0.25, 0.5, 0.75, 1].map((f) => {
          const v = LO + (HI - LO) * f;
          return (
            <g key={f}>
              <line x1={PAD.left} x2={W - PAD.right} y1={py(v)} y2={py(v)} stroke="var(--color-rule-soft)" strokeWidth="1" />
              <text x={PAD.left + 2} y={py(v) - 6} fontSize="11" className="tnum" fill="var(--color-ink-faint)">
                ${(v / 1e6).toFixed(1)}M
              </text>
            </g>
          );
        })}
      </g>
      <path d={`${line}L${PTS[PTS.length - 1][0].toFixed(1)} ${H - PAD.bottom}L${PTS[0][0].toFixed(1)} ${H - PAD.bottom}Z`}
        className="chart-area" fill="url(#arr-fill)" />
      <path d={line} pathLength={1} className="chart-line" fill="none" stroke="var(--color-blue)"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <g className="chart-node" style={{ animationDelay: "2.2s" }}>
        <circle className="chart-halo" cx={end[0]} cy={end[1]} r="5" fill="var(--color-blue)" />
        <circle cx={end[0]} cy={end[1]} r="5" fill="#fff" />
        <circle cx={end[0]} cy={end[1]} r="3.5" fill="var(--color-blue)" />
      </g>
      <g aria-hidden="true" fontSize="11" fill="var(--color-ink-faint)">
        {["24mo ago", "18mo", "12mo", "6mo", "Now"].map((t, i) => (
          <text key={t} x={PAD.left + (i / 4) * PLOT_W} y={H - 8}
            textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}>{t}</text>
        ))}
      </g>
    </svg>
  );
}

/** Horizontal budget-vs-actual bars. Over budget reads red. */
export function SpendBars() {
  const max = Math.max(...spend.flatMap((s) => [s.budget, s.actual]));
  return (
    <ul className="space-y-5">
      {spend.map((s) => {
        const over = s.actual > s.budget;
        const variance = s.budget - s.actual;
        return (
          <li key={s.dept}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[0.9375rem] text-navy">{s.dept}</span>
              <span className={`tnum text-[0.875rem] font-medium ${over ? "text-loss" : "text-gain"}`}>
                {over ? "−" : "+"}${Math.abs(variance / 1000).toFixed(0)}K
              </span>
            </div>
            <div className="relative mt-2.5 h-2.5 rounded-full bg-canvas-deep">
              {/* Budget marker sits on top of the actual fill. */}
              <div className={`absolute inset-y-0 left-0 rounded-full ${over ? "bg-loss" : "bg-blue"}`}
                style={{ width: `${(s.actual / max) * 100}%` }} />
              <div aria-hidden="true" className="absolute inset-y-[-3px] w-0.5 rounded bg-navy"
                style={{ left: `${(s.budget / max) * 100}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
