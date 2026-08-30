/**
 * Shared furniture for the three product-line pages, so Personal, Business
 * and FP&A stay siblings rather than three designs that drifted.
 */

import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Arrow, Button, Eyebrow } from "@/components/ui";
import type { Line } from "@/lib/lines";
import { LineMark } from "./marks";

export function LineHero({ line }: { line: Line }) {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-canvas pt-36 pb-16 md:pt-48 md:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 right-0 h-[40rem] w-[52rem] rounded-full blur-3xl"
        style={{ backgroundColor: line.accent, opacity: 0.09 }}
      />
      <div className="shell relative">
        <div className="flex items-center gap-4">
          <LineMark line={line.slug} colour={line.accent} className="h-8 w-11 shrink-0" />
          <Eyebrow>{line.audience}</Eyebrow>
        </div>

        <h1 className="display mt-7 max-w-4xl text-[2.6rem] leading-[1.04] text-navy sm:text-6xl md:text-7xl">
          {line.tagline}
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-soft md:text-2xl">
          {line.lede}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/contact">
            Get started
            <Arrow />
          </Button>
          <Button href="/pricing" variant="outline">
            See pricing
          </Button>
        </div>

        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-x-6 gap-y-4 border-t border-rule pt-8">
          {line.proof.map((p) => (
            <div key={p.label} className="min-w-0">
              <dt className="label-sm text-ink-faint">{p.label}</dt>
              <dd className="tnum display mt-2.5 text-2xl leading-none text-navy md:text-3xl">
                {p.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Capabilities({
  line,
  eyebrow = "What it covers",
  title,
}: {
  line: Line;
  eyebrow?: string;
  title: string;
}) {
  return (
    <section className="border-b border-rule py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="display mt-6 max-w-3xl text-4xl leading-[1.08] text-navy sm:text-5xl">
            {title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-px md:mt-20 md:grid-cols-2 md:gap-x-16">
          {line.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 80}>
              <div className="border-t border-rule py-7 md:py-8">
                <div className="flex items-baseline gap-3.5">
                  <span
                    aria-hidden="true"
                    className="block h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: line.accent }}
                  />
                  <h3 className="display text-xl text-navy md:text-2xl">{c.title}</h3>
                </div>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-soft md:pl-[1.4rem]">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A panel with its explanation beside it, alternating sides down the page. */
export function PanelRow({
  eyebrow,
  title,
  body,
  link,
  flip = false,
  children,
}: {
  eyebrow: string;
  title: string;
  body: React.ReactNode;
  link?: { href: string; label: string };
  flip?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <Reveal className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>{children}</Reveal>
      <Reveal className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`} delay={80}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="display mt-5 text-2xl leading-snug text-navy md:text-3xl">{title}</h3>
        <div className="mt-4 max-w-md leading-relaxed text-ink-soft">{body}</div>
        {link && (
          <Link href={link.href} className="label link-reveal tap mt-5 gap-3 text-blue hover:text-navy">
            {link.label}
            <Arrow />
          </Link>
        )}
      </Reveal>
    </div>
  );
}
