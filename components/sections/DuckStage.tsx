'use client'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
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
const FOOT: Record<string, string> = {
  vincey: '6.4%',
  'chi-chi': '1.8%',
  goosey: '1.6%',
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
          <p className="lead measure" data-anim="">
            Three little friends, each with their own kind of heart. Your child will know
            which one is theirs.
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
                <p className={`hand ${styles.says}`}>&ldquo;{d.saying}&rdquo;</p>

                <p className={styles.parents}>
                  <span className={`eyebrow ${styles.parentsLabel}`}>For parents</span>
                  {d.forParents}
                </p>

                <div className={styles.teaches}>
                  <p className={`eyebrow ${styles.teachesLabel}`}>What {d.name} helps with</p>
                  <ul className={styles.chips}>
                    {d.teaches.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>

              </div>

              {/* The CHARACTER leads and the bottle stands with it. This section
                  is called Meet the Ducks, and until now the only thing to meet
                  was a product render — which is the single biggest thing the
                  client asked us to change. */}
              <div
                className={styles.figure}
                style={{ ['--foot' as string]: FOOT[d.slug] ?? '0%' }}
              >
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
