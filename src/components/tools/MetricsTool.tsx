"use client";

import { useMemo, useState } from "react";
import { NumberField, ToolCard, money } from "./ToolKit";

type Verdict = "gain" | "warn" | "loss";

function Metric({
  name,
  value,
  verdict,
  target,
  explain,
}: {
  name: string;
  value: string;
  verdict: Verdict;
  target: string;
  explain: string;
}) {
  const tone = { gain: "text-gain", warn: "text-warn", loss: "text-loss" }[verdict];
  const dot = { gain: "bg-gain", warn: "bg-warn", loss: "bg-loss" }[verdict];

  return (
    <div className="rounded-lg border border-rule p-5">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-[0.9375rem] font-medium text-navy">{name}</h4>
        <span aria-hidden="true" className={`mt-1.5 block h-2 w-2 shrink-0 rounded-full ${dot}`} />
      </div>
      <p className={`tnum display mt-3 text-3xl leading-none ${tone}`}>{value}</p>
      <p className="mt-3 text-[0.8125rem] text-ink-faint">Healthy: {target}</p>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-soft">{explain}</p>
    </div>
  );
}

export function MetricsTool() {
  const [arr, setArr] = useState(6_400_000);
  const [newArr, setNewArr] = useState(420_000);
  const [expansion, setExpansion] = useState(140_000);
  const [churned, setChurned] = useState(96_000);
  const [sm, setSm] = useState(520_000);
  const [margin, setMargin] = useState(76);
  const [customers, setCustomers] = useState(212);
  const [newCustomers, setNewCustomers] = useState(14);
  const [burn, setBurn] = useState(680_000);

  const m = useMemo(() => {
    const acv = customers > 0 ? arr / customers : 0;
    const cac = newCustomers > 0 ? sm / newCustomers : 0;
    const grossMargin = margin / 100;
    const monthlyChurnRate = arr > 0 ? churned / arr : 0;
    const lifetimeMonths = monthlyChurnRate > 0 ? 1 / monthlyChurnRate : 120;
    const ltv = (acv / 12) * grossMargin * lifetimeMonths;
    const ltvCac = cac > 0 ? ltv / cac : 0;
    const paybackMonths = cac > 0 && acv > 0 ? cac / ((acv / 12) * grossMargin) : 0;
    const netNew = newArr + expansion - churned;
    // (quarterly revenue increase x 4) / S&M, and quarterly revenue
    // increase is netNew / 4 — so the fours cancel.
    const magicNumber = sm > 0 ? netNew / sm : 0;
    const nrr = arr > 0 ? ((arr + expansion - churned) / arr) * 100 : 0;
    const burnMultiple = netNew > 0 ? burn / netNew : Infinity;
    const annualGrowth = arr > 0 ? (Math.pow(1 + netNew / arr, 12) - 1) * 100 : 0;
    const opMargin = arr > 0 ? ((arr / 12) * grossMargin - burn) / (arr / 12) * 100 : 0;
    const ruleOf40 = annualGrowth + opMargin;
    return { acv, cac, ltv, ltvCac, paybackMonths, magicNumber, nrr, burnMultiple, ruleOf40, netNew };
  }, [arr, newArr, expansion, churned, sm, margin, customers, newCustomers, burn]);

  const v = {
    ltvCac: m.ltvCac >= 3 ? "gain" : m.ltvCac >= 2 ? "warn" : "loss",
    payback: m.paybackMonths <= 12 ? "gain" : m.paybackMonths <= 18 ? "warn" : "loss",
    magic: m.magicNumber >= 0.75 ? "gain" : m.magicNumber >= 0.5 ? "warn" : "loss",
    nrr: m.nrr >= 110 ? "gain" : m.nrr >= 100 ? "warn" : "loss",
    burn: m.burnMultiple <= 1.5 ? "gain" : m.burnMultiple <= 2.5 ? "warn" : "loss",
    rule: m.ruleOf40 >= 40 ? "gain" : m.ruleOf40 >= 20 ? "warn" : "loss",
  } as const;

  return (
    <ToolCard
      eyebrow="Tool 04"
      title="SaaS metrics & benchmarks"
      blurb="Enter a quarter of numbers and see the six metrics an investor will compute anyway — with the thresholds they will compare you against."
      footnote="Benchmarks reflect commonly cited ranges for venture-backed B2B SaaS and vary by stage, segment and motion. LTV assumes churn holds constant, which it never quite does."
      controls={
        <div className="grid gap-5 sm:grid-cols-2">
          <NumberField label="Current ARR" value={arr} onChange={setArr} prefix="$" step={100_000} />
          <NumberField label="New ARR this quarter" value={newArr} onChange={setNewArr} prefix="$" step={10_000} />
          <NumberField label="Expansion ARR" value={expansion} onChange={setExpansion} prefix="$" step={10_000} />
          <NumberField label="Churned ARR" value={churned} onChange={setChurned} prefix="$" step={10_000} />
          <NumberField label="Sales & marketing" value={sm} onChange={setSm} prefix="$" step={10_000} />
          <NumberField label="Net burn this quarter" value={burn} onChange={setBurn} prefix="$" step={10_000} />
          <NumberField label="Gross margin" value={margin} onChange={setMargin} suffix="%" step={1} />
          <NumberField label="Customers" value={customers} onChange={setCustomers} step={1} />
          <NumberField label="New customers" value={newCustomers} onChange={setNewCustomers} step={1} />
        </div>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Metric name="LTV : CAC" value={m.ltvCac.toFixed(1) + "×"} verdict={v.ltvCac} target="3× or better"
          explain={`CAC of ${money(m.cac)} against lifetime gross profit of ${money(m.ltv)}.`} />
        <Metric name="CAC payback" value={`${m.paybackMonths.toFixed(0)} mo`} verdict={v.payback} target="under 12 months"
          explain="Months of gross profit to earn back the cost of winning a customer." />
        <Metric name="Magic number" value={m.magicNumber.toFixed(2)} verdict={v.magic} target="0.75 or better"
          explain="Annualised net new ARR per dollar of sales and marketing." />
        <Metric name="Net revenue retention" value={`${m.nrr.toFixed(0)}%`} verdict={v.nrr} target="110% or better"
          explain="Expansion less churn on the existing base, before new logos." />
        <Metric name="Burn multiple" value={Number.isFinite(m.burnMultiple) ? `${m.burnMultiple.toFixed(1)}×` : "—"} verdict={v.burn} target="under 1.5×"
          explain="Net burn per dollar of net new ARR. The number that decides your next round." />
        <Metric name="Rule of 40" value={`${m.ruleOf40.toFixed(0)}`} verdict={v.rule} target="40 or above"
          explain="Annualised growth rate plus operating margin." />
      </div>

      <div className="mt-6 rounded-lg border border-rule bg-canvas p-5">
        <p className="text-[0.875rem] leading-relaxed text-ink-soft">
          Net new ARR this quarter is{" "}
          <strong className={`tnum ${m.netNew >= 0 ? "text-gain" : "text-loss"}`}>
            {m.netNew >= 0 ? "+" : "−"}{money(Math.abs(m.netNew))}
          </strong>{" "}
          — new plus expansion less churn. Average contract value is{" "}
          <strong className="tnum text-navy">{money(m.acv)}</strong>. Those two
          figures drive everything above, which is why they are worth defining
          once and never quietly redefining.
        </p>
      </div>
    </ToolCard>
  );
}
