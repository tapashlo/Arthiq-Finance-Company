import type { Metadata } from "next";
import Link from "next/link";
import { ArrChart, SpendBars } from "@/components/PortalCharts";
import { Reveal } from "@/components/Reveal";
import { account, activity, documents, kpis, views } from "@/lib/portal";

export const metadata: Metadata = {
  title: "Client dashboard",
  description:
    "A demonstration of the ArthIQ client dashboard: ARR, burn, runway, department spend and the monthly reporting rhythm.",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return (
    <div className="bg-canvas pt-20 md:pt-24">
      {/* Standing notice — this is a mockup and must never read as real. */}
      <div className="border-b border-warn/25 bg-warn/8">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">
          <p className="label text-warn">Demonstration · Not a real account</p>
          <p className="text-[0.8125rem] text-ink-faint">
            Every figure is an illustrative placeholder. No login, no data,
            nothing connected.
          </p>
        </div>
      </div>

      <div className="border-b border-rule bg-white">
        <div className="shell flex flex-wrap items-center justify-between gap-y-4 py-5">
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="tnum flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-sm font-semibold text-white">
              NS
            </span>
            <div>
              <p className="font-medium text-navy">{account.company}</p>
              <p className="label-sm mt-1.5 text-ink-faint">
                Your lead · {account.lead}
              </p>
            </div>
          </div>
          <p className="label-sm text-ink-faint">As of {account.asOf}</p>
        </div>
      </div>

      <div className="border-b border-rule bg-white">
        <div className="shell -mb-px flex gap-7 overflow-x-auto">
          {views.map((v) => (
            <button key={v.name} type="button"
              aria-current={"active" in v && v.active ? "true" : undefined}
              className={`label shrink-0 border-b-2 py-4 transition-colors duration-300 ${
                "active" in v && v.active
                  ? "border-blue text-navy"
                  : "border-transparent text-ink-faint hover:text-navy"
              }`}>
              {v.name}
            </button>
          ))}
        </div>
      </div>

      <div className="shell py-10 md:py-14">
        <Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.name} className="rounded-xl border border-rule bg-white p-6">
                <p className="label text-ink-faint">{k.name}</p>
                <p className="tnum display mt-3.5 text-3xl leading-none text-navy md:text-4xl">
                  {k.value}
                </p>
                <p className="mt-3.5 flex items-center gap-2 text-[0.8125rem]">
                  <span className={`tnum font-medium ${k.good ? "text-gain" : "text-loss"}`}>
                    {k.delta >= 0 ? "+" : "−"}{Math.abs(k.delta)}
                    {k.name === "Burn multiple" ? "×" : "%"}
                  </span>
                  <span className="text-ink-faint">{k.note}</span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-8">
            <Panel title="ARR" action={<span className="label-sm text-ink-faint">24 months</span>}>
              <div className="px-5 pt-5 pb-2">
                <ArrChart />
              </div>
            </Panel>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-4" delay={80}>
            <Panel title="Spend vs budget" action={<span className="label-sm text-ink-faint">Month to date</span>}>
              <div className="p-6">
                <SpendBars />
                <p className="mt-6 border-t border-rule pt-5 text-[0.8125rem] leading-relaxed text-ink-faint">
                  The navy tick marks budget. Sales and marketing are both over
                  this month, deliberately, ahead of the Q4 push.
                </p>
              </div>
            </Panel>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-8" delay={60}>
            <Panel title="Documents">
              <ul className="divide-y divide-rule">
                {documents.map((d) => (
                  <li key={d.name} className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4">
                    <div>
                      <p className="font-medium text-navy">{d.name}</p>
                      <p className="mt-1 text-[0.8125rem] text-ink-faint">{d.kind}</p>
                    </div>
                    <div className="flex items-center gap-7">
                      <span className="label-sm text-ink-faint">{d.date}</span>
                      <span className="label text-ink-faint/70">Download</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-4" delay={110}>
            <Panel title="Recent activity">
              <ul className="divide-y divide-rule">
                {activity.map((a) => (
                  <li key={a.label} className="flex gap-4 px-6 py-4">
                    <span className="label-sm mt-1 w-12 shrink-0 text-ink-faint">{a.date}</span>
                    <div className="min-w-0">
                      <p className="text-[0.9375rem] leading-snug text-navy">{a.label}</p>
                      <p className={`tnum mt-1 text-[0.8125rem] ${
                        a.tone === "credit" ? "text-gain" : a.tone === "debit" ? "text-loss" : "text-ink-faint"
                      }`}>
                        {a.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-12" delay={60}>
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-xl border border-rule bg-navy p-7 text-white md:p-9">
              <div>
                <h2 className="display text-xl md:text-2xl">
                  Next review: 12 September
                </h2>
                <p className="mt-2.5 max-w-lg text-white/70">
                  Q3 re-forecast and the headcount plan for Q4. {account.lead} will
                  circulate the pre-read three days ahead.
                </p>
              </div>
              <Link href="/contact" className="label tap rounded-lg border border-white/30 px-6 text-white transition-colors duration-300 hover:bg-white hover:text-navy">
                Message your team
              </Link>
            </div>
          </Reveal>
        </div>

        <p className="mt-10 max-w-4xl text-sm leading-relaxed text-ink-faint">
          <span className="label-sm mr-2">Disclosure</span>
          This page is a static design demonstration of a client dashboard. It is
          not connected to any accounting system, contains no real company data,
          and performs no authentication. Every figure shown is an illustrative
          placeholder.
        </p>
      </div>
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
    <section className="h-full overflow-hidden rounded-xl border border-rule bg-white">
      <header className="flex items-center justify-between gap-6 border-b border-rule px-6 py-4">
        <h2 className="label text-navy">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
