import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { roadmap } from '@/content/brand'
import styles from './WhatsNext.module.css'

const FILLS = ['var(--sun)', 'var(--chichi)', 'var(--sky)', 'var(--goosey)', 'var(--orange)']

/**
 * THE BIGGER VISION — "the bottles are just the beginning".
 *
 * This component was built and then rendered nowhere. It is back because the
 * client's clearest note is that Ducks 'n Puddles is a children's lifestyle and
 * character brand whose FIRST product is a water bottle — not a water-bottle
 * company — and the roadmap it reads is already exactly that argument.
 *
 * What changed: the framing. It used to be a pre-launch status board ("we're
 * building this in order, not all at once", "nothing here has a date yet"),
 * which is a thing to tell someone who is waiting. It is now what the world gets
 * to be. The honesty is unchanged: no row carries a date, because none of them
 * has one.
 *
 * The numbered discs stay. They are a reading ORDER for a list, not a ranking of
 * characters — which is the thing the client asked to remove from Meet the Ducks.
 */
export function WhatsNext() {
  return (
    <section className={styles.section} id="next" aria-labelledby="next-title">
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sky-soft)" rot={-2} data-pop="" data-pop-rot="-2">The bigger picture</Sticker>
          <h2 id="next-title" className="d d-xl" data-anim="">
            The bottles are just the beginning.
          </h2>
          <p className="lead" data-anim="">
            Books, boxes, and a name on the bottom of every bottle. None of it has a date
            yet &mdash; when something does, the Duck Squad hears first.
          </p>
        </div>

        <ol className={styles.list}>
          {roadmap.map((r, i) => (
            <li key={r.title} className={styles.item} data-anim="" data-anim-y="40"
                style={{ ['--n-bg' as string]: FILLS[i % FILLS.length] } as React.CSSProperties}>
              <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.body}>{r.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.cta}>
          <Btn href="/#squad" colour="var(--sun)">Be first to know</Btn>
        </div>
      </div>
    </section>
  )
}
