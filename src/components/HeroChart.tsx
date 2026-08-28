/**
 * Hero candlestick chart.
 *
 * Thirty-two quarters of OHLC, generated deterministically at module scope so
 * server and client render identically. Green candles are up quarters, red are
 * down — red at full strength, because losing quarters are part of the record.
 * A five-quarter moving average draws itself over the top, and volume sits in
 * a band along the bottom.
 *
 * Figures are hypothetical and the card says so.
 */

const N = 32;
const START = 100;

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Candle = {
  open: number;
  high: number;
  low: number;
  close: number;
  up: boolean;
  volume: number;
};

const CANDLES: Candle[] = (() => {
  const rnd = lcg(20260828);
  // Drift per quarter, with two deliberate drawdown stretches.
  const drift = (i: number) =>
    i >= 9 && i <= 12 ? -0.052 : i >= 21 && i <= 23 ? -0.038 : 0.031;

  const out: Candle[] = [];
  let prev = START;

  for (let i = 0; i < N; i++) {
    const open = prev;
    const shock = (rnd() - 0.5) * 0.075;
    const close = open * (1 + drift(i) + shock);
    const hi = Math.max(open, close) * (1 + rnd() * 0.032);
    const lo = Math.min(open, close) * (1 - rnd() * 0.032);
    const up = close >= open;
    out.push({
      open,
      high: hi,
      low: lo,
      close,
      up,
      volume: 0.35 + rnd() * 0.45 + (up ? 0 : 0.22),
    });
    prev = close;
  }
  return out;
})();

/** Five-quarter simple moving average of closes. */
const MA = CANDLES.map((_, i) => {
  const from = Math.max(0, i - 4);
  const slice = CANDLES.slice(from, i + 1);
  return slice.reduce((a, c) => a + c.close, 0) / slice.length;
});

const FINAL = CANDLES[N - 1].close;
const annualized = Math.pow(FINAL / START, 1 / (N / 4)) - 1;

/** Peak-to-trough on closes — the number most sites leave off. */
const maxDrawdown = (() => {
  let peak = -Infinity;
  let worst = 0;
  for (const c of CANDLES) {
    peak = Math.max(peak, c.close);
    worst = Math.min(worst, c.close / peak - 1);
  }
  return worst;
})();

// Geometry
const W = 840;
const H = 470;
const PAD = { top: 44, right: 76, bottom: 30, left: 10 };
const VOL_H = 62;
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom - VOL_H - 26;

const LO = Math.min(...CANDLES.map((c) => c.low)) * 0.985;
const HI = Math.max(...CANDLES.map((c) => c.high)) * 1.015;

const step = PLOT_W / N;
const cx = (i: number) => PAD.left + step * (i + 0.5);
const py = (v: number) => PAD.top + (1 - (v - LO) / (HI - LO)) * PLOT_H;

const BODY_W = Math.min(step * 0.6, 17);
const VOL_TOP = PAD.top + PLOT_H + 26;
const MAX_VOL = Math.max(...CANDLES.map((c) => c.volume));

