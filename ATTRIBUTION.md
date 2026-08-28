# Image attribution

All photography on this site comes from [Unsplash](https://unsplash.com) and is
used under the [Unsplash License](https://unsplash.com/license), which permits
commercial and non-commercial use without permission. Attribution is not
required by the licence, but Unsplash asks for it and it is good practice.

**Before production, add the photographer credit for each image below.** The
photographer's name is not recoverable from the CDN path, so look each one up by
opening its source URL and following through to the photo page.

| File | Source |
| --- | --- |
| `src/images/summit.jpg` | https://images.unsplash.com/photo-1454496522488-7a8e488e8606 |
| `src/images/ridge.jpg` | https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5 |
| `src/images/above-clouds.jpg` | https://images.unsplash.com/photo-1506905925346-21bda4d32df4 |
| `src/images/highlands.jpg` | https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05 |
| `src/images/office.jpg` | https://images.unsplash.com/photo-1497366754035-f200968a6e72 |
| `src/images/tower.jpg` | https://images.unsplash.com/photo-1486406146926-c627a92ad1ab |

Images were downloaded at 1800px wide, q=72, and are re-encoded by Next.js at
request time into AVIF/WebP at the sizes each layout actually needs.

If you replace these with licensed or commissioned photography, drop the files
into `src/images/` under the same names and nothing else needs to change —
`src/lib/images.ts` carries the alt text.
