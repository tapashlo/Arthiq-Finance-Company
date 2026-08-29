/**
 * Work examples.
 *
 * Six static SVG deliverables — the shapes an FP&A engagement actually
 * produces. Every series is generated deterministically at module scope so
 * server and client render identically. All figures are invented.
 */

function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const GAIN = "var(--color-gain)";
const LOSS = "var(--color-loss)";
const BLUE = "var(--color-blue)";
const NAVY = "var(--color-navy)";
const FAINT = "var(--color-ink-faint)";
const RULE = "var(--color-rule-soft)";

/* ------------------------------------------------- 01 · forecast build --- */

const FQ = 20;
const SEGMENTS = [
  { name: "Base", colour: "#1b3a63", seed: 11 },
  { name: "Expansion", colour: BLUE, seed: 22 },
  { name: "New logos", colour: "#7db4f2", seed: 33 },
];

const BUILD = (() => {
  const rnd = lcg(778811);
  return SEGMENTS.map((seg, si) => {
    let v = [1_900_000, 420_000, 640_000][si];
    return {
      ...seg,
      values: Array.from({ length: FQ }, () => {
        const out = v;
        v *= 1 + [0.021, 0.058, 0.047][si] + (rnd() - 0.5) * 0.02;
        return out;
      }),
    };
  });
})();

const TOTALS = Array.from({ length: FQ }, (_, i) =>
  BUILD.reduce((a, s) => a + s.values[i], 0));
const PLAN = TOTALS.map((v, i) => v * (1 - 0.055 + i * 0.004));

export function ForecastBuild() {
  const W = 640, H = 260, P = { t: 14, r: 8, b: 26, l: 8 };
  const max = Math.max(...TOTALS) * 1.08;
  const x = (i: number) => P.l + (i / (FQ - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);

  // Stack the segments bottom-up into filled bands.
  let running = new Array(FQ).fill(0);
  const bands = BUILD.map((seg) => {
    const lower = [...running];
    running = running.map((v, i) => v + seg.values[i]);
    const upper = [...running];
    const d =
      upper.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("") +
      lower.map((v, i) => `L${x(FQ - 1 - i).toFixed(1)} ${y(lower[FQ - 1 - i]).toFixed(1)}`).join("") +
      "Z";
    return { ...seg, d };
  });

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
        aria-label="Revenue forecast built from base, expansion and new-logo segments, with the prior plan shown as a dashed line.">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={P.l} x2={W - P.r} y1={y(max * f)} y2={y(max * f)} stroke={RULE} strokeWidth="1" />
        ))}
        {bands.map((b) => (
          <path key={b.name} d={b.d} fill={b.colour} opacity="0.92" />
        ))}
        <path d={PLAN.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("")}
          fill="none" stroke={NAVY} strokeWidth="2" strokeDasharray="5 4" opacity="0.85" />
        <g fontSize="11" fill={FAINT}>
          {[0, 8, 16].map((i, n) => (
            <text key={i} x={x(i)} y={H - 8} textAnchor={n === 0 ? "start" : "middle"}>Q{i % 4 + 1} FY{26 + Math.floor(i / 4)}</text>
          ))}
        </g>
      </svg>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {BUILD.map((s) => <Key key={s.name} colour={s.colour} label={s.name} />)}
        <Key colour={NAVY} label="Prior plan" dashed />
      </div>
    </div>
  );
}

/* --------------------------------------------------- 02 · variance bridge */

const BRIDGE = [
  { name: "Plan", value: 4_200_000, type: "total" as const },
  { name: "New logos", value: 380_000, type: "delta" as const },
  { name: "Expansion", value: 210_000, type: "delta" as const },
  { name: "Churn", value: -290_000, type: "delta" as const },
  { name: "Discounting", value: -164_000, type: "delta" as const },
  { name: "Actual", value: 4_336_000, type: "total" as const },
];

