# Bringing Chi Chi, Goosey and Vincey into the site

> **Status: specification. Nothing here is built yet** — deliberately. The client
> does not want PNGs dropped onto the page, and the illustrator is producing a
> proper pose set. This is the brief for that set, and the architecture that will
> accept it.
>
> Source: *Website Revisions – Sep 17 2026* and *Character Sheet 2*.

---

## The problem this solves

The client's longest note is about the characters:

> "We really want the illustrated/animated versions of Chi Chi, Goosey and Vincey
> from the books to be incorporated throughout the website… We want children to
> begin recognizing and connecting with the actual characters from the books and
> feel like they are entering the Ducks 'n Puddles world when they visit the site."

And then, separately, how:

> "…whether that means having them pop up in different sections, interacting with
> certain elements, appearing alongside products, splashing through puddles,
> peeking into sections, etc. We want them to feel integrated into the experience
> rather than confined to just the 'Meet the Ducks' section."

### What exists today

The site has **zero illustrated character assets.** Right now the three ducks are
distinguished only by a colour token, a name sticker and a printed motif. The
only duck illustration anywhere is `mascot-140/280.webp` — the yellow chick
lifted out of the logo — hard-coded as a plain `<img>` in three places
(`Story.tsx`, `ScrollDuck.tsx`, `SiteFooter.tsx`).

`Character Sheet 2.pdf` holds **one pose per duck** (≈1140×1380, painted, on
white). One pose is enough to introduce a character. It is not enough to make one
live in a website.

---

## 1. Illustrator brief — the pose set

Per duck (Chi Chi, Goosey, Vincey), transparent background, and — this is the
part that matters most — **consistent scale and eye-line across every pose**, so
any pose can be swapped into any slot without re-tuning the layout.

| Pose | What it is | Used for |
|---|---|---|
| `idle` | standing, the character-sheet pose | the default, everywhere |
| `wave` | one wing raised | greetings, form success |
| `peek` | upper body only, as if looking over an edge | peeking over section edges and wave crests |
| `splash` | mid-jump or landing in a puddle | scroll moments |
| `rest` | sitting, settled | quiet sections |
| `eyes-closed` | **eye layer only**, separate transparent overlay | blinking |

**Deliver:** 2× (≈1400px tall) PNG with alpha, plus source vector if it exists.
**15 poses + 3 eye overlays.**

The `eyes-closed` overlay is the cheapest magic in the whole list: one small
transparent layer per duck, swapped on a long irregular interval, and the
characters stop being pictures.

---

## 2. Pipeline — no new machinery

The art routes through the pipeline the bottle renders already use. Nothing new
gets built to support it:

1. Add each pose as an `alphaAssets` entry in `scripts/lib/manifest.mjs`
2. `npm run assets:images` emits AVIF/WebP at clamped widths into
   `lib/asset-manifest.json`
3. `<Picture>` renders them

Asset ids follow the existing convention: `chichi-idle`, `goosey-peek`,
`vincey-splash`, and so on.

---

## 3. A `<Duck>` component, not placements

```tsx
<Duck who="chi-chi" pose="peek" anchor="edge-top-right"
      behaviour="peek-on-enter" density="always" />
```

This is the difference between "characters living in the site" and "PNGs placed
on the website", and it is worth insisting on for three reasons:

- the behaviours stay consistent everywhere, instead of each placement inventing
  its own
- mobile density is controlled from **one** place, not audited section by section
- when the client asks for a duck in a new section, it is one line

### Behaviours, all built from what is already there

The site has a documented **transform-channel discipline** (see `README.md` and
`Hero.module.css`): `translate` is pointer parallax, `transform` is CSS entrances
and drift, GSAP owns bob and scrub. Every behaviour below obeys it and reuses an
existing primitive rather than adding a system.

