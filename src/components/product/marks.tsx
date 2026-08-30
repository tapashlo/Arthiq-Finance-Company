/**
 * One small abstract mark per product line, so a reader can tell the three
 * apart at a glance before reading a word. Drawn rather than iconographic:
 * the shape of the data each line deals in.
 */

export function LineMark({
  line,
  colour,
  className = "",
}: {
  line: "personal" | "business" | "fpa";
  colour: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 44 32" className={className} fill="none" aria-hidden="true">
      {line === "personal" && (
        <>
          {/* A trend and its shadow — one household, going up. */}
          <path
            d="M2 26 L11 19 L20 22 L29 11 L42 5 L42 30 L2 30 Z"
            fill={colour}
            opacity="0.16"
          />
          <path
            d="M2 26 L11 19 L20 22 L29 11 L42 5"
            stroke={colour}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="5" r="3" fill={colour} />
        </>
      )}

      {line === "business" && (
        <>
          {/* Actual against plan, four periods. */}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={3 + i * 11} y={30 - (10 + i * 5)} width="7" height={10 + i * 5} rx="2" fill={colour} />
          ))}
          <path d="M2 17 H42" stroke={colour} strokeWidth="1.6" strokeDasharray="3 3" opacity="0.55" />
        </>
      )}

      {line === "fpa" && (
        <>
          {/* One history, three futures. */}
          <path d="M2 22 L18 16" stroke={colour} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M18 16 L42 4" stroke={colour} strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
          <path d="M18 16 L42 16" stroke={colour} strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
          <path d="M18 16 L42 28" stroke={colour} strokeWidth="2.2" strokeLinecap="round" opacity="0.35" />
          <circle cx="18" cy="16" r="3" fill={colour} />
        </>
      )}
    </svg>
  );
}