const maPath = (() => {
  const pts = MA.map((v, i) => [cx(i), py(v)] as const);
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const h = (x1 - x0) / 3;
    d += `C${(x0 + h).toFixed(1)} ${y0.toFixed(1)} ${(x1 - h).toFixed(1)} ${y1.toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d;
})();

const GRID_COUNT = 4;
const GRID = Array.from(
  { length: GRID_COUNT },
  (_, i) => LO + ((HI - LO) * (i + 1)) / GRID_COUNT,
);

export function HeroChart() {
  return (
    <figure className="relative overflow-hidden rounded-xs border border-rule bg-paper shadow-deep">
      <figcaption className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-rule px-7 pt-7 pb-6 md:px-9">
        <div>
          <p className="label flex items-center gap-2.5 text-ink-faint">
            <span
              aria-hidden="true"
              className="block h-1.5 w-1.5 rounded-full bg-gain"
            />
            Balanced composite · quarterly
          </p>
          <p className="mt-4 text-2xl leading-tight text-forest md:text-[1.75rem]">
            Eight years, every quarter
          </p>
        </div>

        <div className="flex items-end gap-8">
          <div>
            <p className="tnum text-4xl leading-none text-gain md:text-[2.75rem]">
              +{(annualized * 100).toFixed(1)}%
            </p>
            <p className="label mt-3 text-ink-faint">Annualized</p>
          </div>
          <div>
            <p className="tnum text-4xl leading-none text-loss md:text-[2.75rem]">
              {(maxDrawdown * 100).toFixed(1)}%
            </p>
            <p className="label mt-3 text-ink-faint">Max drawdown</p>
          </div>
        </div>
      </figcaption>

      <div className="px-2 pt-3 pb-1 md:px-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Hypothetical quarterly candlestick chart of a balanced portfolio over eight years, annualized return ${(annualized * 100).toFixed(1)} percent, worst peak-to-trough decline ${Math.abs(maxDrawdown * 100).toFixed(1)} percent.`}
        >
          {/* Gridlines and price axis */}
          <g aria-hidden="true">
            {GRID.map((v) => (
              <g key={v}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right + 10}
                  y1={py(v)}
                  y2={py(v)}
                  stroke="var(--color-rule-soft)"
                  strokeWidth="1"
                />
                <text
                  x={W - PAD.right + 20}
                  y={py(v) + 4}
                  className="ui tnum"
                  fontSize="12.5"
                  fill="var(--color-ink-faint)"
                >
                  {v.toFixed(0)}
                </text>
              </g>
            ))}
          </g>

          {/* Candles */}
          <g>
            {CANDLES.map((c, i) => {
              const colour = c.up ? "var(--color-gain)" : "var(--color-loss)";
              const bodyTop = py(Math.max(c.open, c.close));
              const bodyH = Math.max(2.5, py(Math.min(c.open, c.close)) - bodyTop);
              return (
                <g
                  key={i}
                  className="chart-candle"
                  style={{ animationDelay: `${260 + i * 42}ms` }}
                >
                  <line
                    x1={cx(i)}
                    x2={cx(i)}
                    y1={py(c.high)}
                    y2={py(c.low)}
                    stroke={colour}
                    strokeWidth="1.9"
                  />
                  <rect
                    x={cx(i) - BODY_W / 2}
                    y={bodyTop}
                    width={BODY_W}
                    height={bodyH}
                    rx="1.5"
                    fill={colour}
                  />
                </g>
              );
            })}
          </g>

          {/* Five-quarter moving average */}
          <path
            d={maPath}
            pathLength={1}
            className="chart-line"
            fill="none"
            stroke="var(--color-forest)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />

          {/* Volume band */}
          <g aria-hidden="true">
            <line
              x1={PAD.left}
              x2={W - PAD.right + 10}
              y1={VOL_TOP + VOL_H}
              y2={VOL_TOP + VOL_H}
              stroke="var(--color-rule)"
              strokeWidth="1"
            />
            {CANDLES.map((c, i) => {
              const h = (c.volume / MAX_VOL) * VOL_H;
              return (
                <rect
                  key={i}
                  className="chart-bar"
                  x={cx(i) - BODY_W / 2}
                  y={VOL_TOP + VOL_H - h}
                  width={BODY_W}
                  height={h}
                  fill={c.up ? "var(--color-gain)" : "var(--color-loss)"}
                  opacity="0.3"
                  style={{ animationDelay: `${420 + i * 42}ms` }}
                />
              );
            })}
            <text
              x={W - PAD.right + 20}
              y={VOL_TOP + 14}
              className="ui"
              fontSize="11.5"
              fill="var(--color-ink-faint)"
            >
              Vol
            </text>
          </g>

          {/* Year axis */}
          <g
            aria-hidden="true"
            className="ui"
            fontSize="12.5"
            fill="var(--color-ink-faint)"
          >
            {[0, 8, 16, 24, 31].map((i, n) => (
              <text
                key={i}
                x={cx(i)}
                y={H - 8}
                textAnchor={n === 0 ? "start" : n === 4 ? "end" : "middle"}
              >
                {`Y${Math.floor(i / 4) + 1}`}
              </text>
            ))}
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-rule px-7 py-5 md:px-9">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Key colour="bg-gain" label="Up quarter" />
          <Key colour="bg-loss" label="Down quarter" />
          <Key colour="bg-forest" label="5q average" />
        </div>
        <p className="label-sm text-ink-faint">Hypothetical · not a forecast</p>
      </div>
    </figure>
  );
}

function Key({ colour, label }: { colour: string; label: string }) {
  return (
    <span className="ui flex items-center gap-2.5 text-[0.8125rem] text-ink-faint">
      <span aria-hidden="true" className={`block h-2.5 w-2.5 rounded-xs ${colour}`} />
      {label}
    </span>
  );
}
