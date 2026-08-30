/**
 * Shared furniture for the dark product panels.
 *
 * Numbers are laid out in HTML rather than inside the SVGs, so they scale with
 * the reader's font size and stay legible on a phone. Only the plotted marks
 * live in a viewBox.
 */

import type { ReactNode } from "react";

export const VIZ = {
  blue: "var(--color-viz-blue)",
  mint: "var(--color-viz-mint)",
  amber: "var(--color-viz-amber)",
  coral: "var(--color-viz-coral)",
  violet: "var(--color-viz-violet)",
  rule: "var(--color-panel-rule)",
} as const;

/**
 * A signed change.
 *
 * Colour says whether it is good news; the arrow says which way the number
 * moved. Those are not the same thing — spending up 6.4% is a rise and bad
 * news — so the arrow is read from the value's own sign and only falls back to
 * `dir` when the value carries no sign of its own.
 */
export function Delta({
  value,
  dir,
  className = "",
}: {
  value: string;
  dir: "up" | "down" | "flat";
  className?: string;
}) {
  const tone =
    dir === "up"
      ? "text-[color:var(--color-viz-mint)]"
      : dir === "down"
        ? "text-[color:var(--color-viz-coral)]"
        : "text-white/45";

  const signed = /^[+\u2212-]/.exec(value)?.[0];
  const arrow = signed ? (signed === "+" ? "up" : "down") : dir;

  return (
    <span className={`tnum inline-flex items-center gap-1 text-xs font-medium ${tone} ${className}`}>
      {arrow !== "flat" && (
        <svg viewBox="0 0 8 8" className="h-2 w-2" aria-hidden="true" fill="currentColor">
          <path d={arrow === "up" ? "M4 0l4 8H0z" : "M4 8L0 0h8z"} />
        </svg>
      )}
      {value}
    </span>
  );
}

/** One metric inside a panel. */
export function Tile({
  label,
  value,
  note,
  delta,
  dir = "flat",
  accent,
}: {
  label: string;
  value: string;
  note?: string;
  delta?: string;
  dir?: "up" | "down" | "flat";
  accent?: string;
}) {
  return (
    <div className="panel-tile flex min-w-0 flex-col px-3 py-3 sm:px-4 sm:py-3.5">
      <div className="flex items-start gap-1.5">
        {accent && (
          <span
            aria-hidden="true"
            className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
          />
        )}
        <span className="label-sm leading-[1.35] text-white/45">{label}</span>
      </div>

      {/* Pushed to the bottom so the figures line up across a row of tiles
          even when one label wraps to three lines on a phone. */}
      <div className="mt-auto pt-3">
        <div className="tnum text-lg leading-none font-semibold text-white sm:text-xl">
          {value}
        </div>
        {(delta || note) && (
          <div className="mt-2 flex items-center gap-2">
            {delta && <Delta value={delta} dir={dir} />}
            {note && <span className="truncate text-xs text-white/40">{note}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * X-axis labels, drawn in HTML rather than inside the chart.
 *
 * Text in a viewBox scales with the chart, so the same label is 6px in a
 * two-column panel and 26px in a full-width one. Compensating per placement is
 * a losing game — these panels are fluid — so the labels live outside the SVG
 * and take an ordinary font size.
 *
 * Thinned labels are hidden with `invisible` rather than `hidden`: the cell has
 * to keep its track, or the remaining labels reflow and stop lining up with
 * what they label.
 */
export function Axis({
  labels,
  align = "band",
  everyOnMobile = 1,
}: {
  labels: readonly string[];
  /** "band" centres each label under its bar; "edge" pins the first and last. */
  align?: "band" | "edge";
  everyOnMobile?: number;
}) {
  const cls = (i: number) =>
    i % everyOnMobile === 0 ? "text-white/40" : "invisible text-white/40 sm:visible";

  if (align === "edge") {
    return (
      <div className="mt-2.5 flex justify-between text-[0.6875rem] tabular-nums">
        {labels.map((l, i) => (
          <span key={`${l}-${i}`} className={cls(i)}>
            {l}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className="mt-2.5 grid text-center text-[0.6875rem] tabular-nums"
      style={{ gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))` }}
    >
      {labels.map((l, i) => (
        <span key={`${l}-${i}`} className={cls(i)}>
          {l}
        </span>
      ))}
    </div>
  );
}

/** Panel chrome: a title bar with the window dots and an optional right slot. */
export function PanelHead({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex items-center gap-3 border-b border-[color:var(--color-panel-rule)] px-4 py-3.5 sm:px-6 sm:py-4">
      <span aria-hidden="true" className="hidden shrink-0 gap-1.5 sm:flex">
        {["#f97389", "#f9b44c", "#3ad0a4"].map((c) => (
          <span key={c} className="block h-2.5 w-2.5 rounded-full opacity-70" style={{ backgroundColor: c }} />
        ))}
      </span>
      <h3 className="label min-w-0 truncate text-white/70">{title}</h3>
      <div className="ml-auto flex shrink-0 items-center gap-3">
        {children}
        {meta && <span className="label-sm hidden text-white/35 sm:block">{meta}</span>}
      </div>
    </header>
  );
}
