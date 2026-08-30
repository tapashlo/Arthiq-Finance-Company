import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Figure } from "@/components/Media";
import { AskArthiq } from "@/components/product/AskArthiq";
import { CashFlowPanel } from "@/components/product/PersonalPanels";
import { ReportingPanel } from "@/components/product/BusinessPanels";
import { Dashboard } from "@/components/product/Dashboard";
import { LineMark } from "@/components/product/marks";
import { Reveal } from "@/components/Reveal";
import { Topography } from "@/components/Topography";
import { Arrow, Button, Eyebrow, SectionHeading, Stat } from "@/components/ui";
import { images } from "@/lib/images";
import { lines, plans } from "@/lib/lines";
import {
  articles, faqs, notDoing, process, site, stats,
  testimonialDisclosure, testimonials,
} from "@/lib/site";

const assurances = ["Read-only connections", "Fixed monthly fee", "Cancel any time", "All fifty states"];

export default function HomePage() {
  const latest = articles.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-72 left-1/2 h-[46rem] w-[80rem] -translate-x-1/2 rounded-full bg-blue-wash blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-40 -right-52 h-[32rem] w-[32rem] rounded-full bg-[color:var(--color-gain-soft)] opacity-50 blur-3xl"
        />

        <div className="shell relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="fade-up" style={{ animationDelay: "60ms" }}>
              <Eyebrow className="justify-center">Accounting · Planning · Money management</Eyebrow>
            </div>

            <h1
              className="fade-up display mt-7 text-[2.6rem] leading-[1.03] text-navy sm:text-6xl md:text-[4.25rem]"
              style={{ animationDelay: "140ms" }}
            >
              Know your numbers.
              <br />
              <span className="text-blue">Plan what&rsquo;s next.</span>
            </h1>

            <p
              className="fade-up mx-auto mt-7 max-w-2xl text-xl leading-relaxed text-ink-soft md:text-2xl"
              style={{ animationDelay: "240ms" }}
            >
              {site.subtitle} Accounting, budgeting, forecasting and money
              management &mdash; brought together in one clear financial picture.
            </p>

            <div
              className="fade-up mt-9 flex flex-col justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "340ms" }}
            >
              <Button href="/contact">
                Get started
                <Arrow />
              </Button>
              <Button href="#how" variant="outline">
                See how it works
              </Button>
            </div>

            <ul
              className="fade-up mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
              style={{ animationDelay: "440ms" }}
            >
              {assurances.map((a) => (
                <li key={a} className="label flex items-center gap-2 text-ink-faint">
                  <span aria-hidden="true" className="block h-1 w-1 rounded-full bg-blue" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="fade-up mt-14 md:mt-20" style={{ animationDelay: "300ms" }}>
            <Dashboard />
            <p className="mt-5 text-center text-xs text-ink-faint">
              Illustrative dashboard. Every figure shown is invented for design purposes.
            </p>
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

      {/* ----------------------------------------------------------- lines */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Everything financial"
              title="One place. Three ways in."
              lede="Most people arrive for one of these and end up using two. The household and the company have the same problem — the information exists and nobody has assembled it."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-3">
            {lines.map((line, i) => (
              <Reveal key={line.slug} delay={i * 90}>
                <Link
                  href={line.href}
                  className="group flex h-full flex-col rounded-xl border border-rule bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue hover:shadow-deep md:p-9"
                >
                  <LineMark line={line.slug} colour={line.accent} className="h-8 w-11" />
                  <span className="label mt-6 text-ink-faint">{line.audience}</span>
                  <h3 className="display mt-3 text-2xl leading-snug text-navy transition-colors duration-300 group-hover:text-blue md:text-[1.75rem]">
                    {line.name}
                  </h3>
                  <p className="mt-3 text-lg leading-snug text-navy/70">{line.tagline}</p>
                  <p className="mt-4 flex-1 leading-relaxed text-ink-soft">{line.lede}</p>

                  <ul className="mt-7 flex flex-wrap gap-2 border-t border-rule pt-6">
                    {line.chips.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-rule bg-canvas px-3 py-1.5 text-[0.8125rem] text-ink-soft"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>

                  <span className="label tap mt-6 gap-3 text-blue">
                    Explore {line.short}
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ ask arthiq */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Topography
          className="pointer-events-none absolute -top-24 right-0 h-[46rem] w-[72rem] text-blue-bright opacity-30"
          tone="currentColor"
        />
        <div className="shell relative py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow className="text-blue-pale">The difference</Eyebrow>
                <h2 className="display mt-6 text-4xl leading-[1.08] sm:text-5xl">
                  Ask a question.
                  <br />
                  Get the arithmetic.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
                  Reports tell you what happened. The question you actually have
                  is why, or what happens if. Ask ArthIQ answers in plain
                  English over your own numbers, and shows every line it used to
                  get there.
                </p>
                <p className="mt-5 max-w-lg leading-relaxed text-white/55">
                  It explains. It does not decide. When the judgement matters
                  more than the maths, the person who owns your account is one
                  message away.
                </p>
                <Button href="/contact" variant="invert" className="mt-9">
                  Try it on your numbers
                  <Arrow />
                </Button>
              </Reveal>
            </div>

            <Reveal className="min-w-0 lg:col-span-7" delay={90}>
              <AskArthiq />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ in practice */}
      <section className="border-b border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="In practice"
              title="The same discipline, both sides of your life."
              lede="What you keep each month, and what your company earned against the plan it promised. Two views, one standard of proof."
            />
          </Reveal>

          <div className="mt-14 grid items-start gap-6 md:mt-20 lg:grid-cols-2 lg:gap-8">
            <Reveal className="min-w-0">
              <CashFlowPanel />
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                <span className="font-medium text-navy">Personal.</span> Income
                split into what left and what stayed. December is a bonus month
                and it does not flatter the average, because the annual bills sit
                in there too.
              </p>
            </Reveal>
            <Reveal className="min-w-0" delay={90}>
              <ReportingPanel />
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                <span className="font-medium text-navy">Business.</span>{" "}
                Operating income ahead of plan despite $92K of opex overrun,
                because gross margin ran a point better. Both facts in one table,
                on day seven.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- how it works */}
      <section id="how" className="scroll-mt-24 py-20 md:py-28">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>How it works</Eyebrow>
                <h2 className="display mt-6 text-4xl leading-[1.08] text-navy sm:text-5xl">
                  Connected in twenty minutes. Useful in a week.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                  Software does the assembling. People do the thinking. You get
                  both, and you know the names of the second part.
                </p>
              </Reveal>

              <Reveal delay={80}>
                <div className="img-frame mt-10 hidden rounded-xl lg:block">
                  <Figure
                    image={images.meeting}
                    aspect="aspect-4/3"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="rounded-xl"
                  />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ol className="space-y-px">
                {process.map((step, i) => (
                  <Reveal key={step.step} delay={i * 70}>
                    <li className="group grid gap-x-6 gap-y-3 border-t border-rule py-7 sm:grid-cols-[auto_1fr] md:py-8">
                      <span className="label-sm tnum text-blue sm:pt-1.5">{step.step}</span>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3 className="display text-2xl text-navy">{step.title}</h3>
                          <span className="label-sm text-ink-faint">{step.duration}</span>
                        </div>
                        <p className="mt-3 max-w-xl leading-relaxed text-ink-soft">{step.body}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={100}>
                <div className="mt-10 rounded-xl border border-rule bg-canvas p-7 md:p-8">
                  <h3 className="label text-blue">And what we never do</h3>
                  <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {notDoing.map((n) => (
                      <li key={n} className="flex gap-3 leading-relaxed text-ink-soft">
                        <span aria-hidden="true" className="mt-3 block h-px w-3.5 shrink-0 bg-blue" />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- pricing */}
      <section className="border-y border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="Pricing"
                title="Fixed fees. No hourly billing."
                lede="One price a month, quoted up front, that does not move because a quarter got busy."
              />
              <Link href="/pricing" className="label link-reveal tap gap-3 text-blue hover:text-navy">
                Full comparison
                <Arrow />
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:mt-16 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.slug} delay={i * 80}>
                <Link
                  href="/pricing"
                  className={[
                    "group flex h-full flex-col rounded-xl border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-deep md:p-8",
                    plan.featured ? "border-blue shadow-lift" : "border-rule hover:border-blue",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="display text-xl text-navy">{plan.name}</h3>
                    {plan.featured && (
                      <span className="label-sm rounded-full bg-blue-wash px-2.5 py-1.5 text-blue">
                        Most chosen
                      </span>
                    )}
                  </div>
                  <p className="mt-3 leading-relaxed text-ink-soft">{plan.blurb}</p>
                  <div className="mt-7 flex items-baseline gap-1.5">
                    <span className="tnum display text-4xl text-navy">{plan.price}</span>
                    <span className="text-ink-faint">{plan.unit}</span>
                  </div>
                  <p className="mt-2 text-sm text-ink-faint">{plan.cadence}</p>
                  <span className="label tap mt-7 gap-3 border-t border-rule pt-6 text-blue">
                    What&rsquo;s included
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- testimonials */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading align="center" eyebrow="In their words" title="What clients say." />
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
            <p className="mt-8 text-sm leading-relaxed text-ink-faint">
              <span className="label-sm mr-2">Disclosure</span>
              {testimonialDisclosure}
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- insights */}
      <section className="border-t border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading eyebrow="Insights" title="Written for the person deciding." />
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
                Before you sign up.
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
                What we are, what we never touch, and what it costs.
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
