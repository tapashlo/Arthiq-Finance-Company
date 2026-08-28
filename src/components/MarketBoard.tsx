/**
 * Market board — a periodic table of returns and a sparkline sheet.
 *
 * Both are generated deterministically at module scope so server and client
 * agree. Colour encodes sign and magnitude: green for gain, red for loss, with
 * lightness carrying size. Every figure is an illustrative placeholder.
 */

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const YEARS = ["19", "20", "21", "22", "23", "24", "25", "26"];

const CLASSES = [
  { name: "US large cap", bias: 0.11 },
  { name: "US small cap", bias: 0.09 },
  { name: "Developed intl", bias: 0.07 },
  { name: "Emerging mkts", bias: 0.06 },
  { name: "Municipal bonds", bias: 0.03 },
  { name: "Treasuries", bias: 0.025 },
  { name: "Real assets", bias: 0.05 },
  { name: "Cash", bias: 0.02 },
];

/** Returns matrix. Two shared bad years so the rows correlate like real markets. */
const MATRIX = (() => {
  const rnd = lcg(4820261);
  return CLASSES.map((c) =>
    YEARS.map((_, y) => {
      const shock = y === 1 ? -0.26 : y === 5 ? -0.14 : 0;
      const idio = (rnd() - 0.42) * 0.22;
      // Bonds and cash barely move in equity drawdowns.
      const beta = c.bias > 0.045 ? 1 : 0.22;
      return c.bias + idio + shock * beta;
    }),
  );
})();

/** Green above zero, red below; lightness carries magnitude. */
function cell(v: number) {
  const mag = Math.min(Math.abs(v) / 0.3, 1);
  const alpha = 0.1 + mag * 0.85;
  return v >= 0
    ? `color-mix(in oklab, var(--color-gain) ${alpha * 100}%, var(--color-paper))`
    : `color-mix(in oklab, var(--color-loss) ${alpha * 100}%, var(--color-paper))`;
}

const pct = (v: number) => `${v >= 0 ? "+" : "−"}${Math.abs(v * 100).toFixed(0)}`;

export function ReturnsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse">
        <caption className="sr-only">
          Illustrative annual returns by asset class, 2017 to 2026.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="label pb-4 pr-5 text-left text-ink-faint">
              Asset class
            </th>
            {YEARS.map((y) => (
              <th
                key={y}
                scope="col"
                className="label-sm tnum pb-4 text-center text-ink-faint"
              >
                &rsquo;{y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CLASSES.map((c, r) => (
            <tr key={c.name}>
              <th
                scope="row"
                className="ui py-1 pr-5 text-left text-[0.9375rem] font-normal whitespace-nowrap text-forest"
              >
                {c.name}
              </th>
              {MATRIX[r].map((v, i) => (
                <td key={i} className="p-0.5">
                  <div
                    className="tnum flex h-11 items-center justify-center rounded-xs text-[0.8125rem] text-forest"
                    style={{ backgroundColor: cell(v) }}
                    title={`${c.name} 20${YEARS[i]}: ${pct(v)}%`}
                  >
                    {pct(v)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------- sparkline sheet -- */

const HOLDINGS = [
  { name: "US Total Market", ticker: "VTI", seed: 991, ytd: 14.2 },
  { name: "Total International", ticker: "VXUS", seed: 337, ytd: 7.9 },
  { name: "Municipal Bond", ticker: "MUB", seed: 512, ytd: 3.1 },
  { name: "Intermediate Treasury", ticker: "VGIT", seed: 806, ytd: 2.4 },
  { name: "Real Estate", ticker: "VNQ", seed: 145, ytd: -1.8 },
  { name: "Diversified Commodity", ticker: "PDBC", seed: 623, ytd: 5.6 },
];

/** 28-point walk whose end matches the sign of the quoted return. */
function series(seed: number, ytd: number) {
  const rnd = lcg(seed);
  const drift = ytd / 100 / 28;
  const out = [1];
  for (let i = 0; i < 27; i++) {
    out.push(out[i] * (1 + drift + (rnd() - 0.5) * 0.028));
  }
  return out;
}

function Sparkline({ values, up }: { values: number[]; up: boolean }) {
  const w = 132;
  const h = 34;
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    h - 3 - ((v - lo) / (hi - lo || 1)) * (h - 6),
  ]);
  const d = pts
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join("");
  const colour = up ? "var(--color-gain)" : "var(--color-loss)";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-24 sm:w-32" aria-hidden="true" fill="none">
      <path
        d={`${d}L${w} ${h}L0 ${h}Z`}
        fill={colour}
        opacity="0.1"
      />
      <path d={d} stroke={colour} strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2.5" fill={colour} />
    </svg>
  );
}

export function SparklineSheet() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[22rem] border-collapse text-left">
        <caption className="sr-only">
          Illustrative holdings with year-to-date returns and 28-week trend.
        </caption>
        <thead>
          <tr className="border-b border-rule">
            <th scope="col" className="label py-4 text-ink-faint">
              Holding
            </th>
            <th scope="col" className="label py-4 text-right text-ink-faint">
              52 weeks
            </th>
            <th scope="col" className="label py-4 text-right text-ink-faint">
              YTD
            </th>
          </tr>
        </thead>
        <tbody>
          {HOLDINGS.map((h) => {
            const up = h.ytd >= 0;
            return (
              <tr key={h.ticker} className="border-b border-rule-soft last:border-0">
                <td className="py-4 pr-6">
                  <div className="ui text-[0.9375rem] text-forest">{h.ticker}</div>
                  <div className="ui mt-1 text-[0.8125rem] text-ink-faint">
                    {h.name}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex justify-end">
                    <Sparkline values={series(h.seed, h.ytd)} up={up} />
                  </div>
                </td>
                <td
                  className={`tnum py-4 pl-6 text-right text-lg ${
                    up ? "text-gain" : "text-loss"
                  }`}
                >
                  {up ? "+" : "−"}
                  {Math.abs(h.ytd).toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
