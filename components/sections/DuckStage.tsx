'use client'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { SpeechBubble } from '@/components/ui/SpeechBubble'
import { Duck } from '@/components/ui/Duck'
import { ducks } from '@/content/brand'
import styles from './DuckStage.module.css'

/* THE FOOT MARGIN each -idle master carries under the character, as a fraction
   of the master's own height. The masters are NOT trimmed and they are not
   consistent with each other — measured off the alpha channel: Vincey 80/1254,
   Chi Chi 22/1254, Goosey 20/1254. `align-items: flex-end` in .figure lines up
   the boxes, so that difference is a difference in how far each duck hovers
   above the ground. This is the correction; see .character in the stylesheet.

   Trimming the masters instead would be the deeper fix, but they are drawn at
   different scales within the frame (the art fills 72% / 67% / 62% of the box
   width), so the frame is currently the only thing keeping the three the same
   size on screen. Trimming would resize them against each other. */
/* Unitless, because TWO things now need it: the character's own downward
   nudge, and the speech bubble, which has to subtract the same nudge or it
   floats by exactly that much. A percentage would resolve against a different
   box in each place. */
const FOOT: Record<string, string> = {
  vincey: '.064',
  'chi-chi': '.018',
  goosey: '.016',
}

/* THE SAME PROBLEM AT THE OTHER END. Each -idle master also carries a different
   amount of transparent space ABOVE the head — measured off the alpha: Vincey
   91/1254, Chi Chi 18/1254, Goosey 12/1254. The speech bubble is placed off the
   duck's box, so without this it floats 50px over Vincey's head and sits almost
   on Goosey's. Unitless, because the CSS multiplies it by the duck's height. */
const CROWN: Record<string, string> = {
  vincey: '.073',
  'chi-chi': '.014',
  goosey: '.010',
}

const assetFor = (slug: string) => (slug === 'chi-chi' ? 'chichi' : slug)

/**
 * MEET THE DUCKS.
 *
 * Rewritten against Character Sheet 2 and the client's notes. What changed and
 * why, because most of it was deliberate and is now deliberately gone:
 *
 *   "Three ducks. Three strong opinions."  -> "Meet the ducks."  The client does
 *      not want them framed as opinionated; they want three personalities a
 *      child can connect with.
 *   "They are named after our kids…"       -> removed. The ducks are inspired by
 *      the family but are characters in their own right now, with their own
 *      identities in the Ducks 'n Puddles world.
 *   Splash / Bloom / Waddle eyebrows       -> replaced by each character's real
 *      role from the sheet (The Calm Companion, The Brave Spark, The Sunshine
 *      Friend). The old three were invented labels.
 *   The giant outlined 1 / 2 / 3           -> removed. No character is ranked.
 *   The quips                              -> each duck's own saying, verbatim
 *      from the sheet, plus what they teach a child.
 *
 * Still works without hover, without sound and without JavaScript: all three
 * panels are in the DOM and every introduction is real text, not injected.
 */
export function DuckStage() {
  return (
    <section className={styles.section} id="ducks" aria-labelledby="ducks-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--chichi-soft)" rot={2} data-pop="" data-pop-rot="2">The Quack Pack</Sticker>
          <h2 id="ducks-title" className="d d-xl" data-anim="">
            Meet the ducks.
          </h2>
          {/* The client's line, verbatim. It sets up the whole section: each
              duck is not a personality profile, it is one reminder. */}
          <p className="lead measure" data-anim="">
            Three little friends. Three big reminders.
          </p>
        </div>
      </div>

      <div className={styles.stack}>
        {ducks.map((d) => (
          <article
            key={d.slug}
            className={styles.panel}
            style={{ ['--duck' as string]: d.soft } as React.CSSProperties}
            aria-labelledby={`duck-${d.slug}`}
          >
            <div className={`wrap ${styles.inner}`}>
              <div className={styles.text}>
                <Sticker colour="var(--cream)" rot={-2}>{d.role}</Sticker>
                <h3 id={`duck-${d.slug}`} className={`d d-mega ${styles.name}`}>{d.name}</h3>
                <p className={styles.personality}>{d.personality}</p>

                {/* ONE PARAGRAPH, ONE MESSAGE. The client removed the quote, the
                    "For parents" box and the "What X helps with" chips from this
                    section — four blocks of copy per duck where they wanted two.
                    `saying`, `forParents` and `teaches` are all still in
                    content/brand.ts; nothing was deleted, it simply is not shown
                    here any more.

                    The message itself lives in the FIGURE, not here — see the
                    speech bubble below. */}
              </div>

              {/* The CHARACTER leads and the bottle stands with it. This section
                  is called Meet the Ducks, and until now the only thing to meet
                  was a product render — which is the single biggest thing the
                  client asked us to change. */}
              <div
                className={styles.figure}
                style={{
                  ['--foot' as string]: FOOT[d.slug] ?? '0%',
                  ['--crown' as string]: CROWN[d.slug] ?? '0',
                }}
              >
                {/* THE REMINDER, SPOKEN. The client asked for the defining message
                    to sit in a speech bubble next to the duck "making it look
                    like the character is sharing their reminder directly with
                    the child" — so it belongs to the character, not to the copy
                    column it started in. */}
                <SpeechBubble message={d.message} className={styles.bubble} />
                <span className={styles.puddle} aria-hidden="true" />
                <Duck
                  who={d.slug} pose="idle" density="always" float speak
                  className={styles.character}
                  sizes="(min-width: 880px) 26vw, 56vw"
                  alt={d.name}
                />
                {/* No `data-bob` here. bob() takes its amplitude from DOM index
                    and these three land at 3/4/5, which lifted a bottle STANDING
                    ON GROUND by 18-22px. The character's own float carries the
                    life in this figure; the bottle stays planted. */}
                <Picture
                  id={assetFor(d.slug)}
                  sizes="(min-width: 880px) 16vw, 34vw"
                  alt={`The ${d.name} bottle`}
                  className={styles.bottle}
                />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="wrap">
        <div className={styles.cta}>
          <Btn href="/#store">See them as bottles</Btn>
        </div>
      </div>
    </section>
  )
}
