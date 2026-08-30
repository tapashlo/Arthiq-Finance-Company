import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ImageBand } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { AskArthiq } from "@/components/product/AskArthiq";
import { Capabilities, LineHero, PanelRow } from "@/components/product/LinePage";
import {
  CashFlowPanel, CategoriesPanel, DebtPanel, GoalsPanel,
} from "@/components/product/PersonalPanels";
import { Eyebrow, SectionHeading } from "@/components/ui";
import { images } from "@/lib/images";
import { lineBySlug } from "@/lib/lines";

const line = lineBySlug.personal;

export const metadata: Metadata = {
  title: line.name,
  description: line.description,
};

const THREE = [
  {
    number: "Net worth",
    body: "Everything you own minus everything you owe, measured monthly. The level is mostly noise from markets you do not control. The slope is the only honest scoreboard you have.",
  },
  {
    number: "Free cash flow",
    body: "What is genuinely left after everything, including the bills that arrive once a year. Computed over twelve months rather than a good week, which makes it smaller and real.",
  },
  {
    number: "Savings rate",
    body: "Free cash flow as a share of take-home pay. Scale-free, so it survives a raise, and the only one of the three you can move deliberately inside a single month.",
  },
];

export default function PersonalPage() {
  return (
    <>
      <LineHero line={line} />

      {/* --------------------------------------------------- the three numbers */}
      <section className="border-b border-rule py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="The point of it"
              title="Two hundred figures. Three that decide things."
              lede="Budgeting apps are very good at the question that does not matter much and quiet about the ones that do. We put these three on one screen and keep them current."
            />
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-10 md:mt-20 md:grid-cols-3">
            {THREE.map((t, i) => (
              <Reveal key={t.number} delay={i * 80}>
                <div className="border-t-2 border-[color:var(--color-viz-mint)] pt-7">
                  <h3 className="display text-2xl text-navy">{t.number}</h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid items-start gap-6 md:mt-20 lg:grid-cols-2 lg:gap-8">
            <Reveal className="min-w-0">
              <CashFlowPanel />
            </Reveal>
            <Reveal className="min-w-0" delay={90}>
              <CategoriesPanel />
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-faint">
              <span className="label-sm mr-2">Illustrative</span>
              One invented household, shown across every panel on this page. The
              figures agree with each other because they describe the same
              made-up person, not a real one.
            </p>
          </Reveal>
        </div>
      </section>

      <Capabilities line={line} title="Everything your money does, in one place." />

      {/* ------------------------------------------------------------- goals */}
      <section className="border-b border-rule bg-canvas py-20 md:py-28">
        <div className="shell space-y-20 md:space-y-28">
          <PanelRow
            eyebrow="Goals"
            title="A date, not a vibe."
            body={
              <>
                <p>
                  Every goal gets a target, a monthly contribution and an arrival
                  date that moves as your cash flow does. When something slips
                  you hear about it in month two, while there is still time to
                  change the contribution or the date.
                </p>
                <p className="mt-4">
                  The sabbatical below is four months late. That is a small
                  problem now and an argument in 2029.
                </p>
              </>
            }
          >
            <GoalsPanel />
          </PanelRow>

          <PanelRow
            eyebrow="Debt"
            title="The payoff order, priced."
            flip
            body={
              <>
                <p>
                  Everyone has heard the two rules — highest rate first, smallest
                  balance first — and nobody has been told what choosing the
                  second one costs. Here it is $880 and three months.
                </p>
                <p className="mt-4">
                  That might be worth paying for the momentum of closing an
                  account this year. It is your call, but you get to make it with
                  the price attached.
                </p>
              </>
            }
          >
            <DebtPanel />
          </PanelRow>
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
                  &ldquo;Can I afford it?&rdquo;
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
                  The house, the car, the year off. Nobody can answer that from a
                  salary, because salary is not the constraint — the constraint is
                  what survives inside your real free cash flow once the thing
                  starts generating its own costs.
                </p>
                <p className="mt-5 max-w-lg leading-relaxed text-ink-soft">
                  Ask in plain English and get the arithmetic, the assumptions and
                  the accounts it came from. Then talk to your planner about
                  whether it is a good idea, which is a different question.
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
        image={images.desk}
        eyebrow="Not an app you are left alone with"
        title={<>Software assembles it.<br />A planner explains it.</>}
        body="Every ArthIQ Personal account includes an annual review with a real planner, and a person to message when a number needs a decision behind it. We hold no money, sell no products and take no commissions — so the advice has nothing behind it except the numbers."
      />

      <CtaBand />
    </>
  );
}
