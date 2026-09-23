import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { biggerPicture } from '@/content/brand'
import styles from './WhatsNext.module.css'

/**
 * THE BIGGER PICTURE — "the bottles are just the beginning".
 *
 * Rebuilt against the client's actual words, having first built the wrong
 * thing. Their brief:
 *
 *   "We'd love to start planting the idea that 'The bottles are just the
 *    beginning.' Eventually, the ducks will live through different products,
 *    stories, books, experiences and a much larger Ducks 'n Puddles world.
 *    Incorporating the illustrated characters into the website now will help
 *    establish that bigger vision from the beginning."
 *
 * What was here was a five-row product roadmap, each row a card with an icon in
 * a disc. Every word of it was true and the whole thing still missed the point:
 * a list of future SKUs argues that there will be more to BUY. The client is
 * arguing that there will be more to KNOW — that these are characters with a
 * world, and the bottle is only the door into it. They even say how to show it:
 * put the illustrated characters in.
 *
 * So the rows are the characters now, at size, one per direction, alternating
 * sides so it reads as a story rather than as a table. No icons anywhere in the
 * section — the character IS the mark.
 */
export function WhatsNext() {
  return (
    <section className={styles.section} id="next" aria-labelledby="next-title">
      <BrandDetail preset="paddle" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sky-soft)" rot={-2} data-pop="" data-pop-rot="-2">The bigger picture</Sticker>
          <h2 id="next-title" className="d d-xl" data-anim="">
            The bottles are just the beginning.
          </h2>
          <p className="lead" data-anim="">
            Chi&nbsp;Chi, Goosey and Vincey are characters first. The bottle is simply where
            most people will meet them &mdash; the rest of their world is already being
            drawn.
          </p>
        </div>

        <div className={styles.rows}>
          {biggerPicture.map((row, i) => (
            <article key={row.title} className={styles.row} data-anim="" data-anim-y="40">
              <div className={styles.art}>
                <span className={styles.pool} aria-hidden="true" />
                <Duck
                  who={row.who}
                  pose={row.pose}
                  density="always"
                  float
                  /* Alternate which way they face so each one looks INTO its own
                     column of text rather than away from it. */
                  flip={i % 2 === 1}
                  className={styles.duck}
                  sizes="(min-width: 900px) 26vw, 56vw"
                />
              </div>
              <div className={styles.text}>
                <h3 className={styles.title}>{row.title}</h3>
                <p className={styles.body}>{row.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.cta}>
          <Btn href="/#squad" colour="var(--sun-soft)">Be first to know</Btn>
        </div>
      </div>
    </section>
  )
}
