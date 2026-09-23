import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { Ripple } from '@/components/ui/Ripple'
import styles from './ComingSoon.module.css'

/**
 * COMING SOON — built as a CALL TO ACTION, not as an article.
 *
 * The first version put the copy in a left column and the art in a right one,
 * which is the layout every other section on this page uses: it read as one
 * more thing to scroll past. The client asked for it to work like a CTA
 * section, so it is centred, short, and the button is the widest thing in it.
 * Two characters lean in from the sides rather than sitting beside the text.
 *
 * What it still refuses to do:
 *   - no countdown. There is no date to count to.
 *   - no stock counter, no "only N left", no invented scarcity. This is a
 *     children's brand and manufacturing urgency for one is not a copy decision
 *     I get to make on the client's behalf.
 *   - no promised month. The honest position is that they are on sample four
 *     and will not ship until it is right — which is a better story anyway, and
 *     it is already written up in the journal, so that link is real.
 *
 * The pull is being let in early, not a clock.
 */
export function ComingSoon() {
  return (
    <section className={styles.section} id="coming-soon" aria-labelledby="coming-soon-title">
      <BrandDetail preset="shallows" />

      {/* Vincey peers in from the left, Goosey waves from the right. They are
          outside the text column on purpose — the copy has to stay readable at
          every width, and at <900px both simply go. */}
      <Duck who="vincey" pose="peek" className={styles.left} float
            sizes="(min-width: 1100px) 16vw, 0px" />
      <Duck who="goosey" pose="wave" className={styles.right} float
            sizes="(min-width: 1100px) 16vw, 0px" />

      <div className={`wrap ${styles.inner}`}>
        <Sticker colour="var(--sun)" rot={-2} data-pop="" data-pop-rot="-2">Coming soon</Sticker>

        <h2 id="coming-soon-title" className="d d-xl" data-anim="">
          The ducks are on their way.
        </h2>

        <p className={`lead ${styles.lead}`} data-anim="">
          No date yet &mdash; we are on our fourth sample and we are not shipping until it
          is the bottle we would hand our own kids. When there is a date, the Duck Squad
          hears it first.
        </p>

        {/* The puddle sits UNDER the button: the thing you are being asked to
            step into, directly beneath the step. */}
        <div className={styles.act} data-anim="">
          <span className={styles.pool} aria-hidden="true" />
          <Ripple className={styles.ripple} />
          <div className={styles.btn}>
            <Btn href="/#squad" colour="var(--sun)">Join the Duck Squad</Btn>
          </div>
        </div>

        <p className={styles.proofLine}>
          Free, always. One click to leave.{' '}
          <a className={styles.proof} href="/journal/why-were-still-on-sample-four">
            Why we are still on sample four
          </a>
        </p>
      </div>
    </section>
  )
}
