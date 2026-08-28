/**
 * Hero growth chart.
 *
 * The series is generated deterministically at module scope — same values on
 * the server and in the browser, so there is nothing for hydration to argue
 * about — and the line draws itself with a pure-CSS dash animation. Paths carry
 * pathLength="1" so the dash geometry does not depend on the rendered size.
 *
 * The figures are hypothetical and labelled as such on the card.
 */

const YEARS = 20;
const QUARTERS = YEARS * 4;
const START_VALUE = 500_000;

/** Twenty annual returns, hand-set to include two believable drawdowns. */
const ANNUAL_RETURNS = [
  0.11, 0.07, 0.14, 0.09, 0.04, -0.18, 0.21, 0.13, 0.08, 0.11, 0.06, 0.15,
  -0.12, 0.19, 0.1, 0.07, 0.12, 0.05, 0.14, 0.09,
];

/** Small deterministic LCG so the quarterly path has texture but no randomness. */
function makeNoise(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296 - 0.5;
  };
}

function buildSeries() {
  const noise = makeNoise(20260628);
  const values: number[] = [START_VALUE];

  for (let q = 0; q < QUARTERS; q++) {
    const annual = ANNUAL_RETURNS[Math.floor(q / 4)];
    const quarterly = Math.pow(1 + annual, 0.25) - 1;
    const wobble = noise() * 0.055;
    const prev = values[values.length - 1];
    values.push(prev * (1 + quarterly + wobble));
  }

  return values;
}

const SERIES = buildSeries();
const FINAL = SERIES[SERIES.length - 1];

