import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ImageBand } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { AskArthiq } from "@/components/product/AskArthiq";
import { ScenarioPanel } from "@/components/product/BusinessPanels";
import { Capabilities, LineHero, PanelRow } from "@/components/product/LinePage";
import { Artifact, ArtifactStack } from "@/components/showcase/Frame";
import { CohortGrid, ForecastBuild, PaybackCurve } from "@/components/showcase/Charts";
import { Arrow, Eyebrow, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { lineBySlug } from "@/lib/lines";

const line = lineBySlug.fpa;

export const metadata: Metadata = {
  title: line.name,
  description: line.description,
};

const VS_HIRING = [
  { label: "Time to useful", inhouse: "3–5 months to hire", arthiq: "Two weeks" },
  { label: "Cost, fully loaded", inhouse: "$220k–$280k", arthiq: "From $78k a year" },
  { label: "People on the account", inhouse: "One", arthiq: "CFO, manager, analyst" },
  { label: "If it is not working", inhouse: "A difficult conversation", arthiq: "Thirty days' notice" },
];

export default function FpaPage() {
  return (
    <>
      <LineHero line={line} />

      {/* ---------------------------------------------------------- scenarios */}
      <section className="border-b border-rule py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Planning"
              title="Board conversations that start from a range."
              lede="A single number has to be defended. Three have to be chosen between — which is a shorter meeting and a better decision."
            />
          </Reveal>

          <div className="mt-14 md:mt-20">
            <PanelRow
              eyebrow="Scenarios"
              title="What actually changes if you miss."
              body={
                <>
                  <p>
                    Ten percent off revenue adds $118K a month to net burn and
                    moves cash-out from March 2028 to October 2027. You cross the
                    board floor in June rather than September.
                  </p>
                  <p className="mt-4">
                    None of which is the interesting part. The interesting part is
                    that the Q1 hiring plan is the lever, and you now have five
                    months to pull it instead of finding out in the meeting.
                  </p>
                </>
              }
            >
              <ScenarioPanel />
            </PanelRow>
          </div>
        </div>
      </section>

      <Capabilities line={line} title="A finance function, without the search." />

      {/* -------------------------------------------------------- the model */}
      <section className="border-b border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="The model"
                title="Driver-based, and yours to keep."
                lede="If changing one assumption means editing forty cells, you do not have a model — you have a picture of one moment's opinion. Ours run on the drivers that move the business, so a scenario takes ninety seconds."
              />
              <Link href="/work" className="label link-reveal tap gap-3 text-blue hover:text-navy">
                All six deliverables
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 md:mt-20">
            <ArtifactStack
              back={
                <Artifact label="Forecast · FY26–FY27" title="Revenue build by segment" meta="Updated monthly">
                  <ForecastBuild />
                </Artifact>
              }
              front={
                <Artifact label="Cohorts" title="Net revenue retention" meta="By start quarter" tone="dark">
                  <CohortGrid />
                </Artifact>
              }
            />
          </div>

          <div className="mt-16 md:mt-20">
            <PanelRow
              eyebrow="Unit economics"
              title="Computed the way your investors compute them."
              flip
              body={
                <>
                  <p>
                    Most startups have metrics. Fewer have metrics that survive
                    diligence, because both halves of every ratio are easy to
                    compute generously.
                  </p>
                  <p className="mt-4">
                    We rebuild them from source data with the definitions written
                    down and versioned, so a number means the same thing in March
                    as it did in January — including when somebody else is
                    checking.
                  </p>
                </>
              }
            >
              <Artifact label="Unit economics" title="CAC payback by channel" meta="Gross-profit basis">
                <PaybackCurve />
              </Artifact>
            </PanelRow>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- vs. hiring */}
      <section className="border-b border-rule py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The alternative"
              title="Against hiring a Director of FP&amp;A."
              lede="We think this comparison should be easy to run, including the parts that do not flatter us. When you are ready for someone in-house we help you hire them and hand over cleanly — that is a successful outcome, not a lost client."
            />
          </Reveal>

          <div className="mt-12 md:mt-16">
            <Reveal>
              <div className="scroll-x -mx-5 px-5 md:mx-0 md:px-0">
                <table className="w-full min-w-[34rem] border-collapse text-left">
                  <caption className="sr-only">
                    Hiring a Director of FP&amp;A compared with ArthIQ FP&amp;A.
                  </caption>
                  <thead>
                    <tr className="label border-b border-rule text-ink-faint">
                      <th scope="col" className="py-4 pr-6 font-semibold">Consideration</th>
                      <th scope="col" className="py-4 pr-6 font-semibold">In-house hire</th>
                      <th scope="col" className="py-4 font-semibold text-blue">ArthIQ FP&amp;A</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VS_HIRING.map((r) => (
                      <tr key={r.label} className="border-b border-rule-soft align-top">
                        <th scope="row" className="py-5 pr-6 font-normal text-navy">{r.label}</th>
                        <td className="py-5 pr-6 text-ink-soft">{r.inhouse}</td>
                        <td className="py-5 font-medium text-navy">{r.arthiq}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal>
              <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-faint">
                <span className="label-sm mr-2">Illustrative</span>
                Salary ranges and fees shown are placeholders for design
                purposes. A real comparison depends on your stage, location and
                what the role would actually own.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- ask */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Ask ArthIQ</Eyebrow>
                <h2 className="display mt-6 text-4xl leading-[1.08] text-navy sm:text-5xl">
                  Answers between the meetings.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
                  Most finance questions are not worth a meeting and do not
                  survive until the next one. Why payroll ran over. Where $50,000
                  could come from. What a soft quarter does to the raise.
                </p>
                <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
                  Ask over your own ledger and get the arithmetic with the cost
                  centres and transactions attached — then take the judgement to
                  the person in your CFO seat.
                </p>
              </Reveal>
            </div>
            <Reveal className="min-w-0 lg:col-span-7" delay={90}>
              <AskArthiq />
            </Reveal>
          </div>
        </div>
      </section>

      <ImageBand
        image={images.screens}
        eyebrow="Who you get"
        title={<>Operators,<br />not report writers.</>}
        body="Everyone on this team has run finance inside a company. That changes what gets built, how fast you get an answer on a Thursday, and whether anyone is willing to tell you that the hiring plan you are attached to costs four months of runway for nothing."
      />

      <CtaBand />
    </>
  );
}
