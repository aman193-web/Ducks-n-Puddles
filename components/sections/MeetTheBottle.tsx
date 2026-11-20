import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { Duck } from '@/components/ui/Duck'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { ducks, confirmedSpecs, bottleWhy } from '@/content/brand'
import { BottleStage, type Callout } from './BottleStage'
import styles from './MeetTheBottle.module.css'

/**
 * MEET THE BOTTLE — the client's Nov 2026 note: "show the actual water bottle
 * and describe it and add a 'why' before we go into the puddle … showing a
 * video or pictures of the water bottle itself, explaining the different
 * features of it and then going into the puddle."
 *
 * So, between the benefits band and Meet the Puddle, three movements:
 *
 *   WHY        the founders' own sentence for why the ducks exist, signed, the
 *              two lines of their story that follow it, and who it is for —
 *              parents and little ones — with two lifestyle prints pinned up
 *   THE BOTTLE their 360° model of the production bottle, spinning, its parts
 *              called out on leader lines that draw themselves in, a switcher
 *              for all three ducks and the sleeve button
 *   HAND-OFF   down to the Puddle, which is the next section
 *
 * EVERY WORD IS THE CLIENT'S. The why is their founders' story; the callouts
 * are the feature cards' own label and value (confirmedSpecs), so the two can
 * never disagree; the link is the duck pages' own. The one new phrase is the
 * section's label, "Meet the bottle".
 *
 * The 360° model rather than a photograph, because it is the one asset that
 * shows the PRODUCTION bottle: every photograph and clip the client has is of
 * the samples, with the early green duck mark on the sleeve.
 */
const CALLOUT_AT: Record<string, { n: number; side: 'l' | 'r'; y: number }> = {
  lid:      { n: 1, side: 'l', y: 27 },
  capacity: { n: 2, side: 'r', y: 45 },
  puddle:   { n: 3, side: 'l', y: 64 },
  bpa:      { n: 4, side: 'r', y: 76 },
}

export function MeetTheBottle() {
  const callouts: Callout[] = confirmedSpecs
    .filter((s) => s.key in CALLOUT_AT)
    .map((s) => ({ key: s.key, label: s.label, value: s.value ?? '', ...CALLOUT_AT[s.key] }))
    .sort((a, b) => a.n - b.n)

  return (
    <section className={styles.section} id="bottle" aria-labelledby="bottle-title">
      <BrandDetail preset="droplets" />
      <div className="wrap">
        <div className={styles.head}>
          <div className={styles.why}>
            <Sticker data-pop="">Meet the bottle</Sticker>
            <p className={`hand ${styles.lead}`} data-anim="">{bottleWhy.lead}</p>
            <h2 id="bottle-title" className={`d ${styles.quote}`} data-anim="">
              {/* The sentence runs on from the colon above, so it keeps their
                  lower-case start. The mark is drawn: the display face's own
                  quotation marks are two thin slashes. */}
              <svg className={styles.mark} viewBox="0 0 48 40" aria-hidden="true" focusable="false">
                <path d="M4 38V23C4 11 10 4 20 1.5l2.2 6C16.4 9.6 13.6 13.4 13.4 19H21v19H4Zm24 0V23c0-12 6-19 16-21.5l2.2 6C40.4 9.6 37.6 13.4 37.4 19H45v19H28Z" />
              </svg>
              {bottleWhy.line}
            </h2>
            <p className={`hand ${styles.sig}`} data-anim="">&mdash; {bottleWhy.by}</p>

            <p className={styles.story} data-anim="">{bottleWhy.story.join(' ')}</p>

            {/* Who it is for: the two halves of their own sentence, each with
                the character the Why section gives that audience. */}
            <ul className={styles.forWhom}>
              {bottleWhy.forWhom.map((f) => (
                <li key={f.k} className={styles.forCard} data-for={f.k} data-anim="" data-anim-y="18">
                  <Duck who={f.k === 'parents' ? 'vincey' : 'chi-chi'}
                        pose={f.k === 'parents' ? 'wink' : 'wave'}
                        className={styles.forDuck} float density="always"
                        sizes="72px" />
                  <span className={styles.forText}>
                    <span className={styles.forLabel}>{f.label}</span>
                    <span className={styles.forLine}>{f.line}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Two prints pinned beside the why: the client's lifestyle set, the
              frames where the sample sleeve's mark is smallest. */}
          <div className={styles.prints} aria-hidden="true">
            <span className={`${styles.print} ${styles.printA}`}>
              <span className={styles.tape} />
              <Picture id="life-armful" sizes="(min-width: 900px) 260px, 46vw" alt="" tint={false} />
            </span>
            <span className={`${styles.print} ${styles.printB}`}>
              <span className={styles.tape} />
              <Picture id="life-cuddle" sizes="(min-width: 900px) 240px, 42vw" alt="" tint={false} />
            </span>
            <span className={`${styles.print} ${styles.printC}`}>
              <span className={styles.tape} />
              <Picture id="life-toddler-grip" sizes="(min-width: 900px) 200px, 34vw" alt="" tint={false} />
            </span>
          </div>
        </div>

        <BottleStage
          ducks={ducks.map((d) => ({ slug: d.slug, name: d.name, colour: d.colour, soft: d.soft }))}
          callouts={callouts}
        />

        <p className={styles.next}>
          <a href="#puddle">
            See how the Puddle works <span className={styles.nextArrow} aria-hidden="true">&darr;</span>
          </a>
        </p>
      </div>
    </section>
  )
}
