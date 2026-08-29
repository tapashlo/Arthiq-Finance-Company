import Link from "next/link";
import { CountUp } from "./CountUp";
import type { ComponentProps, ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow label ${className}`}>{children}</p>;
}

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "outline" | "quiet" | "invert";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-navy text-white hover:bg-blue border border-navy hover:border-blue",
    outline:
      "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
    invert:
      "bg-paper text-navy border border-white hover:bg-transparent hover:text-white",
    quiet:
      "border border-transparent text-navy hover:text-blue px-0 py-2",
  }[variant];

  return (
    <Link
      {...props}
      className={`label inline-flex items-center justify-center gap-3 rounded-lg px-7 py-4.5 text-center whitespace-nowrap transition-all duration-300 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

/** A right-pointing hairline arrow, sized to sit beside label text. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 10"
      className={`h-2.5 w-5 shrink-0 ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 5h18M14 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={[
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      ].join(" ")}
    >
      {eyebrow && (
        <Eyebrow className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className="mt-6 text-4xl leading-[1.08] text-navy sm:text-5xl md:text-[3.5rem]">
        {title}
      </h2>
      {lede && (
        <p
          className={[
            "mt-7 text-xl leading-relaxed text-ink-soft md:text-[1.375rem]",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
          ].join(" ")}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function Stat({
  value,
  label,
  note,
  invert = false,
}: {
  value: string;
  label: string;
  note?: string;
  invert?: boolean;
}) {
  return (
    <div>
      <div
        className={`tnum text-5xl leading-none tracking-tight md:text-6xl ${
          invert ? "text-white" : "text-navy"
        }`}
      >
        <CountUp value={value} />
      </div>
      <div
        className={`label mt-5 ${invert ? "text-white/55" : "text-ink-faint"}`}
      >
        {label}
      </div>
      {note && (
        <div
          className={`mt-2.5 text-sm ${
            invert ? "text-white/40" : "text-ink-faint"
          }`}
        >
          {note}
        </div>
      )}
    </div>
  );
}

/** Interior-page hero. Consistent measure and rhythm across every subpage. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-canvas pt-36 pb-20 md:pt-48 md:pb-28">
      <div className="shell relative">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-7 max-w-4xl text-5xl leading-[1.04] text-navy sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-9 max-w-2xl text-xl leading-relaxed text-ink-soft md:text-2xl">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
