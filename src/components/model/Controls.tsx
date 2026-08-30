"use client";

/**
 * The assumption panel.
 *
 * Every control is a slider with the value printed beside it, because the
 * point of this page is watching the outputs move. Typing into a box and
 * pressing tab does not show you the shape of a relationship; dragging does.
 * The number is still directly editable for anyone who knows their figure.
 */

import { useId, useState } from "react";
import type { Assumptions } from "@/lib/model";
import { money, percent } from "@/lib/model";

type Setter = <K extends keyof Assumptions>(key: K, value: Assumptions[K]) => void;

function Field({
  label,
  hint,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const fill = `${((value - min) / (max - min)) * 100}%`;

  return (
    <div className="py-3.5">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm text-ink-soft">
          {label}
        </label>
        <output htmlFor={id} className="tnum text-sm font-semibold text-navy">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-2.5"
        style={{ "--range-fill": fill } as React.CSSProperties}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-rule py-2 first:border-t-0">
      <h3 className="label mt-4 text-blue">{title}</h3>
      <div className="mt-1 divide-y divide-rule-soft">{children}</div>
    </section>
  );
}

export function Controls({
  a,
  set,
  onReset,
}: {
  a: Assumptions;
  set: Setter;
  onReset: () => void;
}) {
  const [advanced, setAdvanced] = useState(false);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="display text-xl text-navy">Your assumptions</h2>
        <button
          type="button"
          onClick={onReset}
          className="label tap text-ink-faint transition-colors duration-300 hover:text-blue"
        >
          Reset
        </button>
      </div>

      <Group title="Revenue">
        <Field
          label="Starting MRR"
          hint={`${money(a.startingMrr * 12, { compact: true })} of ARR today`}
          value={a.startingMrr}
          display={money(a.startingMrr)}
          min={0}
          max={2_000_000}
          step={5_000}
          onChange={(v) => set("startingMrr", v)}
        />
        <Field
          label="New business, monthly"
          hint="New MRR as a share of the current base"
          value={a.growthRate}
          display={percent(a.growthRate)}
          min={0}
          max={0.2}
          step={0.0025}
          onChange={(v) => set("growthRate", v)}
        />
        <Field
          label="Churn, monthly"
          value={a.churnRate}
          display={percent(a.churnRate, 2)}
          min={0}
          max={0.06}
          step={0.0005}
          onChange={(v) => set("churnRate", v)}
        />
        <Field
          label="Expansion, monthly"
          hint="Upsell and seat growth from the existing base"
          value={a.expansionRate}
          display={percent(a.expansionRate, 2)}
          min={0}
          max={0.06}
          step={0.0005}
          onChange={(v) => set("expansionRate", v)}
        />
        <Field
          label="Gross margin"
          value={a.grossMargin}
          display={percent(a.grossMargin, 0)}
          min={0.3}
          max={0.95}
          step={0.01}
          onChange={(v) => set("grossMargin", v)}
        />
      </Group>

      <Group title="Cost base">
        <Field
          label="Headcount today"
          value={a.headcount}
          display={`${Math.round(a.headcount)}`}
          min={1}
          max={250}
          step={1}
          onChange={(v) => set("headcount", v)}
        />
        <Field
          label="Net hires per month"
          hint="Fractional is fine — 0.6 means three every five months"
          value={a.hiresPerMonth}
          display={a.hiresPerMonth.toFixed(1)}
          min={0}
          max={6}
          step={0.1}
          onChange={(v) => set("hiresPerMonth", v)}
        />
        <Field
          label="Fully loaded cost per head"
          hint="Salary plus taxes, benefits and equipment"
          value={a.avgSalary}
          display={`${money(a.avgSalary, { compact: true })}/yr`}
          min={60_000}
          max={400_000}
          step={5_000}
          onChange={(v) => set("avgSalary", v)}
        />
        <Field
          label="Sales & marketing"
          hint="Programme spend as a share of revenue, excluding payroll"
          value={a.salesMarketingPct}
          display={percent(a.salesMarketingPct, 0)}
          min={0}
          max={1.5}
          step={0.01}
          onChange={(v) => set("salesMarketingPct", v)}
        />
        <Field
          label="Other operating spend"
          hint="Tools, rent, services — everything not payroll or S&M"
          value={a.otherOpex}
          display={`${money(a.otherOpex)}/mo`}
          min={0}
          max={600_000}
          step={2_500}
          onChange={(v) => set("otherOpex", v)}
        />
      </Group>

      <Group title="Cash and contracts">
        <Field
          label="Cash on hand"
          value={a.startingCash}
          display={money(a.startingCash, { compact: true })}
          min={0}
          max={60_000_000}
          step={100_000}
          onChange={(v) => set("startingCash", v)}
        />
        <Field
          label="Average contract value"
          hint="Annual, per customer — drives CAC and payback"
          value={a.acv}
          display={`${money(a.acv)}/yr`}
          min={1_000}
          max={300_000}
          step={1_000}
          onChange={(v) => set("acv", v)}
        />
      </Group>

      <div className="border-t border-rule pt-4">
        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          aria-expanded={advanced}
          className="label tap w-full justify-between text-ink-faint transition-colors duration-300 hover:text-navy"
        >
          Working capital
          <span aria-hidden="true" className="text-base leading-none">
            {advanced ? "−" : "+"}
          </span>
        </button>

        {advanced && (
          <div className="fade-up divide-y divide-rule-soft">
            <Field
              label="Days sales outstanding"
              hint="How long invoices take to collect"
              value={a.dso}
              display={`${Math.round(a.dso)} days`}
              min={0}
              max={150}
              step={1}
              onChange={(v) => set("dso", v)}
            />
            <Field
              label="Days payable outstanding"
              value={a.dpo}
              display={`${Math.round(a.dpo)} days`}
              min={0}
              max={150}
              step={1}
              onChange={(v) => set("dpo", v)}
            />
            <Field
              label="Billed annually up front"
              hint="Raises deferred revenue, and brings cash forward"
              value={a.annualPrepayShare}
              display={percent(a.annualPrepayShare, 0)}
              min={0}
              max={1}
              step={0.05}
              onChange={(v) => set("annualPrepayShare", v)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
