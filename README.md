# Ducks ’n Puddles

Brand site for a character-led children’s water-bottle range — **Vincey**, **Chi Chi**
and **Goosey** — made by two parents in South Florida.

The products are **not in production yet**, so the site’s job is brand building and
waitlist capture (“Join the Duck Squad”), not checkout. Pre-launch messaging appears
in exactly two places: the hero chip and the signup sections. Everywhere else the page
sells the product the way any brand with stock on the shelf would.

Replaces the Elementor one-pager currently at <https://ducksnpuddles.com>.

---

## Quick start

```bash
npm install
npm run dev            # http://localhost:3000
```

No environment variables are needed to run locally — the subscribe endpoint falls back
to a `console` provider that logs and succeeds, so the form is live on day one.

| Requirement | Version |
| --- | --- |
| Node | **≥ 20.9** (built on 24.x) |
| npm | 10+ |

`sharp` and `ffmpeg-static` ship prebuilt binaries; nothing needs Homebrew or a system
ffmpeg install.

---

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build — also runs the TypeScript check |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets:images` | Regenerate image derivatives + `lib/asset-manifest.json` |
| `npm run assets:video` | Transcode the source videos |

Both asset scripts are **incremental** — they skip any derivative that already exists,
so re-running them is cheap.

> ⚠️ `npm run lint`, `assets:verify`, `assets:gate` and `assets:all` are currently
> broken. See [Known issues](#known-issues).

---

## Technology

### Frontend

| | |
| --- | --- |
| Framework | **Next.js 16.3.5**, App Router |
| UI | **React 19.3**, **TypeScript 5.9** |
| Styling | **Vanilla CSS** — custom properties + CSS Modules |
| Animation | **GSAP 3.15** + ScrollTrigger, **Lenis 1.3** smooth scroll |
| Icons | **@phosphor-icons/react**, imported from `/dist/ssr` |
| Fonts | Excon (self-hosted variable woff2) + Poppins / DM Mono / Edu QLD Beginner via `next/font/google` |

**There is no Tailwind, and that is deliberate.** A Tailwind-default look is precisely
what the brief was reacting against, and the design is token-driven anyway. The entire
system lives in `styles/tokens.css`.

### Backend

There is no separate backend service. The “backend” is two things:

1. **One Next.js Route Handler** — `app/api/subscribe/route.ts` (Node runtime).
2. **Build-time Node scripts** that generate every image and video the site serves.

| | |
| --- | --- |
| Validation | **zod 4** (`lib/subscribe-schema.ts`) |
| Email provider | Pluggable adapter — `mailchimp` / `resend` / `customerio` / `webhook` / `console` |
| Spam defence | Honeypot field + submit time-trap + in-memory IP rate limit |
| Images | **sharp 0.35** |
| Video | **ffmpeg-static 5.3** + **ffprobe-static** |

### Hosting

Built for **Vercel**. Everything except `/api/subscribe` is static or SSG, so it also
deploys to any Node host with `next build && next start`.

---

## Architecture

### Server-first

Every section is a **React Server Component**. Only five things are client components,
each for a stated reason:

| Component | Why it must be client |
| --- | --- |
| `MotionProvider` | Arms scroll reveals and smooth scroll |
| `HeroScene` | Pointer parallax + the scroll-driven tide |
| `ScrollScenes` | The store card fan |
| `Squad` / `FooterSignup` | Form state |
| `MobileMenu` / `SoundToggle` / `HeaderChrome` | Interaction state |

Sections stay server-rendered because animations are driven from `ScrollScenes` off
`data-*` attributes, rather than by making the sections themselves interactive.

### Routes

```
/                       static      home
/journal                static      post index
/journal/[slug]         SSG         3 posts prerendered via generateStaticParams
/api/subscribe          dynamic     POST only
```

> **Next 16 note:** `params` is a **Promise** and must be awaited — in the page *and*
> in `generateMetadata`. This is a breaking change from earlier App Router versions.

### Directory map

```
app/
  layout.tsx              fonts, metadata, header/footer, motion providers
  page.tsx                the home page — section order lives here
  journal/                index + [slug] routes
  api/subscribe/route.ts  the only server endpoint
components/
  sections/               one folder-level component per homepage section
  ui/                     Btn, Pill, Marquee, Sticker, WaveEdge, ScrollDuck…
content/
  brand.ts                brand facts, ducks, specs, reviews, FAQs, reels
  journal.ts              post bodies
