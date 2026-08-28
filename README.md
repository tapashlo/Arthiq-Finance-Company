# Arthiq

Marketing site and client-portal mockup for **Arthiq**, a fee-only fiduciary
wealth manager in San Francisco.

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
| **A** | Himalayan peaks | A symmetric A whose apex carries a ridge notch and a shoulder summit. The counter stays open so the letter reads first and the mountain second. |
| **RTH** | A transit line over a market | An ascending polyline runs behind the three letters with station nodes landing in the gaps, above a faint rising column series. |
| **IQ** | A magnifying glass | The Q's bowl is the lens; its tail leaves the circle at 45° as a weighted, round-capped handle. |

Two lockups are exported:

- `<Wordmark />` — the full mark. Needs roughly 200px of width before the chart
  furniture reads; used large in the footer and on `/about#the-mark`.
- `<Wordmark simplified />` — letterforms only, for nav-scale placements where
  the line and nodes would fall below a pixel. Used in the site header.
- `<Monogram />` — the summit A alone, for avatars and tight spaces.
  `src/app/icon.svg` is the favicon built from the same geometry.

---

## Design system

Tokens live in `src/app/globals.css` under `@theme`.

- **Palette** — money green on warm cream. `--color-forest` through
  `--color-green-bright` carry the greens, `--color-cream`/`--color-paper` the
  grounds, with `--color-gold` and `--color-clay` used sparingly for accents and
  negative figures.
- **Type** — [Newsreader](https://fonts.google.com/specimen/Newsreader) for
  headlines *and* body; [Inter](https://fonts.google.com/specimen/Inter) only
  for small uppercase UI labels (`.label`) and tabular figures (`.tnum`). Both
  are self-hosted by `next/font`, so no external font request is made at runtime.
- **Texture** — `.grain` overlays an inline SVG noise field so large cream
  fields do not read as flat digital white.
- **Motion** — `<Reveal>` fades sections in on scroll; the hero and portal
  charts draw themselves with CSS dash animations. Everything is fully disabled
  under `prefers-reduced-motion: reduce`.

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
