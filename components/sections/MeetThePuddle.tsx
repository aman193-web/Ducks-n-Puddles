import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { Duck } from '@/components/ui/Duck'
import { Motif } from '@/components/Motif'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { puddle, puddleSleeveOnly, SNACK_CLAIMS_APPROVED } from '@/content/brand'
import styles from './MeetThePuddle.module.css'

/**
 * MEET THE PUDDLE — the 2-in-1 silicone sleeve.
 *
 * The client's brief (Oct 2026), section 1. Their placement note says "directly
 * below the section introducing our three water bottles, and before 'Made with
 * Parents in Mind'", which lands it exactly here: after <Store> and before
 * <Specs>, whose heading is "Made with parents in mind."
 *
 * THE VISUAL is the thing this section has to get right, and their instruction
 * is specific: one image of the bottle with the sleeve on, and beside it the
 * Puddle removed and filled with snacks.
 *
 * CHI CHI'S BOTTLE, not Vincey's, and for one reason: her body is pink and her
 * Puddle is blue, so the sleeve reads as a separate part at a glance. Vincey is
 * blue on blue and Goosey is yellow on blue but with far less contrast — on
 * both of those the sleeve looks like the bottom of the bottle, which is the
 * one thing this section cannot let a reader think. The detached Puddle beside
 * her is the SAME blue, so the eye pairs them without being told.
 *
 * The detached Puddle is the client's own render (`puddle-snacks`), which
 * replaced the drawn PuddleShape that stood in until it arrived.
 *
 * ⚠️ HALF OF THIS SECTION IS GATED. The snack-holder claim is not approved for
 * publication yet (the client's own instruction, brief section 8), so with
 * SNACK_CLAIMS_APPROVED false this degrades to the protective sleeve alone:
 * one panel, their sleeve-only wording, and no snacks in the artwork. It stays
 * a finished section either way rather than a page with a hole in it.
 */
