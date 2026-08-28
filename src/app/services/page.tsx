import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { faqs, process, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Portfolio and investment management, and retirement and tax planning — run as one practice, for one fee.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Two disciplines,
            <br />
            one engagement.
          </>
        }
        lede="We do not price the portfolio and the plan separately, because we do not make those decisions separately. One relationship, one fee, both halves of the work."
      >
        <nav aria-label="Services" className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="label link-reveal flex items-center gap-3 text-green hover:text-forest"
            >
              <span className="tnum text-ink-faint">{s.number}</span>
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={[
            "grain relative scroll-mt-28 py-24 md:py-36",
            index % 2 === 1 ? "border-y border-rule bg-cream-deep" : "",
          ].join(" ")}
        >
          <div className="shell relative">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <span className="label-sm tnum text-green-mid">
                    {service.number}
                  </span>
                  <h2 className="mt-6 text-4xl leading-[1.08] text-forest sm:text-5xl">
                    {service.title}
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                <Reveal delay={90}>
                  <p className="max-w-2xl text-2xl leading-relaxed text-forest md:text-[1.625rem]">
                    {service.summary}
                  </p>
                  <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
                    {service.detail}
                  </p>
                </Reveal>
              </div>
            </div>

            <div className="mt-20 grid gap-x-12 gap-y-12 md:mt-28 md:grid-cols-2 lg:grid-cols-3">
              {service.points.map((point, i) => (
                <Reveal key={point.title} delay={(i % 3) * 80}>
                  <div className="h-full border-t border-rule pt-7">
                    <h3 className="text-xl leading-snug text-forest md:text-2xl">
                      {point.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-ink-soft">
                      {point.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* -------------------------------------------------------- process */}
      <section
        id="process"
        className="grain relative scroll-mt-28 border-t border-rule py-24 md:py-36"
      >
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="How it starts"
              title="From first call to fully transitioned."
              lede="Nothing moves until you have seen the plan, the proposed portfolio, the transition cost in realized gains and the fee — all before you sign anything."
            />
          </Reveal>

          <ol className="mt-18 md:mt-24">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 70}>
                <li className="grid gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-8">
                  <div className="label-sm tnum text-green-mid md:col-span-1">
                    {step.step}
                  </div>
                  <h3 className="text-2xl leading-snug text-forest md:col-span-4 md:text-[1.75rem]">
                    {step.title}
                  </h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-ink-soft md:col-span-5">
                    {step.body}
                  </p>
                  <div className="label text-ink-faint md:col-span-2 md:text-right">
                    {step.duration}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------- faq */}
      <section className="border-t border-rule bg-cream-deep py-24 md:py-36">
        <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.08] text-forest md:text-5xl">
                The details.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
