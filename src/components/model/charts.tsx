"use client";

/**
 * Charts for the model studio.
 *
 * Axis labels are HTML, as everywhere else on the product panels: text inside
 * a viewBox scales with the chart, and these panels are fluid.
 */

import { Axis, VIZ } from "@/components/product/panel";
import { HORIZON, money, type Month } from "@/lib/model";

const W = 720;

/**
 * Value labels for the y axis, in HTML over the chart.
 *
 * Positioned by percentage of the container height, which lines up because the
 * SVG fills the container and keeps its aspect ratio. Same reasoning as the
 * x axis: text inside the viewBox would scale with the panel.
 */
function YScale({
  ticks,
  y,
  height,
  format,
}: {
  ticks: number[];
  y: (v: number) => number;
  height: number;
  format: (v: number) => string;
}) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {ticks.map((t) => (
        <span
          key={t}
          className="absolute left-0 -translate-y-full pb-1 text-[0.625rem] text-white/35 tabular-nums"
          style={{ top: `${(y(t) / height) * 100}%` }}
        >
          {format(t)}
        </span>
      ))}
    </div>
  );
}

/** Three cash curves, each stopping at zero rather than plunging through it. */
export function CashChart({
  series,
  labels,
}: {
  series: { name: string; colour: string; cash: number[] }[];
  labels: string[];
}) {
  const H = 240;
  const P = { t: 14, r: 2, b: 16, l: 2 };
  const all = series.flatMap((s) => s.cash);
  const hi = Math.max(...all, 0);
  const lo = Math.min(...all, 0);
  const pad = (hi - lo) * 0.08 || 1;
  const top = hi + pad;
  const bottom = Math.min(0, lo);

  const x = (i: number) => P.l + (i / (HORIZON - 1)) * (W - P.l - P.r);
  const y = (v: number) => P.t + (1 - (v - bottom) / (top - bottom || 1)) * (H - P.t - P.b);
  const zeroY = y(0);

  const ticks = [top, bottom + (top - bottom) * 0.5, 0].filter(
    (t, i, arr) => arr.indexOf(t) === i && t >= bottom && t <= top,
  );

  return (
    <>
      <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
        aria-label="Cash balance over twenty-four months under downside, base and upside cases.">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={P.l} x2={W - P.r} y1={P.t + f * (H - P.t - P.b)} y2={P.t + f * (H - P.t - P.b)}
            stroke={VIZ.rule} strokeWidth="1" />
        ))}

        {/* Zero. The line that actually matters. */}
        <line x1={P.l} x2={W - P.r} y1={zeroY} y2={zeroY}
          stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="5 4" />

        {series.map((s, si) => {
          // Truncate at the crossing: a cash curve that dips below zero and
          // recovers is the classic mock-up tell.
          const pts: [number, number][] = [];
          for (let i = 0; i < s.cash.length; i++) {
            const v = s.cash[i];
            if (v < 0) {
              const prev = i > 0 ? s.cash[i - 1] : v;
              const t = prev === v ? 0 : prev / (prev - v);
              pts.push([x(i - 1 + t), zeroY]);
              break;
            }
            pts.push([x(i), y(v)]);
          }
          if (!pts.length) return null;
          const d = pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join(" ");
          const isBase = s.name === "Base";
          return (
            <g key={s.name}>
              {isBase && (
                <path className="chart-area"
                  d={`${d} L${pts[pts.length - 1][0].toFixed(1)} ${zeroY} L${pts[0][0].toFixed(1)} ${zeroY} Z`}
                  fill={s.colour} fillOpacity="0.16" />
              )}
              <path className="chart-line" style={{ animationDelay: `${120 + si * 130}ms` }}
                d={d} pathLength={1} fill="none" stroke={s.colour}
                strokeWidth={isBase ? 3 : 2} strokeLinecap="round" strokeLinejoin="round" />
              {pts.length < s.cash.length && (
                <circle cx={pts[pts.length - 1][0]} cy={zeroY} r="4.5" fill={s.colour}
                  stroke="var(--color-panel)" strokeWidth="2" />
              )}
            </g>
          );
        })}
      </svg>
        <YScale ticks={ticks} y={y} height={H} format={(v) => money(v, { compact: true })} />
      </div>
      <Axis labels={labels} align="edge" every={3} everyOnMobile={6} />
    </>
  );
}

