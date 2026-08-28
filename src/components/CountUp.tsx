"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up when it reaches the fold.
 *
 * Parses the numeric part out of a formatted string ("$1.24B", "0.65%") and
 * animates only that, keeping prefix, suffix and decimal places intact — so
 * the final frame is character-for-character the value that was passed in.
 * Under reduced motion it renders the value immediately and never animates.
 */
export function CountUp({
  value,
  duration = 1400,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // Parsed inside the effect: `String.match` returns a fresh array each
    // render, so depending on it would restart the animation every frame and
    // the figure would never arrive.
    const match = value.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
    if (!match) return;

    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    const decimals = (digits.split(".")[1] ?? "").length;
    const grouped = digits.includes(",");

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const withCommas = grouped
        ? Number(fixed).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return `${prefix}${withCommas}${suffix}`;
    };

    let raf = 0;
    let start = 0;

    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      // Ease-out cubic: fast to begin, settling on the real number.
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(format(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting ||
            entry.boundingClientRect.top < window.innerHeight
          ) {
            setDisplay(format(0));
            raf = requestAnimationFrame(tick);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
