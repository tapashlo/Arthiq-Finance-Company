import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { Artifact } from "@/components/showcase/Frame";
import {
  CloseTimeline, CohortGrid, ForecastBuild, KpiBoard, PaybackCurve, VarianceBridge,
} from "@/components/showcase/Charts";
import { Arrow, Button, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "What an FP&A engagement actually produces: a driver-based forecast build, a variance bridge, cohort retention, a board KPI page, a six-day close calendar and unit economics.",
};

type Item = {
  n: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  artifact: React.ReactNode;
  tone?: "light" | "dark";
};

const WORK: Item[] = [
  {
    n: "01",
    eyebrow: "The forecast",
    title: "A revenue build you can take apart",
    body: "Revenue stops being a number somebody typed and becomes the output of base, expansion and new logos — each with its own drivers. Change conversion or ramp and the whole thing moves in front of you.",
    bullets: ["Segment-level build with a documented driver tree", "Prior plan held alongside so drift is visible", "Rolls forward monthly against actuals"],
    artifact: (
      <Artifact label="Forecast · FY26–FY27" title="Revenue build by segment" meta="Updated monthly">
        <ForecastBuild />
      </Artifact>
    ),
  },
  {
    n: "02",
    eyebrow: "The variance",
    title: "A bridge that names the cause",
    body: "Most variance reporting tells you the gap. A bridge tells you what made it — how much came from new logos, how much leaked out through churn, and how much you gave away in discounting.",
    bullets: ["Plan-to-actual walk with every driver isolated", "Favourable and unfavourable read at a glance", "Each step has an owner in the monthly review"],
    artifact: (
      <Artifact label="Q3 review" title="Plan to actual, bridged" meta="Revenue · $000s">
        <VarianceBridge />
      </Artifact>
    ),
  },
  {
    n: "03",
    eyebrow: "The cohorts",
    title: "Retention, by the month they signed",
    body: "Aggregate churn hides everything interesting. A cohort grid shows whether the customers you won last quarter behave like the ones you won last year — and whether expansion is really outrunning churn.",
    bullets: ["Net revenue retention by signup cohort", "Expansion above 100% separated from decay below", "Rebuilt from billing data, not from a dashboard"],
    artifact: (
      <Artifact label="Cohort analysis" title="Net revenue retention by cohort" meta="% of month-0 ARR">
        <CohortGrid />
      </Artifact>
    ),
  },
  {
    n: "04",
    eyebrow: "The board pack",
    title: "The page directors actually read",
    body: "Six numbers, their direction of travel, and the trend behind each one — sent seventy-two hours before the meeting so the meeting is about decisions rather than a recital.",
    bullets: ["Definitions written down once and held", "Trend beside every figure, not just the level", "Circulated three days ahead with commentary"],
    tone: "dark",
    artifact: (
      <Artifact label="Board pack · Q3" title="Operating summary" meta="Page 2 of 14" tone="dark">
        <KpiBoard />
      </Artifact>
    ),
  },
  {
    n: "05",
    eyebrow: "The close",
    title: "Six days, with owners on every task",
    body: "A three-week close is a sequencing problem, not an accounting one. We write the calendar down, put a name against each task, and move a third of the work before month end.",
    bullets: ["Every task owned and dated in business days", "Dependencies visible, so blocking is obvious", "Books locked day five, pack out day six"],
    artifact: (
      <Artifact label="Close calendar" title="Monthly close, day by day" meta="Median 6 days">
        <CloseTimeline />
      </Artifact>
    ),
  },
  {
    n: "06",
    eyebrow: "The unit economics",
    title: "When a customer pays for itself",
    body: "Payback measured on gross profit, not revenue, and against a fully loaded acquisition cost. It is the number that decides whether spending more on growth is investment or leakage.",
    bullets: ["Fully loaded CAC by channel and segment", "Payback on gross profit, not on revenue", "Benchmarked against your stage before you raise"],
    artifact: (
      <Artifact label="Unit economics" title="CAC payback per customer" meta="Blended, trailing 4 quarters">
        <PaybackCurve />
      </Artifact>
    ),
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={<>What you actually get back.</>}
        lede="Not a methodology diagram. These are the six artifacts an engagement produces — the forecast, the variance bridge, the cohorts, the board page, the close calendar and the unit economics. Every figure below is invented, but the shapes are exactly what we build."
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">
            Book a diagnostic call
            <Arrow />
          </Button>
          <Button href="/services" variant="outline">
            How the engagement runs
          </Button>
        </div>
      </PageHero>

      <div className="space-y-16 py-16 md:space-y-28 md:py-24">
        {WORK.map((item, i) => (
          <section key={item.n} className="shell">
            <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal className="lg:col-span-5">
                <span className="label-sm tnum text-blue">{item.n}</span>
                <p className="eyebrow label mt-5">{item.eyebrow}</p>
                <h2 className="display mt-5 text-3xl leading-tight text-navy md:text-[2.5rem]">
                  {item.title}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                  {item.body}
                </p>
                <ul className="mt-7 space-y-3 border-t border-rule pt-6">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="min-w-0 lg:col-span-7" delay={90}>
                {item.artifact}
              </Reveal>
            </div>
          </section>
        ))}

        <div className="shell">
          <Reveal>
            <p className="mx-auto max-w-3xl rounded-xl border border-rule bg-canvas p-7 text-sm leading-relaxed text-ink-soft">
              <span className="label-sm mr-2 text-ink-faint">On these examples</span>
              Every company, figure and chart above is invented for illustration.
              They show the structure and level of detail we produce, not the
              results of any real engagement. Your versions are built from your
              general ledger, your billing data and your drivers.
            </p>
          </Reveal>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
