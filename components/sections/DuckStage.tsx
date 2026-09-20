'use client'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { ducks } from '@/content/brand'
import { play as playQuack } from '@/lib/sound'
import styles from './DuckStage.module.css'

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
          <Sticker colour="var(--chichi)" rot={2} data-pop="" data-pop-rot="2">The Quack Pack</Sticker>
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

                <div className={styles.teaches}>
                  <p className={`eyebrow ${styles.teachesLabel}`}>What {d.name} helps with</p>
                  <ul className={styles.chips}>
                    {d.teaches.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>

                <span className={styles.quackBtn}>
                  <Btn colour="var(--cream)" arrow={false} onClick={() => void playQuack()}>
                    Hear {d.name} quack
                  </Btn>
                </span>
              </div>

              <div className={styles.figure}>
                <span className={styles.puddle} aria-hidden="true" />
                <Picture
                  id={assetFor(d.slug)}
                  sizes="(min-width: 880px) 30vw, 70vw"
                  alt={`The ${d.name} bottle`}
                  data-bob=""
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
