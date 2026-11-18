import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { puddle, puddleSleeveOnly, SNACK_CLAIMS_APPROVED } from '@/content/brand'
import styles from './MeetThePuddle.module.css'

/**
 * MEET THE PUDDLE — the 2-in-1 silicone sleeve, as three frames.
 *
 * Opens section 02, "Product Features & Details", of the client's Nov 2026
 * reorganisation, and is laid out on their design reference for it: a centred
 * headline with a hand-drawn underline, one line under it, and three soft
 * cards — number, title, picture — with a drawn arrow from each to the next:
 *
 *   1  Your 2-in-1 Water Bottle      Chi Chi's bottle, sleeve on
 *   2  Remove the Silicone Sleeve    the client's photograph, sleeve slid off
 *   3  Turn It Into a Snack Cup      the client's render, sleeve full of snacks
 *
 * CHI CHI'S BOTTLE, because her body is pink and her Puddle is blue, so the
 * sleeve reads as a separate part at a glance — on Vincey (blue on blue) it
 * looks like the bottom of the bottle.
 *
 * The explanatory paragraph from the Oct 2026 brief closes the section, under
 * the frames, centred: the frames make the point and the paragraph is there
 * for the reader who wants it said.
 *
 * ⚠️ THE SNACK CLAIM IS GATED (SNACK_CLAIMS_APPROVED). Closed, the third frame
 * and the snack lines go and the first two frames — which make no claim —
 * stand on their own under the sleeve-only wording.
 */
const ART = [
  { id: 'chichi', sizes: '(min-width: 1024px) 130px, 110px',
    alt: 'A Ducks ’n Puddles bottle with its silicone Puddle on, covering the lower half of the bottle.' },
  { id: 'sleeve-off', sizes: '(min-width: 1024px) 270px, 230px',
    alt: 'The same bottle with its silicone Puddle slid off and standing beside it.' },
  { id: 'puddle-snacks', sizes: '(min-width: 1024px) 230px, 200px',
    alt: 'The silicone Puddle taken off the bottle and filled with snacks.' },
] as const

/** A hand-drawn arrow, curving from one frame to the next. */
function Arrow() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <svg viewBox="0 0 48 28" fill="none" stroke="currentColor" strokeWidth="2.6"
           strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="M3 21c9-11 23-14 38-7" />
        <path d="M34 7.5l7.5 6.5-9 3" />
      </svg>
    </span>
  )
}

export function MeetThePuddle() {
  const frames = puddle.sequence.filter((f) => SNACK_CLAIMS_APPROVED || !('snackClaim' in f))
  const [first, second] = puddle.headline.split('. ')

  return (
    <section className={styles.section} id="puddle" aria-labelledby="puddle-title">
      <BrandDetail preset="droplets" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sky-soft)" data-pop="">{puddle.eyebrow}</Sticker>

          {SNACK_CLAIMS_APPROVED ? (
            <h2 id="puddle-title" className={`d ${styles.title}`} data-anim="">
              {/* Two marks of light either side, and a drawn underline under
                  "Everyday" — the reference's own flourishes, in the brand's
                  sunshine yellow. Decorative, so hidden from assistive tech. */}
              <span className={`${styles.spark} ${styles.sparkL}`} aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
                  <path d="M30 8l-6 8M34 22l-10-1M27 34l-6-6" />
                </svg>
              </span>
              <span className={styles.line}>{first}.</span>
              <span className={styles.line}>
                {second.split(' ').map((word, i) => word === 'Everyday'
                  /* The space goes OUTSIDE the inline-block: inside it, a
                     trailing space collapses and the words run together. */
                  ? <span key={i}><span className={styles.underlined}>{word}
                      <svg className={styles.swash} viewBox="0 0 200 18" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M4 13c40-7 92-10 192-5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                      </svg>
                    </span>{' '}</span>
                  : <span key={i}>{word}{' '}</span>)}
              </span>
              <span className={`${styles.spark} ${styles.sparkR}`} aria-hidden="true">
                <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
                  <path d="M10 8l6 8M6 22l10-1M13 34l6-6" />
                </svg>
              </span>
            </h2>
          ) : (
            <h2 id="puddle-title" className={`d ${styles.title}`} data-anim="">
              {puddleSleeveOnly.message}
            </h2>
          )}

          {SNACK_CLAIMS_APPROVED && (
            <p className={`lead ${styles.sub}`} data-anim="">{puddle.subline}</p>
          )}
        </div>

        <ol className={styles.frames} data-count={frames.length}>
          {frames.map((f, i) => (
            <li key={f.n} className={styles.frameItem}>
              {i > 0 && <Arrow />}
              <figure className={styles.frame} data-frame={f.n} data-anim="" data-anim-y="24">
                <span className={styles.num} aria-hidden="true">{f.n}</span>
                <figcaption className={styles.frameTitle}>{f.title}</figcaption>
                <span className={styles.art}>
                  <Picture id={ART[i].id} sizes={ART[i].sizes} alt={ART[i].alt} />
                </span>
              </figure>
            </li>
          ))}
        </ol>

        <p className={styles.body} data-anim="">
          <strong>{puddle.lede}</strong>{' '}
          {SNACK_CLAIMS_APPROVED ? puddle.body : puddleSleeveOnly.body}
        </p>
      </div>
    </section>
  )
}
