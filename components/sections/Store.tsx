import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { NameSticker } from '@/components/NameSticker'
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
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--chichi)" rot={2} data-pop="" data-pop-rot="2">The range</Sticker>
          <h2 id="store-title" className="d d-xl" data-anim="">Three ducks. Pick your kid&rsquo;s.</h2>
          <p className="lead" data-anim="">
            Same bottle, same nine ounces, same straw. Three personalities, because the
            one they choose is the one they carry.
          </p>
        </div>

        <div className={styles.cards}>
          {ducks.map((d) => (
            <div key={d.slug} className={styles.cardWrap} data-store-card="">
            {/* no data-anim here: the fan on .cardWrap IS the entrance, and two
                scroll systems on one card is what left them faded and stacked */}
            <article className={styles.card}
                     style={{ ['--duck-field' as string]: d.field } as React.CSSProperties}>
              <div className={styles.figure}>
                <span className={styles.puddle} aria-hidden="true" />
                <Picture id={assetFor(d.slug)} sizes="(min-width: 820px) 20vw, 55vw"
                         alt={`The ${d.name} bottle`} />
              </div>
              <NameSticker name={d.stickerName} motif={d.motif} colour={d.colour} size="m"
                           className={styles.badge} />
              <p>{d.personality}</p>
              <p className={styles.price}>{d.forParents}</p>
              {/* query BEFORE the fragment. `/#squad?duck=x` makes the browser look for
                  an element with id="squad?duck=x", so it matched nothing and the
                  click scrolled nowhere. */}
              <Btn href={`/?duck=${d.slug}#squad`} colour={d.colour} block>
                I want {d.name}
              </Btn>
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
