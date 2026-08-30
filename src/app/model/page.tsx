import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { ModelStudio } from "@/components/model/ModelStudio";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Model your business",
  description:
    "A live three-statement model — P&L, cash flow and a balance sheet that balances — driven by your own assumptions, computed in your browser.",
};

const HONEST = [
  {
    title: "What it does",
    body: "Builds a linked projection over twenty-four months. Change an assumption and revenue, headcount, working capital, cash and the balance sheet all move together, because they are wired to each other rather than typed in separately.",
  },
  {
    title: "What it leaves out",
    body: "No depreciation, no interest, no tax, no financing rounds, one revenue line and one currency. Net income equals EBITDA. Those are real simplifications and they are listed here rather than buried in a footnote.",
  },
  {
    title: "Why the balance sheet matters",
    body: "Most online calculators show a cash number and stop. Cash here is derived from net income and the movements in receivables, payables and deferred revenue — so the balance sheet balances every month, and you can see the check.",
  },
  {
    title: "What we would do differently",
    body: "On a real engagement the drivers come from your ledger, your pipeline and your hiring plan rather than eleven sliders, and there are usually thirty of them. The structure is the same. The resolution is not.",
  },
];

export default function ModelPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule bg-canvas pt-32 pb-14 md:pt-44 md:pb-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-64 -right-40 h-[40rem] w-[52rem] rounded-full bg-blue-wash blur-3xl"
        />
        <div className="shell relative">
          <Eyebrow>Free · No account needed</Eyebrow>
          <h1 className="display mt-6 max-w-4xl text-[2.5rem] leading-[1.04] text-navy sm:text-5xl md:text-6xl">
            Model your business.
            <br />
            <span className="text-blue">Watch it move.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl">
            A live three-statement projection &mdash; profit and loss, cash flow, and a balance sheet that actually
            balances &mdash; driven by your assumptions. Drag a slider and twenty-four months of consequences move
            with it.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="shell">
          <ModelStudio />
        </div>
      </section>

      <section className="border-t border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Straight about it"
              title="What this is, and what it is not."
              lede="A model you cannot see the limits of is worth less than a simple one you can. Here are this one's."
            />
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-px md:mt-16 md:grid-cols-2">
            {HONEST.map((h, i) => (
              <Reveal key={h.title} delay={(i % 2) * 80}>
                <div className="border-t border-rule py-7 md:py-8">
                  <h3 className="display text-xl text-navy md:text-2xl">{h.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
