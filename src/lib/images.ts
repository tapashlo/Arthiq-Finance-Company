/**
 * Photography.
 *
 * Unsplash, under the Unsplash License (commercial use, no permission or
 * attribution required). Credits are not resolvable from the CDN path — see
 * ATTRIBUTION.md for source URLs and what to add before production.
 *
 * Imported as modules so Next emits width, height and a blur placeholder
 * automatically: no layout shift, and a cheap first paint.
 */

import dashboard from "@/images/dashboard.jpg";
import desk from "@/images/desk.jpg";
import meeting from "@/images/meeting.jpg";
import screens from "@/images/screens.jpg";
import skyline from "@/images/skyline.jpg";
import trading from "@/images/trading.jpg";
import workshop from "@/images/workshop.jpg";

export const images = {
  dashboard: { src: dashboard, alt: "An analytics dashboard on a dark screen, dense with time-series charts." },
  trading: { src: trading, alt: "A candlestick chart in red and green with a moving-average overlay." },
  meeting: { src: meeting, alt: "Two people talking across a table with a laptop open between them." },
  desk: { src: desk, alt: "Financial paperwork and a calculator laid out on a desk, seen from above." },
  skyline: { src: skyline, alt: "Office towers seen looking upward at dusk." },
  workshop: { src: workshop, alt: "A team working together at laptops in a meeting room." },
  screens: { src: screens, alt: "A close view of a metrics dashboard showing rates and quality scores." },
} as const;

export type ImageKey = keyof typeof images;
