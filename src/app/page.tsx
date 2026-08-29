import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroChart } from "@/components/HeroChart";
import { Faq } from "@/components/Faq";
import { ImageBand, Figure } from "@/components/Media";
import { ReturnsTable, SparklineSheet } from "@/components/MarketBoard";
import { ArtifactStack, Artifact } from "@/components/showcase/Frame";
import { ForecastBuild, KpiBoard, VarianceBridge } from "@/components/showcase/Charts";
import { Reveal } from "@/components/Reveal";
import { Topography } from "@/components/Topography";
import { Arrow, Button, Eyebrow, SectionHeading, Stat } from "@/components/ui";
import { images } from "@/lib/images";
import {
  articles, faqs, notDoing, philosophy, services, stats,
  testimonialDisclosure, testimonials,
} from "@/lib/site";

const credentials = [
  "Seed to Series C",
  "Fixed monthly fee",
  "Month to month",
  "You keep the model",
];

export default function HomePage() {
  const latest = articles.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-56 -right-40 h-[42rem] w-[42rem] rounded-full bg-blue-wash blur-3xl"
        />
        <div className="shell relative">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="fade-up" style={{ animationDelay: "60ms" }}>
                <Eyebrow>Outsourced FP&amp;A · United States</Eyebrow>
              </div>

              <h1
                className="fade-up display mt-7 text-[2.75rem] leading-[1.04] text-navy sm:text-5xl md:text-6xl xl:text-[4.25rem]"
                style={{ animationDelay: "150ms" }}
              >
                Know the number
                <br />
                <span className="text-blue">before you need it.</span>
              </h1>

              <p
                className="fade-up mt-7 max-w-lg text-lg leading-relaxed text-ink-soft md:text-xl"
                style={{ animationDelay: "260ms" }}
              >
                A finance team for venture-backed startups, anywhere in the
                United States. Driver-based forecasting, board reporting and
                metrics that hold up under diligence — run by people who have
                sat in the seat.
              </p>

              <div
                className="fade-up mt-9 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "370ms" }}
              >
                <Button href="/contact">
                  Book a diagnostic call
                  <Arrow />
                </Button>
                <Button href="/services" variant="outline">
                  How we work
                </Button>
              </div>

              <ul
                className="fade-up mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-rule pt-7"
                style={{ animationDelay: "470ms" }}
              >
                {credentials.map((c) => (
                  <li key={c} className="label flex items-center gap-2 text-ink-faint">
                    <span aria-hidden="true" className="block h-1 w-1 rounded-full bg-blue" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="fade-up lg:col-span-7"
              style={{ animationDelay: "220ms" }}
            >
              <HeroChart />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- stats */}
      <section className="border-y border-rule bg-canvas">
        <div className="shell grid grid-cols-2 gap-x-8 gap-y-12 py-14 md:py-16 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <Stat {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- services */}
      <section className="border-t border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title="Four disciplines, one team."
              lede="Most clients start with the forecast because that is what is on fire. The rest follows, because none of it works in isolation."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 2) * 90}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-rule bg-white p-7 transition-all duration-300 hover:border-blue hover:shadow-lift md:p-9"
                >
                  <span className="label-sm tnum text-blue">{service.number}</span>
                  <h3 className="display mt-5 text-2xl leading-snug text-navy transition-colors duration-300 group-hover:text-blue md:text-[1.75rem]">
                    {service.title}
                  </h3>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-soft">
                    {service.summary}
                  </p>
                  <ul className="mt-7 space-y-2.5 border-t border-rule pt-6">
                    {service.points.slice(0, 3).map((p) => (
                      <li key={p.title} className="flex gap-3 text-[0.9375rem] text-ink-soft">
                        <span aria-hidden="true" className="mt-2.5 block h-1 w-1 shrink-0 rounded-full bg-blue" />
                        {p.title}
                      </li>
                    ))}
                  </ul>
                  <span className="label tap mt-6 gap-3 text-blue">
                    Explore
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ image band */}
      <ImageBand
        image={images.screens}
        eyebrow="The operating cadence"
        title={<>Close, review, re-forecast.<br />Every month, on a calendar.</>}
        body="Most clients arrive with a three-week close and a model nobody trusts. Six months later the close is under a week and the forecast is the thing arguments get settled with."
      />

      {/* --------------------------------------------------- operating board */}
      <section className="border-y border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="What you get back"
              title="Reporting that shows the cause, not just the gap."
              lede="Variance by department, month by month, and the operating metrics behind it — the two views most board decks are missing."
            />
          </Reveal>

          <div className="mt-14 grid items-start gap-6 md:mt-20 lg:grid-cols-12">
            <Reveal className="min-w-0 lg:col-span-7">
              <Board title="Budget variance by department">
                <ReturnsTable />
              </Board>
            </Reveal>
            <Reveal className="min-w-0 lg:col-span-5" delay={90}>
              <Board title="Operating metrics · trailing">
                <SparklineSheet />
              </Board>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-faint">
              <span className="label-sm mr-2">Illustrative</span>
              Placeholder figures created for design purposes. They do not
              represent any actual company or engagement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ philosophy */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Topography
          className="pointer-events-none absolute -top-28 right-0 h-[48rem] w-[76rem] text-blue-bright opacity-40"
          tone="currentColor"
        />
        <div className="shell relative py-20 md:py-28">
          <Reveal>
            <Eyebrow className="text-blue-pale">How we work</Eyebrow>
            <h2 className="display mt-6 max-w-3xl text-4xl leading-[1.08] sm:text-5xl">
              Operators, not report writers.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Everyone here has run finance inside a company. That changes what
              gets built, and how fast you get an answer on a Thursday.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-10 md:mt-20 md:grid-cols-2">
            {philosophy.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div className="border-t border-rule-invert pt-7">
                  <h3 className="display text-xl text-white md:text-2xl">{p.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-white/65">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="mt-14 rounded-xl border border-rule-invert p-8 md:mt-20 md:p-10">
              <h3 className="label text-blue-pale">And what we don&rsquo;t do</h3>
              <ul className="mt-7 grid gap-x-12 gap-y-4 sm:grid-cols-2">
                {notDoing.map((n) => (
                  <li key={n} className="flex gap-3.5 leading-relaxed text-white/75">
                    <span aria-hidden="true" className="mt-3 block h-px w-3.5 shrink-0 bg-blue-pale/60" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- testimonials */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="In their words" title="What founders say." />
          </Reveal>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <figure className="flex h-full flex-col justify-between rounded-xl border border-rule bg-white p-7 shadow-lift md:p-8">
                  <blockquote className="text-lg leading-relaxed text-navy">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 border-t border-rule pt-5">
                    <div className="font-medium text-navy">{t.name}</div>
                    <div className="mt-1 text-sm text-ink-faint">{t.detail}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-faint">
              <span className="label-sm mr-2">Disclosure</span>
              {testimonialDisclosure}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- our work */}
      <section className="relative overflow-hidden border-t border-rule bg-canvas py-20 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-52 h-[36rem] w-[36rem] rounded-full bg-blue-wash blur-3xl"
        />
        <div className="shell relative">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="Our work"
                title="What you actually get back."
                lede="Not a methodology diagram — the artifacts themselves. A forecast you can take apart, a variance bridge that names the cause, and the board page directors read before the meeting."
              />
              <Link href="/work" className="label link-reveal tap gap-3 text-blue hover:text-navy">
                See all six
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
                <Artifact label="Board pack · Q3" title="Operating summary" meta="Page 2 of 14" tone="dark">
                  <KpiBoard />
                </Artifact>
              }
            />
          </div>

          <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:items-center">
            <Reveal className="min-w-0 lg:col-span-7">
              <Artifact label="Q3 review" title="Plan to actual, bridged" meta="Revenue · $000s">
                <VarianceBridge />
              </Artifact>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={90}>
              <h3 className="display text-2xl leading-snug text-navy md:text-3xl">
                Every gap has a cause.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
                Most reporting tells you that revenue missed by $136K. A bridge
                tells you that new logos and expansion were ahead, and that
                churn and discounting took more than both together — which is a
                different conversation, with different owners.
              </p>
              <Link href="/work" className="label link-reveal tap mt-5 gap-3 text-blue hover:text-navy">
                Cohorts, close calendar and unit economics
                <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- insights */}
      <section className="border-t border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading eyebrow="Insights" title="Written for operators." />
              <Link href="/insights" className="label link-reveal tap gap-3 text-blue hover:text-navy">
                All writing
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-6 gap-y-10 md:mt-16 md:grid-cols-3">
            {latest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link href={`/insights/${a.slug}`} className="group flex h-full flex-col">
                  <Figure
                    image={images[a.image]}
                    aspect="aspect-3/2"
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="mb-6 rounded-lg"
                  />
                  <span className="label text-blue">{a.category}</span>
                  <h3 className="display mt-4 flex-1 text-xl leading-snug text-navy transition-colors duration-300 group-hover:text-blue md:text-[1.375rem]">
                    {a.title}
                  </h3>
                  <div className="label-sm mt-6 flex items-center gap-3 text-ink-faint">
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
      <section className="py-20 md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Common questions</Eyebrow>
              <h2 className="display mt-6 text-3xl leading-tight text-navy md:text-4xl">
                Before you call.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                The eight things founders ask most, including what it costs.
              </p>
              <Button href="/contact" variant="outline" className="mt-8">
                Ask us something else
              </Button>
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

function Board({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="h-full overflow-hidden rounded-xl border border-rule bg-white shadow-lift">
      <header className="flex items-center justify-between gap-6 border-b border-rule px-6 py-4">
        <h3 className="label text-navy">{title}</h3>
        <span className="label-sm text-ink-faint">Illustrative</span>
      </header>
      <div className="px-6 py-5">{children}</div>
    </section>
  );
}
