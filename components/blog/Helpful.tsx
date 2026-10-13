'use client'
import { useEffect, useState } from 'react'
import { ThumbsDown, ThumbsUp } from '@phosphor-icons/react/dist/ssr'
import styles from './blog-extras.module.css'

/**
 * "WAS THIS HELPFUL?" — the reference's feedback widget.
 *
 * ⚠️⚠️ NOTHING IS COLLECTED. There is no analytics on this site and no endpoint
 * to send a vote to, so a press is remembered in the VISITOR'S OWN BROWSER and
 * goes nowhere else. That is the only honest version of this control until
 * there is somewhere to put the answer: the alternative is a button that says
 * "thanks for the feedback" while dropping it, which is the same lie the
 * contact form was built to avoid.
 *
 * The wording is chosen to match: it thanks them for the press, it does not
 * claim the answer reached anybody.
 *
 * TODO(client): give me a destination — an analytics event, an endpoint, a
 * webhook — and `record` becomes one line. Everything else here stays.
 */
export function Helpful({ slug }: { slug: string }) {
  const key = `dnp:helpful:${slug}`
  const [vote, setVote] = useState<'yes' | 'no' | null>(null)

  /* Read after mount, never during render: localStorage does not exist on the
     server, and reading it in render would make the markup differ between the
     two and trip hydration. */
  useEffect(() => {
    try {
      const v = localStorage.getItem(key)
      if (v === 'yes' || v === 'no') setVote(v)
    } catch { /* private mode, blocked storage — the control still works */ }
  }, [key])

  const record = (v: 'yes' | 'no') => {
    setVote(v)
    try { localStorage.setItem(key, v) } catch { /* nothing to do about it */ }
  }

  return (
    <aside className={styles.helpful} aria-live="polite">
      {vote ? (
        <p className={styles.helpfulThanks}>
          {vote === 'yes'
            ? 'Glad it helped — thank you.'
            : 'Thank you for saying so.'}
        </p>
      ) : (
        <>
          <p className={styles.helpfulAsk}>Was this helpful?</p>
          <div className={styles.helpfulBtns}>
            <button type="button" className={styles.helpfulBtn} onClick={() => record('yes')}>
              <ThumbsUp size={17} weight="bold" aria-hidden="true" />
              Yes, it was
            </button>
            <button type="button" className={styles.helpfulBtn} onClick={() => record('no')}>
              <ThumbsDown size={17} weight="bold" aria-hidden="true" />
              Not really
            </button>
          </div>
        </>
      )}
    </aside>
  )
}
