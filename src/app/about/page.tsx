import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/Logo";
import { Figure, ImageBand } from "@/components/Media";
import { images } from "@/lib/images";
import { Eyebrow, PageHero, SectionHeading, Stat } from "@/components/ui";
import { notDoing, philosophy, process, site, stats, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ArthIQ is a remote-first outsourced FP&A and fractional CFO team serving venture-backed startups across the United States. Meet the team and how we work.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title={
          <>
            A small firm, on
            <br />
            purpose.
          </>
        }
        lede="ArthIQ was founded in 2019 on a straightforward premise: that most startups do not need a full finance team, but every one of them needs the work a finance team does."
      />

      {/* ---------------------------------------------------------- story */}
      <section className="relative py-24 md:py-32">
        <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Why we exist</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <div className="max-w-2xl space-y-7 text-xl leading-relaxed text-ink-soft md:text-[1.375rem]">
                <p className="text-navy">
                  Our founder ran finance inside two venture-backed companies
                  before starting this one, and kept meeting the same problem
                  from the other side.
                </p>
                <p>
                  A Series A company needs a forecast it can defend, a close it
                  can trust and metrics that survive diligence. What it does not
                  need — and usually cannot afford — is a VP of Finance, a
                  controller and an analyst on payroll to produce them.
                </p>
                <p>
                  So it falls to a founder at 11pm, or to a bookkeeper who was
                  never hired to forecast, or to nobody at all until the week
                  the round opens. Then the model gets built in a panic and the
                  diligence questions arrive.
                </p>
                <p>
                  ArthIQ exists to put a real finance function behind those
                  companies at a tenth of the payroll cost — and to hand it over
                  cleanly when they are ready to bring it in-house. That is a
                  successful outcome, not a lost client.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ImageBand
        image={images.screens}
        height="short"
        eyebrow="Est. 2016"
        title="Patient capital, plainly managed."
      />

      {/* ---------------------------------------------------------- stats */}
      <section className="border-y border-rule bg-canvas">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-14 py-16 md:py-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- team */}
      <section className="relative py-24 md:py-36">
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title="Six people, and no call centre."
              lede="Every engagement gets a fractional CFO, an FP&A manager and an analyst. You will know all three by name, and none of them is a rotating pool."
            />
          </Reveal>

          <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-28">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={(i % 3) * 90}>
                <article className="flex h-full flex-col">
                  {/* Initials plate stands in for a portrait until real ones exist. */}
                  <div className="flex aspect-4/3 items-center justify-center border border-rule bg-canvas">
                    <span className="tnum text-6xl text-ink-faint">
                      {person.initials}
                    </span>
                  </div>
                  <h3 className="mt-7 text-2xl leading-snug text-navy">
                    {person.name}
                  </h3>
                  <p className="label mt-3.5 text-blue">{person.role}</p>
                  <p className="mt-5 flex-1 text-base leading-relaxed text-ink-soft">
                    {person.bio}
                  </p>
                  <p className="mt-5 border-t border-rule-soft pt-4 text-sm leading-relaxed text-ink-faint">
                    {person.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ philosophy */}
      <section className="border-y border-rule bg-navy text-white">
        <div className="shell py-24 md:py-36">
          <Reveal>
            <Eyebrow className="text-blue-pale">Principles</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-4xl leading-[1.08] sm:text-5xl md:text-[3.5rem]">
              What we believe, and what follows from it.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-x-14 gap-y-14 md:mt-28 md:grid-cols-2">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="border-t border-rule-invert pt-8">
                  <h3 className="text-2xl leading-snug text-white md:text-[1.75rem]">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-20 rounded-lg border border-rule-invert p-9 md:mt-28 md:p-12">
              <h3 className="label text-blue-pale">And what we don&rsquo;t do</h3>
              <ul className="mt-9 grid gap-x-12 gap-y-5 sm:grid-cols-2">
                {notDoing.map((n) => (
                  <li
                    key={n}
                    className="flex gap-4 text-lg leading-relaxed text-white/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3.5 block h-px w-4 shrink-0 bg-blue-pale/60"
                    />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- process */}
      <section className="relative py-24 md:py-36" id="process">
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="Working together"
              title="What the first year looks like."
            />
          </Reveal>

          <ol className="mt-18 md:mt-24">
            {process.map((step, i) => (
              <Reveal key={step.step} delay={i * 70}>
                <li className="grid gap-6 border-t border-rule py-10 md:grid-cols-12 md:gap-8">
                  <div className="label-sm tnum text-blue md:col-span-1">
                    {step.step}
                  </div>
                  <h3 className="text-2xl leading-snug text-navy md:col-span-4 md:text-[1.75rem]">
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

      {/* ----------------------------------------------------------- mark */}
      <section
        id="the-mark"
        className="scroll-mt-28 border-t border-rule bg-paper py-24 md:py-32"
      >
        <div className="shell">
          <Reveal>
            <Eyebrow>The mark</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-4xl leading-[1.08] text-navy md:text-5xl">
              Three ideas, one word.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-16 flex justify-center border-y border-rule px-6 py-16 md:mt-20 md:py-24">
              <Wordmark className="w-full max-w-3xl text-navy" />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {[
              {
                letter: "A",
                title: "The climb",
                body: "The A is a single peak with snow fissures cut out of it — a short steep face on one side, a long shoulder on the other. Building a company is the climb, and the interesting part is rarely the easy side.",
              },
              {
                letter: "rth",
                title: "The line",
                body: "A rising line with plotted points runs through the ascender band above the lowercase, ending in an arrow. Progress that is measured and charted, not asserted.",
              },
              {
                letter: "IQ",
                title: "The lens",
                body: "The Q is a magnifying glass — bowl as lens, tail as handle. Looking closely at numbers other people take at face value is most of the job.",
              },
            ].map((item, i) => (
              <Reveal key={item.letter} delay={i * 90}>
                <div className="border-t border-rule pt-7">
                  <span className="label-sm text-blue">{item.letter}</span>
                  <h3 className="mt-6 text-2xl leading-snug text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- location */}
      <section className="border-t border-rule bg-canvas py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Where we work</Eyebrow>
              <h2 className="display mt-6 text-3xl leading-tight text-navy md:text-4xl">
                No office.
                <br />
                On purpose.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Figure
              image={images.workshop}
              aspect="aspect-16/9"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="mb-10 rounded-lg"
            />
            <Reveal delay={100}>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                Our clients are spread across 34 states, and so are we. The
                monthly rhythm runs over video and a shared model, which is how
                finance works at a distributed company anyway. When a board
                meeting or a raise wants someone in the room, we get on a plane.
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                It also means we are not staffing you from whoever happens to
                live near an office. You get the three people who fit your
                stage and your sector.
              </p>
              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-lg">
                <a href={site.phoneHref} className="link-reveal tap tnum text-blue hover:text-navy">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`} className="link-reveal tap text-blue hover:text-navy">
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
