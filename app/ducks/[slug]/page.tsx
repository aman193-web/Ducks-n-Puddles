import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Drop, SealCheck, ShieldCheck, Sparkle, Leaf, Hand, Baby, Swap }
  from '@phosphor-icons/react/dist/ssr'
import { Picture } from '@/components/Picture'
import { BottleViewer } from '@/components/BottleViewer'
import { SongPlayer } from '@/components/SongPlayer'
import { Motif } from '@/components/Motif'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { Sticker } from '@/components/ui/Sticker'
import { PuddleShape } from '@/components/ui/PuddleShape'
import { SpeechBubble } from '@/components/ui/SpeechBubble'
import { WaveEdge } from '@/components/ui/WaveEdge'
import { CardTilt } from '@/components/CardTilt'
import { DuckPageMotion } from './DuckPageMotion'
import { HeroSpin } from './HeroSpin'
import {
  ducks, duckBySlug, confirmedSpecs, specsFootnote, productPuddle, puddle,
  personalization, brand, SNACK_CLAIMS_APPROVED,
} from '@/content/brand'
import styles from './duck.module.css'

/* Content slug -> asset stem. The ducks are `chi-chi` in content and `chichi`
   in the manifest; the same adapter Hero, Store and DuckStage already carry. */
const assetFor = (slug: string) => (slug === 'chi-chi' ? 'chichi' : slug)

const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: 'regular' }>> = {
  puddle: Swap, capacity: Drop, lid: SealCheck, spill: ShieldCheck,
  clean: Sparkle, bpa: Leaf, grip: Hand, age: Baby,
}

/* The pose each duck strikes beside its Puddle. All three face right, toward
   it, and all three are the liveliest pose that character has — Vincey's wink
   is the calm one's version of a cheer. */
const PUDDLE_POSE: Record<string, string> = { vincey: 'wink', 'chi-chi': 'wave', goosey: 'cheer' }

/* The duck's own decal motif — droplets, flower, footprint, as printed on the
   bottle — scattered in the hero's margins. Percentages of the hero box,
   clear of both columns at every width the scatter shows at (900 up). */
/* `d` is the parallax depth: bigger marks are nearer and travel further, so
   the scatter reads as layered water rather than as a flat sticker sheet. */
const SCATTER = [
  { x: 2.5, y: 14, s: 34, r: -14, d: 0.85 },
  { x: 5.5, y: 70, s: 24, r: 10, d: 0.5 },
  { x: 47, y: 7, s: 20, r: 12, d: 0.35 },
  { x: 94, y: 10, s: 30, r: 16, d: 0.75 },
  { x: 96.5, y: 58, s: 22, r: -8, d: 0.45 },
  { x: 91, y: 86, s: 26, r: 6, d: 0.6 },
]

/* THE 360° BOTTLES, by duck — the client's own three.js exports, served from
   public/3d exactly as delivered. Only Chi Chi's exists so far (the model is
   her pink body in the blue Puddle); a duck with an entry here gets the
   Classic / 360° switch in its hero, and adding the other two is one line each
   once their models arrive. */
const SPIN_MODELS: Record<string, string> = {
  'chi-chi': '/3d/chichi-bottle.html',
}

/* Each duck's song, from the client (Oct 2026). Content-hashed names, because
   /media is served immutable for a year — a new mix gets a new name rather
   than hiding behind the old one in every visitor's cache. */
const SONGS: Record<string, string> = {
  vincey: '/media/audio/vincey-song-521b077f.mp3',
  'chi-chi': '/media/audio/chi-chi-song-7c402e23.mp3',
  goosey: '/media/audio/goosey-song-8336c996.mp3',
}

export function generateStaticParams() {
  return ducks.map((d) => ({ slug: d.slug }))
}

/* `params` is a Promise in this version of Next — it has to be awaited in both
   the page and generateMetadata. */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const d = duckBySlug(slug)
  if (!d) return {}
  return {
    title: `${d.name} — ${d.role}`,
    description: d.personality,
    alternates: { canonical: `/ducks/${d.slug}` },
    openGraph: {
      type: 'website',
      title: `${d.name} | ${brand.name}`,
      description: d.personality,
      url: `${brand.domain}/ducks/${d.slug}`,
    },
  }
}

