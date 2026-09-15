import { Star } from '@phosphor-icons/react/dist/ssr'
import { Sticker } from '@/components/ui/Sticker'
import { reviews, ducks } from '@/content/brand'
import styles from './Reviews.module.css'

/**
 * What parents say.
 *
 * The four quotes are the client's own, carried over verbatim from their live
 * site. They arrive with NO attribution, which is the one thing wrong with them:
 * an unattributed five-star review on a store that has not sold anything is the
 * weakest asset on the page, not the strongest.
 *
 * So the card renders the name pill ONLY when `review.name` is set. Supply four
 * first names and four pills appear; until then the quotes stand on their own
 * without pretending to a provenance they do not have. See the TODO in
 * content/brand.ts.
 */
const field = (slug: string) => ducks.find((d) => d.slug === slug)!

export function Reviews() {
  return (
    <section className={styles.section} id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sun)" rot={-2} data-pop="" data-pop-rot="-2">What parents say</Sticker>
          <h2 id="reviews-title" className="d d-xl" data-anim="">
            Don&rsquo;t take our word for it.
          </h2>
          <p className="lead" data-anim="">
            The families who have had a duck in the house the longest are the ones who
            told us what to change.
          </p>
        </div>
      </div>

      <ul className={styles.rail}>
        {reviews.map((r, i) => {
          const d = field(r.duck)
          return (
            <li
              key={r.id}
              className={styles.card}
              data-anim="" data-anim-y="30" data-anim-rot={i % 2 ? 2 : -2}
              style={{
                ['--field' as string]: d.field,
                ['--accent' as string]: d.colour,
              } as React.CSSProperties}
            >
              <p className={styles.stars} aria-label="Five out of five">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} size={20} weight="fill" aria-hidden="true" />
                ))}
              </p>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.body}>{r.body}</p>
              {r.name && <p className={styles.name}>{r.name}</p>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