// Geometry
const W = 780;
const H = 440;
const PAD = { top: 46, right: 74, bottom: 62, left: 4 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const MAX = 2_400_000;
const MIN = 0;

const sx = (i: number) => PAD.left + (i / (SERIES.length - 1)) * PLOT_W;
const sy = (v: number) => PAD.top + (1 - (v - MIN) / (MAX - MIN)) * PLOT_H;

const POINTS = SERIES.map((v, i) => [sx(i), sy(v)] as const);

/** Cubic through the points with horizontal control handles — smooth, no overshoot. */
function smoothPath(pts: ReadonlyArray<readonly [number, number]>) {
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const h = (x1 - x0) / 3;
    d += `C${(x0 + h).toFixed(2)} ${y0.toFixed(2)} ${(x1 - h).toFixed(2)} ${y1.toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return d;
}

const LINE_D = smoothPath(POINTS);
const AREA_D = `${LINE_D}L${POINTS[POINTS.length - 1][0].toFixed(2)} ${(H - PAD.bottom).toFixed(2)}L${POINTS[0][0].toFixed(2)} ${(H - PAD.bottom).toFixed(2)}Z`;

const GRID = [600_000, 1_200_000, 1_800_000, 2_400_000];
const gridLabel = (v: number) => `$${(v / 1_000_000).toFixed(1)}M`;

/** Annual contributions, drawn as a faint column series along the baseline. */
const BARS = Array.from({ length: YEARS }, (_, y) => {
  const noise = makeNoise(7717 + y * 31)();
  return 0.45 + (y / YEARS) * 0.5 + noise * 0.16;
});

const END = POINTS[POINTS.length - 1];
const annualized = Math.pow(FINAL / START_VALUE, 1 / YEARS) - 1;

export function HeroChart() {
  return (
    <figure className="relative overflow-hidden rounded-xs border border-rule bg-paper shadow-lift">
      <figcaption className="flex flex-wrap items-end justify-between gap-6 border-b border-rule-soft px-7 pt-7 pb-6 md:px-9 md:pt-8">
        <div>
          <p className="label text-ink-faint">Balanced growth composite</p>
          <p className="mt-4 text-2xl leading-tight text-forest md:text-[1.75rem]">
            Twenty years, one portfolio
          </p>
        </div>
        <div className="text-right">
          <p className="tnum text-4xl leading-none text-green-mid md:text-[2.75rem]">
            +{(annualized * 100).toFixed(1)}%
          </p>
          <p className="label mt-3 text-ink-faint">Annualized</p>
        </div>
      </figcaption>

      <div className="px-2 pt-2 pb-1 md:px-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Hypothetical growth of a $${(START_VALUE / 1000).toFixed(0)},000 balanced portfolio over ${YEARS} years, ending near $${(FINAL / 1_000_000).toFixed(2)} million, an annualized return of ${(annualized * 100).toFixed(1)} percent.`}
        >
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-green-mid)" stopOpacity="0.20" />
              <stop offset="55%" stopColor="var(--color-green-mid)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--color-green-mid)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="line-stroke" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-green)" />
              <stop offset="100%" stopColor="var(--color-green-bright)" />
            </linearGradient>
          </defs>

          {/* Gridlines and value axis */}
          <g aria-hidden="true">
            {GRID.map((v, i) => (
              <g key={v}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right + 12}
                  y1={sy(v)}
                  y2={sy(v)}
                  stroke="var(--color-rule)"
                  strokeWidth="1"
                  strokeDasharray={i === 0 ? undefined : "2 5"}
                  opacity={i === 0 ? 0.75 : 1}
                />
                <text
                  x={W - PAD.right + 22}
                  y={sy(v) + 4}
                  className="ui tnum"
                  fontSize="12.5"
                  fill="var(--color-ink-faint)"
                >
                  {gridLabel(v)}
                </text>
              </g>
            ))}
            <line
              x1={PAD.left}
              x2={W - PAD.right + 12}
              y1={H - PAD.bottom}
              y2={H - PAD.bottom}
              stroke="var(--color-rule)"
              strokeWidth="1"
            />
          </g>

          {/* Annual contributions */}
          <g aria-hidden="true" fill="var(--color-sage)" opacity="0.28">
            {BARS.map((h, i) => {
              const bw = PLOT_W / YEARS - 9;
              const bh = h * 42;
              return (
                <rect
                  key={i}
                  className="chart-bar"
                  x={PAD.left + (i * PLOT_W) / YEARS + 4.5}
                  y={H - PAD.bottom - bh}
                  width={bw}
                  height={bh}
                  rx="1"
                  style={{ animationDelay: `${450 + i * 42}ms` }}
                />
              );
            })}
          </g>

          <path d={AREA_D} className="chart-area" fill="url(#area-fill)" />

          <path
            d={LINE_D}
            pathLength={1}
            className="chart-line"
            fill="none"
            stroke="url(#line-stroke)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Terminal marker */}
          <g className="chart-node" style={{ animationDelay: "2.75s" }}>
            <circle
              className="chart-halo"
              cx={END[0]}
              cy={END[1]}
              r="6"
              fill="var(--color-green-bright)"
            />
            <circle cx={END[0]} cy={END[1]} r="5.5" fill="var(--color-paper)" />
            <circle
              cx={END[0]}
              cy={END[1]}
              r="4"
              fill="var(--color-green-bright)"
            />
          </g>

          {/* Opening marker */}
          <g className="chart-node" style={{ animationDelay: "0.3s" }}>
            <circle
              cx={POINTS[0][0] + 2}
              cy={POINTS[0][1]}
              r="3.25"
              fill="none"
              stroke="var(--color-sage)"
              strokeWidth="1.75"
            />
          </g>

          {/* Year axis */}
          <g aria-hidden="true" className="ui" fontSize="12.5" fill="var(--color-ink-faint)">
            {[0, 5, 10, 15, 20].map((y) => (
              <text
                key={y}
                x={PAD.left + (y / YEARS) * PLOT_W}
                y={H - PAD.bottom + 28}
                textAnchor={y === 0 ? "start" : y === YEARS ? "end" : "middle"}
              >
                {y === 0 ? "Year 0" : `Year ${y}`}
              </text>
            ))}
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-rule-soft px-7 py-5 md:px-9">
        <p className="ui text-[0.8125rem] leading-relaxed text-ink-faint">
          <span className="tnum">$500,000</span> initial ·{" "}
          <span className="tnum">$24,000</span> annual contribution
        </p>
        <p className="label-sm text-ink-faint">Hypothetical · not a forecast</p>
      </div>
    </figure>
  );
}
