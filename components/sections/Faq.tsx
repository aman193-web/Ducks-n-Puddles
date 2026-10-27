import { Sticker } from '@/components/ui/Sticker'
import { FaqList } from '@/components/ui/FaqList'
import { Btn } from '@/components/ui/Btn'
import { Duck } from '@/components/ui/Duck'
import { homeFaqs, publishedFaqs, brand } from '@/content/brand'
import { BrandDetail } from '@/components/ui/BrandDetail'
import styles from './Faq.module.css'

/**
 * FAQs, on the benchmark's pattern: a stack of hairline-separated rows, the
 * question on the left, a coloured square affordance on the right, the answer
 * revealed underneath.
 *
 * Built on <details>/<summary> rather than a JS accordion. It is keyboard
 * operable and screen-reader correct for free, it works with JS off, and
 * ctrl/cmd-F finds text inside a closed row in Chrome. The first one ships open,
 * as theirs does, so the pattern explains itself.
 *
 * SIX ROWS, NOT ALL FOURTEEN. The client's Oct 2026 brief added four questions
 * about the Puddle, which would have made this the tallest section on the page
 * — 1577px before the additions — sitting between the newsletter band and the
 * signup form. So the homepage carries a spread across all four groups and
 * /faq carries the set. The six are chosen in content/brand.ts (`home: true`),
 * beside the answers, rather than by slicing the array here: a reordered list
 * would silently change which questions the homepage shows.
 */
export function Faq() {
  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <BrandDetail preset="shallows" />
      <div className="wrap">
        <div className={styles.head}>
          <Sticker data-pop="">Questions</Sticker>
          <h2 id="faq-title" className="d d-xl" data-anim="">Things parents ask us.</h2>
          <p className="lead" data-anim="">
            Still wondering something? Send us an email &mdash; we&rsquo;re always happy
            to talk.
          </p>
        </div>

        <FaqList items={homeFaqs()} name="faq" openFirst />

        {/* THE WAY THROUGH TO THE REST. Directly under the last row and above
            the sign-off, because that is where someone who did not find their
            question is looking. It carries the count so the link says what is
            behind it rather than just "more". */}
        <div className={styles.viewAll} data-anim="">
          <Btn href="/faq" colour="var(--sky-soft)">
            View all {publishedFaqs().length} questions
          </Btn>
        </div>

        {/* The FAQ was the last thing before the signup with no next step on it
            at all — you could read every answer and be left facing a full stop.
            Two doors, neither of them a hard sell: back to the characters for
            someone still deciding, forward to the Squad for someone who has. */}
        <div className={styles.next} data-anim="">
          <p className={styles.nextText}>
            <strong>Come along for the adventure.</strong> Be part of Ducks &rsquo;n
            Puddles as we grow.
          </p>
          <div className={styles.nextBtns}>
            {/* THE THREE OF THEM, PEEKING UP FROM BEHIND THE BUTTONS — the
                client's own suggestion for ending the FAQ: "you could have Chi
                Chi, Goosey, and Vincey peeking up from the bottom edge or
                walking toward the buttons."

                They sit BEHIND the buttons rather than beside them, so the
                buttons lose no room and nothing moves: only the top of each
                duck clears the button's edge, which is what makes it read as
                peeking rather than as a third element in the row. Decorative,
                aria-hidden and pointer-events: none by default, so the row is
                unchanged for the keyboard and for a screen reader. */}
            <Duck who="trio" pose="walk" className={styles.peek} float />
            <Btn href="/#squad" colour="var(--sun-soft)">Join the family</Btn>
            <Btn href={brand.instagram} colour="var(--sky-soft)">Follow along</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
