import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { NameSticker } from '@/components/NameSticker'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { Ripple } from '@/components/ui/Ripple'
import { StorePeek } from './StorePeek'
import { asset } from '@/lib/assets'
import { ducks } from '@/content/brand'
import styles from './Store.module.css'

const assetFor = (slug: string) => (slug === 'chi-chi' ? 'chichi' : slug)

/**
 * The range. Was "The store isn't open yet", which made a product showcase into
 * a status update and closed with "we're not taking money, deposits or
 * pre-orders yet" — three negatives before the reader had looked at a bottle.
 *
 * The commercial truth has not changed and is not hidden: each card's CTA still
 * carries the chosen duck through to the waitlist, which is where the pre-launch
 * message belongs and where the segmentation collects itself. It also still
 * fixes the worst conversion bug on the current site — four "Shop Ducks" CTAs
 * that all dead-end on a splash page with no email capture on it.
 */
export function Store() {
  return (
    <section className={styles.section} id="store" aria-labelledby="store-title" data-scene="store">
      <BrandDetail preset="trail" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--chichi-soft)" rot={2} data-pop="" data-pop-rot="2">Our first product</Sticker>
          <h2 id="store-title" className="d d-xl" data-anim="">
            Every duck comes as a bottle.
          </h2>
          <p className="lead measure" data-anim="">
            The Vincey bottle is their Vincey. Same nine ounces and the same straw on all
            three &mdash; what changes is who is coming with them. And the bottles are just
            the beginning.
          </p>
        </div>

        <div className={styles.cards}>
          {ducks.map((d) => (
            <div key={d.slug} className={styles.cardWrap} data-store-card="">
            {/* no data-anim here: the fan on .cardWrap IS the entrance, and two
                scroll systems on one card is what left them faded and stacked */}
            <article className={styles.card}
                     style={{ ['--duck-field' as string]: d.field } as React.CSSProperties}>
              {/* THE CHARACTER LOOKS OUT FROM BEHIND ITS OWN BOTTLE. This is the
                  client's "we want kids to understand that the Vincey bottle is
                  their Vincey" — the copy says it, this proves it.
                  It is on the RIGHT now, on the supplied peeking art, and it
                  starts fully hidden and slides out as the card arrives — see
                  StorePeek. density="always": it is the point of the card, so
                  it earns a phone. */}
              <div className={styles.figure} data-peek-figure="">
                <span className={styles.puddle} aria-hidden="true" />
                <Ripple className={styles.ripple} />
                {/* No `float` here. That keyframe animates `transform`, which is
                    the same channel GSAP drives the slide on — the two would
                    overwrite each other. The peek is the motion on this card. */}
                {/* The box needs a REAL aspect ratio. With `inline-size: auto`
                    against a percentage block-size the shrink-to-fit width
                    resolved before the height was known and came out at 24-42px
                    instead of ~80 — the ducks rendered as slivers, and the width
                    even varied between measurements. The three silhouettes
                    differ (0.34 to 0.43), so it comes per card from the
                    manifest rather than being guessed once. */}
                <span
                  className={styles.character}
                  data-peek-duck=""
                  style={{ ['--peek-aspect' as string]:
                    String(asset(`${assetFor(d.slug)}-peeking`).aspect) } as React.CSSProperties}
                >
                  <Duck who={d.slug} pose="peeking" density="always" speak
                        sizes="(min-width: 820px) 8vw, 22vw" />
                </span>
                <Picture id={assetFor(d.slug)} sizes="(min-width: 820px) 20vw, 55vw"
                         alt={`The ${d.name} bottle`} className={styles.bottle}
                         data-peek-bottle="" />
              </div>
              <NameSticker name={d.stickerName} colour={d.soft} size="m"
                           className={styles.badge} />
              {/* The client asked for both audiences to be spoken to at once and
                  for neither to get lost. Both lines were already here as two
                  undifferentiated paragraphs; labelling them makes the pair
                  legible — child first, then parent. */}
              <div className={styles.voices}>
                <p className={styles.voice}>
                  <span className={`eyebrow ${styles.voiceLabel}`}>For little ones</span>
                  {d.personality}
                </p>
                <p className={styles.voice}>
                  <span className={`eyebrow ${styles.voiceLabel}`}>For parents</span>
                  {d.forParents}
                </p>
              </div>
              {/* query BEFORE the fragment. `/#squad?duck=x` makes the browser look for
                  an element with id="squad?duck=x", so it matched nothing and the
                  click scrolled nowhere. */}
              {/* d.soft, not d.colour: full saturation on a pale field card was
                  the last loud thing on the page. The character is still
                  identified by its own hue, one step lighter. */}
              <Btn href={`/?duck=${d.slug}#squad`} colour={d.soft} block>
                I want {d.name}
              </Btn>
            </article>
            </div>
          ))}
        </div>
      </div>
      <StorePeek />
    </section>
  )
}
