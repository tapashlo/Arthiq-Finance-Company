import type { ReactNode } from "react";
import { InView } from "../Reveal";

/**
 * Presents a chart as a deliverable — a document with a title bar and a
 * footer note, rather than a chart floating on the page. The chrome is what
 * makes these read as "a page from your board pack" instead of decoration.
 */
export function Artifact({
  label,
  title,
  meta,
  children,
  className = "",
  tone = "light",
}: {
  label: string;
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <figure
      className={[
        "overflow-hidden rounded-xl border shadow-deep",
        dark ? "border-white/10 bg-navy-deep" : "border-rule bg-white",
        className,
      ].join(" ")}
    >
      <figcaption
        className={[
          "flex items-center justify-between gap-4 border-b px-5 py-3.5 md:px-6 md:py-4",
          dark ? "border-white/10" : "border-rule",
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="flex gap-1.5">
            {["bg-loss/70", "bg-warn/70", "bg-gain/70"].map((c) => (
              <span key={c} className={`block h-2 w-2 rounded-full ${c}`} />
            ))}
          </span>
          <span className={`label truncate ${dark ? "text-white/50" : "text-ink-faint"}`}>
            {label}
          </span>
        </div>
        {meta && (
          <span
            className={`label-sm hidden shrink-0 sm:block ${dark ? "text-white/40" : "text-ink-faint"}`}
          >
            {meta}
          </span>
        )}
      </figcaption>

      <div className="px-5 pt-5 pb-5 md:px-7 md:pt-6">
        <h3 className={`display text-lg ${dark ? "text-white" : "text-navy"} md:text-xl`}>
          {title}
        </h3>
        <div className="mt-5">{children}</div>
      </div>
    </figure>
  );
}

/**
 * Two artifacts stacked with an offset, so the section reads as a pile of work
 * rather than a grid of pictures. Collapses to a simple stack under lg.
 */
export function ArtifactStack({
  back,
  front,
}: {
  back: ReactNode;
  front: ReactNode;
}) {
  return (
    <InView className="img-frame relative">
      <div className="relative lg:pb-28 lg:pl-12">
        <div className="lg:max-w-[76%]">{back}</div>
        <div className="mt-6 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[50%]">
          {front}
        </div>
      </div>
    </InView>
  );
}
