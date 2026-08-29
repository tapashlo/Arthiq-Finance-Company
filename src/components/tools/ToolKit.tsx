"use client";

import { useId, type ReactNode } from "react";

/* ------------------------------------------------------------ formatting -- */

export const money = (n: number, digits = 0) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const compactMoney = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${n < 0 ? "−" : ""}$${(abs / 1_000_000).toFixed(abs >= 10_000_000 ? 0 : 1)}M`;
  if (abs >= 1_000) return `${n < 0 ? "−" : ""}$${(abs / 1_000).toFixed(abs >= 100_000 ? 0 : 0)}K`;
  return `${n < 0 ? "−" : ""}$${Math.round(abs)}`;
};

export const pct = (n: number, digits = 0) => `${n.toFixed(digits)}%`;

/* ---------------------------------------------------------------- inputs -- */

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  hint?: string;
}) {
  const id = useId();
  // Painting the filled portion of the track needs the position as a percentage.
  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.9375rem] font-medium text-ink">
          {label}
        </label>
        <output htmlFor={id} className="tnum text-[0.9375rem] font-semibold text-blue">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--range-fill": `${fill}%` } as React.CSSProperties}
      />
      {hint && <p className="mt-1.5 text-[0.8125rem] text-ink-faint">{hint}</p>}
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-[0.9375rem] font-medium text-ink">
        {label}
      </label>
      <div className="mt-2 flex items-center rounded-md border border-rule bg-white transition-colors focus-within:border-blue">
        {prefix && (
          <span className="pl-3.5 text-[0.9375rem] text-ink-faint">{prefix}</span>
        )}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          className="tnum w-full bg-transparent px-3 py-3 text-[0.9375rem] text-ink outline-none"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        {suffix && (
          <span className="pr-3.5 text-[0.9375rem] text-ink-faint">{suffix}</span>
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- results -- */

export function Readout({
  label,
  value,
  tone = "neutral",
  note,
  large = false,
}: {
  label: string;
  value: string;
  tone?: "neutral" | "gain" | "loss" | "warn" | "accent";
  note?: string;
  large?: boolean;
}) {
  const colour = {
    neutral: "text-navy",
    gain: "text-gain",
    loss: "text-loss",
    warn: "text-warn",
    accent: "text-blue",
  }[tone];

  return (
    <div>
      <div className="label text-ink-faint">{label}</div>
      <div
        className={`tnum display mt-2.5 leading-none ${colour} ${
          large ? "text-4xl md:text-5xl" : "text-2xl md:text-[1.75rem]"
        }`}
      >
        {value}
      </div>
      {note && <div className="mt-2 text-[0.8125rem] text-ink-faint">{note}</div>}
    </div>
  );
}

/** Where a value sits inside a benchmark range, as a labelled bar. */
export function BenchmarkBar({
  value,
  bands,
  format,
}: {
  value: number;
  bands: { upTo: number; label: string; tone: "loss" | "warn" | "gain" }[];
  format: (v: number) => string;
}) {
  const max = bands[bands.length - 1].upTo;
  const clamped = Math.max(0, Math.min(value, max));
  const position = (clamped / max) * 100;
  const band = bands.find((b) => value <= b.upTo) ?? bands[bands.length - 1];
  const fill = { loss: "bg-loss", warn: "bg-warn", gain: "bg-gain" }[band.tone];

  return (
    <div>
      <div className="relative h-2 overflow-hidden rounded-full bg-canvas-deep">
        <div
          className={`h-full rounded-full transition-[width] duration-300 ${fill}`}
          style={{ width: `${position}%` }}
        />
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <span className={`label ${{ loss: "text-loss", warn: "text-warn", gain: "text-gain" }[band.tone]}`}>
          {band.label}
        </span>
        <span className="tnum text-[0.8125rem] text-ink-faint">
          benchmark to {format(max)}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- shell -- */

export function ToolCard({
  eyebrow,
  title,
  blurb,
  controls,
  children,
  footnote,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
  controls: ReactNode;
  children: ReactNode;
  footnote?: string;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-rule bg-white shadow-lift">
      <header className="border-b border-rule bg-canvas px-6 py-6 md:px-8">
        <p className="eyebrow label">{eyebrow}</p>
        <h3 className="display mt-3.5 text-2xl text-navy md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
          {blurb}
        </p>
      </header>

      <div className="grid lg:grid-cols-12">
        <div className="space-y-6 border-b border-rule p-6 md:p-8 lg:col-span-5 lg:border-r lg:border-b-0">
          {controls}
        </div>
        <div className="min-w-0 p-6 md:p-8 lg:col-span-7">{children}</div>
      </div>

      {footnote && (
        <p className="border-t border-rule bg-canvas px-6 py-4 text-[0.8125rem] leading-relaxed text-ink-faint md:px-8">
          {footnote}
        </p>
      )}
    </section>
  );
}
