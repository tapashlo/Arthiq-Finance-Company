# ArthIQ

Marketing site, free calculator suite and client-dashboard mockup for
**ArthIQ**, a remote-first outsourced FP&A and fractional CFO team serving
venture-backed startups across the United States, Seed to Series C.

Built with Next.js 16 (App Router), TypeScript and Tailwind CSS v4. Every route
is statically prerendered; there is no database, no API and no runtime
dependency to operate.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
npm run start    # serve the production build
npm run typecheck
```

---

## The mark

The wordmark is hand-authored SVG in `src/components/Logo.tsx` — geometry, not a
font — so it stays sharp at any size and needs no webfont to render.

| Letters | Idea | How it is drawn |
| --- | --- | --- |
| **A** | A twin-summit peak | Filled paths with snow fissures knocked out, so it holds as a solid silhouette at favicon size. |
| **rth** | lowercase, geometric | Flat terminals, monoline strokes. A rising line with plotted nodes and an arrowhead runs through the ascender band above it. |
| **IQ** | uppercase, in the accent blue | The Q is a magnifying glass — bowl as lens, tail leaving at 45° as the handle. |

Three tokens drive it — `--logo-ink`, `--logo-accent`, `--logo-knockout` — each
falling back to `currentColor`. The `.on-navy` class flips them for dark
grounds; without it the knockout fissures render white instead of cutting through.

- `<Wordmark />` — the full lockup.
- `<Wordmark simplified />` — drops the chart line, which turns to noise below
  about 140px of width. Used in the site header.
- `<Monogram />` — the peak alone, for favicons and tight spaces.

---

## Design system

Tokens live in `src/app/globals.css` under `@theme`.

- **Palette** — deep navy grounds with an electric blue accent. `--color-gain`
  and `--color-loss` are reserved for figures that carry a sign: favourable and
  unfavourable variance, metrics above and below benchmark.
- **Type** — [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
  for display, [Inter](https://fonts.google.com/specimen/Inter) for UI, body and
  figures. Both are variable and self-hosted by `next/font`, so no external font
  request is made at runtime.

- **Charts** — all hand-authored SVG, no charting library. The hero is a
  candlestick chart with volume and a five-quarter moving average; the home page
  also carries a periodic-table-of-returns heatmap and a sparkline sheet, and
  the portal has a performance area chart and an allocation ring. Every series
  is generated deterministically at module scope so server and client agree.
- **Artwork** — `<Topography />` draws nested contour rings from fixed
  harmonics: an elevation map of the peak in the wordmark. No image requests.
- **Photography** — six Unsplash images in `src/images/`, imported as modules
  so Next emits intrinsic dimensions and a blur placeholder (CLS stays at 0).
  See `ATTRIBUTION.md`.
- **Motion** — `<Reveal>` fades sections in on scroll, photographs settle from a
  slight scale, figures count up, and charts draw themselves with CSS dash and
  stagger animations. Everything is fully disabled under
  `prefers-reduced-motion: reduce`, verified in the browser rather than assumed.
- **Touch targets** — the `.tap` utility guarantees 44px on controls whose text
  box is smaller. Inline links inside prose are exempt, per WCAG 2.5.8.

---

## Structure

```
src/
├── app/
│   ├── page.tsx              Home (hero, live tool, services, board)
│   ├── work/                 Six deliverable examples
│   ├── about/                Firm story, team, principles, process, the mark
│   ├── services/             Investment management · Retirement & tax planning
│   ├── insights/             Index + [slug] article pages
│   ├── contact/              Booking form
│   ├── portal/               Client dashboard mockup
│   ├── disclosures/          Regulatory, privacy, Form ADV
│   ├── globals.css           Design tokens, base, components, motion
│   └── icon.svg              Favicon
├── components/
│   ├── showcase/             Frame + the six work examples
│   └── …                     Logo, header, footer, charts, form, primitives
└── lib/
    ├── site.ts               All marketing copy and data
    └── portal.ts             Portal mock data
```

Content is separated from layout: to change copy, services, team, FAQs or
articles, edit `src/lib/site.ts` and nothing else.

---

## Measured

On a cold mobile visit (390px, throttling off), production build:

| | |
| --- | --- |
| Total transferred | 439 KB |
| — fonts | 167 KB |
| — JavaScript | 150 KB |
| — HTML | 66 KB |
| — RSC payload | 46 KB |
| — CSS | 10 KB |
| First Contentful Paint | 212 ms |
| Cumulative Layout Shift | 0 |

Images are lazy below the fold and served as WebP at the size each layout
actually paints — 212 KB for the whole home page at 2× DPR.

Fonts are the largest single cost. Dropping Inter for a system sans stack would
save roughly 50 KB; the labels are small uppercase tracked text where the
difference is hard to see. It has been left in for cross-platform consistency.

Checked at 360, 390, 430, 768, 1024, 1280 and 1440px across all eight routes:
no horizontal overflow, no touch target under 44px.

---

## The work examples

Six deliverables live under `/work`, with three of them stacked on the home
page. They are static SVG — no charting library, no interactivity — and every
series is generated deterministically at module scope so server and client
render identically.

| Example | What it shows |
| --- | --- |
| Revenue build | Stacked segment forecast (base, expansion, new logos) with the prior plan dashed over it. |
| Variance bridge | Plan-to-actual waterfall naming each driver. Axis is deliberately truncated — a $290K step on a zero-based $4.8M scale is about ten pixels — and the chart says so. |
| Cohort grid | Net revenue retention by signup cohort, coloured through red, blue and green as it crosses 100%. |
| Board KPI page | Six tiles with sparklines, on the dark ground, framed as page 2 of a board pack. |
| Close calendar | The monthly close as a Gantt, colour-split by who owns each task. |
| Payback curve | Cumulative gross profit crossing fully loaded CAC, with the payback month marked. |

`Artifact` wraps each one in document chrome so they read as pages from a
deliverable rather than decoration; `ArtifactStack` overlaps two of them on the
home page.

---

## Before this goes live

This is a **design demonstration**. Everything below needs real work first.

- [ ] **Replace all placeholder content.** Every name, biography, statistic,
      address, phone number, holding, testimonial and performance figure in
      `src/lib/site.ts` and `src/lib/portal.ts` is invented. The site says so in
      the footer, on `/disclosures` and across the portal — remove those notices
      only once real content is in.
- [ ] **Wire up the contact form.** `src/components/ContactForm.tsx` validates in
      the browser and shows a confirmation; it posts nowhere. Point it at a
      server action or endpoint, and add spam protection.
- [ ] **Build a real dashboard.** `/portal` is static markup with no
      authentication, no accounting-system connection and no data. It is a
      visual reference, not a foundation.
- [ ] **Legal review.** ArthIQ is positioned as a consulting firm, not a
      registered investment adviser, so the SEC marketing rules that govern an
      RIA do not apply — but the testimonials, the fee figures and the tools all
      still want a lawyer's eye. The disclosure text here is illustrative
      drafting, not legal advice.
- [ ] **Add real portraits.** The team grid currently uses initials plates.
- [ ] Set the production domain in `site.url` (`src/lib/site.ts`) so canonical
      and Open Graph URLs resolve, and add an OG image.
