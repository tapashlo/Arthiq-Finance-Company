/**
 * ArthIQ wordmark.
 *
 *   A   — a single asymmetric peak with snow fissures knocked out of it: a
 *         short steep left face and a long right shoulder. Drawn as filled
 *         paths so it holds as a solid silhouette at favicon size.
 *   rth — lowercase geometric, flat terminals.
 *   IQ  — uppercase in the accent blue; the Q is a magnifying glass, its tail
 *         leaving the bowl at 45° as a weighted handle.
 *   A rising line with station nodes and an arrowhead runs through the
 *   ascender band above `rth` — the analysis the name is about.
 *
 * Two tones: `--logo-ink` for the peak and lowercase, `--logo-accent` for the
 * chart and IQ, `--logo-knockout` for the fissures and lens glint. All fall
 * back to currentColor so a single-colour rendering still works.
 */

/**
 * One mountain, drawn once and shared by the wordmark and the monogram so the
 * two can never drift. Both fissures are checked to sit inside the silhouette:
 * on a single peak the right-hand one has to move inboard, or it floats off
 * the face.
 */
const PEAK = "M8 150 L57 26 L128 150 Z";
const FISSURE_MAIN = "M57 48 L45 106 L55 99 L44 146 L64 93 L54 98 Z";
const FISSURE_SIDE = "M86 98 L78 126 L84 122 L77 149 L91 120 L84 124 Z";

type WordmarkProps = {
  className?: string;
  title?: string;
  /** Drop the chart line, which turns to noise below ~140px of width. */
  simplified?: boolean;
};

const INK = "var(--logo-ink, currentColor)";
const ACCENT = "var(--logo-accent, currentColor)";
const KNOCKOUT = "var(--logo-knockout, #fff)";

export function Wordmark({
  className,
  title = "ArthIQ",
  simplified = false,
}: WordmarkProps) {
  return (
    <svg
      viewBox="0 0 464 176"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* A — a single asymmetric peak: short steep left face, long right shoulder */}
      <path d={PEAK} fill={INK} />
      <path d={FISSURE_MAIN} fill={KNOCKOUT} />
      <path d={FISSURE_SIDE} fill={KNOCKOUT} />

      {!simplified && (
        <g aria-hidden="true">
          <path
            d="M140 104 L178 86 L212 94 L246 58 L274 68 L300 26"
            stroke={ACCENT}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M306 18 L302 42 L284 27 Z" fill={ACCENT} />
          <g fill={ACCENT}>
            <circle cx="178" cy="86" r="7" />
            <circle cx="246" cy="58" r="7" />
            <circle cx="274" cy="68" r="7" />
          </g>
        </g>
      )}

      {/* rth */}
      <g stroke={INK} strokeWidth="17" strokeLinecap="butt" strokeLinejoin="round">
        <path d="M160 96V150" />
        <path d="M160 112c0-11 9-17 21-17" />
        <path d="M212 64V150" />
        <path d="M198 96h30" />
        <path d="M262 56V150" />
        <path d="M262 110c0-11 8-16 17-16s15 7 15 17v39" />
      </g>

      {/* IQ */}
      <path d="M330 48V150" stroke={ACCENT} strokeWidth="17" strokeLinecap="butt" />
      <circle cx="396" cy="104" r="40" stroke={ACCENT} strokeWidth="17" />
      <path
        d="M424 132L448 156"
        stroke={ACCENT}
        strokeWidth="23"
        strokeLinecap="round"
      />
      <path
        d="M374 84a26 26 0 0 1 17-11"
        stroke={KNOCKOUT}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Monogram — the peak alone, for favicons, avatars and tight spaces. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 136 136"
      className={className}
      role="img"
      aria-label="ArthIQ"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0 -20)">
        <path d={PEAK} fill={INK} />
        <path d={FISSURE_MAIN} fill={KNOCKOUT} />
        <path d={FISSURE_SIDE} fill={KNOCKOUT} />
      </g>
    </svg>
  );
}
