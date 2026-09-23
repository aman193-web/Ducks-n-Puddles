import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { Ripple } from '@/components/ui/Ripple'
import styles from './ComingSoon.module.css'

/**
 * COMING SOON — a section of its own.
 *
 * The client asked for this by name: "a dedicated Coming soon section", and
 * "something that makes people feel like they're discovering Ducks 'n Puddles
 * early and gives them a reason to join the Duck Squad".
 *
 * It sits directly after the range, which is the moment someone decides they
 * want a bottle and finds out they cannot have one yet. It REPLACES the small
 * callout that briefly lived inside Store; saying this twice, forty pixels
 * apart, would have read as nagging.
 *
 * What it deliberately does NOT do:
 *   - no countdown. There is no date to count to.
 *   - no stock counter, no "only N left", no invented scarcity. This is a
 *     children's brand and manufacturing anticipation for one is not a copy
 *     decision I get to make.
 *   - no promised month. The honest position is that they are on sample four
 *     and will not ship until it is right — which is a better story anyway,
 *     and it is already written up in the journal, so the link is real.
 *
 * The anticipation comes from being LET IN EARLY rather than from a clock.
 */
export function ComingSoon() {
  return (
    <section className={styles.section} id="coming-soon" aria-labelledby="coming-soon-title">
      <BrandDetail preset="shallows" />
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <Sticker colour="var(--sun)" rot={-2} data-pop="" data-pop-rot="-2">Coming soon</Sticker>

          <h2 id="coming-soon-title" className="d d-xl" data-anim="">
            The ducks are on their way.
          </h2>

          <p className="lead" data-anim="">
            Not yet &mdash; and that is on purpose. We are on our fourth sample and we are
            not shipping until it is the bottle we would hand our own kids.
          </p>

          <p className={styles.body} data-anim="">
            There is no date on it yet. When there is, the Duck Squad hears it first
            &mdash; before the shop opens, and before anyone else. Right now you are early,
            which is the best time to find a thing.
          </p>

          <div className={styles.ctas} data-anim="">
            <Btn href="/#squad" colour="var(--sun-soft)">Join the Duck Squad</Btn>
            {/* A link, not a second button. As two buttons these ran 660px against
                a 665px column and wrapped onto separate rows, which made the
                quieter action look equal to the primary one. It is the proof for
                someone who wants it, not a competing choice. */}
            <a className={styles.proof} href="/journal/why-were-still-on-sample-four">
              Why we are still on sample four
            </a>
          </div>
        </div>

        {/* Vincey peering over the edge — the character is waiting too. */}
        <div className={styles.art}>
          <span className={styles.pool} aria-hidden="true" />
          <Ripple className={styles.ripple} />
          <Duck who="vincey" pose="peek" density="always" float
                className={styles.duck} sizes="(min-width: 900px) 24vw, 52vw" />
        </div>
      </div>
    </section>
  )
}
