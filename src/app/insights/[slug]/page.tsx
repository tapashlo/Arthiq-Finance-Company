import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Figure } from "@/components/Media";
import { Reveal } from "@/components/Reveal";
import { images } from "@/lib/images";
import { Arrow } from "@/components/ui";
import { articles, site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.dek,
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-rule bg-canvas pt-36 pb-16 md:pt-48 md:pb-20">
          <div className="shell relative mx-auto max-w-[44rem]">
            <Link
              href="/insights"
              className="label link-reveal tap gap-3 text-ink-faint hover:text-navy"
            >
              <Arrow className="rotate-180" />
              All insights
            </Link>

            <p className="label mt-12 text-blue">{article.category}</p>
            <h1 className="mt-7 text-4xl leading-[1.08] text-navy sm:text-5xl md:text-[3.5rem]">
              {article.title}
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-ink-soft md:text-2xl">
              {article.dek}
            </p>

            <div className="label-sm mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-7 text-ink-faint">
              <span className="text-navy">{article.author}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{article.displayDate}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </header>

        <div className="relative py-14 md:py-20">
          <div className="shell relative">
            <Figure
              image={images[article.image]}
              aspect="aspect-16/9"
              sizes="(min-width: 1024px) 60rem, 100vw"
              className="mx-auto mb-16 max-w-4xl rounded-lg md:mb-20"
            />
            <div className="mx-auto max-w-[40rem]">
              {article.body.map((paragraph, i) => (
                <Reveal key={i} delay={Math.min(i, 4) * 40}>
                  <p
                    className={[
                      "text-xl leading-[1.72] text-ink md:text-[1.3125rem]",
                      i === 0 ? "" : "mt-7",
                      // Lead paragraph sets the entry into the piece.
                      i === 0 ? "text-[1.375rem] leading-[1.62] text-navy md:text-2xl" : "",
                    ].join(" ")}
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <Reveal>
                <div className="mt-16 border-t border-rule pt-8">
                  <p className="text-base leading-relaxed text-ink-faint">
                    <span className="label-sm mr-2">Disclosure</span>
                    This article is general information, not investment, tax or
                    legal advice, and does not account for your circumstances.
                    Tax rules change and apply differently to different
                    households. Speak with a qualified professional before
                    acting on anything here. All figures and examples are
                    illustrative placeholders created for design purposes.{" "}
                    <Link href="/disclosures" className="link-reveal text-blue">
                      Full disclosures
                    </Link>
                    .
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </article>

      {/* ----------------------------------------------------------- more */}
      <section className="border-t border-rule bg-canvas py-20 md:py-28">
        <div className="shell">
          <h2 className="label text-ink-faint">More from {site.name}</h2>
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
            {more.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  href={`/insights/${a.slug}`}
                  className="group flex h-full flex-col border-t border-rule pt-7 transition-colors duration-300 hover:border-blue"
                >
                  <span className="label text-blue">{a.category}</span>
                  <h3 className="mt-6 flex-1 text-2xl leading-snug text-navy transition-colors duration-300 group-hover:text-blue">
                    {a.title}
                  </h3>
                  <div className="label-sm mt-8 text-ink-faint">
                    <time dateTime={a.date}>{a.displayDate}</time>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
