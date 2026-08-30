"use client";

/**
 * The output half of the model studio: five views over one projection.
 *
 * Statements are shown quarterly. Twenty-four monthly columns is a spreadsheet,
 * not a reading experience, and the monthly detail is already in the charts.
 */

import { useState } from "react";
import {
  money, monthYear, months as fmtMonths, percent, thousands,
  type Metrics, type Month, type Projection,
} from "@/lib/model";
import { BalanceChart, CashChart, Gauge, PnlChart } from "./charts";

const VIEWS = ["Summary", "Cash", "P&L", "Balance sheet", "Metrics"] as const;
type View = (typeof VIEWS)[number];

/* ------------------------------------------------------------ aggregation -- */

type Quarter = {
  label: string;
  revenue: number; cogs: number; grossProfit: number;
  personnel: number; salesMarketing: number; otherOpex: number;
  totalOpex: number; ebitda: number;
  cash: number; ar: number; ap: number; deferred: number;
  paidIn: number; retained: number; equity: number;
  headcount: number;
};

/** Flows sum across the quarter; balances take the closing month. */
function quarters(ms: Month[]): Quarter[] {
  const out: Quarter[] = [];
  for (let i = 0; i < ms.length; i += 3) {
    const g = ms.slice(i, i + 3);
    if (!g.length) break;
    const end = g[g.length - 1];
    const sum = (f: (m: Month) => number) => g.reduce((s, m) => s + f(m), 0);
    out.push({
      label: `Q${Math.floor(i / 3) + 1}`,
      revenue: sum((m) => m.revenue),
      cogs: sum((m) => m.cogs),
      grossProfit: sum((m) => m.grossProfit),
      personnel: sum((m) => m.personnel),
      salesMarketing: sum((m) => m.salesMarketing),
      otherOpex: sum((m) => m.otherOpex),
      totalOpex: sum((m) => m.totalOpex),
      ebitda: sum((m) => m.ebitda),
      cash: end.cash,
      ar: end.accountsReceivable,
      ap: end.accountsPayable,
      deferred: end.deferredRevenue,
      paidIn: end.paidInCapital,
      retained: end.retainedEarnings,
      equity: end.totalEquity,
      headcount: end.headcount,
    });
  }
  return out;
}

/* ---------------------------------------------------------------- reading -- */

/**
 * The plain-English read.
 *
 * This is the part that makes the page an argument rather than a calculator:
 * the same sentences an analyst would write, generated from the same numbers,
 * naming the binding constraint rather than listing every metric.
 */
function readout(m: Metrics, ms: Month[]): { title: string; body: string }[] {
  const out: { title: string; body: string }[] = [];
  const last = ms[ms.length - 1];

  out.push({
    title: Number.isFinite(m.runwayMonths) ? "You run out" : "You do not run out",
    body: Number.isFinite(m.runwayMonths)
      ? `Cash reaches zero in ${monthYear(m.cashOutDate)}, ${fmtMonths(m.runwayMonths)} from now. On the usual rule of raising with nine months left, that means starting a process around ${monthYear(ms[Math.max(0, Math.floor(m.runwayMonths) - 9)]?.date ?? null)}.`
      : `Cash stays positive across the whole horizon, ending at ${money(m.endingCash, { compact: true })}. The peak monthly outflow is ${money(m.peakBurn, { compact: true })}.`,
  });

  const bm = m.burnMultiple;
  out.push({
    title: "Efficiency",
    body: !Number.isFinite(bm)
      ? "Net new ARR is zero or negative over the first year, so a burn multiple cannot be computed. That is itself the finding."
      : bm < 1
        ? `A burn multiple of ${bm.toFixed(2)} is exceptional — under a dollar of net burn per dollar of net new ARR. Expect an investor to check how it is computed rather than to believe it.`
        : bm < 1.5
          ? `A burn multiple of ${bm.toFixed(2)} is strong. Below 1.5 is the band where growth reads as earned rather than bought.`
          : bm < 2.5
            ? `A burn multiple of ${bm.toFixed(2)} is defensible at early stage and starts drawing questions at Series B.`
            : `A burn multiple of ${bm.toFixed(2)} is the number that changes the conversation from growth to control. Below 2.0 before the next round is worth more than another point of growth.`,
  });

  out.push({
    title: "Acquisition",
    body: `At ${percent(m.arrGrowth, 0)} annual growth and this level of spend, implied CAC is ${money(m.cac)} and payback is ${m.cacPayback.toFixed(0)} months on gross profit. ${
      m.cacPayback <= 12
        ? "Under a year is efficient; the constraint on growth is more likely to be capacity than economics."
        : m.cacPayback <= 18
          ? "Twelve to eighteen months is normal for this contract size."
          : "Beyond eighteen months, every new customer is a long cash commitment — worth checking before adding spend."
    } LTV is capped at a five-year lifetime, which puts LTV to CAC at ${m.ltvToCac.toFixed(1)}×.`,
  });

  out.push({
    title: "Retention",
    body: `Net revenue retention of ${percent(m.nrr, 0)} ${
      m.nrr >= 1.1
        ? "means the existing base grows on its own — the strongest single line on a diligence page."
        : m.nrr >= 1
          ? "means the base holds. Getting above 110% usually pays better than another point of new business."
          : "means the base leaks. Every month, new business refills a bucket before it grows the company."
    } Ending headcount is ${m.endingHeadcount}, against revenue of ${money(last.revenue * 12, { compact: true })} of ARR — ${money((last.revenue * 12) / Math.max(1, m.endingHeadcount), { compact: true })} per head.`,
  });

  return out;
}