/** Revenue as columns with EBITDA drawn over it, so the gap is the burn. */
export function PnlChart({ months, labels }: { months: Month[]; labels: string[] }) {
  const H = 230;
  const P = { t: 14, r: 0, b: 12, l: 0 };
  const hi = Math.max(...months.map((m) => m.revenue), 0);
  const lo = Math.min(...months.map((m) => m.ebitda), 0);
  const top = hi * 1.08 || 1;
  const bottom = Math.min(0, lo * 1.15);
  const band = (W - P.l - P.r) / months.length;
  const bw = band * 0.56;
  const y = (v: number) => P.t + (1 - (v - bottom) / (top - bottom || 1)) * (H - P.t - P.b);
  const zeroY = y(0);

  return (
    <>
      <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
        aria-label="Monthly revenue with EBITDA overlaid; the gap between them is the operating loss.">
        {months.map((m, i) => {
          const cx = P.l + band * (i + 0.5);
          return (
            <rect key={`r${m.i}`} className="chart-bar" style={{ animationDelay: `${100 + i * 22}ms` }}
              x={cx - bw / 2} y={y(m.revenue)} width={bw} height={Math.max(1, zeroY - y(m.revenue))}
              rx="3" fill={VIZ.blue} opacity="0.55" />
          );
        })}
        <line x1={P.l} x2={W - P.r} y1={zeroY} y2={zeroY} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <path className="chart-line" pathLength={1}
          d={months.map((m, i) => `${i ? "L" : "M"}${(P.l + band * (i + 0.5)).toFixed(1)} ${y(m.ebitda).toFixed(1)}`).join(" ")}
          fill="none" stroke={VIZ.amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
        <YScale ticks={[top, 0]} y={y} height={H} format={(v) => money(v, { compact: true })} />
      </div>
      <Axis labels={labels} every={3} everyOnMobile={6} />
    </>
  );
}

/**
 * Assets beside liabilities and equity, quarter by quarter.
 *
 * The pairs are the same height because the balance sheet balances. That is
 * the point of drawing it this way: the check is visible rather than claimed.
 */
export function BalanceChart({
  points,
  labels,
}: {
  points: { cash: number; ar: number; ap: number; deferred: number; equity: number }[];
  labels: string[];
}) {
  const H = 230;
  const P = { t: 14, r: 0, b: 12, l: 0 };
  const totals = points.map((p) => p.cash + p.ar);
  const negEquity = points.some((p) => p.equity < 0);
  const hi = Math.max(...totals, ...points.map((p) => p.ap + p.deferred + Math.max(0, p.equity)), 1);
  const lo = negEquity ? Math.min(...points.map((p) => p.equity), 0) : 0;
  const band = (W - P.l - P.r) / points.length;
  const bw = band * 0.34;
  const gap = band * 0.06;
  const y = (v: number) => P.t + (1 - (v - lo) / (hi - lo || 1)) * (H - P.t - P.b);
  const zeroY = y(0);

  const seg = (x0: number, from: number, to: number, fill: string, key: string, delay: number) => {
    const yTop = y(Math.max(from, to));
    const h = Math.abs(y(from) - y(to));
    if (h < 0.4) return null;
    return <rect key={key} className="chart-bar" style={{ animationDelay: `${delay}ms` }}
      x={x0} y={yTop} width={bw} height={h} rx="2" fill={fill} />;
  };

  return (
    <>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img"
        aria-label="Total assets beside total liabilities and equity for each quarter. The pairs are equal because the balance sheet balances.">
        <line x1={P.l} x2={W - P.r} y1={zeroY} y2={zeroY} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        {points.map((p, i) => {
          const cx = P.l + band * (i + 0.5);
          const lx = cx - bw - gap / 2;
          const rx = cx + gap / 2;
          const d = 100 + i * 45;
          return (
            <g key={i}>
              {seg(lx, 0, p.cash, VIZ.mint, `c${i}`, d)}
              {seg(lx, p.cash, p.cash + p.ar, VIZ.blue, `a${i}`, d + 20)}
              {seg(rx, 0, p.ap, VIZ.coral, `p${i}`, d)}
              {seg(rx, p.ap, p.ap + p.deferred, VIZ.amber, `d${i}`, d + 20)}
              {seg(rx, p.ap + p.deferred, p.ap + p.deferred + p.equity, VIZ.violet, `e${i}`, d + 40)}
            </g>
          );
        })}
      </svg>
      <Axis labels={labels} everyOnMobile={2} />
    </>
  );
}

/** A metric placed on a benchmark scale, with the healthy zone marked. */
export function Gauge({
  label,
  value,
  display,
  min,
  max,
  good,
  note,
  higherIsBetter = true,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  /** [from, to] of the range that counts as healthy. */
  good: [number, number];
  note: string;
  higherIsBetter?: boolean;
}) {
  const clamped = Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;
  const pos = ((clamped - min) / (max - min)) * 100;
  const gFrom = ((Math.max(min, good[0]) - min) / (max - min)) * 100;
  const gTo = ((Math.min(max, good[1]) - min) / (max - min)) * 100;
  const healthy = Number.isFinite(value) && value >= good[0] && value <= good[1];

  return (
    <div className="py-4">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-white/75">{label}</span>
        <span className="tnum text-sm font-semibold" style={{ color: healthy ? VIZ.mint : VIZ.amber }}>
          {display}
        </span>
      </div>
      <div className="relative mt-3 h-1.5 rounded-full bg-white/8">
        <div className="absolute inset-y-0 rounded-full"
          style={{ left: `${gFrom}%`, width: `${Math.max(0, gTo - gFrom)}%`, backgroundColor: "rgba(58,208,164,0.28)" }} />
        <div className="absolute top-1/2 h-3.5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[left] duration-500 ease-out"
          style={{ left: `${pos}%`, backgroundColor: healthy ? VIZ.mint : VIZ.amber }} />
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-white/40">
        {higherIsBetter ? "Healthy above" : "Healthy below"}{" "}
        {higherIsBetter ? good[0] : good[1]} · {note}
      </p>
    </div>
  );
}