/**
 * ONE BOTTLE, ONE PAGE — designed as that duck's own corner of the site.
 *
 * Section 4 of the client's October 2026 brief asks for the Puddle and the
 * personalisation preview on "all three water bottle product pages". There
 * were none — every "Explore Vincey" button went to the waitlist. These are
 * them, and the second version of them.
 *
 * THE FIRST VERSION WAS A TEMPLATE WITH A NAME IN IT. Pale field, a modest
 * duck, a strip about the Puddle, a spec grid under a heading I wrote, and
 * thumbnail bottles for the other two. Nothing on it could not have been on a
 * page for any product. This one is built from what only this duck has:
 *
 *   - the hero is the duck's SOFT colour, the same ground as its panel in Meet
 *     the Ducks, so clicking through feels like stepping into that panel;
 *   - its decal motif — droplets, flower or footprint, off the real bottle —
 *     is scattered in the margins of that hero;
 *   - the bottle turns round. The backs show all three ducks and the tagline
 *     and had never been used anywhere;
 *   - the duck stands beside its own Puddle, as Goosey does on the homepage;
 *   - the others are met as CHARACTERS, not as bottle thumbnails.
 *
 * ⚠️ ONE CORRECTION carried in from the first version: the Puddle was drawn in
 * each duck's colour — pink for Chi Chi, yellow for Goosey. The renders say
 * otherwise. The sleeve is the SAME BLUE on all three bottles; only the body
 * changes colour. A pink Puddle on Chi Chi's page was a picture of a product
 * that does not exist, and the brief's "only introduce name personalization"
 * means colour choice must not be implied either. Blue everywhere now.
 *
 * WHAT IT IS NOT: a shop. Nothing is priced, there is no cart, and the one
 * control is the waitlist, carrying ?duck= so the chosen character arrives
 * with the subscriber.
 *
 * ⚠️ The snack half is gated on SNACK_CLAIMS_APPROVED, as everywhere else.
 */
