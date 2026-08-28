/**
 * Arthiq wordmark.
 *
 * Three ideas, drawn quietly enough to survive at 24px:
 *   A   — Himalayan peaks. A symmetric A whose apex carries a single ridge
 *         notch and a lower shoulder summit. The counter stays open, so the
 *         letter reads first and the mountain reads second.
 *   RTH — a transit line over a market. An ascending polyline runs behind the
 *         three letters with station nodes landing in the letter gaps, above a
 *         faint column series along the baseline.
 *   IQ  — a magnifying glass. The Q's bowl is the lens and its tail leaves the
 *         circle at 45° as a weighted, round-capped handle.
 *
 * Everything is currentColor, so the mark inverts on dark grounds for free.
 * Geometry: cap top y=21, baseline y=92, monoline stroke 9.
 */

type WordmarkProps = {
  className?: string;
  title?: string;
  /** Drop the chart furniture. Use below roughly 110px of rendered width. */
  simplified?: boolean;
};

/** Station nodes sit in the gaps between letters, never on a stroke. */
const NODES = [
  [126, 76],
  [196, 66],
  [263, 50],
] as const;

export function Wordmark({
  className,
  title = "Arthiq",
  simplified = false,
}: WordmarkProps) {
  return (
    <svg
      viewBox="0 0 384 118"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!simplified && (
        <g aria-hidden="true">
          {/* Column series along the baseline — the "graphs" half of the idea. */}
          <g fill="currentColor" opacity="0.075">
            <rect x="78" y="83" width="8" height="9" />
            <rect x="108" y="80" width="8" height="12" />
            <rect x="138" y="81" width="8" height="11" />
            <rect x="168" y="77" width="8" height="15" />
            <rect x="198" y="74" width="8" height="18" />
            <rect x="228" y="72" width="8" height="20" />
          </g>

          {/* Transit line. Kept low and visibly stepped so it reads as a chart
              passing behind the letters rather than as a rule struck through them. */}
          <path
            d="M72 86L126 76L160 80L196 66L228 70L263 50"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <circle
            cx="72"
            cy="86"
            r="2.75"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.4"
          />
          <g fill="currentColor" opacity="0.55">
            {NODES.map(([cx, cy]) => (
              <circle key={cx} cx={cx} cy={cy} r="3.4" />
            ))}
          </g>
        </g>
      )}

      <g
        stroke="currentColor"
        strokeWidth="9"
        strokeLinecap="butt"
        strokeLinejoin="round"
      >
        {/* A — summit, ridge notch, shoulder, descent. */}
        <path d="M4 92L32 21L38 38L44.5 27L63 92" />
        <path d="M15 66H55" strokeWidth="8" />

        {/* R */}
        <path d="M80 21V92" />
        <path d="M80 21h21a17 17 0 0 1 0 34H80" />
        <path d="M95 55L113 92" />

        {/* T */}
        <path d="M139 21H189" strokeLinecap="square" />
        <path d="M164 25V92" />

        {/* H */}
        <path d="M203 21V92" />
        <path d="M253 21V92" />
        <path d="M203 56H253" />

        {/* I */}
        <path d="M273 21V92" />

        {/* Q — the lens */}
        <circle cx="329" cy="56" r="36" />
      </g>

      {/* Q tail as the magnifier handle: heavier weight, round cap. */}
      <path
        d="M354.5 81.5L373 100"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />

      {/* Lens glint. Barely there; drops out at small sizes anyway. */}
      <path
        d="M308 41a26 26 0 0 1 15-9"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.32"
      />
    </svg>
  );
}

/**
 * Monogram — the summit A alone, for favicons, avatars and tight spaces.
 * Same construction as the wordmark's A, recentred on a 64-unit square.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Arthiq"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="butt"
        strokeLinejoin="round"
      >
        <path d="M8 54L29 13L33 23L37 16.5L56 54" />
        <path d="M16 40H48" strokeWidth="5.75" />
      </g>
    </svg>
  );
}
