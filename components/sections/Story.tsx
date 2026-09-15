import { Picture } from '@/components/Picture'
import { Sticker } from '@/components/ui/Sticker'
import { brand } from '@/content/brand'
import styles from './Story.module.css'

/**
 * Copy is deliberately shorter than the long-form version it replaced: the
 * section now has to sit beside an image in a single frame, and four paragraphs
 * pushed it past the fold. The founder story in full belongs on /our-story.
 */
export function Story() {
  return (
    <section className={styles.section} id="story" aria-labelledby="story-title">
      <div className="wrap">
        <div className={styles.grid}>
          <figure className={styles.figure} data-anim="" data-anim-rot="-2">
            <Sticker className={styles.badge} colour="var(--goosey)" rot={9}
                     data-pop="" data-pop-rot="9">
              South Florida
            </Sticker>
            <Picture id="shell-hands" sizes="(min-width: 900px) 46vw, 92vw" />
          </figure>

          <div className={styles.body}>
            <Sticker colour="var(--chichi)" rot={-2} data-pop="" data-pop-rot="-2">Our story</Sticker>
            <h2 id="story-title" className={`d ${styles.title}`} data-anim="">
              It started with two kids and a lot of spilled water.
            </h2>
            <p data-anim="">
              We&rsquo;re Larissa and Vinnie. Lucy answers to two nicknames &mdash; Chi&nbsp;Chi
              and Goosey &mdash; so both became ducks. Vinci is Vincey, and Vincey does not
              walk anywhere. That is genuinely where they came from: not a brief, what we
              actually call our children.
            </p>
            <p data-anim="">
              You get careful about everything once you have kids. Then you hand them a
              bottle you know almost nothing about, and it is in their mouth all day. So we
              decided to make one.
            </p>
            <p className={`hand ${styles.pull}`} data-anim="" data-anim-rot="2">
              I would rather be late than hand Lucy something I wasn&rsquo;t sure about.
            </p>
            <div className={styles.sig} data-anim="">
              <img src="/img/mascot-140.webp" width={42} height={47} alt="" className="wiggle" />
              <span className="hand">&mdash; Larissa</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
