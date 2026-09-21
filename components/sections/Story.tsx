import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import styles from './Story.module.css'

/**
 * OUR STORY.
 *
 * The copy below is the client's own, supplied in the Sep 2026 revisions and
 * used close to verbatim — they asked for the section to carry who the family
 * is, where Ducks 'n Puddles came from, why they made it, and the bigger vision.
 *
 * Three things went with the old version and should not come back without them
 * asking: the nickname explanation (the ducks are characters now, not labels for
 * the founders' children), the child's name in the pull quote, and the "spilled
 * water" framing. It closes on the official tagline, which is how they wrote it.
 */
export function Story() {
  return (
    <section className={styles.section} id="story" aria-labelledby="story-title">
      <div className="wrap">
        <div className={styles.grid}>
          <figure className={styles.figure} data-anim="" data-anim-rot="-2">
            <Sticker className={styles.badge} colour="var(--goosey-soft)" rot={9}
                     data-pop="" data-pop-rot="9">
              South Florida
            </Sticker>
            <Picture id="shell-hands" sizes="(min-width: 900px) 46vw, 92vw"
                     className={styles.photo} />
            {/* Chi Chi, already in the puddle, beside the real family. */}
            <Duck who="chi-chi" pose="splash" className={styles.cameo} float
                  sizes="(min-width: 900px) 13vw, 26vw" />
          </figure>

          <div className={styles.body}>
            <Sticker colour="var(--chichi-soft)" rot={-2} data-pop="" data-pop-rot="-2">Our story</Sticker>
            <h2 id="story-title" className={`d ${styles.title}`} data-anim="">
              It started with our family.
            </h2>
            <p data-anim="">
              Hi, we&rsquo;re Larisa and Vinny &mdash; husband and wife, parents, and the
              founders of Ducks &rsquo;n Puddles.
            </p>
            <p data-anim="">
              It began with a question: how could we make things that make life easier for
              parents, while helping little ones feel loved, safe and comforted?
            </p>
            <p data-anim="">
              Inspired by our own family, we created Chi&nbsp;Chi, Goosey and Vincey &mdash;
              three little friends with personalities of their own, each bringing a different
              kind of comfort and companionship to a child&rsquo;s everyday adventures.
            </p>
            <p data-anim="">
              We&rsquo;re starting with our character water bottles, but the bottles are just
              the beginning. Our dream is a world of thoughtful products, stories and
              experiences that bring more ease to parents and more comfort, connection and
              magic to childhood.
            </p>
            {/* The "A friend for every adventure." pull quote is gone: it is the
                hero's h1 AND the last line of the client's own copy above, and
                three times on one page is once too many. */}
            <div className={styles.close} data-anim="">
              <span className={styles.sig}>
                <img src="/img/mascot-140.webp" width={42} height={47} alt="" className="wiggle" />
                <span className="hand">&mdash; Larisa &amp; Vinny</span>
              </span>
              <Btn href="/#squad" colour="var(--sun)">Join the Duck Squad</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
