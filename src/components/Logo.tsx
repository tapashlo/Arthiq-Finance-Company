/**
 * ArthIQ wordmark.
 *
 *   A   — a twin-summit peak with snow fissures knocked out of it. Drawn as
 *         filled paths so it holds up as a solid silhouette at favicon size.
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
      {/* A — twin summit */}
      <path d="M6 150 L58 26 L90 110 L104 80 L132 150 Z" fill={INK} />
      <path d="M58 48 L45 106 L55 99 L44 146 L65 93 L55 98 Z" fill={KNOCKOUT} />
      <path d="M102 88 L94 120 L100 116 L93 147 L107 113 L100 117 Z" fill={KNOCKOUT} />

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
      viewBox="0 0 132 132"
      className={className}
      role="img"
      aria-label="ArthIQ"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 116 L55 -8 L87 76 L101 46 L129 116 Z" fill={INK} transform="translate(0 16)" />
      <g transform="translate(0 16)">
        <path d="M55 14 L42 72 L52 65 L41 112 L62 59 L52 64 Z" fill={KNOCKOUT} />
        <path d="M99 54 L91 86 L97 82 L90 113 L104 79 L97 83 Z" fill={KNOCKOUT} />
      </g>
    </svg>
  );
}