export function MeetThePuddle() {
  /* BY ROLE, NOT BY INDEX. The first draft filtered the snack bullet out of the
     array and then read the third one as `parts[parts.length - 1]` — so with
     the gate closed "Made for Everyday Adventures", which makes no snack claim
     at all, silently disappeared along with it. */
  const [sleeve, snack, everyday] = puddle.parts

  return (
    <section className={styles.section} id="puddle" aria-labelledby="puddle-title">
      <BrandDetail preset="droplets" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker colour="var(--sky-soft)" data-pop="">{puddle.eyebrow}</Sticker>
          {/* The marketing message carries the display size, and takes its own
              clamp rather than --fs-xl. It is two SENTENCES — 53 characters
              against the 29 of "A Friend for Every Adventure." — and at the
              section size it ran to four lines and swamped the head. Why.tsx
              sets the precedent and the same value: the one other heading on
              this page that is a long sentence steps down too.
              ⚠️ IT IS ALSO ITSELF A SNACK CLAIM — "The Puddle Holds the Snack."
              It was the one line the first version of the gate left standing,
              at the top of the section, in the display face. */}
          <div className={styles.headMain}>
            <h2 id="puddle-title" className={`d ${styles.title}`} data-anim="">
              {SNACK_CLAIMS_APPROVED ? puddle.message : puddleSleeveOnly.message}
            </h2>
            {/* UNDER THE HEADLINE, in its cell — not centred on a row of its
                own. The head is a two-column grid whose height is set by a
                seven-line lead on the right, so the heading left 119px of bare
                yellow beneath it while this line sat in a band below BOTH
                columns. One move fills the hole and removes the band. */}
            {SNACK_CLAIMS_APPROVED && (
              <p className={`d ${styles.purpose}`} data-anim="">{puddle.purpose}</p>
            )}
          </div>
          <p className="lead measure" data-anim="">
            <strong className={styles.lede}>{puddle.lede}</strong>{' '}
            {SNACK_CLAIMS_APPROVED ? puddle.body : puddleSleeveOnly.body}
          </p>
        </div>

        {/* THE TWO PANELS. A three-column grid at width — panel, the slide
            marker, panel — collapsing to one column with the marker rotated a
            quarter turn, so the gesture still points from the bottle to the
            Puddle when they are stacked rather than side by side. */}
        <div className={`${styles.showcase} ${SNACK_CLAIMS_APPROVED ? '' : styles.showcaseSolo}`}>
          <figure className={`${styles.panel} ${styles.panelBottle}`} data-anim="" data-anim-y="24">
            {/* `sizes` is the BOTTLE's box, not the panel's. The art box is
                --art-h tall and the render is 0.446 wide to tall, so the image
                is 98px wide below 846, 11.6vw between, and 163px from 1408 up.
                Declaring the panel width instead pulled the 621px source for a
                bottle drawn at 163. */}
            <span className={`${styles.art} ${styles.artBottle}`}>
              <span className={styles.floor} aria-hidden="true" />
              <Picture
                id="chichi"
                sizes="(min-width: 1408px) 163px, (min-width: 846px) 11.6vw, 98px"
                alt="A Ducks ’n Puddles bottle with its silicone Puddle on, covering the lower half of the bottle."
              />
            </span>
            <figcaption className={styles.cap}>
              <span className={styles.num} aria-hidden="true">1</span>
              <span className={styles.capText}>
                <strong>{sleeve.label}</strong>
                {sleeve.body}
              </span>
            </figcaption>
          </figure>

          {SNACK_CLAIMS_APPROVED && (
            <>
              <span className={styles.slide} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"
                     strokeLinecap="round" strokeLinejoin="round" focusable="false">
                  <path d="M4 12h14M13 6l6 6-6 6" />
                </svg>
              </span>

              <figure className={`${styles.panel} ${styles.panelPuddle}`} data-anim="" data-anim-y="24">
                <span className={`${styles.art} ${styles.artPuddle}`}>
                  <span className={styles.floor} aria-hidden="true" />
                  {/* GOOSEY, AND WHY HE IS HERE. This was the only product
                      section on the site with no character in it — two boxes
                      and an arrow, an instruction manual on a page where every
                      other section has something alive in it.
                      He is the right one of the three: "there's always room for
                      one more" is his line off the character sheet, and this is
                      the part of the bottle you share out of. He stands BEHIND
                      the Puddle, on its floor, so he reads as reaching into it
                      rather than posed next to it. */}
                  <Duck
                    who="goosey" pose="cheer" density="always" float
                    className={styles.snacker}
                    sizes="(min-width: 1408px) 177px, (min-width: 909px) 12.5vw, 114px"
                    alt=""
                  />
                  {/* The client's own render of the Puddle off the bottle and
                      full of snacks. Its background is transparent, so Goosey
                      still shows through above the wavy rim. */}
                  <span className={styles.puddleArt}>
                    <Picture
                      id="puddle-snacks"
                      sizes="(min-width: 1408px) 236px, (min-width: 909px) 16.7vw, 152px"
                      alt="The silicone Puddle taken off the bottle and filled with snacks."
                    />
                  </span>
                </span>
                <figcaption className={styles.cap}>
                  <span className={styles.num} aria-hidden="true">2</span>
                  <span className={styles.capText}>
                    <strong>{snack.label}</strong>
                    {snack.body}
                  </span>
                </figcaption>
              </figure>
            </>
          )}
        </div>

        {/* The third of the client's bullets. It is not a part of the product
            like the two above it, it is what both parts are FOR — so it runs
            the full width under them rather than becoming a third panel. */}
        {/* The third of the client's bullets. It is not a part of the product
            like the two above it, it is what both parts are FOR — so it runs
            the full width under them rather than becoming a third panel. */}
        <p className={styles.everyday} data-anim="">
          <span className={styles.everydayMark} aria-hidden="true">
            <Motif name="splash" size={22} />
          </span>
          <span>
            <strong>{everyday.label}.</strong> {everyday.body}
          </span>
        </p>

        <p className={`d ${styles.close}`} data-anim="">{puddle.close}</p>
      </div>
    </section>
  )
}
