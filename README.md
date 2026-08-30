# ArthIQ

Marketing site and dashboard mock-ups for **ArthIQ**, positioned as a financial
intelligence layer rather than an accounting firm: accounting, planning and
money management brought together, for a household and for the company its
owner runs. Three product lines — Personal, Business and FP&A — delivered by
people but presented like a product.

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
| **A** | A single asymmetric peak | Filled paths with snow fissures knocked out, so it holds as a solid silhouette at favicon size. |
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

- **Two surfaces** — the document is light (white and pale blue grounds, navy
  type); the product mock-ups are dark `.panel` surfaces that sit on top of it
  like screens. Charts live on the panels, so the five-hue `--color-viz-*` set
  is tuned for a dark ground first. `--color-gain` and `--color-loss` stay
  reserved for figures that carry a sign in the light document.
- **Charts** — all hand-authored SVG, no charting library. The hero is a tabbed
  dashboard (net worth and cash flow on one side, revenue against budget on the
  other); the product pages add cash flow, spend categories, goals, debt payoff,
  a P&L against plan and a three-scenario runway chart. Every series is
  generated deterministically at module scope so server and client agree.
- **Figures agree with each other.** The invented household on `/personal` is
  the one on the hero dashboard, and the category deltas are the ones the Ask
  ArthIQ example explains. The scenario chart uses the same $6.3M of cash and
  $332K base burn that the "what if revenue falls 10%" answer quotes. A reader
  who checks finds one company rather than a set of unrelated mock-ups.
- **Artwork** — `<Topography />` draws nested contour rings from fixed
  harmonics: an elevation map of the peak in the wordmark. No image requests.
- **Photography** — seven Unsplash images in `src/images/`, imported as modules
  so Next emits intrinsic dimensions and a blur placeholder (CLS stays at 0).
  See `ATTRIBUTION.md`.
- **Motion** — `<Reveal>` fades sections in on scroll, photographs settle from a
  slight scale, figures count up, and charts draw themselves with CSS dash and
  stagger animations. Everything is fully disabled under
  `prefers-reduced-motion: reduce`, verified in the browser rather than assumed.
- **Touch targets** — the `.tap` utility guarantees 44px on controls whose text
  box is smaller. Inline links inside prose are exempt, per WCAG 2.5.8.
- **Chart labels are HTML, not SVG.** Text inside a viewBox scales with the
  chart, so the same label renders at 6px in a two-column panel and 26px in a
  full-width one. Compensating per placement is a losing game when the panels
  are fluid, so the panel charts put their axis labels outside the SVG in an
  `<Axis>` grid that lines up with the bands. Thinned labels use `invisible`
  rather than `hidden`, or the surviving labels reflow and stop matching what
  they label.
- **The older `.chart` charts** (the six `/work` deliverables) still carry text
  inside the viewBox at fixed frame widths, and declare `--fs` and `--fs-sm` in
  their own user units; `.chart text` reads `--fs-sm` below 768px, and labels
  that would then collide carry `.dense`.
- **Horizontal scrollers are positioned.** `overflow` does not clip an
  absolutely positioned descendant unless the scroller is its containing block,
  so a `.sr-only` label inside a wide table used to extend the page itself and
  make the whole document swipe sideways. `.scroll-x` is `position: relative`
  for that reason.

---

## Structure

```
src/
├── app/
│   ├── page.tsx              Home (hero dashboard, lines, Ask ArthIQ, pricing)
│   ├── personal/             Budgeting, cash flow, net worth, goals, debt
│   ├── business/             Accounting, close, reporting, variance, KPIs
│   ├── fpa/                  Planning, scenarios, the model, vs. hiring
│   ├── pricing/             Three plans and the full comparison
│   ├── work/                 Six deliverable examples
│   ├── about/                Story, team, principles, process, the mark
│   ├── insights/             Index + [slug] article pages
│   ├── contact/              Booking form
│   ├── portal/               Client dashboard mockup
│   ├── disclosures/          What we are, security, privacy, the limits
│   ├── globals.css           Design tokens, base, components, motion
│   └── icon.svg              Favicon
├── components/
│   ├── product/              Dark panels: dashboard, Ask ArthIQ, line pages
│   ├── showcase/             Frame + the six work examples
│   └── …                     Logo, header, footer, form, primitives
└── lib/
    ├── site.ts               Company copy: nav, team, process, FAQ, articles
    ├── lines.ts              The three product lines, pricing, Ask ArthIQ
    └── portal.ts             Portal mock data
```

