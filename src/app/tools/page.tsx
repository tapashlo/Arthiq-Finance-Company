import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { MetricsTool } from "@/components/tools/MetricsTool";
import { RunwayTool } from "@/components/tools/RunwayTool";
import { ScenarioTool } from "@/components/tools/ScenarioTool";
import { VarianceTool } from "@/components/tools/VarianceTool";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Free FP&A tools",
  description:
    "Four working calculators for startup finance — runway and burn, scenario planning, budget variance and SaaS metrics. Miniature versions of the models our team builds for clients. No sign-up, nothing stored.",
};

const INDEX = [
  { href: "#runway", n: "01", label: "Runway & burn" },
  { href: "#scenario", n: "02", label: "Scenario planner" },
  { href: "#variance", n: "03", label: "Budget vs actual" },
  { href: "#metrics", n: "04", label: "SaaS metrics" },
];

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Free tools"
        title={<>A small piece of what we build.</>}
        lede="Four calculators, stripped down from the models we run for clients. Every one computes entirely in your browser — nothing you type leaves the page, and there is no email gate. They are here because the fastest way to explain what a finance team does is to let you use a bit of one."
      >
        <nav aria-label="Tools" className="mt-10 flex flex-wrap gap-x-3 gap-y-3">
          {INDEX.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="group flex items-center gap-3 rounded-lg border border-rule bg-white px-5 py-3.5 transition-colors duration-300 hover:border-blue"
            >
              <span className="label-sm tnum text-blue">{t.n}</span>
              <span className="text-[0.9375rem] font-medium text-navy">{t.label}</span>
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="space-y-14 py-16 md:space-y-20 md:py-24">
        <div className="shell scroll-mt-28" id="runway">
          <Reveal><RunwayTool /></Reveal>
        </div>
        <div className="shell scroll-mt-28" id="scenario">
          <Reveal><ScenarioTool /></Reveal>
        </div>
        <div className="shell scroll-mt-28" id="variance">
          <Reveal><VarianceTool /></Reveal>
        </div>
        <div className="shell scroll-mt-28" id="metrics">
          <Reveal><MetricsTool /></Reveal>
        </div>

        <div className="shell">
          <Reveal>
            <p className="mx-auto max-w-3xl rounded-xl border border-rule bg-canvas p-7 text-sm leading-relaxed text-ink-soft">
              <span className="label-sm mr-2 text-ink-faint">A caveat worth reading</span>
              These are teaching tools, not planning tools. Each one simplifies
              hard: no working-capital timing, no taxes, no financing, no
              seasonality, and no distinction between bookings, billings and
              revenue. They will tell you roughly where you stand and which
              direction a lever moves. What they cannot do is tell you what to
              do about it — that takes a model built around your actual drivers,
              and someone who owns it with you. That is the engagement, and it
              is the thing we actually sell.
            </p>
          </Reveal>
        </div>
      </div>

      <CtaBand />
    </>
  );
}
