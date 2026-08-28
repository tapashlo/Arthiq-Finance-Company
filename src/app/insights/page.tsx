import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Figure } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { Arrow, PageHero } from "@/components/ui";
import { articles } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Writing on tax planning, portfolio construction and how our own fees work — the same notes we send clients.",
};

export default function InsightsPage() {
  const [featured, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Written for clients, published for everyone."
        lede="No market commentary and no outlooks. These are the notes we would otherwise send one household at a time."
      />

      {/* ------------------------------------------------------- featured */}
      <section className="grain relative border-b border-rule py-20 md:py-28">
        <div className="shell relative">
          <Reveal>
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <div className="lg:col-span-5">
                <span className="label text-green-mid">{featured.category}</span>
                <div className="label-sm mt-6 flex items-center gap-3 text-ink-faint">
                  <time dateTime={featured.date}>{featured.displayDate}</time>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readingTime}</span>
                </div>
                <span className="label link-reveal mt-10 hidden w-fit items-center gap-3 text-green lg:inline-flex">
                  Read the essay
                  <Arrow />
                </span>
              </div>

              <div className="lg:col-span-7">
                <Figure
                  image={images[featured.image]}
                  aspect="aspect-16/9"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="mb-10 rounded-xs"
                />
                <h2 className="text-4xl leading-[1.1] text-forest transition-colors duration-300 group-hover:text-green sm:text-5xl">
                  {featured.title}
                </h2>
                <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-soft md:text-[1.375rem]">
                  {featured.dek}
                </p>
                <p className="mt-8 text-base text-ink-faint">
                  {featured.author}
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- index */}
      <section className="grain relative py-20 md:py-28">
        <div className="shell relative">
          <ul>
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 60} as="li">
                <Link
                  href={`/insights/${a.slug}`}
                  className="group grid gap-x-10 gap-y-5 border-b border-rule py-10 lg:grid-cols-12 lg:py-12"
                >
                  <div className="lg:col-span-3">
                    <span className="label text-green-mid">{a.category}</span>
                    <div className="label-sm mt-4 text-ink-faint">
                      <time dateTime={a.date}>{a.displayDate}</time>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <h2 className="text-2xl leading-snug text-forest transition-colors duration-300 group-hover:text-green md:text-3xl">
                      {a.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                      {a.dek}
                    </p>
                  </div>
                  <div className="label-sm text-ink-faint lg:col-span-2 lg:text-right">
                    {a.readingTime}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
