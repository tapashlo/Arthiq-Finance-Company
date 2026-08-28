/**
 * Photography.
 *
 * Sourced from Unsplash under the Unsplash License, which permits commercial
 * use without permission or attribution. Credits are not resolvable from the
 * CDN path alone — see ATTRIBUTION.md for the source URLs and what to add
 * before production.
 *
 * Imported as modules rather than referenced from /public so Next can emit
 * width, height and a blur placeholder automatically: no layout shift, and a
 * cheap first paint.
 */

import aboveClouds from "@/images/above-clouds.jpg";
import highlands from "@/images/highlands.jpg";
import office from "@/images/office.jpg";
import ridge from "@/images/ridge.jpg";
import summit from "@/images/summit.jpg";
import tower from "@/images/tower.jpg";

export const images = {
  summit: {
    src: summit,
    alt: "Snow-covered mountain peaks under a clouded sky.",
  },
  ridge: {
    src: ridge,
    alt: "A dark mountain ridge silhouetted against a deep teal dusk sky.",
  },
  aboveClouds: {
    src: aboveClouds,
    alt: "Mountain summits rising above a sea of cloud at first light.",
  },
  highlands: {
    src: highlands,
    alt: "Green highland ridges under low mist, a road curving through them.",
  },
  office: {
    src: office,
    alt: "A quiet modern office interior with glass partitions and daylight.",
  },
  tower: {
    src: tower,
    alt: "Glass office towers seen looking upward at dusk.",
  },
} as const;

export type ImageKey = keyof typeof images;
