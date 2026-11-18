import { Drop, SealCheck, ShieldCheck, Sparkle, Leaf, Hand, Baby, Swap }
  from '@phosphor-icons/react/dist/ssr'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Picture } from '@/components/Picture'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { confirmedSpecs, specsFootnote } from '@/content/brand'
import styles from './Specs.module.css'

/**
 * The product section. Benefit-led, not status-led.
 *
 * This used to open with "the bottles are not finished, so we are not going to
 * make claims about them" and close with a count of unconfirmed rows. That
 * framing belongs in exactly two places — the hero and the waitlist — and
 * everywhere else it was talking a reader out of the product before they had
 * seen it.
 *
 * What has NOT changed: only rows marked `confirmed` render. Material,
 * dimensions and the "CDA certified" claim on the current live site (no such
 * standard exists; the intended claim is most likely CPSIA) are still withheld
 * rather than guessed at. Dropping the pre-launch tone does not mean inventing
 * a spec.
 */
const ICONS: Record<string, React.ComponentType<{ size?: number; weight?: 'light' | 'regular' }>> = {
  capacity: Drop,
  lid: SealCheck,
  spill: ShieldCheck,
  clean: Sparkle,
  bpa: Leaf,
  grip: Hand,
  age: Baby,
  /* Two arrows trading places — the 2-in-1 Puddle is the one card here whose
     point is that the part becomes something else. */
  puddle: Swap,
}

/**
 * THE PICTURE BEHIND EACH CARD (Nov 2026). The client asked for the cards to
 * reveal an image on hover, product shots and lifestyle photographs both.
 *
 *   with a mouse      the picture wipes up over the card on hover, and the
 *                     card's label rides on it as a tag
 *   touch / narrow    nothing can hover, so the picture is simply THERE, at
 *                     the top of each card — and below 680 the cards become a
 *                     swipe rail, so eight pictures do not make the section
 *                     eight cards tall
 *
 * A product render (`product`) sits contained on a field; a photograph covers
 * the card and holds its subject by the `focal` in the asset manifest. The
 * photographs are the client's lifestyle set — see the note on them in
 * scripts/lib/manifest.mjs about the sample bottles in frame.
 */
const SHOTS: Record<string, { id: string; product?: true }> = {
  puddle:   { id: 'puddle-snacks', product: true },
  capacity: { id: 'life-armful' },
  lid:      { id: 'life-sip' },
  spill:    { id: 'life-swing-bottle' },
  clean:    { id: 'trio', product: true },
  bpa:      { id: 'life-cuddle' },
  grip:     { id: 'life-toddler-grip' },
  age:      { id: 'life-toddler-swing' },
}

export function Specs() {
  return (
    <section className={styles.section} id="features" aria-labelledby="specs-title">
      <BrandDetail preset="droplets" />
      {/* Goosey, sitting at the corner of the spec sheet — the one warm thing in
          a section that is otherwise all reassurance for the parent. */}
      <Duck who="goosey" pose="rest" className={styles.cameo} float />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--cream)" data-pop="">
            The details
          </Sticker>
          <h2 id="specs-title" className="d d-xl" data-anim="">
            Designed with parents in mind.
          </h2>
          <p className="lead measure" data-anim="">
            Thoughtful, practical details designed for little hands and busy parents
            &mdash; making everyday adventures a little easier.
          </p>
        </div>

        <dl className={styles.grid} data-tilt-grid="">
          {confirmedSpecs.map((s) => {
            const Icon = ICONS[s.key] ?? Drop
            const shot = SHOTS[s.key]
            return (
              <div key={s.key} className={`${styles.card} ${shot ? styles.hasShot : ''}`}
                   data-tilt="" data-anim="" data-anim-y="24">

                <span className={styles.icon} aria-hidden="true">
                  <Icon size={21} weight="regular" />
                </span>
                <dt className={styles.key}>{s.label}</dt>
                <dd className={styles.value}>{s.value}</dd>
                {s.benefit && <dd className={styles.benefit}>{s.benefit}</dd>}
                {/* LAST IN THE SOURCE, because a <dd> may not precede its
                    <dt>; the stylesheet puts it on top of the card (hover) or
                    at the head of it (touch). */}
                {shot && (
                  <dd className={`${styles.shot} ${shot.product ? styles.shotProduct : ''}`}>
                    <Picture id={shot.id} tint={false}
                             sizes="(min-width: 1000px) 280px, (min-width: 680px) 32vw, 290px" />
                    <span className={styles.shotTag} aria-hidden="true">{s.label}</span>
                  </dd>
                )}
              </div>
            )
          })}
          {/* The dark "And the bit that matters" card is gone at the client's
              request: the emotional half of the product is made in the three
              sections above this one, and they want The Details to be about
              function and nothing else. */}
        </dl>

        <p className={styles.footnote}>{specsFootnote}</p>

        <div className={styles.cta}>
          {/* The bottles are the next section down now (Nov 2026 order), so
              this hands over to them — in the client's own hero wording —
              rather than sending a reader six sections on to the story. */}
          <Btn href="/#store" colour="var(--paper)">Explore the Bottles</Btn>
        </div>
      </div>
    </section>
  )
}
