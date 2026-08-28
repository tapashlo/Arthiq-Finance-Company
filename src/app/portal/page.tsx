import type { Metadata } from "next";
import Link from "next/link";
import { AllocationRing, PerformanceChart } from "@/components/PortalCharts";
import { Reveal } from "@/components/Reveal";
import {
  account,
  accounts,
  activity,
  allocation,
  documents,
  holdings,
} from "@/lib/portal";

export const metadata: Metadata = {
  title: "Client portal",
  description:
    "A demonstration of the ArthIQ client portal: holdings, allocation drift, performance and documents.",
  robots: { index: false, follow: false },
};

const money = (n: number, opts: Intl.NumberFormatOptions = {}) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...opts,
  });

const signed = (n: number) => `${n >= 0 ? "+" : "−"}${Math.abs(n).toFixed(1)}%`;

/** Tab chips want a short figure: $4.18M, $512K — never "$512.05K". */
const compact = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : `$${Math.round(n / 1000)}K`;

export default function PortalPage() {
  return (
    <div className="bg-cream-deep pt-20 md:pt-24">
      {/* Standing notice — this is a mockup, and it should never read as real. */}
      <div className="border-b border-gold/25 bg-gold/8">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3.5">
          <p className="label text-gold">Demonstration · Not a real account</p>
          <p className="ui text-[0.8125rem] text-ink-faint">
            Every figure below is an illustrative placeholder. No login, no data,
            nothing connected.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------ portal bar */}
      <div className="border-b border-rule bg-cream">
        <div className="shell flex flex-wrap items-center justify-between gap-y-4 py-5">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="tnum flex h-10 w-10 items-center justify-center rounded-full bg-forest text-sm text-cream"
            >
              RW
            </span>
            <div>
              <p className="text-lg leading-tight text-forest">
                {account.household}
              </p>
              <p className="label-sm mt-1.5 text-ink-faint">
                Adviser · {account.adviser}
              </p>
            </div>
          </div>
          <p className="label-sm text-ink-faint">
            Values as of {account.asOf}
          </p>
        </div>
      </div>

      {/* --------------------------------------------------- account tabs */}
      <div className="border-b border-rule bg-cream">
        <div className="shell -mb-px flex gap-8 overflow-x-auto">
          {accounts.map((a) => (
            <button
              key={a.name}
              type="button"
              aria-current={"active" in a && a.active ? "true" : undefined}
              className={[
                "label shrink-0 border-b-2 py-5 transition-colors duration-300",
                "active" in a && a.active
                  ? "border-forest text-forest"
                  : "border-transparent text-ink-faint hover:text-forest",
              ].join(" ")}
            >
              {a.name}
              <span className="tnum ml-3 text-ink-faint/70">
                {compact(a.value)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="shell py-12 md:py-16">
        {/* ------------------------------------------------------- summary */}
        <Reveal>
          <div className="grid gap-x-10 gap-y-10 border-b border-rule pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="label text-ink-faint">Total value</p>
              <p className="tnum mt-4 text-5xl leading-none text-forest md:text-[3.25rem]">
                {money(account.totalValue)}
              </p>
              <p className="tnum mt-4 text-base text-green-mid">
                +{money(account.dayChange)} ({account.dayChangePct.toFixed(2)}%) today
              </p>
            </div>
            <Metric label="Year to date" value={`+${account.ytdPct}%`} note="Net of fees" />
            <Metric
              label={`Since ${account.inceptionYear}`}
              value={`+${account.inceptionPct}%`}
              note="Annualized, net of fees"
            />
            <Metric
              label="Losses harvested YTD"
              value={money(account.harvestedYtd)}
              note="Carried against realized gains"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* --------------------------------------------------- chart */}
          <Reveal className="min-w-0 lg:col-span-8">
            <Panel
              title="Portfolio value"
              action={
                <div className="flex shrink-0 gap-1">
                  {["1Y", "3Y", "5Y", "All"].map((r) => (
                    <span
                      key={r}
                      className={[
                        "label-sm rounded-xs px-3 py-2",
                        r === "All"
                          ? "bg-forest text-cream"
                          : "text-ink-faint",
                      ].join(" ")}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              }
            >
              <div className="px-2 pt-4 pb-2">
                <PerformanceChart />
              </div>
            </Panel>
          </Reveal>

          {/* ---------------------------------------------- allocation */}
          <Reveal className="min-w-0 lg:col-span-4" delay={90}>
            <Panel title="Allocation" action={<span className="label-sm text-ink-faint">vs target</span>}>
              <div className="flex flex-col items-center gap-8 p-7">
                <AllocationRing />
                <ul className="w-full space-y-3.5">
                  {allocation.map((a) => (
                    <li key={a.name} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: a.color }}
                      />
                      <span className="ui flex-1 text-[0.9375rem] text-ink-soft">
                        {a.name}
                      </span>
                      <span className="tnum text-[0.9375rem] text-forest">
                        {a.actual}%
                      </span>
                      <span className="tnum w-14 text-right text-[0.8125rem] text-ink-faint">
                        {a.target}% tgt
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="ui w-full border-t border-rule-soft pt-5 text-[0.8125rem] leading-relaxed text-ink-faint">
                  All classes within their rebalancing bands. No trades required.
                </p>
              </div>
            </Panel>
          </Reveal>

          {/* ------------------------------------------------- holdings */}
          <Reveal className="min-w-0 lg:col-span-8" delay={60}>
            <Panel title="Holdings" action={<span className="label-sm text-ink-faint">8 positions</span>}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-rule">
                      <th scope="col" className="label px-7 py-4 text-ink-faint">
                        Position
                      </th>
                      <th scope="col" className="label px-4 py-4 text-right text-ink-faint">
                        Weight
                      </th>
                      <th scope="col" className="label px-4 py-4 text-right text-ink-faint">
                        Value
                      </th>
                      <th scope="col" className="label px-7 py-4 text-right text-ink-faint">
                        1Y
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((h) => (
                      <tr
                        key={h.ticker}
                        className="border-b border-rule-soft last:border-0"
                      >
                        <td className="px-7 py-4.5">
                          <div className="ui text-[0.9375rem] text-forest">
                            {h.ticker}
                          </div>
                          <div className="ui mt-1 text-[0.8125rem] text-ink-faint">
                            {h.name}
                          </div>
                        </td>
                        <td className="tnum px-4 py-4.5 text-right text-[0.9375rem] text-ink-soft">
                          {h.weight.toFixed(1)}%
                        </td>
                        <td className="tnum px-4 py-4.5 text-right text-[0.9375rem] text-forest">
                          {money(h.value)}
                        </td>
                        <td
                          className={[
                            "tnum px-7 py-4.5 text-right text-[0.9375rem]",
                            h.change >= 0 ? "text-green-mid" : "text-clay",
                          ].join(" ")}
                        >
                          {signed(h.change)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </Reveal>

          {/* ------------------------------------------------- activity */}
          <Reveal className="min-w-0 lg:col-span-4" delay={120}>
            <Panel title="Recent activity">
              <ul className="divide-y divide-rule-soft">
                {activity.map((a) => (
                  <li key={a.label} className="flex gap-5 px-7 py-5">
                    <span className="label-sm mt-1.5 w-12 shrink-0 text-ink-faint">
                      {a.date}
                    </span>
                    <div className="min-w-0">
                      <p className="ui text-[0.9375rem] leading-snug text-forest">
                        {a.label}
                      </p>
                      <p
                        className={[
                          "tnum mt-1.5 text-[0.8125rem]",
                          a.tone === "credit"
                            ? "text-green-mid"
                            : a.tone === "debit"
                              ? "text-clay"
                              : "text-ink-faint",
                        ].join(" ")}
                      >
                        {a.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          {/* ------------------------------------------------ documents */}
          <Reveal className="min-w-0 lg:col-span-8" delay={60}>
            <Panel title="Documents">
              <ul className="divide-y divide-rule-soft">
                {documents.map((d) => (
                  <li
                    key={d.name}
                    className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-7 py-5"
                  >
                    <div>
                      <p className="text-lg leading-snug text-forest">{d.name}</p>
                      <p className="ui mt-1.5 text-[0.8125rem] text-ink-faint">
                        {d.kind}
                      </p>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="label-sm text-ink-faint">{d.date}</span>
                      <span className="label text-ink-faint/60">Download</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          {/* ----------------------------------------------------- team */}
          <Reveal className="min-w-0 lg:col-span-4" delay={120}>
            <div className="flex h-full flex-col justify-between rounded-xs border border-rule bg-forest p-8 text-cream">
              <div>
                <h2 className="label text-sage-pale">Your team</h2>
                <p className="mt-7 text-2xl leading-snug">{account.adviser}</p>
                <p className="mt-3 text-base text-cream/60">
                  Partner, Head of Planning
                </p>
                <p className="mt-7 text-base leading-relaxed text-cream/70">
                  Your next annual review is scheduled for October. The autumn
                  tax memo arrives before it.
                </p>
              </div>
              <Link
                href="/contact"
                className="label mt-10 inline-flex w-fit rounded-xs border border-cream/30 px-6 py-4 text-cream transition-colors duration-300 hover:bg-cream hover:text-forest"
              >
                Message your adviser
              </Link>
            </div>
          </Reveal>
        </div>

        <p className="mt-14 max-w-4xl text-sm leading-relaxed text-ink-faint">
          <span className="label-sm mr-2">Disclosure</span>
          This page is a static design demonstration of a client portal. It is
          not connected to any custodian, contains no real account data, and
          performs no authentication. Holdings, values, returns, activity and
          documents shown are illustrative placeholders. Past performance does
          not guarantee future results.
        </p>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div>
      <p className="label text-ink-faint">{label}</p>
      <p className="tnum mt-4 text-4xl leading-none text-forest md:text-[2.5rem]">
        {value}
      </p>
      <p className="mt-4 text-base text-ink-faint">{note}</p>
    </div>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="h-full overflow-hidden rounded-xs border border-rule bg-paper">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule px-7 py-5">
        <h2 className="label text-forest">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
