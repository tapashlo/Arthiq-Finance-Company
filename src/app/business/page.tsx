import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ImageBand } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { ReportingPanel } from "@/components/product/BusinessPanels";
import { Capabilities, LineHero, PanelRow } from "@/components/product/LinePage";
import { Artifact } from "@/components/showcase/Frame";
import { CloseTimeline, KpiBoard, VarianceBridge } from "@/components/showcase/Charts";
import { Arrow, Eyebrow, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { lineBySlug } from "@/lib/lines";

const line = lineBySlug.business;

export const metadata: Metadata = {
  title: line.name,
  description: line.description,
};

const CALENDAR = [
  { day: "Day 1–3", title: "Reconcile", body: "Banks, cards, payroll and billing tied out. Accruals and prepaids rolled forward from templates prepared before month end." },
  { day: "Day 4–5", title: "Review", body: "Departmental spend against budget, with a cause attached to anything past the materiality threshold you agreed once and we stopped relitigating." },
  { day: "Day 6", title: "Close", body: "Books locked. P&L, balance sheet and cash flow published to the same place they were published last month." },
  { day: "Day 7", title: "Explain", body: "Variance commentary, KPI refresh and the two or three things worth your attention, written in sentences." },
];

export default function BusinessPage() {
  return (
    <>
      <LineHero line={line} />

      {/* -------------------------------------------------------- the close */}
      <section className="border-b border-rule py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The monthly rhythm"
              title="Numbers in the first week, every week one."
              lede="A three-week close is not an accounting problem, it is a sequencing problem — and it costs you the first half of every month making decisions on last quarter's information."
            />
          </Reveal>

          <div className="mt-14 grid gap-x-8 gap-y-px md:mt-20 md:grid-cols-2 md:gap-x-14">
            {CALENDAR.map((c, i) => (
              <Reveal key={c.day} delay={(i % 2) * 80}>
                <div className="border-t border-rule py-7 md:py-8">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="label-sm text-blue">{c.day}</span>
                    <h3 className="display text-xl text-navy md:text-2xl">{c.title}</h3>
                  </div>
                  <p className="mt-3.5 max-w-xl leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <div className="mt-14 md:mt-16">
              <Artifact label="Close calendar · August" title="Owners and deadlines" meta="6 business days">
                <CloseTimeline />
              </Artifact>
            </div>
          </Reveal>
        </div>
      </section>

      <Capabilities
        line={line}
        title="Bookkeeping through to board-ready reporting."
      />

      {/* -------------------------------------------------------- reporting */}
      <section className="border-b border-rule bg-canvas py-20 md:py-28">
        <div className="shell space-y-20 md:space-y-28">
          <PanelRow
            eyebrow="Reporting"
            title="One table, both facts."
            body={
              <>
                <p>
                  Operating income came in ahead of plan even though operating
                  expenses ran $92K over, because gross margin was a point
                  better than budgeted. Two facts, opposite signs, same table.
                </p>
                <p className="mt-4">
                  Reporting that shows only the good half is how a board gets
                  surprised in month nine by something that was visible in
                  month three.
                </p>
              </>
            }
          >
            <ReportingPanel />
          </PanelRow>

          <PanelRow
            eyebrow="Variance"
            title="Every gap has a cause."
            flip
            link={{ href: "/work", label: "See the full set of deliverables" }}
            body={
              <>
                <p>
                  Most reporting tells you revenue missed by $136K. A bridge
                  tells you new logos and expansion were both ahead, and that
                  churn plus discounting took more than the two of them
                  together.
                </p>
                <p className="mt-4">
                  Different sentence, different owner, different meeting. The
                  size of a gap is trivia; the cause is the only part anyone can
                  act on.
                </p>
              </>
            }
          >
            <Artifact label="Q3 review" title="Plan to actual, bridged" meta="Revenue · $000s">
              <VarianceBridge />
            </Artifact>
          </PanelRow>
        </div>
      </section>

      {/* --------------------------------------------------------------- kpi */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="Dashboards"
                title="The dozen numbers that run the company."
                lede="Defined once, written down, refreshed nightly. No more decks assembled the night before with three versions of gross margin in them."
              />
              <Link href="/fpa" className="label link-reveal tap gap-3 text-blue hover:text-navy">
                When you outgrow this
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-14 md:mt-16">
              <Artifact label="Board pack · Q3" title="Operating summary" meta="Page 2 of 14" tone="dark">
                <KpiBoard />
              </Artifact>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-faint">
              <span className="label-sm mr-2">Illustrative</span>
              Placeholder figures created for design purposes. They do not
              represent any actual company or engagement.
            </p>
          </Reveal>
        </div>
      </section>

      <ImageBand
        image={images.workshop}
        eyebrow="Who does the work"
        title={<>A named accountant.<br />A named analyst.</>}
        body="Not a rotating pool and not a ticket queue. You will know the two people on your account by name, they will know your business, and they will tell you when a number looks wrong before you have to ask."
      />

      <CtaBand />
    </>
  );
}
