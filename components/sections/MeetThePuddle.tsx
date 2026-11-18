import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { Motif } from '@/components/Motif'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { puddle, puddleSleeveOnly, SNACK_CLAIMS_APPROVED } from '@/content/brand'
import styles from './MeetThePuddle.module.css'

/**
 * MEET THE PUDDLE — the 2-in-1 silicone sleeve, as three frames.
 *
 * Opens section 02, "Product Features & Details", of the client's Nov 2026
 * reorganisation. THE DESIGN follows a reference supplied for it — a centred
 * headline with a hand-drawn underline, one line under it, and three soft
 * cards with a drawn arrow from each to the next. THE WORDS DO NOT: they are
 * the doc's headline and the client's own Puddle copy (Oct 2026 brief), as
 * they were before the redesign.
 *
 *   1  Protective Sleeve   Chi Chi's bottle, sleeve on
 *   2  Slide               the client's photograph, sleeve slid off
 *   3  Snack Holder        the client's render, sleeve full of snacks
 *
 * CHI CHI'S BOTTLE, because her body is pink and her Puddle is blue, so the
 * sleeve reads as a separate part at a glance — on Vincey (blue on blue) it
 * looks like the bottom of the bottle.
 *
 * Under the frames, centred: the client's explanatory paragraph, their third
 * bullet ("Made for Everyday Adventures") and their closing line.
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
  /* BY ROLE, NOT BY INDEX: the third of the client's parts is not a frame,
     it is what all three are for, and it runs under them. */
  const [sleeve, snack, everyday] = puddle.parts
  /* The middle frame's caption is the client's own "Slide" step. */
  const slide = puddle.steps.find((s) => s.k === 'slide')!
  const frames = [
    { n: 1, label: sleeve.label, body: sleeve.body },
    { n: 2, label: slide.label, body: slide.body },
    ...(SNACK_CLAIMS_APPROVED ? [{ n: 3, label: snack.label, body: snack.body }] : []),
  ]
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

          {/* The client's primary marketing message (Oct 2026), under the
              doc's headline. It is itself a snack claim, so it is gated. */}
          {SNACK_CLAIMS_APPROVED && (
            <p className={`d ${styles.sub}`} data-anim="">{puddle.message}</p>
          )}
        </div>

        <ol className={styles.frames} data-count={frames.length}>
          {frames.map((f, i) => (
            <li key={f.n} className={styles.frameItem}>
              {i > 0 && <Arrow />}
              <figure className={styles.frame} data-frame={f.n} data-anim="" data-anim-y="24">
                <span className={styles.num} aria-hidden="true">{f.n}</span>
                <figcaption className={styles.cap}>
                  <strong className={styles.frameTitle}>{f.label}</strong>
                  <span className={styles.capBody}>{f.body}</span>
                </figcaption>
                <span className={styles.art}>
                  <Picture id={ART[i].id} sizes={ART[i].sizes} alt={ART[i].alt} />
                </span>
              </figure>
            </li>
          ))}
        </ol>

        {/* THE EXPLANATION, as one panel rather than three loose lines: the
            client's statement of belief leads in the display face, their
            paragraph follows it, and their third bullet — what all three
            frames are for — sits beside them as a card of its own. Their
            closing line signs the section off underneath. */}
        <div className={styles.story} data-anim="">
          <div className={styles.storyMain}>
            <p className={`d ${styles.storyLede}`}>{puddle.lede}</p>
            <p className={styles.storyBody}>
              {SNACK_CLAIMS_APPROVED ? puddle.body : puddleSleeveOnly.body}
            </p>
          </div>
          <p className={styles.everyday}>
            <span className={styles.everydayMark} aria-hidden="true">
              <Motif name="splash" size={26} />
            </span>
            <strong className={styles.everydayTitle}>{everyday.label}</strong>
            <span className={styles.everydayBody}>{everyday.body}</span>
          </p>
        </div>

        <p className={`d ${styles.close}`} data-anim="">{puddle.close}</p>
      </div>
    </section>
  )
}
