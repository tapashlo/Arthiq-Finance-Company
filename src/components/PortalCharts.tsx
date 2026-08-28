import { allocation, performance } from "@/lib/portal";

const money = (n: number) =>
  `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/* ------------------------------------------------------ performance area -- */

const W = 900;
const H = 300;
const PAD = { top: 22, right: 8, bottom: 34, left: 8 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const LO = 2_200_000;
const HI = 4_400_000;

const px = (i: number) =>
  PAD.left + (i / (performance.length - 1)) * PLOT_W;
const py = (v: number) => PAD.top + (1 - (v - LO) / (HI - LO)) * PLOT_H;

const PTS = performance.map((v, i) => [px(i), py(v)] as const);

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

const area = `${line}L${PTS[PTS.length - 1][0].toFixed(1)} ${H - PAD.bottom}L${PTS[0][0].toFixed(1)} ${H - PAD.bottom}Z`;

const QUARTER_LABELS = ["2021", "2022", "2023", "2024", "2025", "2026"];

export function PerformanceChart() {
  const end = PTS[PTS.length - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Portfolio value from ${money(performance[0])} in 2021 to ${money(performance[performance.length - 1])} today.`}
    >
      <defs>
        <linearGradient id="portal-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-green-mid)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-green-mid)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <g aria-hidden="true">
        {[2_600_000, 3_200_000, 3_800_000, 4_400_000].map((v) => (
          <g key={v}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={py(v)}
              y2={py(v)}
              stroke="var(--color-rule-soft)"
              strokeWidth="1"
            />
            <text
              x={PAD.left + 2}
              y={py(v) - 7}
              className="ui tnum"
              fontSize="11.5"
              fill="var(--color-ink-faint)"
            >
              ${(v / 1_000_000).toFixed(1)}M
            </text>
          </g>
        ))}
      </g>

      <path d={area} className="chart-area" fill="url(#portal-area)" />
      <path
        d={line}
        pathLength={1}
        className="chart-line"
        fill="none"
        stroke="var(--color-green-mid)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g className="chart-node" style={{ animationDelay: "2.6s" }}>
        <circle className="chart-halo" cx={end[0]} cy={end[1]} r="5" fill="var(--color-green-bright)" />
        <circle cx={end[0]} cy={end[1]} r="4.5" fill="var(--color-paper)" />
        <circle cx={end[0]} cy={end[1]} r="3.25" fill="var(--color-green-bright)" />
      </g>

      <g aria-hidden="true" className="ui" fontSize="11.5" fill="var(--color-ink-faint)">
        {QUARTER_LABELS.map((label, i) => (
          <text
            key={label}
            x={PAD.left + (i / (QUARTER_LABELS.length - 1)) * PLOT_W}
            y={H - 10}
            textAnchor={i === 0 ? "start" : i === QUARTER_LABELS.length - 1 ? "end" : "middle"}
          >
            {label}
          </text>
        ))}
      </g>
    </svg>
  );
}

/* --------------------------------------------------------- allocation ring -- */

/** pathLength="100" lets every dash length be written directly as a percentage. */
export function AllocationRing() {
  let offset = 0;

  return (
    <svg
      viewBox="0 0 200 200"
      className="h-auto w-full max-w-[13rem]"
      role="img"
      aria-label={allocation
        .map((a) => `${a.name} ${a.actual} percent`)
        .join(", ")}
    >
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="var(--color-rule-soft)"
        strokeWidth="26"
      />
      <g transform="rotate(-90 100 100)">
        {allocation.map((slice) => {
          const dash = (
            <circle
              key={slice.name}
              cx="100"
              cy="100"
              r="72"
              pathLength={100}
              fill="none"
              stroke={slice.color}
              strokeWidth="26"
              strokeDasharray={`${slice.actual - 0.6} ${100 - slice.actual + 0.6}`}
              strokeDashoffset={-offset}
            />
          );
          offset += slice.actual;
          return dash;
        })}
      </g>
      <text
        x="100"
        y="96"
        textAnchor="middle"
        className="ui tnum"
        fontSize="15"
        fill="var(--color-ink-faint)"
        letterSpacing="1.6"
      >
        DRIFT
      </text>
      <text
        x="100"
        y="122"
        textAnchor="middle"
        className="tnum"
        fontFamily="var(--font-serif)"
        fontSize="26"
        fill="var(--color-forest)"
      >
        1.4%
      </text>
    </svg>
  );
}