Content is separated from layout. Company copy — nav, stats, principles, team,
process, testimonials, FAQs, articles, disclosures — lives in `src/lib/site.ts`;
the three product lines, the plans and the Ask ArthIQ examples live in
`src/lib/lines.ts`. Nothing else needs editing to change what the site says.

---

## Measured

On a cold mobile visit (390px, throttling off), production build:

| | |
| --- | --- |
| Total transferred | 333 KB |
| — JavaScript | 157 KB |
| — fonts | 74 KB |
| — HTML | 56 KB |
| — RSC payload | 33 KB |
| — CSS | 13 KB |
| — images above the fold | under 1 KB |
| First Contentful Paint | ~235 ms |
| Cumulative Layout Shift | 0 |

The hero carries no photograph: it is the dashboard, which is SVG and markup.
Everything below the fold is lazy and served as WebP at the size each layout
actually paints.

Checked at 390, 768 and 1440px across twelve routes — home, the three product
lines, pricing, about, work, insights, an article, contact, portal and
disclosures: no horizontal overflow, no text under 10px, no touch target under
44px, and no chart label rendering below legible size.

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

## The model

`/model` is a live three-statement projection. Assumptions in; a P&L, a cash
flow and a balance sheet out, month by month, plus the SaaS metrics an investor
computes before the second meeting. It runs entirely in the browser — nothing
typed there is sent anywhere unless a signed-in visitor saves a scenario.

The engine is `src/lib/model.ts`, pure and deterministic. Two properties it
exists to hold:

- **The balance sheet balances.** Not approximately. Working-capital balances
  are computed first and the change in cash is derived from net income and
  those same deltas, so assets and liabilities-plus-equity move by identical
  amounts by algebra rather than by luck. The balance-sheet view draws the two
  sides as paired columns for exactly this reason: the check is visible.
- **It is honest about what it leaves out.** No depreciation, interest, tax or
  financing; net income equals EBITDA. Listed on the page, not buried.

```bash
npm run check:model
```

Runs `scripts/check-model.ts` over 400+ randomised assumption sets plus the
degenerate ones (zero revenue, zero churn, negative margin, no cash). It
asserts the balance sheet balances every month, the cash bridge explains the
change in cash exactly, the P&L ties, the revenue build ties, runway agrees
with the cash curve, scenarios stay ordered, nothing is NaN, and the projection
is deterministic. Worst observed relative imbalance is around 1e-12 — floating
point, nothing else.

Two modelling decisions worth knowing about, both made because the naive
version produces numbers that are wrong in a flattering direction:

- **S&M is a share of revenue, not a fixed monthly figure.** Holding it flat in
  dollars while revenue compounds makes acquisition look free: implied CAC
  falls every month and the magic number climbs past five. That is an artifact
  of the model, not a property of a business.
- **LTV caps the customer lifetime at five years.** A 0.5% monthly churn rate
  implies a seventeen-year customer, which nobody underwrites.

---

## Sign-in

Supabase, with email and password plus Google and Microsoft. The design
constraint is that **the site builds and deploys unchanged when it is not
configured** — the marketing site was live before auth existed and must not
depend on it.

- `src/lib/supabase/client.ts` exports `authConfigured`, read at module scope
  from the statically-inlined `NEXT_PUBLIC_*` values, so it is the same answer
  on the server and in the browser and cannot cause a hydration mismatch.
  Every accessor returns `null` when unset; nothing throws.
- With no env vars the sign-in page renders a "not configured" panel, the
  header shows no account controls at all, and the saved-scenarios card
  explains itself. Every route still prerenders statically.
- The OAuth exchange happens in the browser (`/auth/callback` is a client
  page), not in a route handler, which is what keeps the whole site static on
  Workers.

