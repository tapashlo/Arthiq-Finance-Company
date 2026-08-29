"use client";

import { useMemo, useState } from "react";
import { BenchmarkBar, Readout, Slider, ToolCard, compactMoney, money } from "./ToolKit";

const HORIZON = 36;

/** Projects cash forward month by month; revenue and opex each compound. */
function project(
  cash: number,
  mrr: number,
  growth: number,
  opex: number,
  opexGrowth: number,
  margin: number,
) {
  const points: { month: number; cash: number; net: number }[] = [];
  let balance = cash;
  let revenue = mrr;
  let cost = opex;
  let breakeven: number | null = null;
  let zero: number | null = null;

  for (let m = 0; m <= HORIZON; m++) {
    const grossProfit = revenue * (margin / 100);
    const net = grossProfit - cost;
    if (net >= 0 && breakeven === null && m > 0) breakeven = m;
    points.push({ month: m, cash: balance, net });
    if (balance <= 0 && zero === null) zero = m;
    balance += net;
    revenue *= 1 + growth / 100;
    cost *= 1 + opexGrowth / 100;
  }
  return { points, breakeven, zero };
}

export function RunwayTool() {
  const [cash, setCash] = useState(2_400_000);
  const [mrr, setMrr] = useState(180_000);
  const [growth, setGrowth] = useState(7);
  const [opex, setOpex] = useState(320_000);
  const [opexGrowth, setOpexGrowth] = useState(3);
  const [margin, setMargin] = useState(76);

  const { points, breakeven, zero } = useMemo(
    () => project(cash, mrr, growth, opex, opexGrowth, margin),
    [cash, mrr, growth, opex, opexGrowth, margin],
  );

  const netBurn = points[0].net;
  const runway = zero ?? (breakeven !== null ? Infinity : HORIZON + 1);
  const survives = zero === null;

  const outDate = useMemo(() => {
    if (survives) return "Beyond the horizon";
    const d = new Date();
    d.setMonth(d.getMonth() + (zero ?? 0));
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [zero, survives]);

  // Chart geometry
  const W = 560;
  const H = 260;
  const PAD = { t: 16, r: 8, b: 30, l: 8 };
  const maxCash = Math.max(...points.map((p) => p.cash), cash) * 1.08;
  const minCash = Math.min(...points.map((p) => p.cash), 0);
  const px = (m: number) => PAD.l + (m / HORIZON) * (W - PAD.l - PAD.r);
  const py = (v: number) =>
    PAD.t + (1 - (v - minCash) / (maxCash - minCash || 1)) * (H - PAD.t - PAD.b);

  // Stop drawing where cash hits zero: a company does not trade through it.
  const drawn = zero === null ? points : points.slice(0, zero + 1);
  const line = drawn
    .map((p, i) => `${i ? "L" : "M"}${px(p.month).toFixed(1)} ${py(p.cash).toFixed(1)}`)
    .join("");
  const lastX = px(drawn[drawn.length - 1].month);
  const zeroY = py(0);

  return (
    <ToolCard
      eyebrow="Tool 01"
      title="Runway & burn"
      blurb="Drag your assumptions and watch the cash curve move. The month it crosses zero is the month you need to have closed a round."
      footnote="Simplified: gross profit less operating expense, both compounding monthly. Ignores working capital timing, taxes and financing. Runs entirely in your browser — nothing is sent anywhere."
      controls={
        <>
          <Slider label="Cash in the bank" value={cash} min={250_000} max={20_000_000} step={50_000} onChange={setCash} format={compactMoney} />
          <Slider label="Monthly recurring revenue" value={mrr} min={0} max={2_000_000} step={10_000} onChange={setMrr} format={compactMoney} />
          <Slider label="MRR growth" value={growth} min={-5} max={25} step={0.5} onChange={setGrowth} format={(v) => `${v > 0 ? "+" : ""}${v}% / mo`} />
          <Slider label="Monthly operating expense" value={opex} min={50_000} max={3_000_000} step={10_000} onChange={setOpex} format={compactMoney} />
          <Slider label="Opex growth" value={opexGrowth} min={0} max={12} step={0.5} onChange={setOpexGrowth} format={(v) => `+${v}% / mo`} hint="Mostly hiring. This is the lever founders forget compounds." />
          <Slider label="Gross margin" value={margin} min={20} max={95} step={1} onChange={setMargin} format={(v) => `${v}%`} />
        </>
      }
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        <Readout
          label="Runway"
          value={survives ? "∞" : `${runway} mo`}
          tone={survives ? "gain" : runway <= 9 ? "loss" : runway <= 15 ? "warn" : "gain"}
          large
        />
        <Readout label="Cash out" value={outDate} tone={survives ? "gain" : "neutral"} />
        <Readout
          label="Net burn, month 1"
          value={netBurn >= 0 ? `+${compactMoney(netBurn)}` : compactMoney(netBurn)}
          tone={netBurn >= 0 ? "gain" : "neutral"}
        />
      </div>

      <div className="mt-7">
        <BenchmarkBar
          value={survives ? 36 : runway}
          bands={[
            { upTo: 9, label: "Raise now", tone: "loss" },
            { upTo: 15, label: "Start the process", tone: "warn" },
            { upTo: 36, label: "Comfortable", tone: "gain" },
          ]}
          format={(v) => `${v} mo`}
        />
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-8 h-auto w-full" role="img"
        aria-label={`Projected cash balance over ${HORIZON} months, ${survives ? "remaining positive throughout" : `reaching zero in month ${zero}`}.`}>
        <defs>
          <linearGradient id="runway-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1={PAD.l} x2={W - PAD.r} y1={zeroY} y2={zeroY} stroke="var(--color-rule)" strokeWidth="1" strokeDasharray="4 4" />
        <path d={`${line}L${lastX.toFixed(1)} ${zeroY}L${px(0)} ${zeroY}Z`} fill="url(#runway-fill)" />
        <path d={line} fill="none" stroke="var(--color-blue)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {!survives && zero !== null && (
          <g>
            <line x1={px(zero)} x2={px(zero)} y1={PAD.t} y2={zeroY} stroke="var(--color-loss)" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx={px(zero)} cy={zeroY} r="5" fill="var(--color-loss)" />
            <text x={px(zero)} y={PAD.t + 2} textAnchor={zero > HORIZON * 0.7 ? "end" : "start"}
              fontSize="11" fontWeight="600" fill="var(--color-loss)"
              dx={zero > HORIZON * 0.7 ? -8 : 8}>
              Month {zero}
            </text>
          </g>
        )}

        <g fontSize="11" fill="var(--color-ink-faint)">
          {[0, 12, 24, 36].map((m, i) => (
            <text key={m} x={px(m)} y={H - 8} textAnchor={i === 0 ? "start" : i === 3 ? "end" : "middle"}>
              {m === 0 ? "Today" : `${m}mo`}
            </text>
          ))}
        </g>
      </svg>

      {survives && breakeven !== null && (
        <p className="mt-4 rounded-md border border-gain/25 bg-gain-soft px-4 py-3 text-[0.875rem] text-gain">
          Gross profit covers operating expense from month {breakeven}, before
          the cash runs out. On these assumptions you reach default alive.
        </p>
      )}
    </ToolCard>
  );
}
