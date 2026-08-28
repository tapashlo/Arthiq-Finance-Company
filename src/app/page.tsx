import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroChart } from "@/components/HeroChart";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { Arrow, Button, Eyebrow, SectionHeading, Stat } from "@/components/ui";
import {
  articles,
  faqs,
  notDoing,
  philosophy,
  services,
  stats,
  testimonialDisclosure,
  testimonials,
} from "@/lib/site";

const credentials = [
  "Fee-only",
  "Always fiduciary",
  "SEC-registered",
  "No commissions",
];

export default function HomePage() {
  const latest = articles.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="grain relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        {/* A single soft wash of green in the upper right, and nothing else. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-sage-pale/25 blur-3xl"
        />

        <div className="shell relative">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="fade-up" style={{ animationDelay: "80ms" }}>
                <Eyebrow>San Francisco · Est. 2016</Eyebrow>
              </div>

              <h1
                className="fade-up mt-8 text-[3.25rem] leading-[1.02] text-forest sm:text-6xl md:text-7xl xl:text-[5.25rem]"
                style={{ animationDelay: "180ms" }}
              >
                Wealth management,{" "}
                <em className="font-light text-green italic">reconsidered</em>.
              </h1>

              <p
                className="fade-up mt-9 max-w-xl text-xl leading-relaxed text-ink-soft md:text-[1.4rem]"
                style={{ animationDelay: "300ms" }}
              >
                Fee-only fiduciary advice for California families. One portfolio
                across every account you hold, one fee we publish plainly, and
                nothing to sell you.
              </p>

              <div
                className="fade-up mt-11 flex flex-col gap-3.5 sm:flex-row"
                style={{ animationDelay: "420ms" }}
              >
                <Button href="/contact">
                  Book an introductory call
                  <Arrow />
                </Button>
                <Button href="/services" variant="outline">
                  How we work
                </Button>
              </div>

              <ul
                className="fade-up mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-rule pt-8"
                style={{ animationDelay: "540ms" }}
              >
                {credentials.map((c) => (
                  <li
                    key={c}
                    className="label flex items-center gap-2.5 text-ink-faint"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-1 w-1 rounded-full bg-green-mid"
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="fade-up lg:col-span-6 lg:col-start-7 xl:col-span-7"
              style={{ animationDelay: "260ms" }}
            >
              <HeroChart />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- stats */}
      <section className="border-y border-rule bg-cream-deep">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-14 py-16 md:py-20 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- services */}
      <section className="grain relative py-24 md:py-36">
        <div className="shell relative">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title={
                <>
                  Two disciplines,
                  <br />
                  run as one practice.
                </>
              }
              lede="The portfolio and the tax plan are the same decision seen from two sides. We do not hand them to separate departments."
            />
          </Reveal>

          <div className="mt-20 md:mt-28">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 100}>
                <article className="grid gap-10 border-t border-rule py-14 lg:grid-cols-12 lg:gap-12 lg:py-18">
                  <div className="lg:col-span-4">
                    <span className="label-sm tnum text-green-mid">
                      {service.number}
                    </span>
                    <h3 className="mt-6 text-3xl leading-tight text-forest md:text-4xl">
                      {service.title}
                    </h3>
                    <Link
                      href={`/services#${service.slug}`}
                      className="label link-reveal mt-8 inline-flex items-center gap-3 text-green transition-colors duration-300 hover:text-forest"
                    >
                      Explore
                      <Arrow />
                    </Link>
                  </div>

                  <div className="lg:col-span-8">
                    <p className="max-w-2xl text-xl leading-relaxed text-ink-soft md:text-[1.375rem]">
                      {service.summary}
                    </p>
                    <ul className="mt-10 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                      {service.points.slice(0, 4).map((p) => (
                        <li key={p.title}>
                          <h4 className="text-lg text-forest">{p.title}</h4>
                          <p className="mt-2 text-base leading-relaxed text-ink-faint">
                            {p.body}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
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
            <Eyebrow className="text-sage-pale">How we think</Eyebrow>
            <h2 className="mt-6 max-w-4xl text-4xl leading-[1.08] sm:text-5xl md:text-[3.5rem]">
              Most of the value sits in a handful of decisions.
            </h2>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-cream/65 md:text-[1.375rem]">
              We spend our time on those, and leave the rest of the portfolio
              alone. It is a less eventful way to manage money and a more
              reliable one.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-x-14 gap-y-14 md:grid-cols-2 md:mt-28">
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

      {/* ----------------------------------------------------- testimonials */}
      <section className="grain relative py-24 md:py-36">
        <div className="shell relative">
          <Reveal>
            <SectionHeading eyebrow="In their words" title="What clients say." />
          </Reveal>

          <div className="mt-18 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="flex h-full flex-col justify-between rounded-xs border border-rule bg-paper p-9 shadow-lift md:p-10">
                  <blockquote className="text-xl leading-relaxed text-forest">
                    <span aria-hidden="true" className="text-green-mid">
                      &ldquo;
                    </span>
                    {t.quote}
                    <span aria-hidden="true" className="text-green-mid">
                      &rdquo;
                    </span>
                  </blockquote>
                  <figcaption className="mt-10 border-t border-rule-soft pt-6">
                    <div className="text-lg text-forest">{t.name}</div>
                    <div className="mt-1.5 text-sm text-ink-faint">
                      {t.detail}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-12 max-w-4xl text-sm leading-relaxed text-ink-faint">
              <span className="label-sm mr-2 text-ink-faint">Disclosure</span>
              {testimonialDisclosure}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- insights */}
      <section className="border-t border-rule bg-cream-deep py-24 md:py-36">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading eyebrow="Insights" title="Written for clients." />
              <Link
                href="/insights"
                className="label link-reveal inline-flex items-center gap-3 pb-3 text-green hover:text-forest"
              >
                All writing
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="mt-18 grid gap-x-8 md:mt-24 md:grid-cols-3">
            {latest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex h-full flex-col border-t border-rule pt-7 transition-colors duration-300 hover:border-green"
                >
                  <div className="flex items-center gap-3">
                    <span className="label text-green-mid">{a.category}</span>
                  </div>
                  <h3 className="mt-6 text-2xl leading-snug text-forest transition-colors duration-300 group-hover:text-green md:text-[1.625rem]">
                    {a.title}
                  </h3>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-ink-soft">
                    {a.dek}
                  </p>
                  <div className="label-sm mt-8 flex items-center gap-3 text-ink-faint">
                    <time dateTime={a.date}>{a.displayDate}</time>
                    <span aria-hidden="true">·</span>
                    <span>{a.readingTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- faq */}
      <section className="grain relative py-24 md:py-36">
        <div className="shell relative grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Common questions</Eyebrow>
              <h2 className="mt-6 text-4xl leading-[1.08] text-forest md:text-5xl">
                Before you call.
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
                The eight things people ask most often, answered here rather
                than on a first call.
              </p>
              <Button href="/contact" variant="outline" className="mt-9">
                Ask us something else
              </Button>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- cta */}
      <CtaBand />
    </>
  );
}
