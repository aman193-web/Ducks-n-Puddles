import { Sticker } from '@/components/ui/Sticker'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { Motif, type MotifName } from '@/components/Motif'
import { roadmap } from '@/content/brand'
import styles from './WhatsNext.module.css'

/** One brand mark and one field tint per row, so the five read as a set of
 *  different things rather than as a ranked list. The numbered discs are gone:
 *  the client asked to remove the 1/2/3 ranking from Meet the Ducks, and a
 *  column of numbers here was the same device in a different place. */
const FACE: { mark: MotifName; field: string }[] = [
  { mark: 'duck',      field: 'var(--goosey-field)' },
  { mark: 'flower',    field: 'var(--chichi-field)' },
  { mark: 'splash',    field: 'var(--vincey-field)' },
  { mark: 'droplets',  field: 'var(--vincey-field)' },
  { mark: 'footprint', field: 'var(--goosey-field)' },
]

/**
 * THE BIGGER VISION — "the bottles are just the beginning".
 *
 * This component was built and then rendered nowhere. It is back because the
 * client's clearest note is that Ducks 'n Puddles is a children's lifestyle and
 * character brand whose FIRST product is a water bottle — not a water-bottle
 * company — and the roadmap it reads is already exactly that argument.
 *
 * The layout leads on ONE card. Five equal cards in two columns left a ragged
 * single card on a third row and read as a backlog; the books are the biggest
 * part of the vision, so The Quack Pack takes the full width and the other four
 * sit under it in a 2x2. Three rows instead of three-and-a-bit, and it reads as
 * a designed section rather than a list.
 */
export function WhatsNext() {
  const [lead, ...rest] = roadmap

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
          <li className={`${styles.item} ${styles.lead}`} data-anim="" data-anim-y="40"
              style={{ ['--n-bg' as string]: FACE[0].field } as React.CSSProperties}>
            <span className={styles.mark} aria-hidden="true"><Motif name={FACE[0].mark} /></span>
            <div className={styles.leadText}>
              <h3 className={styles.title}>{lead.title}</h3>
              <p className={styles.body}>{lead.body}</p>
            </div>
            {/* Chi Chi reading over the shoulder of the thing that is a book series */}
            <Duck who="chi-chi" pose="wave" className={styles.leadDuck} float
                  sizes="(min-width: 860px) 14vw, 30vw" />
          </li>

          {rest.map((r, i) => (
            <li key={r.title} className={styles.item} data-anim="" data-anim-y="40"
                style={{ ['--n-bg' as string]: FACE[i + 1].field } as React.CSSProperties}>
              <span className={styles.mark} aria-hidden="true"><Motif name={FACE[i + 1].mark} /></span>
              <h3 className={styles.title}>{r.title}</h3>
              <p className={styles.body}>{r.body}</p>
            </li>
          ))}
        </ol>

        <div className={styles.cta}>
          <Btn href="/#squad" colour="var(--sun-soft)">Be first to know</Btn>
        </div>
      </div>
    </section>
  )
}
