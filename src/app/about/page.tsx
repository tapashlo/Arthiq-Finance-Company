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
    "ArthIQ is a fee-only fiduciary wealth manager in San Francisco, founded in 2016. Meet the team and how we work.",
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
        lede="ArthIQ was founded in 2016 on a straightforward premise: that most people paying for wealth management were paying for products, and that the advice underneath was worth more than the products ever were."
      />

      {/* ---------------------------------------------------------- story */}
      <section className="grain relative py-24 md:py-32">
        <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Why we exist</Eyebrow>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <div className="max-w-2xl space-y-7 text-xl leading-relaxed text-ink-soft md:text-[1.375rem]">
                <p className="text-forest">
                  Our founder spent eleven years managing money for an
                  institution before managing it for families, and the contrast
                  was hard to unsee.
                </p>
                <p>
                  Institutions get patient capital, low costs, an investment
                  policy statement and a committee that meets when something
                  actually changes. Individuals, more often, get a quarterly
                  meeting, a proprietary fund and a fee structure that nobody
                  will state in dollars.
                </p>
                <p>
                  ArthIQ exists to give households the first arrangement. One
                  portfolio built on evidence, one fee we publish, no products,
                  no commissions, and a planning model that runs to age
                  ninety-five rather than to the end of the current quarter.
                </p>
                <p>
                  We have stayed deliberately small. Every client works with the
                  people whose names are on this page, and we cap the practice
                  rather than hire our way past the point where that is true.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ImageBand
        image={images.aboveClouds}
        height="short"
        eyebrow="Est. 2016"
        title="Patient capital, plainly managed."
      />

      {/* ---------------------------------------------------------- stats */}
      <section className="border-y border-rule bg-cream-deep">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-14 py-16 md:py-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- team */}
      <section className="grain relative py-24 md:py-36">
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="The team"
              title="Six people, and no call centre."
              lede="You will know everyone who touches your account, and you will keep knowing them — our client-to-adviser ratio is the constraint we protect hardest."
            />
          </Reveal>

          <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 md:mt-28">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={(i % 3) * 90}>
                <article className="flex h-full flex-col">
                  {/* Initials plate stands in for a portrait until real ones exist. */}
                  <div className="flex aspect-4/3 items-center justify-center border border-rule bg-cream-deep">
                    <span className="tnum text-6xl text-sage">
                      {person.initials}
                    </span>
                  </div>
                  <h3 className="mt-7 text-2xl leading-snug text-forest">
                    {person.name}
                  </h3>
                  <p className="label mt-3.5 text-green-mid">{person.role}</p>
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
      <section className="border-y border-rule bg-forest text-cream">
        <div className="shell py-24 md:py-36">
          <Reveal>
            <Eyebrow className="text-sage-pale">Principles</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-4xl leading-[1.08] sm:text-5xl md:text-[3.5rem]">
              What we believe, and what follows from it.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-x-14 gap-y-14 md:mt-28 md:grid-cols-2">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="border-t border-rule-invert pt-8">
                  <h3 className="text-2xl leading-snug text-cream md:text-[1.75rem]">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/60">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-20 rounded-xs border border-rule-invert p-9 md:mt-28 md:p-12">
              <h3 className="label text-gold-pale">And what we don&rsquo;t do</h3>
              <ul className="mt-9 grid gap-x-12 gap-y-5 sm:grid-cols-2">
                {notDoing.map((n) => (
                  <li
                    key={n}
                    className="flex gap-4 text-lg leading-relaxed text-cream/75"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-3.5 block h-px w-4 shrink-0 bg-gold-pale/60"
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
      <section className="grain relative py-24 md:py-36" id="process">
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

      {/* ----------------------------------------------------------- mark */}
      <section
        id="the-mark"
        className="scroll-mt-28 border-t border-rule bg-cream py-24 md:py-32"
      >
        <div className="shell">
          <Reveal>
            <Eyebrow>The mark</Eyebrow>
            <h2 className="mt-6 max-w-3xl text-4xl leading-[1.08] text-forest md:text-5xl">
              Three ideas, one word.
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-16 flex justify-center border-y border-rule px-6 py-16 md:mt-20 md:py-24">
              <Wordmark className="w-full max-w-3xl text-forest" />
            </div>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
            {[
              {
                letter: "A",
                title: "The Himalaya",
                body: "The A is a summit with a ridge notch and a shoulder — a mountain silhouette that still reads as a letter at twenty pixels. It is where the name comes from, and a reminder that the horizon we plan against is measured in decades.",
              },
              {
                letter: "RTH",
                title: "The line",
                body: "A market line runs behind the middle three letters, stepping upward over a faint column series, with station nodes landing in the gaps between letters. Progress that is plotted, not promised.",
              },
              {
                letter: "IQ",
                title: "The lens",
                body: "The Q is a magnifying glass: its bowl is the lens and its tail leaves the circle at forty-five degrees as the handle. Looking closely at what you already own is most of the work.",
              },
            ].map((item, i) => (
              <Reveal key={item.letter} delay={i * 90}>
                <div className="border-t border-rule pt-7">
                  <span className="label-sm text-green-mid">{item.letter}</span>
                  <h3 className="mt-6 text-2xl leading-snug text-forest">
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
      <section className="border-t border-rule bg-cream-deep py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Where we are</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.08] text-forest md:text-5xl">
                One office,
                <br />
                in the Financial District.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Figure
              image={images.office}
              aspect="aspect-16/9"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="mb-10 rounded-xs"
            />
            <Reveal delay={100}>
              <p className="max-w-xl text-xl leading-relaxed text-ink-soft">
                We meet clients at {site.address.line1} and, far more often,
                wherever is easier. Most of our households are outside California — we are
                licensed across 31 states, and nothing about the work requires a
                conference room.
              </p>
              <address className="mt-10 space-y-1 text-lg not-italic leading-relaxed text-forest">
                <div>{site.address.line1}</div>
                <div>
                  {site.address.city}, {site.address.state} {site.address.zip}
                </div>
              </address>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-lg">
                <a
                  href={site.phoneHref}
                  className="link-reveal tap tnum text-green hover:text-forest"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="link-reveal tap text-green hover:text-forest"
                >
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