| Behaviour | Built from |
|---|---|
| `peek-on-enter` | a CSS keyframe + the existing `ScrollTrigger.batch` in `lib/motion.ts` |
| `waddle-across` | the existing `ScrollDuck.tsx` pattern — scrubbed x, waddle on an inner wrapper |
| `bob` | the existing `[data-bob]` helper in `lib/motion.ts` |
| `splash-on-enter` | the hero's ripple-ring approach in `Hero.module.css` |
| `blink` | swap the `eyes-closed` overlay on a long, irregular interval |

---

## 4. Where they go

| Where | Who | The moment |
|---|---|---|
| Hero pond | all three | illustrated, bobbing out of phase, **in the water with their bottles** |
| Wave edges | rotating | peek over the crest as you scroll past |
| **The range cards** | the matching duck | **stands beside its own bottle** |
| Why | Vincey + Chi Chi | one per audience column, to make the two sides characters rather than headings |
| Features | Goosey | small, resting at a corner |
| Our Story | Chi Chi | splashing in a puddle beside the family photo |
| **Foundation** | all three | together in one puddle — the space is already reserved |
| Everyday life | Vincey | peeking into the reels rail |
| Footer | all three | characters alongside the cropped bottles already there |
| Form success | all three | celebrating |
| `ScrollDuck` | rotating | replaces the generic logo mascot with the real characters |

Two of these carry most of the client's intent:

**The range cards** are where "the Vincey bottle is *their* Vincey" stops being a
sentence and becomes a picture. The character stands beside its own product. The
copy already says it; the art is what proves it.

**The Foundation** already has the space cleared for all three in one puddle. The
section's headline is "There's always room in the puddle." The picture is the
argument.

---

## 5. The "that's MY duck" interaction

The client's stated goal:

> "Ultimately, we want kids to see the characters and feel like 'That's MY duck.'"

Tap or click any duck → a speech bubble with its own saying, plus its quack
through the existing opt-in sound system (`lib/sound.ts`, which already plays the
double "quack quack"):

- **Chi Chi** → "Let's do it!"
- **Goosey** → "There's always room for one more friend!"
- **Vincey** → "Take your time. I'll be right here."

All three sayings are already in `content/brand.ts` as `duck.saying`, verbatim
from the character sheet. The interaction is wiring, not writing.

---

## 6. Discipline — what stops this becoming noise

This is the part that decides whether the result feels magical or cluttered, and
it is easier to agree now than to claw back later:

- **Never more than one cameo per viewport height.**
- Cameos are `aria-hidden` and `pointer-events: none` unless they are interactive.
- The `density` prop gates mobile: only the hero, the range cards, the Foundation
  and the footer render on a phone, so scroll length and clutter stay controlled.
  The client specifically asked that mobile feel "just as intentional and
  magical" — that means fewer, better-placed characters, not the same ones
  squeezed in.
- Cameos never overlap text.
- All cameo motion is off under `prefers-reduced-motion` — already enforced
  globally, and it will apply to these for free.

---

## 7. Subtle brand elements

Requested separately: puddles, splashes, footprints, feathers, duck silhouettes,
used *subtly* rather than as heavy graphic elements.

These reuse `components/Motif.tsx` (droplets / flower / footprint — the marks
actually printed on the bottles) and `components/ui/Splash.tsx`. No new graphic
system. The Foundation section and the ribbon already use them this way, so the
pattern is set and can simply be extended.

---

## Open questions for the client

1. **"Quack Pack"** — the character sheet is titled *Meet the Quack Pack*, and the
   roadmap uses *The Quack Pack* for the book series. Is it both the collective
   name for the three ducks and the name of the books? The site currently assumes
   yes and uses it as the collective name on Meet the Ducks.
2. **The Foundation's actual commitment** — who it gives to, in what form, and how
   much. Until that arrives the section ships as intent only, which is a
   deliberate choice, not a placeholder to be filled in with a guess.
3. **The four testimonial names** in `content/brand.ts` are invented and the
   Reviews section is held out of the page because of it. Real quotes put it back
   in one line.