lib/
  motion.ts               reveal/bob/pop helpers + the IntersectionObserver failsafe
  smooth.ts               Lenis, wired to gsap.ticker
  wave.ts                 the measured brand wave geometry
  assets.ts               reads asset-manifest.json → srcset helpers
  providers/index.ts      the subscribe adapters
  subscribe-schema.ts     zod schema shared by client and route
scripts/
  build-images.mjs        sharp pipeline
  build-video.mjs         ffmpeg pipeline
  lib/manifest.mjs        which source files become which assets
styles/
  tokens.css              THE design system
  global.css              reset, type scale, utilities
media/                    brand source artwork (committed)
assets-source/            652 MB of camera masters — GITIGNORED
public/                   generated derivatives only (committed)
```

---

## How the page is composed

`app/page.tsx` is the whole running order. Sections are independent and reorderable:

```
Hero              full-window “pond window”
Marquee           rotated ribbon
DuckStage         three sticky character panels
Specs             #features — product features
WaveEdge          colour transition
Store             #store — the range
Story             #story — the founders
Marquee
InTheWild         #wild — reels rail
Reviews           #reviews
Journal           #journal
Newsletter        compact yellow CTA band
Faq               #faq
Squad             #squad — the full waitlist form
SiteFooter
```

### The hero

Not a 50/50 hero. It is one full-window panel holding a **place**: sky above the
waterline, water below, with the brand’s own measured wave as the surface and the three
product renders standing **between the wave’s body and its crest**, so the water passes
in front of them.

`--water` is the single number the composition hangs off — the waterline, the headline
baseline, the reflection origin and where the bottles stand all derive from it. It is
split into `--water-base` (per breakpoint, in CSS) minus `--tide` (driven by scroll in
JS), so neither side needs to know what the other did.

---

## The asset pipeline

**Nothing is processed at request time.** `public/` contains only generated output, and
it is committed so the site builds without the masters present.

```
assets-source/  (gitignored, 652 MB)      media/  (committed)
        │                                    │
        └──────────┬─────────────────────────┘
                   ▼
       scripts/build-images.mjs   →  public/img/*.{avif,webp,jpg}
       scripts/build-video.mjs    →  public/media/video/*.mp4
                   │
                   ▼
          lib/asset-manifest.json  ──→  lib/assets.ts  ──→  <Picture>
```

Three things worth knowing:

- **EXIF and GPS are stripped.** The photographs are of the founders’ young children;
  location metadata must never ship.
- **Video is transcoded for a reason.** The source clips are HEVC in a QuickTime `.MOV`.
  Safari plays them; Chrome and Firefox largely do not. The pipeline emits H.264 MP4 at
  1080 and 540 plus a poster JPEG.
- **`<Picture>` reads the manifest**, so width/height are always emitted and there is no
  layout shift.

To add an image or video, add an entry to `scripts/lib/manifest.mjs` and re-run the
relevant script.

---

## Environment variables

All optional. Create `.env.local`:

```bash
# console (default) | mailchimp | resend | customerio | webhook
SUBSCRIBE_PROVIDER=console

# if SUBSCRIBE_PROVIDER=mailchimp
MAILCHIMP_API_KEY=xxxxxxxx-us21     # the -usNN suffix selects the data centre
MAILCHIMP_LIST_ID=xxxxxxxxxx

# if SUBSCRIBE_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx

# if SUBSCRIBE_PROVIDER=webhook
SUBSCRIBE_WEBHOOK_URL=https://…
```

Switching providers needs no code change and no rebuild of anything but the env.
Mailchimp is wired for **double opt-in** (`status: 'pending'`) — a real consent record,
and it protects deliverability for a new sending domain.

### The subscribe flow

```
Squad / FooterSignup  →  POST /api/subscribe
                             │
                             ├─ IP rate limit    5 requests / 10 min → 429
                             ├─ zod validation                      → 400
                             ├─ honeypot `company` filled           → fake 200
                             ├─ submitted in < 3s                   → fake 200
                             └─ getProvider().subscribe()           → 200 / 502
```

The honeypot and time-trap both return a **fake success** so a bot learns nothing. The
zod schema deliberately does *not* constrain `company` — validating it to `max(0)` made
the request fail at the schema with a 400 naming the exact field, which teaches a bot to
leave it alone next time.

The rate limiter is an in-memory sliding window. Adequate for this traffic; swap for KV
if the site is ever deployed across multiple instances.

---

## Design system

Everything lives in `styles/tokens.css`. It was benchmarked against
[koakids.com.au](https://www.koakids.com.au) for spacing discipline.

```css
--gutter        clamp(24px, 7vw, 72px)      /* 26 · 28 · 55 · 72 · 72 */
--max           1280px
--section-y     clamp(72px, 7vw, 100px)     /* half the gap between sections */
--flow-eyebrow  eyebrow → heading
--flow-head     heading → lead paragraph
--flow-block    section head → its content
--card-pad      --card-gap
--btn-h  64px   --btn-h-sm  52px
--lh-display .86  --lh-xl .92  --lh-lg .96  --lh-md 1
```

**Rules that are load-bearing:**

- Every heading, lead and card grid shares **one content edge** at every breakpoint.
- One button height everywhere: 64px primary, 52px chrome.
- Brand colours are unchanged from the brand book. `--ink` (`#10264A`) passes AA on every
  ground **except Duck Blue (1.9)**, which is therefore a shape fill and border colour
  only — never a ground for text.
