import { Sticker } from '@/components/ui/Sticker'
import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { personalization } from '@/content/brand'
import styles from './PersonalizePuddle.module.css'

/**
 * PERSONALIZE YOUR PUDDLE — COMING SOON.
 *
 * The client's brief (Oct 2026), section 2. "Directly underneath the 'Meet the
 * Puddle' section, as a smaller feature preview", and smaller is the whole
 * design: one panel, not a full band, so it reads as a trailer for the section
 * above rather than as a second product announcement.
 *
 * THREE THINGS THE BRIEF FORBIDS, and none of them are here:
 *   · no purchase control and no customisation control — the only control in
 *     this section is the button to the newsletter;
 *   · nothing that implies the feature is available. The status chip says
 *     Coming Soon, every verb is future tense, and the artwork is captioned
 *     as a concept, not final;
 *   · no colour or design options. "For now, only introduce name
 *     personalization as a future offering" — so one Puddle, one name, and the
 *     name is the client's own example.
 *
 * NO FORM HERE. Section 7 asks for this to go through the EXISTING newsletter,
 * not a separate signup, so the button sends people to the newsletter band
 * (components/sections/Newsletter.tsx), which now carries their message and
 * tags the subscriber `interest:personalization`. See INTERESTS.
 */
export function PersonalizePuddle() {
  return (
    <section className={styles.section} id="personalize" aria-labelledby="personalize-title">
      <div className="wrap">
        <div className={styles.panel}>
          {/* Chi Chi, leaning in over the corner of the panel. The brave spark
              is the right one for the section about making it yours, and she is
              the duck whose bottle appears in the section above. */}
          <Duck who="chi-chi" pose="wave" className={styles.cameo} float />

          <div className={styles.say}>
            <Sticker colour="var(--sun-soft)" data-pop="">{personalization.status}</Sticker>
            <h2 id="personalize-title" className={`d ${styles.title}`} data-anim="">
              {personalization.title}
            </h2>
            <p className={`d ${styles.sub}`} data-anim="">{personalization.sub}</p>
            <p className={styles.body} data-anim="">
              <strong>{personalization.lede}</strong> {personalization.body}
            </p>
            <p className={styles.close} data-anim="">{personalization.close}</p>
            <div data-anim="">
              <Btn href="/#newsletter" colour="var(--sun-soft)">{personalization.signup.button}</Btn>
            </div>
          </div>

          {/* THE CONCEPT ARTWORK. The brief: "Show a concept image of the
              silicone Puddle with a child's name on it (for example, 'Lucy')."
              Lucy it is — the client's own render, still labelled as a concept
              because the feature is not available yet. */}
          <div className={styles.art} data-anim="" data-anim-y="24">
            <span className={styles.stage}>
              <Picture
                id="puddle-lucy"
                sizes="(min-width: 900px) 260px, 200px"
                alt={`Concept image: a blue silicone Puddle with the name ${personalization.sampleName} on it, filled with snacks`}
              />
            </span>
            <p className={styles.concept}>Concept artwork &mdash; not final</p>
          </div>
        </div>
      </div>
    </section>
  )
}