export function VarianceBridge() {
  const W = 640, H = 250, P = { t: 26, r: 8, b: 42, l: 8 };
  // Truncated axis: on a zero-based scale a $290K step against $4.2M is about
  // ten pixels. Bridges are conventionally drawn this way; the note says so.
  // Must clear the cumulative peak (plan + new logos + expansion = $4.79M),
  // not just the closing total, or the tallest step draws outside the viewBox.
  const floor = 3_900_000;
  const max = 4_920_000;
  const slot = (W - P.l - P.r) / BRIDGE.length;
  const bw = slot * 0.54;
  const y = (v: number) =>
    P.t + (1 - (v - floor) / (max - floor)) * (H - P.t - P.b);

  let cursor = 0;
  const bars = BRIDGE.map((b, i) => {
    const cx = P.l + slot * (i + 0.5);
    if (b.type === "total") {
      cursor = b.value;
      return { ...b, cx, top: y(b.value), height: y(floor) - y(b.value), colour: NAVY, from: b.value };
    }
    const from = cursor;
    cursor += b.value;
    const top = y(Math.max(from, cursor));
    return { ...b, cx, top, height: Math.abs(y(from) - y(cursor)), colour: b.value >= 0 ? GAIN : LOSS, from: cursor };
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
      aria-label="Bridge from plan revenue to actual, showing new logos and expansion as gains and churn and discounting as losses.">
      <line x1={P.l} x2={W - P.r} y1={y(floor)} y2={y(floor)} stroke="var(--color-rule)" strokeWidth="1" />
      <text x={P.l} y={H - 8} fontSize="10.5" fill={FAINT}>
        Axis truncated at ${(floor / 1e6).toFixed(2)}M so the steps are legible
      </text>
      {bars.map((b, i) => (
        <g key={b.name}>
          {i > 0 && (
            <line x1={bars[i - 1].cx + bw / 2} x2={b.cx - bw / 2}
              y1={y(bars[i - 1].from)} y2={y(bars[i - 1].from)}
              stroke={FAINT} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
          )}
          <rect x={b.cx - bw / 2} y={b.top} width={bw} height={Math.max(b.height, 2)} rx="2" fill={b.colour} />
          <text x={b.cx} y={b.top - 8} textAnchor="middle" fontSize="11.5" fontWeight="600"
            fill={b.type === "total" ? NAVY : b.colour} className="tnum">
            {b.type === "total"
              ? `$${(b.value / 1e6).toFixed(2)}M`
              : `${b.value >= 0 ? "+" : "−"}$${Math.abs(b.value / 1000).toFixed(0)}K`}
          </text>
          <text x={b.cx} y={H - 26} textAnchor="middle" fontSize="11" fill={FAINT}>{b.name}</text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------ 03 · cohort grid */

const COHORTS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const RETENTION = (() => {
  const rnd = lcg(51422);
  return COHORTS.map((_, r) =>
    Array.from({ length: 8 - r }, (_, c) => {
      // Retention decays, then expansion pushes later months back above 100.
      const decay = 100 - c * 4.4 + Math.pow(c, 1.6) * 1.5;
      return Math.max(58, Math.min(126, decay + (rnd() - 0.45) * 9 + r * 0.9));
    }));
})();

function retentionColour(v: number) {
  if (v >= 100) return `color-mix(in oklab, var(--color-gain) ${Math.min((v - 96) * 6, 78)}%, white)`;
  if (v >= 85) return `color-mix(in oklab, var(--color-blue) ${(100 - v) * 3.2 + 10}%, white)`;
  return `color-mix(in oklab, var(--color-loss) ${Math.min((90 - v) * 3.4, 72)}%, white)`;
}

export function CohortGrid() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] border-separate border-spacing-0.5">
        <caption className="sr-only">Net revenue retention by monthly cohort.</caption>
        <thead>
          <tr>
            <th className="label pb-2.5 pr-3 text-left text-ink-faint">Cohort</th>
            {Array.from({ length: 8 }, (_, i) => (
              <th key={i} className="label-sm pb-2.5 text-center text-ink-faint">M{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RETENTION.map((row, r) => (
            <tr key={COHORTS[r]}>
              <th className="pr-3 text-left text-[0.8125rem] font-normal whitespace-nowrap text-navy">
                {COHORTS[r]}
              </th>
              {row.map((v, c) => (
                <td key={c} className="p-0">
                  <div className="tnum flex h-8 items-center justify-center rounded text-[0.75rem] font-medium text-navy"
                    style={{ backgroundColor: retentionColour(v) }}
                    title={`${COHORTS[r]} cohort, month ${c}: ${v.toFixed(0)}% net revenue retained`}>
                    {v.toFixed(0)}
                  </div>
                </td>
              ))}
              {Array.from({ length: r }, (_, i) => <td key={`e${i}`} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --------------------------------------------------- 04 · KPI board tiles */

const TILES = [
  { name: "ARR", value: "$6.42M", delta: "+4.1%", good: true, seed: 91, up: true },
  { name: "Net burn", value: "$214K", delta: "−8.3%", good: true, seed: 44, up: false },
  { name: "Runway", value: "19 mo", delta: "+1 mo", good: true, seed: 27, up: true },
  { name: "NRR", value: "112%", delta: "+3 pts", good: true, seed: 63, up: true },
  { name: "CAC payback", value: "14 mo", delta: "−2 mo", good: true, seed: 15, up: false },
  { name: "Burn multiple", value: "1.3×", delta: "−0.2×", good: true, seed: 82, up: false },
];

function spark(seed: number, up: boolean) {
  const rnd = lcg(seed);
  const out = [1];
  for (let i = 0; i < 15; i++) out.push(out[i] * (1 + (up ? 0.02 : -0.014) + (rnd() - 0.5) * 0.03));
  return out;
}

export function KpiBoard() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {TILES.map((t) => {
        const vals = spark(t.seed, t.up);
        const lo = Math.min(...vals), hi = Math.max(...vals);
        const d = vals.map((v, i) =>
          `${i ? "L" : "M"}${(i / (vals.length - 1) * 100).toFixed(1)} ${(26 - ((v - lo) / (hi - lo || 1)) * 22).toFixed(1)}`).join("");
        return (
          <div key={t.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="label text-white/45">{t.name}</p>
            <p className="tnum display mt-2.5 text-xl text-white">{t.value}</p>
            <div className="mt-2.5 flex items-end justify-between gap-2">
              <span className={`tnum text-[0.75rem] font-medium ${t.good ? "text-gain" : "text-loss"}`}>
                {t.delta}
              </span>
              <svg viewBox="0 0 100 28" className="h-6 w-16" aria-hidden="true" preserveAspectRatio="none">
                <path d={d} fill="none" stroke={t.good ? GAIN : LOSS} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------- 05 · close timeline -- */

const CLOSE = [
  { task: "Bank & card feeds reconciled", owner: "Bookkeeping", start: 0, len: 1.5 },
  { task: "Revenue cut-off & deferrals", owner: "ArthIQ", start: 0.5, len: 2 },
  { task: "Accruals & prepaids", owner: "Bookkeeping", start: 1, len: 1.5 },
  { task: "Payroll & benefits", owner: "People Ops", start: 1, len: 1 },
  { task: "Flux review", owner: "ArthIQ", start: 2.5, len: 1.5 },
  { task: "Books locked", owner: "Controller", start: 4, len: 0.5 },
  { task: "Variance pack & commentary", owner: "ArthIQ", start: 4.5, len: 1.5 },
];

export function CloseTimeline() {
  const days = 6;
  return (
    <div>
      <div className="mb-3 grid grid-cols-6 gap-1.5 pl-[38%]">
        {Array.from({ length: days }, (_, i) => (
          <span key={i} className="label-sm text-center text-ink-faint">D{i + 1}</span>
        ))}
      </div>
      <ul className="space-y-2">
        {CLOSE.map((c) => (
          <li key={c.task} className="flex items-center gap-3">
            <span className="w-[38%] shrink-0 pr-3 text-[0.8125rem] leading-tight text-navy">
              {c.task}
              <span className="mt-0.5 block text-[0.6875rem] text-ink-faint">{c.owner}</span>
            </span>
            <span className="relative h-6 flex-1 rounded bg-canvas-deep/60">
              <span
                className={`absolute inset-y-0 rounded ${c.owner === "ArthIQ" ? "bg-blue" : "bg-navy/35"}`}
                style={{ left: `${(c.start / days) * 100}%`, width: `${(c.len / days) * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4">
        <Key colour={BLUE} label="ArthIQ owns" />
        <Key colour="var(--color-navy)" label="Your team owns" />
        <span className="ml-auto text-[0.8125rem] text-ink-faint">
          Books locked day 5 · pack out day 6
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------- 06 · payback curve --- */

export function PaybackCurve() {
  const W = 640, H = 240, P = { t: 18, r: 8, b: 30, l: 8 };
  const months = 24;
  const cac = 26_500;
  const monthly = 1_910;
  const cum = Array.from({ length: months + 1 }, (_, m) => m * monthly);
  const payback = Math.ceil(cac / monthly);
  const max = Math.max(cac, cum[months]) * 1.12;
  const x = (m: number) => P.l + (m / months) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - v / max) * (H - P.t - P.b);
  const d = cum.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
      aria-label={`Cumulative gross profit per customer crossing acquisition cost at month ${payback}.`}>
      <defs>
        <linearGradient id="pb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d}L${x(months)} ${y(0)}L${x(0)} ${y(0)}Z`} fill="url(#pb)" />
      <line x1={P.l} x2={W - P.r} y1={y(cac)} y2={y(cac)} stroke={LOSS} strokeWidth="2" strokeDasharray="6 4" />
      <text x={W - P.r} y={y(cac) - 8} textAnchor="end" fontSize="11.5" fontWeight="600" fill={LOSS} className="tnum">
        CAC ${(cac / 1000).toFixed(1)}K
      </text>
      <path d={d} fill="none" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round" />
      <line x1={x(payback)} x2={x(payback)} y1={y(cac)} y2={y(0)} stroke={GAIN} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx={x(payback)} cy={y(cac)} r="5.5" fill={GAIN} />
      <text x={x(payback) + 10} y={y(cac) + 20} fontSize="11.5" fontWeight="600" fill={GAIN} className="tnum">
        Payback · month {payback}
      </text>
      <g fontSize="11" fill={FAINT}>
        {[0, 6, 12, 18, 24].map((m, i) => (
          <text key={m} x={x(m)} y={H - 8} textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}>
            {m === 0 ? "Signup" : `M${m}`}
          </text>
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------- shared -- */

function Key({ colour, label, dashed }: { colour: string; label: string; dashed?: boolean }) {
  return (
    <span className="flex items-center gap-2 text-[0.8125rem] text-ink-faint">
      <span aria-hidden="true"
        className={`block h-0.5 w-4 rounded ${dashed ? "opacity-70" : ""}`}
        style={dashed
          ? { backgroundImage: `repeating-linear-gradient(90deg, ${colour} 0 4px, transparent 4px 7px)` }
          : { backgroundColor: colour, height: "0.625rem", width: "0.625rem", borderRadius: "3px" }} />
      {label}
    </span>
  );
}
