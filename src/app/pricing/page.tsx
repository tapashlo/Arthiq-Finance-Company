import type { Metadata } from "next";
import { Fragment } from "react";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { Arrow, Button, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { plans, pricingNotes } from "@/lib/lines";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fixed monthly fees for ArthIQ Personal, Business and FP&A. Quoted before you sign, month to month, no hourly billing.",
};

/** true = included, false = not, string = included with a qualifier. */
type Cell = boolean | string;

const MATRIX: { group: string; rows: { label: string; cells: [Cell, Cell, Cell] }[] }[] = [
  {
    group: "Your money picture",
    rows: [
      { label: "Connected accounts", cells: ["Unlimited", "Unlimited", "Unlimited"] },
      { label: "Net worth, cash flow and budgets", cells: [true, true, true] },
      { label: "Goals, investments and debt payoff", cells: [true, true, true] },
      { label: "Ask ArthIQ", cells: [true, true, true] },
      { label: "Annual review with a planner", cells: [true, true, true] },
    ],
  },
  {
    group: "Accounting",
    rows: [
      { label: "Bookkeeping and reconciliation", cells: [false, true, true] },
      { label: "Monthly close", cells: [false, "6 days", "6 days"] },
      { label: "P&L, balance sheet and cash flow", cells: [false, true, true] },
      { label: "Chart of accounts rebuild", cells: [false, true, true] },
    ],
  },
  {
    group: "Planning",
    rows: [
      { label: "Budget build and variance review", cells: [false, true, true] },
      { label: "Rolling forecast", cells: [false, "Quarterly", "Monthly"] },
      { label: "Driver-based three-statement model", cells: [false, false, true] },
      { label: "Scenario planning and runway", cells: [false, false, true] },
    ],
  },
  {
    group: "Reporting",
    rows: [
      { label: "KPI dashboard, refreshed nightly", cells: [false, true, true] },
      { label: "Power BI and the data layer", cells: [false, false, true] },
      { label: "Board pack, pre-read and investor update", cells: [false, false, true] },
      { label: "Data room kept diligence-ready", cells: [false, false, true] },
    ],
  },
  {
    group: "Your team",
    rows: [
      { label: "Named accountant", cells: [false, true, true] },
      { label: "FP&A manager and analyst", cells: [false, false, true] },
      { label: "Fractional CFO", cells: [false, false, true] },
      { label: "Response time", cells: ["2 days", "1 day", "Same day"] },
    ],
  },
];

const PRICING_FAQ_KEYS = [
  "How much does it cost?",
  "What if I want to leave?",
  "Is ArthIQ software, or is it people?",
  "Do you hold my money or move it?",
];

export default function PricingPage() {
  const pricingFaqs = faqs.filter((f) => PRICING_FAQ_KEYS.includes(f.q));

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            One price a month.
            <br />
            Quoted before you sign.
          </>
        }
        lede="We quote from transaction volume, entity count and reporting cadence — never from hours worked. Busy quarters are our problem, not a line on your invoice."
      />

      {/* ----------------------------------------------------------- plans */}
      <section className="border-b border-rule py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.slug} delay={i * 80}>
                <div
                  className={[
                    "flex h-full flex-col rounded-xl border bg-white p-7 md:p-8",
                    plan.featured ? "border-blue shadow-deep" : "border-rule shadow-lift",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="display text-xl text-navy">{plan.name}</h2>
                    {plan.featured && (
                      <span className="label-sm rounded-full bg-blue-wash px-2.5 py-1.5 text-blue">
                        Most chosen
                      </span>
                    )}
                  </div>

                  <p className="mt-3 leading-relaxed text-ink-soft">{plan.blurb}</p>

                  <div className="mt-8 flex items-baseline gap-1.5">
                    <span className="tnum display text-5xl text-navy">{plan.price}</span>
                    <span className="text-ink-faint">{plan.unit}</span>
                  </div>
                  <p className="mt-2.5 text-sm text-ink-faint">{plan.cadence}</p>

                  <ul className="mt-8 flex-1 space-y-3 border-t border-rule pt-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 leading-relaxed text-ink-soft">
                        <Tick className="mt-1.5 shrink-0 text-blue" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={plan.href}
                    variant={plan.featured ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    {plan.cta}
                    <Arrow />
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <ul className="mt-12 grid gap-x-10 gap-y-4 border-t border-rule pt-10 md:grid-cols-3">
              {pricingNotes.map((n) => (
                <li key={n} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="mt-3 block h-px w-3.5 shrink-0 bg-blue" />
                  {n}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ comparison */}
      <section className="border-b border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title="What is in each one."
              lede="Each tier contains the one before it. Most companies start on Business and move to FP&A around the time a board meeting starts needing a pre-read."
            />
          </Reveal>

          <Reveal delay={80}>
            {/* No horizontal scroll on a phone: the column headings abbreviate
                and every value is short enough for three narrow columns. The
                scroller stays as a safety net for very small viewports. */}
            <div className="scroll-x -mx-5 mt-12 px-5 md:mx-0 md:mt-16 md:px-0">
              <table className="w-full border-collapse text-left md:min-w-[46rem]">
                <caption className="sr-only">
                  Feature comparison across ArthIQ Personal, Business and FP&amp;A.
                </caption>
                <thead>
                  <tr className="label border-b border-rule text-ink-faint">
                    <th scope="col" className="w-[46%] py-4 pr-3 font-semibold md:w-[38%] md:pr-6">
                      Included
                    </th>
                    {plans.map((p) => {
                      const full = p.name.replace("ArthIQ ", "");
                      return (
                        <th
                          key={p.slug}
                          scope="col"
                          className={`py-4 pr-2 font-semibold md:pr-6 ${p.featured ? "text-blue" : "text-navy"}`}
                        >
                          <span className="md:hidden">{full === "Personal" ? "Pers." : full === "Business" ? "Bus." : full}</span>
                          <span className="hidden md:inline">{full}</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((section) => (
                    <Fragment key={section.group}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className="label-sm pt-10 pb-3 text-left text-blue"
                        >
                          {section.group}
                        </th>
                      </tr>
                      {section.rows.map((row) => (
                        <tr key={row.label} className="border-b border-rule-soft">
                          <th
                            scope="row"
                            className="py-4 pr-3 text-[0.9375rem] leading-snug font-normal text-ink-soft md:pr-6 md:text-base"
                          >
                            {row.label}
                          </th>
                          {row.cells.map((cell, ci) => (
                            <td key={plans[ci].slug} className="py-4 pr-2 align-middle md:pr-6">
                              <CellValue value={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-faint">
              <span className="label-sm mr-2">Illustrative</span>
              Prices and inclusions on this page are placeholders created for
              design purposes and are not an offer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------------- faq */}
      <section className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>On the invoice</Eyebrow>
              <h2 className="display mt-6 text-3xl leading-tight text-navy md:text-4xl">
                The money questions.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                What it costs, what happens if you leave, and what we are not
                allowed to do with your accounts.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={pricingFaqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`h-3.5 w-3.5 ${className}`} fill="none" aria-hidden="true">
      <path
        d="M2 7.4l3.4 3.4L12 3.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <Tick className="text-blue" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden="true" className="block h-px w-3.5 bg-rule" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[0.8125rem] leading-snug text-navy md:text-[0.9375rem]">{value}</span>;
}
