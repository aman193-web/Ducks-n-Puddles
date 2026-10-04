import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
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
 *
 * The tagline line was cut for a while on the argument that it appears three
 * times on one page (hero h1, ribbon, here). The client asked for it back: it is
 * the last line of the copy they wrote, and a story that ends on its own tagline
 * is not a repetition, it is a sign-off. It is back, and it stays.
 *
 * The <strong>s are the client's emphasis, also asked for by name ("the boldness
 * of some text in our story is missing"). They fall on the people and the
 * promise — the founders, the three characters, and what comes after the
 * bottles — so the block has somewhere for an eye to land instead of reading as
 * four even paragraphs of grey.
 */
export function Story() {
  return (
    <section className={styles.section} id="story" aria-labelledby="story-title">
      <BrandDetail preset="crests" />
      <div className="wrap">
        <div className={styles.grid}>
          {/* TODO(client): the professional family photographs are being taken on
              5 Oct 2026 and replace this one. Swap the asset id; nothing else
              in this section depends on which picture it is. */}
          <figure className={styles.figure} data-anim="" data-anim-rot="-2">
            <Picture id="shell-hands" sizes="(min-width: 900px) 46vw, 92vw"
                     className={styles.photo} />
            {/* All three, beside the real family — it is a story about the three
                of them, so one of them standing in for the set undersold it. */}
            <Duck who="trio" pose="walk" className={styles.cameo} float speak
                  sizes="(min-width: 900px) 24vw, 46vw" />
          </figure>

          {/* THE HEADING IS ITS OWN ROW, and that is what lets the photograph
              line up with the copy rather than with the sticker. The client
              asked for the picture to run from "Hi! We're Larisa" down to the
              button; with the sticker and the title lifted out into row 1, the
              figure and the remaining copy share row 2 and stretch to the same
              height, so that alignment holds at every width without a single
              hard-coded number. */}
          <header className={styles.head}>
            <Sticker colour="var(--chichi-soft)" rot={-2} data-pop="" data-pop-rot="-2">Our story</Sticker>
            <h2 id="story-title" className={`d ${styles.title}`} data-anim="">
              We All Need a Friend.
            </h2>
          </header>

          <div className={styles.body}>
            <p className={styles.lead} data-anim="">
              Hi! We&rsquo;re Larisa and Vinny &mdash; husband and wife, parents to Lucy and
              Vincey, and the founders of Ducks &rsquo;n Puddles.
            </p>
            {/* THE EMPHASIS IS THE CLIENT'S, phrase for phrase. Four passages are
                bold in the revision document and only those four: the feeling the
                brand exists for, what it makes for parents and kids, what the
                vision is built around, and the sign-off.

                It used to be a whole paragraph set in bold plus three names. That
                was a reasonable reading of "the boldness is missing" at the time,
                but it is not what the document marks — and bolding the names made
                the eye land on who they are rather than on what they are saying. */}
            <p data-anim="">
              Ducks &rsquo;n Puddles began with a feeling we wanted every child to have:{' '}
              <strong>the comfort of knowing they have a little friend by their side,
              wherever life takes them.</strong> Something to bring a little extra comfort
              on the first day of school, a new adventure, or any moment they need it most.
            </p>
            <p data-anim="">
              That feeling inspired Chi&nbsp;Chi, Goosey, and Vincey &mdash; three little
              ducks with personalities of their own, each created to bring something
              positive along for the ride.
            </p>
            <p data-anim="">
              As our family grew, so did the vision. We began imagining a brand that could
              support the whole family &mdash; <strong>thoughtful products that bring ease
              and convenience to parents, and comfort, confidence, and positive direction
              to kids.</strong>
            </p>
            <p data-anim="">
              And this is just the beginning. Our vision extends beyond products into
              stories, experiences, and the Ducks &rsquo;n Puddles Foundation &mdash; all
              built around the same idea that started it all: <strong>the comfort of
              knowing you&rsquo;re supported, connected, and always have someone in your
              corner.</strong>
            </p>
            {/* The sign-off the client's copy ends on, and the fourth of the four
                bold passages. */}
            <p className={styles.tagline} data-anim="">
              A Friend for Every Adventure.
            </p>
            <div className={styles.close} data-anim="">
              <span className={styles.sig}>
                <img src="/img/mascot-140.webp" width={42} height={47} alt="" className="wiggle" />
                <span className="hand">&mdash; Larisa &amp; Vinny</span>
              </span>
              <Btn href="/#squad" colour="var(--sun-soft)">Come Along With Us</Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
