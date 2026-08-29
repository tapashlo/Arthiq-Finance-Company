"use client";

import { useMemo, useState } from "react";
import { Readout, Slider, ToolCard, compactMoney } from "./ToolKit";

const MONTHS = 24;

type Case = { key: "down" | "base" | "up"; label: string; colour: string; delta: number };

function build(arr: number, growth: number, churn: number, delta: number) {
  const out: number[] = [];
  let v = arr;
  for (let m = 0; m <= MONTHS; m++) {
    out.push(v);
    v *= 1 + (growth + delta) / 100 - churn / 100;
  }
  return out;
}

export function ScenarioTool() {
  const [arr, setArr] = useState(4_800_000);
  const [growth, setGrowth] = useState(6);
  const [churn, setChurn] = useState(1.2);
  const [spread, setSpread] = useState(2.5);
  const [margin, setMargin] = useState(74);
  const [opexRatio, setOpexRatio] = useState(95);

  const cases: Case[] = [
    { key: "down", label: "Downside", colour: "var(--color-loss)", delta: -spread },
    { key: "base", label: "Base", colour: "var(--color-blue)", delta: 0 },
    { key: "up", label: "Upside", colour: "var(--color-gain)", delta: spread },
  ];

  const series = useMemo(
    () => cases.map((c) => ({ ...c, values: build(arr, growth, churn, c.delta) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [arr, growth, churn, spread],
  );

  const W = 560;
  const H = 280;
  const PAD = { t: 18, r: 10, b: 30, l: 10 };
  const max = Math.max(...series.flatMap((s) => s.values)) * 1.06;
  const min = Math.min(...series.flatMap((s) => s.values)) * 0.94;
  const px = (m: number) => PAD.l + (m / MONTHS) * (W - PAD.l - PAD.r);
  const py = (v: number) => PAD.t + (1 - (v - min) / (max - min || 1)) * (H - PAD.t - PAD.b);

  const path = (vals: number[]) =>
    vals.map((v, i) => `${i ? "L" : "M"}${px(i).toFixed(1)} ${py(v).toFixed(1)}`).join("");

  const base = series[1];
  const endBase = base.values[MONTHS];
  const annualisedOpex = (endBase * (opexRatio / 100));
  const grossProfit = endBase * (margin / 100);
  const operatingMargin = ((grossProfit - annualisedOpex) / endBase) * 100;

  return (
    <ToolCard
      eyebrow="Tool 02"
      title="Scenario planner"
      blurb="Three futures on one chart. Move the spread to see how far apart your board cases really are after two years of compounding."
      footnote="Simplified: ARR compounds monthly at growth less churn; the spread is applied symmetrically to the growth rate. A real model would branch drivers independently rather than shifting one rate."
      controls={
        <>
          <Slider label="Current ARR" value={arr} min={250_000} max={80_000_000} step={250_000} onChange={setArr} format={compactMoney} />
          <Slider label="Base monthly growth" value={growth} min={0} max={18} step={0.25} onChange={setGrowth} format={(v) => `${v}% / mo`} />
          <Slider label="Monthly gross churn" value={churn} min={0} max={6} step={0.1} onChange={setChurn} format={(v) => `${v}% / mo`} />
          <Slider label="Case spread" value={spread} min={0.5} max={6} step={0.25} onChange={setSpread} format={(v) => `± ${v} pts`} hint="How much better or worse than base each case assumes." />
          <Slider label="Gross margin" value={margin} min={30} max={92} step={1} onChange={setMargin} format={(v) => `${v}%`} />
          <Slider label="Opex as % of ARR" value={opexRatio} min={40} max={180} step={5} onChange={setOpexRatio} format={(v) => `${v}%`} />
        </>
      }
    >
      <div className="grid grid-cols-3 gap-4">
        {series.map((s) => (
          <Readout
            key={s.key}
            label={s.label}
            value={compactMoney(s.values[MONTHS])}
            tone={s.key === "up" ? "gain" : s.key === "down" ? "loss" : "accent"}
            note={`${((s.values[MONTHS] / arr - 1) * 100).toFixed(0)}% growth`}
          />
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-7 h-auto w-full" role="img"
        aria-label={`Two-year ARR under three scenarios, ending between ${compactMoney(series[0].values[MONTHS])} and ${compactMoney(series[2].values[MONTHS])}.`}>
        <defs>
          <linearGradient id="scen-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-blue)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-blue)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* The cone between downside and upside is the actual message. */}
        <path
          d={`${path(series[2].values)}L${px(MONTHS)} ${py(series[0].values[MONTHS])}${series[0].values
            .map((v, i) => `L${px(MONTHS - i).toFixed(1)} ${py(series[0].values[MONTHS - i]).toFixed(1)}`)
            .join("")}Z`}
          fill="url(#scen-band)"
        />

        {series.map((s) => (
          <path key={s.key} d={path(s.values)} fill="none" stroke={s.colour}
            strokeWidth={s.key === "base" ? 3 : 2}
            strokeDasharray={s.key === "base" ? undefined : "5 4"}
            strokeLinejoin="round" strokeLinecap="round" />
        ))}

        {series.map((s) => (
          <circle key={s.key} cx={px(MONTHS)} cy={py(s.values[MONTHS])} r="4.5" fill={s.colour} />
        ))}

        <g fontSize="11" fill="var(--color-ink-faint)">
          {[0, 6, 12, 18, 24].map((m, i) => (
            <text key={m} x={px(m)} y={H - 8} textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}>
              {m === 0 ? "Today" : `${m}mo`}
            </text>
          ))}
        </g>
      </svg>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-5">
        {series.map((s) => (
          <span key={s.key} className="flex items-center gap-2 text-[0.8125rem] text-ink-soft">
            <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full" style={{ background: s.colour }} />
            {s.label}
          </span>
        ))}
        <span className="ml-auto text-[0.8125rem] text-ink-faint">
          Base operating margin at month 24:{" "}
          <strong className={`tnum ${operatingMargin >= 0 ? "text-gain" : "text-loss"}`}>
            {operatingMargin >= 0 ? "+" : "−"}{Math.abs(operatingMargin).toFixed(0)}%
          </strong>
        </span>
      </div>
    </ToolCard>
  );
}
