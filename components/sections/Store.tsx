import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { NameSticker } from '@/components/NameSticker'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { Motif } from '@/components/Motif'
import { Ripple } from '@/components/ui/Ripple'
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

        {/* THE FIRST DROP. The client: "we'd love the website to create a little
            more anticipation around the first drop ... something that makes
            people feel like they're discovering Ducks 'n Puddles early and gives
            them a reason to join the Duck Squad."

            This sits directly above the three bottles, which is the moment
            someone decides they want one and the moment they find out they
            cannot have one yet. It is deliberately NOT a countdown, a stock
            counter or a fake scarcity line: there is no date to count to, and
            inventing urgency for a children's brand is not a copy decision.
            What it does say is true and is itself the reason to join — the shop
            is not open, the Squad is how you find out when it is.

            (This replaces the small mono "first drop" pill that the Design Mode
            pass removed. That deletion and this request arrived together and
            pull opposite ways; the client's brief wins, so the line is back —
            louder, and now carrying the CTA it was missing.) */}
        <aside className={styles.drop} data-anim="">
          <span className={styles.dropMark} aria-hidden="true"><Motif name="splash" /></span>
          <div className={styles.dropText}>
            <p className={styles.dropTitle}>The first drop has not landed yet.</p>
            <p className={styles.dropBody}>
              You are early &mdash; which is the good part. The Duck Squad hears the day
              the ducks arrive, before the shop opens to anyone else.
            </p>
          </div>
          <Btn href="/#squad" colour="var(--sun-soft)">Be first to know</Btn>
        </aside>

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
                  The `turn` pose is a three-quarter facing RIGHT, so placed to
                  the left of the bottle it reads as peeking round it. It sat at
                  the `idle` pose before, overlapping the bottle almost exactly
                  and showing 14px of itself — which is to say, invisible.
                  density="always": it is the point of the card, so it earns a
                  phone. */}
              <div className={styles.figure}>
                <span className={styles.puddle} aria-hidden="true" />
                <Ripple className={styles.ripple} />
                <Duck who={d.slug} pose="turn" density="always" float
                      className={styles.character}
                      sizes="(min-width: 820px) 13vw, 34vw" />
                <Picture id={assetFor(d.slug)} sizes="(min-width: 820px) 20vw, 55vw"
                         alt={`The ${d.name} bottle`} className={styles.bottle} />
              </div>
              <NameSticker name={d.stickerName} motif={d.motif} colour={d.colour} size="m"
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
    </section>
  )
}
