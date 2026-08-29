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
| `src/images/dashboard.jpg` | https://images.unsplash.com/photo-1551288049-bebda4e38f71 |
| `src/images/trading.jpg` | https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3 |
| `src/images/meeting.jpg` | https://images.unsplash.com/photo-1517245386807-bb43f82c33c4 |
| `src/images/desk.jpg` | https://images.unsplash.com/photo-1554224155-6726b3ff858f |
| `src/images/skyline.jpg` | https://images.unsplash.com/photo-1486406146926-c627a92ad1ab |
| `src/images/workshop.jpg` | https://images.unsplash.com/photo-1553877522-43269d4ea984 |
| `src/images/screens.jpg` | https://images.unsplash.com/photo-1526628953301-3e589a6a8b74 |

Images were downloaded at 1800px wide, q=72, and are re-encoded by Next.js at
request time into AVIF/WebP at the sizes each layout actually needs.

If you replace these with licensed or commissioned photography, drop the files
into `src/images/` under the same names and nothing else needs to change —
`src/lib/images.ts` carries the alt text.