- Full-bleed rails (reels, reviews) still start on the page’s **content** edge, not the
  screen edge, using the `--edge` / `--edge-inset` calculation.

### Motion — the one rule to read before editing

Four motion systems run simultaneously in the hero. **Each element owns exactly one
transform channel.** Break this and the last writer silently wins:

| Channel | Owner |
| --- | --- |
| `translate` | pointer parallax (written from JS) |
| `transform` | one-shot CSS entrances, and the endless wave drift |
| GSAP tweens | buoyancy (`[data-bob]`) and the scroll tide |
| CSS custom props | `--tide`, scrubbed by ScrollTrigger |

**Nothing is hidden by CSS.** `lib/motion.ts` measures first and only sets a from-state
on elements that are actually below the fold, with an IntersectionObserver failsafe
behind the ScrollTrigger batch. A blanket `opacity: 0` rule is what previously left whole
sections blank when a trigger was missed.

`prefers-reduced-motion` is honoured throughout: the load curtain is removed, pins and
scrubs never initialise, and nothing is left invisible.

---

## Content and honesty guardrails

This is a children’s product. `content/brand.ts` encodes rules that must not be relaxed
without the client’s sign-off:

- **Only `confirmed` specs render.** 7 rows are `pending` — material, certification,
  insulation, dimensions, weight, origin, warranty — and are withheld rather than guessed.
- **“CDA certified” is never republished.** The live site claims it; no such children’s
  product standard exists. The intended claim is most likely CPSIA. It stays withheld
  until the manufacturer confirms.
- **No signup counters, countdowns or fake scarcity.**

### Outstanding client items

Grep for `TODO(client)`:

| File | Item |
| --- | --- |
| `content/brand.ts:175` | **⚠️ The four testimonial names are invented placeholders.** The quotes are the client’s own, carried from their live site where they carry no attribution. Replace with real first names before launch, or set `name: null` to hide the pill. |
| `content/brand.ts:22` | Contact address is a personal Gmail — wants a domain address |
| `content/journal.ts:9` | The three journal posts are drafts awaiting sign-off |

Also unresolved: model releases for the photographs and video stills showing identifiable
minors, and whether the production bottle ships with the carry ring and the name stickers
(the photographed samples and the canonical renders differ).

---

## Deployment

```bash
npm run build     # type-checks, prerenders, emits .next/
npm start
```

On Vercel: import the repo, set any provider env vars, deploy. The build needs no
system dependencies — `public/` is committed, so the asset scripts do **not** run in CI.

Point DNS at the host and away from the current Hostinger install. The live domain is
`ducksnpuddles.com`; `ducksandpuddles.com` has no DNS record.

---

## Known issues

| Issue | Detail |
| --- | --- |
| `npm run lint` fails | `next lint` was **removed in Next 16**. Needs replacing with a direct ESLint invocation and a flat config. |
| `npm run assets:verify` fails | `scripts/verify-assets.mjs` does not exist. |
| `npm run assets:gate` fails | `scripts/ffmpeg-gate.mjs` does not exist. |
| `npm run assets:all` fails | Chains the two missing scripts above. |

`dev`, `build`, `start`, `typecheck`, `assets:images` and `assets:video` all work.

---

## Verification checklist

Before shipping a change, confirm at **1440 / 1024 / 768 / 390 / 360**:

- [ ] `npm run build` passes with zero type errors
- [ ] No horizontal overflow (`scrollWidth === clientWidth`)
- [ ] Exactly one `<h1>` per page, correct heading order
- [ ] Nothing stuck at `opacity: 0` after a full scroll **and** after a cold jump to mid-page
- [ ] `prefers-reduced-motion: reduce` still renders a fully composed page
- [ ] Keyboard: nav, mobile menu (Escape closes), duck picker, and the form
- [ ] `POST /api/subscribe` — validation error, honeypot silence, rate limit, success
