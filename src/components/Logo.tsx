/**
 * ArthIQ wordmark.
 *
 *   A   — Everest. An asymmetric filled peak: long left shoulder, steep right
 *         face, jagged snowline, and a true counter (knocked out with
 *         evenodd, not filled with a background colour) so the mark inverts.
 *   rth — lowercase, drawn clean. The candlestick language this name is built
 *         on lives on the site at full size, where it reads as a chart; at
 *         wordmark scale it only ever read as coloured blocks stuck on letters.
 *   IQ  — uppercase, both lenses. The I is a bar passing through a small ring;
 *         the Q's bowl is the larger lens with its tail as the handle.
 *
 * Body is currentColor throughout. The snowcap takes --logo-accent so it can
 * be tuned per ground, falling back to currentColor.
 */

const A_OUTLINE = "M2 92 L40 16 L70 92 Z M38 55 L28 78 L51 78 Z";
const SNOWLINE = "M0 0 H80 V42 L60 37 L52 44 L44 27 L37 41 L29 33 L20 45 L0 39 Z";

type WordmarkProps = {
  className?: string;
  title?: string;
  /** Drop the I's lens ring, which fills in below ~120px of rendered width. */
  simplified?: boolean;
  /** Unique per instance: clipPath ids must not collide across inline SVGs. */
  id?: string;
};

export function Wordmark({
  className,
  title = "ArthIQ",
  simplified = false,
  id = "wm",
}: WordmarkProps) {
  return (
    <svg
      viewBox="0 0 330 120"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={`${id}-peak`}>
          <path d={A_OUTLINE} clipRule="evenodd" />
        </clipPath>
      </defs>

      {/* A — the peak, with its snowcap clipped to the letterform. */}
      <g clipPath={`url(#${id}-peak)`}>
        <rect x="0" y="0" width="80" height="120" fill="currentColor" />
        <path
          d={SNOWLINE}
          fill="var(--logo-accent, currentColor)"
          opacity="var(--logo-accent-opacity, 0.5)"
        />
      </g>

      <g
        stroke="currentColor"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* r */}
        <path d="M92 46V92" />
        <path d="M92 59c0-9 7-14 18-14" />

        {/* t */}
        <path d="M130 26V92" />
        <path d="M119 46h23" />

        {/* h */}
        <path d="M160 18V92" />
        <path d="M160 58c0-10 7-13 14-13s12 6 12 14v33" />

        {/* I — bar through a lens */}
        <path d="M212 20V92" />
        {!simplified && <circle cx="212" cy="50" r="13" strokeWidth="4.5" />}

        {/* Q — the larger lens */}
        <circle cx="272" cy="56" r="32" />
        <path
          d="M253 39a23 23 0 0 1 13-8"
          strokeWidth="4"
          opacity="0.32"
        />
      </g>

      {/* Q tail as the magnifier handle. */}
      <path
        d="M294.6 78.6L312 96"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Monogram — the Everest A alone, for favicons, avatars and tight spaces. */
export function Monogram({
  className,
  id = "mg",
}: {
  className?: string;
  id?: string;
}) {
  return (
    <svg
      viewBox="0 0 72 108"
      className={className}
      role="img"
      aria-label="ArthIQ"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id={`${id}-peak`}>
          <path d={A_OUTLINE} clipRule="evenodd" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-peak)`}>
        <rect x="0" y="0" width="80" height="120" fill="currentColor" />
        <path
          d={SNOWLINE}
          fill="var(--logo-accent, currentColor)"
          opacity="var(--logo-accent-opacity, 0.5)"
        />
      </g>
    </svg>
  );
}
