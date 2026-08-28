# ArthIQ

Marketing site and client-portal mockup for **ArthIQ**, a fee-only fiduciary
wealth manager in San Francisco, serving households across the United States.

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
| **A** | Everest | An asymmetric filled peak — long left shoulder, steep right face, jagged snowline. The counter is knocked out with `evenodd`, not filled with a background colour, so the mark inverts cleanly on any ground. |
| **rth** | lowercase | Drawn clean. Candlesticks were tried *inside* the wordmark three ways and abandoned: at logo scale they read as coloured blocks stuck on letters, and they destroyed "rth". That language lives on the site instead, at a size where it reads as a chart. |
| **IQ** | uppercase, two lenses | The I is a bar passing through a small ring; the Q's bowl is the larger lens with its tail leaving the circle at 45° as the handle. |

The snowcap colour comes from `--logo-accent` (falling back to `currentColor`),
so it can be tuned per ground without forking the component.

Two lockups are exported:

- `<Wordmark />` — the full mark.
- `<Wordmark simplified />` — drops the I's lens ring, which fills in below
  roughly 120px of rendered width. Used in the site header.
- `<Monogram />` — the Everest A alone, for favicons and tight spaces.

Each instance takes an `id` prop: the clipPath id must be unique per inline SVG.

---

## Design system

Tokens live in `src/app/globals.css` under `@theme`.

- **Palette** — money green on warm cream, with red as a first-class market
  colour. `--color-gain` and `--color-loss` drive every chart: green for up
  periods, red for down, used at full strength rather than hidden. Grounds are
  `--color-cream`/`--color-paper`; `--color-gold` is a sparing accent.
- **Type** — [Newsreader](https://fonts.google.com/specimen/Newsreader) for
  headlines *and* body; [Inter](https://fonts.google.com/specimen/Inter) only
  for small uppercase UI labels (`.label`) and tabular figures (`.tnum`). Both
  are self-hosted by `next/font`, so no external font request is made at runtime.
- **Texture** — `.grain` overlays an inline SVG noise field so large cream
  fields do not read as flat digital white.
- **Charts** — all hand-authored SVG, no charting library. The hero is a
  candlestick chart with volume and a five-quarter moving average; the home page
  also carries a periodic-table-of-returns heatmap and a sparkline sheet, and
  the portal has a performance area chart and an allocation ring. Every series
  is generated deterministically at module scope so server and client agree.
- **Artwork** — `<Topography />` draws nested contour rings from fixed
  harmonics: an elevation map of the peak in the wordmark. No image requests.
- **Motion** — `<Reveal>` fades sections in on scroll; charts draw themselves
  with CSS dash and stagger animations. Everything is fully disabled under
  `prefers-reduced-motion: reduce`.

---

## Structure

```
src/
├── app/
│   ├── page.tsx              Home
│   ├── about/                Firm story, team, principles, process, the mark
│   ├── services/             Investment management · Retirement & tax planning
│   ├── insights/             Index + [slug] article pages
│   ├── contact/              Booking form
│   ├── portal/               Client portal mockup
│   ├── disclosures/          Regulatory, privacy, Form ADV
│   ├── globals.css           Design tokens, base, components, motion
│   └── icon.svg              Favicon
├── components/               Logo, header, footer, charts, form, primitives
└── lib/
    ├── site.ts               All marketing copy and data
    └── portal.ts             Portal mock data
```

Content is separated from layout: to change copy, services, team, FAQs or
articles, edit `src/lib/site.ts` and nothing else.

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
- [ ] **Build a real portal.** `/portal` is static markup with no
      authentication, no custodian connection and no data. It is a visual
      reference, not a foundation.
- [ ] **Compliance review.** Nothing here has been reviewed against SEC
      marketing rules. Testimonials, performance figures and hypothetical
      illustrations each carry their own disclosure requirements, and the
      disclosure text on this site is illustrative drafting, not legal advice.
- [ ] **Add real portraits.** The team grid currently uses initials plates.
- [ ] Set the production domain in `site.url` (`src/lib/site.ts`) so canonical
      and Open Graph URLs resolve, and add an OG image.