export default async function DuckPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const d = duckBySlug(slug)
  if (!d) notFound()

  const stem = assetFor(d.slug)
  const others = ducks.filter((o) => o.slug !== d.slug)
  const vars = {
    ['--duck' as string]: d.colour,
    ['--duck-soft' as string]: d.soft,
    ['--duck-field' as string]: d.field,
    ['--duck-ink' as string]: d.ink,
  } as React.CSSProperties

  /* THE SLEEVE'S REAL COLOUR — the blue on all three renders. It shares a hex
     with Vincey, which is a coincidence of the palette, not a reference to
     him; it is the same on Chi Chi's and Goosey's pages. */
  const SLEEVE = 'var(--vincey)'

  return (
    <div style={vars} data-duck-page="">
      {/* ==== 1. THE DUCK ================================================== */}
      <section className={styles.hero} aria-labelledby="duck-title" data-duck-hero="">
        <span className={styles.scatter} aria-hidden="true" data-scatter="">
          {SCATTER.map((m, i) => (
            <span
              key={i}
              className={`${styles.mark} ${styles.introMark}`}
              data-depth={m.d}
              style={{
                left: `${m.x}%`, top: `${m.y}%`, rotate: `${m.r}deg`,
                ['--i' as string]: i,
              } as React.CSSProperties}
            >
              <Motif name={d.motif} size={m.s} />
            </span>
          ))}
        </span>

        <div className={`wrap ${styles.heroInner}`}>
          {/* TWO GROUPS IN ONE COLUMN. In the normal hero they stack exactly as
              the single column did — the gap between them is the gap inside
              them. They exist for the 360° view, which sends the first to the
              left of the bottle and the second to the right. */}
          <div className={styles.say}>
            <div className={styles.sayMain} data-hero-main="">
            {/* THE ARRIVAL — CSS, in this order, by --i. See "the arrival" in
                duck.module.css for why this one entrance is not GSAP. The role
                sticker is NOT [data-pop] here: it is above the fold, and two
                systems on one element is how things end up stuck half-in. */}
            <Link href="/#store" className={`${styles.back} ${styles.intro}`} style={{ ['--i' as string]: 0 } as React.CSSProperties}>&larr; All three bottles</Link>
            <Sticker colour="var(--cream)" className={styles.introPop} style={{ ['--i' as string]: 1 } as React.CSSProperties}>{d.role}</Sticker>
            <h1 id="duck-title" className={`d ${styles.name} ${styles.intro}`} style={{ ['--i' as string]: 2 } as React.CSSProperties}>{d.name}</h1>
            <p className={`${styles.core} ${styles.intro}`} style={{ ['--i' as string]: 3 } as React.CSSProperties}>{d.core}</p>
            <p className={`${styles.personality} ${styles.intro}`} style={{ ['--i' as string]: 4 } as React.CSSProperties}>{d.personality}</p>
            </div>

            <div className={styles.sayMore} data-hero-more="">
            {/* What this duck teaches, off the character sheet — each with the
                duck's own decal glyph in front of it, so the list is visibly
                THIS duck's rather than generic tags. */}
            <ul className={styles.teaches} aria-label={`What ${d.name} helps little ones with`}>
              {d.teaches.map((t, i) => (
                <li key={t} className={styles.introPop} style={{ ['--i' as string]: 5 + i * 0.6 } as React.CSSProperties}>
                  <span className={styles.teachMark} aria-hidden="true"><Motif name={d.motif} size={14} /></span>
                  {t}
                </li>
              ))}
            </ul>

            <div className={`${styles.heroBtns} ${styles.intro}`} style={{ ['--i' as string]: 8 } as React.CSSProperties}>
              {/* QUERY BEFORE THE FRAGMENT. `/#squad?duck=x` makes the browser
                  look for an element with id="squad?duck=x" — it matches
                  nothing and the click scrolls nowhere. */}
              <Btn href={`/?duck=${d.slug}#squad`} colour="var(--sun-soft)">
                Join the waitlist
              </Btn>
              <p className={styles.note}>
                The store isn&rsquo;t open yet &mdash; the Duck Squad hears first.
              </p>
            </div>
            </div>
          </div>

          {/* THE CHARACTER AND THE BOTTLE, on one floor. The bubble rises off
              the duck, as it does in Meet the Ducks. */}
          {/* data-depth: the pointer parallax, nearest first — the duck, then
              the bottle, then the floor they stand on barely moving at all. */}
          <div className={styles.figure} data-hero-figure="">
            <span className={`${styles.floor} ${styles.introGrow}`} aria-hidden="true" data-depth="0.06" />
            <div className={`${styles.character} ${styles.introRise}`} data-depth="0.22" data-hero-character="">
              <SpeechBubble message={d.message} className={styles.bubble} />
              {/* speak: click and it quacks — the same as in Meet the Ducks. */}
              <Duck
                who={d.slug} pose="idle" density="always" float speak
                sizes="(min-width: 900px) 20vw, 42vw"
                alt={d.name}
              />
            </div>
            {/* The duck's song, under the duck and level with Front / Back —
                it shares the character's cell and fills the strip the
                character already leaves clear for that row. */}
            {SONGS[d.slug] && (
              <SongPlayer src={SONGS[d.slug]} title={`${d.name} Song`} className={styles.player} />
            )}
            {/* A wrapper for the parallax, so `translate` here never touches
                the stage the turn rotates. */}
            <div className={`${styles.bottle} ${styles.introSlide}`} data-depth="0.12">
            <BottleViewer
              name={d.name}
              front={<Picture id={stem} sizes="(min-width: 900px) 170px, 26vw" alt={`The ${d.name} bottle, front`} priority />}
              back={<Picture id={`${stem}-back`} sizes="(min-width: 900px) 170px, 26vw" alt={`The ${d.name} bottle, back: all three ducks and “A Friend for Every Adventure” printed on the Puddle`} />}
            />
            </div>
          </div>

          {SPIN_MODELS[d.slug] && <HeroSpin src={SPIN_MODELS[d.slug]} name={d.name} />}
        </div>
      </section>

      <WaveEdge above={d.soft} fill="var(--cream)" />

      {/* ==== 2. THE PUDDLE =============================================== */}
      <section className={styles.puddle} aria-labelledby="puddle-title">
        <div className={`wrap ${styles.puddleInner}`}>
          <div className={styles.puddleSay}>
            {/* The client's own title for the Puddle, from their brief — the
                same eyebrow the homepage section carries. */}
            <Sticker data-pop="">{puddle.eyebrow}</Sticker>
            <h2 id="puddle-title" className={`d ${styles.h2}`} data-anim="">
              {SNACK_CLAIMS_APPROVED ? productPuddle.title : productPuddle.sleeveOnlyTitle}
            </h2>
            <p className={styles.lead} data-anim="">
              {SNACK_CLAIMS_APPROVED ? productPuddle.body : productPuddle.sleeveOnlyBody}
            </p>
            <Link href="/#puddle" className={styles.textLink} data-anim="">
              See how the Puddle works &rarr;
            </Link>
          </div>

          {/* The duck beside its own Puddle — the device the homepage uses with
              Goosey, given to every duck on its own page. */}
          {/* DuckPageMotion fills this: the Puddle drops in, the duck steps up,
              the snacks land one at a time. The duck is WRAPPED because the
              Duck's own float is a CSS animation on its element, and a running
              animation beats an inline style — a GSAP entrance on the same
              element would be silently overridden. */}
          <div className={styles.puddleArt} data-puddle-art="">
            <span className={styles.puddleFloor} aria-hidden="true" data-puddle-floor="" />
            <span className={styles.snacker} data-puddle-duck="">
              <Duck
                who={d.slug} pose={PUDDLE_POSE[d.slug] ?? 'idle'} density="always" float
                sizes="(min-width: 900px) 200px, 34vw"
                alt=""
              />
            </span>
            {/* The client's render when the snack claim is approved; the
                plain drawn sleeve when it is not, because the photo IS the
                snack claim. */}
            {SNACK_CLAIMS_APPROVED ? (
              <span className={styles.puddlePhoto} data-puddle-shape="">
                <Picture
                  id="puddle-snacks"
                  sizes="(min-width: 900px) 216px, 36vw"
                  alt={`${d.name}’s silicone Puddle taken off the bottle and filled with snacks.`}
                />
              </span>
            ) : (
              <span className={styles.puddleShape} data-puddle-shape="">
                <PuddleShape
                  colour={SLEEVE}
                  alt={`Illustration: ${d.name}’s silicone Puddle taken off the bottle.`}
                />
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ==== 3. THE DETAILS ============================================== */}
      <section className={styles.specs} aria-labelledby="specs-title">
        <div className="wrap">
          {/* The client's own heading and lead for this list, from the
              homepage section that carries it — not a heading of mine. */}
          <div className={styles.specsHead}>
            <Sticker data-pop="">The details</Sticker>
            <h2 id="specs-title" className={`d ${styles.h2}`} data-anim="">Made with parents in mind.</h2>
            <p className={styles.lead} data-anim="">
              Thoughtful, practical details designed for little hands and busy parents
              &mdash; making everyday adventures a little easier.
            </p>
          </div>

          {/* The same confirmedSpecs the homepage grid renders, so a fact can
              never be true in one place and different in the other. */}
          {/* data-tilt-grid / data-tilt: CardTilt's lean toward the pointer, as on
              the homepage's grid of the same facts. */}
          <dl className={styles.specsGrid} data-tilt-grid="">
            {confirmedSpecs.map((s, i) => {
              const Icon = ICONS[s.key] ?? Drop
              return (
                <div key={s.key} className={`${styles.spec} ${i === 0 ? styles.specKey1 : ''}`}
                     data-tilt="" data-anim="" data-anim-y="24">
                  <span className={styles.specIcon} aria-hidden="true">
                    <Icon size={20} weight="regular" />
                  </span>
                  <dt className={styles.specLabel}>{s.label}</dt>
                  <dd className={styles.specValue}>{s.value}</dd>
                </div>
              )
            })}
          </dl>
          <p className={styles.footnote}>{specsFootnote}</p>

          {/* ==== 4. PERSONALISATION ======================================
              "Include a small 'Personalization Coming Soon' message below the
              product description." Small, and nothing in it but a link to the
              newsletter — no control, per their instruction. */}
          <aside className={styles.personal} aria-labelledby="personal-title" data-anim="">
            {/* The Puddle breaks out of the top of the panel — the same
                frame-breaking device as the cards below, so the one picture in
                the box is the first thing read. `wiggle`
                is the site's idle nudge, about its resting tilt (--rest). */}
            <span className={styles.personalArt}>
              <span className={`${styles.personalPic} wiggle`}>
                <Picture
                  id="puddle-lucy"
                  sizes="(min-width: 900px) 220px, 170px"
                  alt={`Concept image: a blue silicone Puddle with the name ${personalization.sampleName} on it`}
                />
              </span>
            </span>
            <span className={`${styles.personalMark} ${styles.personalMark1}`} aria-hidden="true">
              <Motif name="droplets" size={30} />
            </span>
            <span className={`${styles.personalMark} ${styles.personalMark2}`} aria-hidden="true">
              <Motif name="splash" size={26} />
            </span>

            <div className={styles.personalSay}>
              <span className={styles.chip}>{personalization.status}</span>
              <p id="personal-title" className={`d ${styles.personalTitle}`}>{productPuddle.personalTitle}</p>
              <p className={styles.personalBody}>{productPuddle.personalBody}</p>
            </div>
            <div className={styles.personalCta}>
              <Btn href="/#newsletter" colour="var(--sun-soft)">Be the first to know</Btn>
            </div>
          </aside>
        </div>
      </section>

      {/* ==== 5. THE OTHER TWO ============================================ */}
      <section className={styles.more} aria-labelledby="more-title">
        <div className="wrap">
          <h2 id="more-title" className={`d ${styles.h2} ${styles.moreTitle}`} data-anim="">Meet the others.</h2>
          <ul className={styles.moreList}>
            {others.map((o) => (
              <li key={o.slug} data-anim="" data-anim-y="32">
                <Link
                  href={`/ducks/${o.slug}`}
                  className={styles.moreCard}
                  data-peek-card=""
                  style={{ ['--card' as string]: o.soft } as React.CSSProperties}
                >
                  <span className={styles.moreSay}>
                    <span className={styles.moreRole}>{o.role}</span>
                    <span className={`d ${styles.moreName}`}>{o.name}</span>
                    <span className={styles.moreMessage}>&ldquo;{o.message}&rdquo;</span>
                    <span className={styles.moreGo}>Meet {o.name} &rarr;</span>
                  </span>
                  <span className={styles.moreArt} data-peek-art="">
                    <Duck who={o.slug} pose="idle" density="always" sizes="(min-width: 700px) 180px, 34vw" alt="" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==== 6. THE SEND-OFF ==============================================
          The blue band the footer's wave paints itself against — a page that
          ends on cream leaves a stripe across the seam. The duck's own line
          heads it. */}
      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle} data-anim="">{d.saying}</h2>
          <p className={styles.closeBlurb} data-anim="">
            {d.name} is waiting for a little one to call their own. Join the Duck
            Squad and hear the moment the bottles are ready.
          </p>
          <div data-anim="">
            <Btn href={`/?duck=${d.slug}#squad`} colour="var(--sun-soft)">
              Join the Duck Squad
            </Btn>
          </div>
        </div>
      </section>

      {/* The page's own motion and the pointer lean — both mounted with the
          page, so both run again on every client-side visit. */}
      <CardTilt />
      <DuckPageMotion />
    </div>
  )
}