Set up:

1. Create a Supabase project. Copy the URL and anon key into Cloudflare under
   Workers & Pages → your Worker → Settings → Variables, as plaintext build
   variables. `NEXT_PUBLIC_*` is inlined at build time, so they must be set
   before the build, not at runtime. See `.env.example`.
2. Run `supabase/migrations/0001_scenarios.sql` in the SQL editor. It creates
   the `scenarios` table, enables row-level security **before** adding the
   policy, and adds a per-account row cap.
3. Enable the Google and Azure providers in Supabase Auth, and add
   `https://your-domain/auth/callback` to the allowed redirect URLs.

The anon key is public by design — it grants only what the row-level security
policies allow, which here is "your own rows and nobody else's".

---

## Deploying

The site runs on **Cloudflare Workers** via the OpenNext adapter. Not Vercel —
`vercel.json` is a leftover from an earlier detour and is not used.

### The trap

`wrangler deploy` does not deploy this project itself. It detects an OpenNext
project and hands off:

```
OpenNext project detected, calling `opennextjs-cloudflare deploy`
ERROR Could not find compiled Open Next config, did you run the build command?
```

That hand-off skips wrangler's own `build.command`, and
`opennextjs-cloudflare deploy` expects `.open-next/` to exist already. So the
build has to happen in the command that invokes the deploy.

`wrangler deploy --dry-run` does **not** hand off — it takes wrangler's normal
path. A dry run will therefore pass while the real deploy fails. Do not treat a
green dry run as proof.

### Settings

| Setting | Value |
| --- | --- |
| Deploy command | `npm run cf:deploy` |
| Build command | leave empty |

`cf:deploy` is `opennextjs-cloudflare build && opennextjs-cloudflare deploy` —
self-contained, so the repository controls the whole sequence and there is only
one setting to get right. (Setting the build command to `npm run cf:build` and
leaving the deploy command as `npx wrangler deploy` also works: the hand-off
then finds a populated `.open-next/`.)

Node is pinned in `.nvmrc` and `engines` so the builder cannot quietly pick a
version too old for Next 16.

### From your machine

```bash
npx wrangler login
npm run cf:preview   # the real Workers runtime, on localhost
npm run cf:deploy
```

### Three names must agree

The Worker in your Cloudflare account, `name` in `wrangler.jsonc`, and the
`service` under `WORKER_SELF_REFERENCE`. All three are `arthiq-finance-company`.
If they ever disagree:

```
Service binding 'WORKER_SELF_REFERENCE' references Worker '<x>' which was not found. [code: 10143]
```

Rename the Worker in Cloudflare and you must change `wrangler.jsonc` in the same
commit.

`wrangler.jsonc` and `open-next.config.ts` are committed for the same reason.
Without a committed config, `wrangler` runs the adapter's `migrate` wizard on
every build — non-interactively, auto-answering its own prompts and
regenerating a config from scratch. That is how the two names drifted apart in
the first place.

### Verifying before you push

`npm run cf:preview` runs your actual Worker on workerd with the assets
binding, rather than Next's own server. `next start` will happily serve pages
the Workers runtime would reject, so check there before a release. All twelve
routes, their content and the static assets were verified on that runtime.

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
- [ ] **Legal review.** The site claims read-only connections, no custody, no
      commissions, no data sale, and that ArthIQ is not a registered investment
      adviser or a licensed public accounting firm. Those are the load-bearing
      claims, and every one of them has to be true of the real operation before
      launch. Bookkeeping for clients, personal money management and anything
      resembling planning advice each bring their own regime. The disclosure
      text here is illustrative drafting, not legal advice.
- [ ] **Build Ask ArthIQ, or drop the claim.** The five example answers are
      hand-written over invented data. The site says an answer shows its
      sources; a real implementation has to actually do that, and has to be
      honest about being wrong.
- [ ] **Add real portraits.** The team grid currently uses initials plates.
- [ ] Set the production domain in `site.url` (`src/lib/site.ts`) so canonical
      and Open Graph URLs resolve, and add an OG image.
