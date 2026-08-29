"use client";

import { useMemo, useState } from "react";
import { ToolCard, money } from "./ToolKit";

type Line = { name: string; budget: number; actual: number };
type Dept = { name: string; lines: Line[] };

/** Illustrative Q3 numbers for a ~90-person Series B company. */
const DEPARTMENTS: Dept[] = [
  { name: "Sales & Marketing", lines: [
    { name: "Salaries & commission", budget: 1_240_000, actual: 1_312_000 },
    { name: "Paid acquisition", budget: 480_000, actual: 604_000 },
    { name: "Events & field", budget: 220_000, actual: 141_000 },
    { name: "Tooling", budget: 96_000, actual: 103_000 },
  ]},
  { name: "Engineering", lines: [
    { name: "Salaries", budget: 2_180_000, actual: 2_054_000 },
    { name: "Contractors", budget: 240_000, actual: 388_000 },
    { name: "Cloud & infrastructure", budget: 410_000, actual: 476_000 },
    { name: "Tooling", budget: 128_000, actual: 121_000 },
  ]},
  { name: "Customer Success", lines: [
    { name: "Salaries", budget: 620_000, actual: 598_000 },
    { name: "Support tooling", budget: 74_000, actual: 71_000 },
    { name: "Professional services", budget: 110_000, actual: 92_000 },
  ]},
  { name: "General & Admin", lines: [
    { name: "Salaries", budget: 540_000, actual: 561_000 },
    { name: "Legal & professional", budget: 180_000, actual: 268_000 },
    { name: "Rent & facilities", budget: 210_000, actual: 208_000 },
    { name: "Insurance", budget: 64_000, actual: 69_000 },
  ]},
];

const total = (d: Dept, k: "budget" | "actual") =>
  d.lines.reduce((a, l) => a + l[k], 0);

export function VarianceTool() {
  const [open, setOpen] = useState<string | null>("Sales & Marketing");
  const [mode, setMode] = useState<"dollars" | "percent">("dollars");

  const rows = useMemo(
    () => DEPARTMENTS.map((d) => {
      const b = total(d, "budget");
      const a = total(d, "actual");
      // Cost centres: spending less than budget is favourable.
      return { dept: d, budget: b, actual: a, variance: b - a, pct: ((b - a) / b) * 100 };
    }),
    [],
  );

  const grand = rows.reduce(
    (acc, r) => ({ budget: acc.budget + r.budget, actual: acc.actual + r.actual }),
    { budget: 0, actual: 0 },
  );
  const grandVar = grand.budget - grand.actual;

  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.variance)));

  return (
    <ToolCard
      eyebrow="Tool 03"
      title="Budget vs actual explorer"
      blurb="A quarter of spend, four departments deep. Click any row to see what actually drove the gap — the number is never the point, the cause is."
      footnote="Illustrative Q3 figures for a roughly 90-person Series B company. Favourable means under budget on a cost centre."
      controls={
        <>
          <div>
            <p className="text-[0.9375rem] font-medium text-ink">Show variance as</p>
            <div className="mt-3 inline-flex rounded-md border border-rule p-1">
              {(["dollars", "percent"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`rounded px-4 py-2.5 text-[0.875rem] font-medium capitalize transition-colors ${
                    mode === m ? "bg-navy text-white" : "text-ink-soft hover:text-navy"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <dl className="space-y-4 border-t border-rule pt-6">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.9375rem] text-ink-soft">Total budget</dt>
              <dd className="tnum text-[0.9375rem] font-semibold text-navy">{money(grand.budget)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.9375rem] text-ink-soft">Total actual</dt>
              <dd className="tnum text-[0.9375rem] font-semibold text-navy">{money(grand.actual)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 border-t border-rule pt-4">
              <dt className="text-[0.9375rem] font-medium text-ink">Net variance</dt>
              <dd className={`tnum text-lg font-semibold ${grandVar >= 0 ? "text-gain" : "text-loss"}`}>
                {grandVar >= 0 ? "+" : "−"}{money(Math.abs(grandVar))}
              </dd>
            </div>
          </dl>

          <p className="text-[0.8125rem] leading-relaxed text-ink-faint">
            Overspend concentrates in two places here: paid acquisition and
            contractors. Both are usually decisions somebody made deliberately —
            the variance review exists to surface whether they were the right ones.
          </p>
        </>
      }
    >
      <div className="space-y-2.5">
        {rows.map((r) => {
          const isOpen = open === r.dept.name;
          const favourable = r.variance >= 0;
          const width = (Math.abs(r.variance) / maxAbs) * 100;

          return (
            <div key={r.dept.name} className="overflow-hidden rounded-lg border border-rule">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : r.dept.name)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-canvas"
              >
                <span
                  aria-hidden="true"
                  className={`text-ink-faint transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                >
                  ›
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.9375rem] font-medium text-navy">
                    {r.dept.name}
                  </span>
                  <span className="tnum mt-1 block text-[0.8125rem] text-ink-faint">
                    {money(r.actual)} of {money(r.budget)}
                  </span>
                </span>

                <span className="hidden w-28 sm:block">
                  <span className="block h-1.5 rounded-full bg-canvas-deep">
                    <span
                      className={`block h-full rounded-full ${favourable ? "bg-gain" : "bg-loss"}`}
                      style={{ width: `${width}%` }}
                    />
                  </span>
                </span>

                <span className={`tnum w-24 shrink-0 text-right text-[0.9375rem] font-semibold ${favourable ? "text-gain" : "text-loss"}`}>
                  {favourable ? "+" : "−"}
                  {mode === "dollars"
                    ? money(Math.abs(r.variance))
                    : `${Math.abs(r.pct).toFixed(1)}%`}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-rule bg-canvas px-4 py-3">
                  <table className="w-full text-left">
                    <caption className="sr-only">{r.dept.name} line items</caption>
                    <thead>
                      <tr>
                        <th className="label py-2 text-ink-faint">Line item</th>
                        <th className="label py-2 text-right text-ink-faint">Budget</th>
                        <th className="label py-2 text-right text-ink-faint">Actual</th>
                        <th className="label py-2 text-right text-ink-faint">Var</th>
                      </tr>
                    </thead>
                    <tbody>
                      {r.dept.lines.map((l) => {
                        const v = l.budget - l.actual;
                        return (
                          <tr key={l.name} className="border-t border-rule-soft">
                            <td className="py-2.5 text-[0.875rem] text-ink">{l.name}</td>
                            <td className="tnum py-2.5 text-right text-[0.875rem] text-ink-soft">{money(l.budget)}</td>
                            <td className="tnum py-2.5 text-right text-[0.875rem] text-ink-soft">{money(l.actual)}</td>
                            <td className={`tnum py-2.5 text-right text-[0.875rem] font-medium ${v >= 0 ? "text-gain" : "text-loss"}`}>
                              {v >= 0 ? "+" : "−"}{money(Math.abs(v))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ToolCard>
  );
}