/* ------------------------------------------------------------------ table -- */

function Row({
  label, values, format, total = false, muted = false, indent = false,
}: {
  label: string;
  values: number[];
  format: (v: number) => string;
  total?: boolean;
  muted?: boolean;
  indent?: boolean;
}) {
  return (
    <tr className={total ? "border-t border-[color:var(--color-panel-rule)]" : undefined}>
      <th scope="row"
        className={`sticky left-0 z-10 bg-[color:var(--color-panel)] py-2.5 pr-4 text-left text-sm font-normal whitespace-nowrap ${
          total ? "font-semibold text-white" : muted ? "text-white/45" : "text-white/75"
        } ${indent ? "pl-3" : ""}`}>
        {label}
      </th>
      {values.map((v, i) => (
        <td key={i}
          className={`py-2.5 pl-5 text-right text-sm whitespace-nowrap tabular-nums ${
            total ? "font-semibold text-white" : muted ? "text-white/45" : "text-white/75"
          }`}>
          {format(v)}
        </td>
      ))}
    </tr>
  );
}

function Statement({
  caption, qs, children,
}: {
  caption: string;
  qs: Quarter[];
  children: React.ReactNode;
}) {
  return (
    <div className="scroll-x -mx-4 px-4 sm:-mx-6 sm:px-6">
      <table className="w-full border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col"
              className="label-sm sticky left-0 z-10 bg-[color:var(--color-panel)] pb-3 pr-4 text-left text-white/40">
              $000s
            </th>
            {qs.map((q) => (
              <th key={q.label} scope="col" className="label-sm pb-3 pl-5 text-right text-white/40 whitespace-nowrap">
                {q.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------- tiles -- */

function Headline({ label, value, note, tone }: { label: string; value: string; note: string; tone?: string }) {
  return (
    <div className="panel-tile min-w-0 px-4 py-4">
      <div className="label-sm text-white/45">{label}</div>
      <div className="tnum display mt-3 text-2xl leading-none sm:text-[1.75rem]" style={{ color: tone ?? "#fff" }}>
        {value}
      </div>
      <div className="mt-2.5 text-xs leading-snug text-white/40">{note}</div>
    </div>
  );
}

/* ------------------------------------------------------------------- main -- */

export function Outputs({
  base,
  scenarios,
}: {
  base: Projection;
  scenarios: { name: string; projection: Projection }[];
}) {
  const [view, setView] = useState<View>("Summary");
  const m = base.metrics;
  const qs = quarters(base.months);
  const qLabels = qs.map((q) => q.label);
  const monthLabels = base.months.map((x) => x.label);

  const cashSeries = scenarios.map((s) => ({
    name: s.name,
    colour:
      s.name === "Base" ? "var(--color-viz-blue)"
      : s.name === "Upside" ? "var(--color-viz-mint)"
      : "var(--color-viz-coral)",
    cash: s.projection.months.map((x) => x.cash),
  }));

  return (
    <div className="panel on-panel overflow-hidden">
      <header className="flex items-center gap-3 border-b border-[color:var(--color-panel-rule)] px-4 py-3 sm:px-6">
        <span aria-hidden="true" className="hidden shrink-0 gap-1.5 sm:flex">
          {["#f97389", "#f9b44c", "#3ad0a4"].map((c) => (
            <span key={c} className="block h-2.5 w-2.5 rounded-full opacity-60" style={{ backgroundColor: c }} />
          ))}
        </span>
        <div className="scroll-x -mx-1 flex min-w-0 flex-1 px-1">
          <div className="flex gap-1" role="tablist" aria-label="Model output">
            {VIEWS.map((v) => (
              <button key={v} type="button" role="tab" aria-selected={view === v}
                onClick={() => setView(v)}
                className={`label tap shrink-0 rounded-lg px-3 transition-colors duration-300 ${
                  view === v ? "bg-white/12 text-white" : "text-white/50 hover:text-white"
                }`}>
                {v}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div key={view} className="panel-in p-4 sm:p-6">
        {view === "Summary" && (
          <>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              <Headline label="Runway"
                value={Number.isFinite(m.runwayMonths) ? fmtMonths(m.runwayMonths) : "24+ mo"}
                note={m.cashOutDate ? `Cash out ${monthYear(m.cashOutDate)}` : `Ending cash ${money(m.endingCash, { compact: true })}`}
                tone={Number.isFinite(m.runwayMonths) && m.runwayMonths < 12 ? "var(--color-viz-coral)" : undefined} />
              <Headline label="Ending ARR" value={money(m.endingArr, { compact: true })}
                note={`${percent(m.arrGrowth, 0)} in the first year`} />
              <Headline label="Burn multiple"
                value={Number.isFinite(m.burnMultiple) ? m.burnMultiple.toFixed(2) : "—"}
                note="Net burn per $1 of net new ARR"
                tone={m.burnMultiple < 1.5 ? "var(--color-viz-mint)" : m.burnMultiple > 2.5 ? "var(--color-viz-coral)" : undefined} />
              <Headline label="Breakeven"
                value={m.breakevenMonth ? m.breakevenMonth.label : "Beyond 24 mo"}
                note={m.breakevenMonth ? "First month of positive EBITDA" : "Not within the horizon"} />
            </div>

            <div className="mt-6">
              <CashChart series={cashSeries} labels={monthLabels} />
            </div>

            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[color:var(--color-panel-rule)] pt-4">
              {cashSeries.map((s) => (
                <li key={s.name} className="flex items-center gap-2">
                  <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.colour }} />
                  <span className="label-sm text-white/50">{s.name}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 grid gap-x-8 gap-y-6 border-t border-[color:var(--color-panel-rule)] pt-6 sm:grid-cols-2">
              {readout(m, base.months).map((r) => (
                <div key={r.title}>
                  <h4 className="label text-[color:var(--color-viz-blue)]">{r.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">{r.body}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {view === "Cash" && (
          <>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              <Headline label="Ending cash" value={money(m.endingCash, { compact: true })} note="Month 24" />
              <Headline label="Peak monthly burn" value={money(m.peakBurn, { compact: true })} note="Worst single month" />
              <Headline label="Runway"
                value={Number.isFinite(m.runwayMonths) ? fmtMonths(m.runwayMonths) : "24+ mo"}
                note="Base case" />
              <Headline label="Cash out" value={monthYear(m.cashOutDate)} note="Base case" />
            </div>
            <div className="mt-6">
              <CashChart series={cashSeries} labels={monthLabels} />
            </div>
            <Statement caption="Quarterly cash flow bridge, in thousands of dollars." qs={qs}>
              <Row label="EBITDA" values={qs.map((q) => q.ebitda)} format={thousands} />
              <Row label="Change in receivables" values={qs.map((q, i) => -(q.ar - (qs[i - 1]?.ar ?? 0)))} format={thousands} muted />
              <Row label="Change in payables" values={qs.map((q, i) => q.ap - (qs[i - 1]?.ap ?? 0))} format={thousands} muted />
              <Row label="Change in deferred revenue" values={qs.map((q, i) => q.deferred - (qs[i - 1]?.deferred ?? 0))} format={thousands} muted />
              <Row label="Net cash flow"
                values={qs.map((q, i) => q.ebitda - (q.ar - (qs[i - 1]?.ar ?? 0)) + (q.ap - (qs[i - 1]?.ap ?? 0)) + (q.deferred - (qs[i - 1]?.deferred ?? 0)))}
                format={thousands} total />
              <Row label="Closing cash" values={qs.map((q) => q.cash)} format={thousands} total />
            </Statement>
          </>
        )}

        {view === "P&L" && (
          <>
            <PnlChart months={base.months} labels={monthLabels} />
            <div className="mt-6">
              <Statement caption="Quarterly profit and loss, in thousands of dollars." qs={qs}>
                <Row label="Revenue" values={qs.map((q) => q.revenue)} format={thousands} />
                <Row label="Cost of revenue" values={qs.map((q) => -q.cogs)} format={thousands} indent />
                <Row label="Gross profit" values={qs.map((q) => q.grossProfit)} format={thousands} total />
                <Row label="Personnel" values={qs.map((q) => -q.personnel)} format={thousands} indent />
                <Row label="Sales and marketing" values={qs.map((q) => -q.salesMarketing)} format={thousands} indent />
                <Row label="Other operating" values={qs.map((q) => -q.otherOpex)} format={thousands} indent />
                <Row label="EBITDA" values={qs.map((q) => q.ebitda)} format={thousands} total />
                <Row label="Gross margin" values={qs.map((q) => (q.revenue ? q.grossProfit / q.revenue : 0))} format={(v) => percent(v, 0)} muted />
                <Row label="Headcount, closing" values={qs.map((q) => q.headcount)} format={(v) => String(Math.round(v))} muted />
              </Statement>
            </div>
            <p className="mt-5 border-t border-[color:var(--color-panel-rule)] pt-4 text-xs leading-relaxed text-white/45">
              No depreciation, interest, tax or financing. Net income equals EBITDA here — stated rather than buried,
              because a model whose simplifications you cannot see is worse than a simple one.
            </p>
          </>
        )}

        {view === "Balance sheet" && (
          <>
            <BalanceChart
              points={qs.map((q) => ({ cash: q.cash, ar: q.ar, ap: q.ap, deferred: q.deferred, equity: q.equity }))}
              labels={qLabels} />
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {[["Cash", "var(--color-viz-mint)"], ["Receivables", "var(--color-viz-blue)"],
                ["Payables", "var(--color-viz-coral)"], ["Deferred revenue", "var(--color-viz-amber)"],
                ["Equity", "var(--color-viz-violet)"]].map(([l, c]) => (
                <li key={l} className="flex items-center gap-2">
                  <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: c }} />
                  <span className="label-sm text-white/50">{l}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Statement caption="Quarterly balance sheet, in thousands of dollars." qs={qs}>
                <Row label="Cash" values={qs.map((q) => q.cash)} format={thousands} />
                <Row label="Accounts receivable" values={qs.map((q) => q.ar)} format={thousands} />
                <Row label="Total assets" values={qs.map((q) => q.cash + q.ar)} format={thousands} total />
                <Row label="Accounts payable" values={qs.map((q) => q.ap)} format={thousands} />
                <Row label="Deferred revenue" values={qs.map((q) => q.deferred)} format={thousands} />
                <Row label="Paid-in capital" values={qs.map((q) => q.paidIn)} format={thousands} />
                <Row label="Retained earnings" values={qs.map((q) => q.retained)} format={thousands} />
                <Row label="Liabilities and equity" values={qs.map((q) => q.ap + q.deferred + q.equity)} format={thousands} total />
                <Row label="Check" values={qs.map((q) => q.cash + q.ar - (q.ap + q.deferred + q.equity))} format={(v) => (Math.abs(v) < 1 ? "0" : thousands(v))} muted />
              </Statement>
            </div>
            <p className="mt-5 border-t border-[color:var(--color-panel-rule)] pt-4 text-xs leading-relaxed text-white/45">
              The check row is zero in every column, and the paired columns above are the same height. That is not a
              formatting choice — cash is derived from net income and the working-capital movements, so the two sides
              move by identical amounts.
            </p>
          </>
        )}

        {view === "Metrics" && (
          <>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
              <Headline label="Net revenue retention" value={percent(m.nrr, 0)} note="Annualised from monthly rates" />
              <Headline label="CAC" value={money(m.cac)} note="Implied by growth and spend" />
              <Headline label="LTV / CAC" value={`${m.ltvToCac.toFixed(1)}×`} note={`${m.ltvLifetimeMonths.toFixed(0)}-month lifetime, capped`} />
              <Headline label="Rule of 40" value={m.ruleOf40.toFixed(0)} note="Growth plus EBITDA margin" />
            </div>

            <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
              <div className="divide-y divide-[color:var(--color-panel-rule)]">
                <Gauge label="Burn multiple" value={m.burnMultiple}
                  display={Number.isFinite(m.burnMultiple) ? m.burnMultiple.toFixed(2) : "—"}
                  min={0} max={4} good={[0, 1.5]} higherIsBetter={false}
                  note="Net burn per dollar of net new ARR" />
                <Gauge label="CAC payback" value={m.cacPayback}
                  display={Number.isFinite(m.cacPayback) ? `${m.cacPayback.toFixed(0)} mo` : "—"}
                  min={0} max={36} good={[0, 18]} higherIsBetter={false}
                  note="Months to recover CAC out of gross profit" />
                <Gauge label="LTV to CAC" value={m.ltvToCac} display={`${m.ltvToCac.toFixed(1)}×`}
                  min={0} max={10} good={[3, 10]} note="Above 3× is the usual bar" />
              </div>
              <div className="divide-y divide-[color:var(--color-panel-rule)]">
                <Gauge label="Net revenue retention" value={m.nrr} display={percent(m.nrr, 0)}
                  min={0.7} max={1.5} good={[1.1, 1.5]} note="Above 110% and the base grows itself" />
                <Gauge label="Rule of 40" value={m.ruleOf40} display={m.ruleOf40.toFixed(0)}
                  min={-40} max={120} good={[40, 120]} note="Growth rate plus EBITDA margin" />
                <Gauge label="Magic number" value={m.magicNumber} display={m.magicNumber.toFixed(2)}
                  min={0} max={2} good={[0.75, 2]} note="Net new ARR per dollar of sales and marketing" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
