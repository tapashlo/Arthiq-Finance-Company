/**
 * Topographic contour art.
 *
 * Nested irregular contours around a ridge — an elevation map of the peak in
 * the wordmark. Generated once at module scope from fixed harmonics, so it is
 * deterministic, weightless (no image request) and scales to any size.
 *
 * Used as section art. Decorative only: aria-hidden throughout.
 */

const LEVELS = 15;
const W = 1200;
const H = 420;

/** Fixed harmonics — organic outline, no randomness at render time. */
const HARMONICS = [
  { k: 2, amp: 0.13, phase: 0.4 },
  { k: 3, amp: 0.075, phase: 2.1 },
  { k: 5, amp: 0.045, phase: 4.2 },
  { k: 7, amp: 0.028, phase: 1.1 },
  { k: 11, amp: 0.016, phase: 5.3 },
];

function contour(level: number) {
  const t = level / LEVELS;
  const rx = (0.5 - t * 0.42) * W;
  const ry = (0.9 - t * 0.78) * H * 0.5;
  const steps = 132;
  const pts: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    // Inner contours drift upward, the way a summit sits above its footprint.
    let wob = 1;
    for (const { k, amp, phase } of HARMONICS) {
      wob += amp * (1 - t * 0.45) * Math.sin(k * a + phase + level * 0.22);
    }
    const x = W / 2 + Math.cos(a) * rx * wob;
    const y = H * 0.62 + Math.sin(a) * ry * wob - t * H * 0.2;
    pts.push(`${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join("") + "Z";
}

const CONTOURS = Array.from({ length: LEVELS }, (_, i) => contour(i));

export function Topography({
  className = "",
  tone = "currentColor",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {CONTOURS.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={tone}
          strokeWidth={i === LEVELS - 1 ? 2 : 1}
          // Inner rings read stronger, so the summit draws the eye.
          opacity={0.1 + (i / LEVELS) * 0.5}
        />
      ))}
      {/* Summit marker */}
      <circle
        cx={W / 2}
        cy={H * 0.62 - H * 0.2 * ((LEVELS - 1) / LEVELS)}
        r="4"
        fill={tone}
        opacity="0.75"
      />
    </svg>
  );
}
