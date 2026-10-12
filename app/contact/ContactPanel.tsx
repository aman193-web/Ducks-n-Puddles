'use client'
import { useRef, useState } from 'react'
import { ArrowRight, At, InstagramLogo } from '@phosphor-icons/react/dist/ssr'
import { Duck } from '@/components/ui/Duck'
import { Motif } from '@/components/Motif'
import { contactTopics } from '@/content/brand'
import { ContactForm } from './ContactForm'
import styles from './contact.module.css'

/* One tint per subject, rotating through the three soft brand fields, so seven
   cards are not seven identical rectangles. Fields, not the full-strength
   colours: these carry body copy. */
const TINTS = [
  'var(--vincey-field)', 'var(--chichi-field)', 'var(--goosey-field)',
  'var(--vincey-field)', 'var(--chichi-field)', 'var(--goosey-field)',
  'var(--vincey-field)',
]

/* The motif each subject carries. The three printed on the bottles, used as the
   brand's own bullet points. */
const MARKS = ['droplets', 'footprint', 'flower', 'waves', 'splash', 'footprints', 'duck'] as const

/**
 * THE CONTACT PANEL — the welcome beside the form, and the seven subjects
 * wired into it.
 *
 * Why this is one client component rather than a page with a form dropped in:
 * the subject the form is sending about has to be the same fact as the subject
 * card you pressed. Keeping the state here is what lets the seven cards below
 * DO something. Before, they were a menu of things you might write about,
 * printed under a form that had its own separate dropdown saying the same seven
 * words — which is the same list twice, once inert.
 *
 * Pressing a card now sets the subject, scrolls back to the form, and puts the
 * cursor in the message box. The scroll and the focus are separate on purpose:
 * `focus()` scrolls too, and its scroll is instant and lands with the field at
 * the very edge of the viewport, so the smooth scroll is run first and the
 * focus is told to keep its hands off (`preventScroll`).
 *
 * The left column's copy comes in as children so it stays server-rendered —
 * it is static prose and has no business shipping as JavaScript.
 */
export function ContactPanel({ email, instagram, children }: {
  email: string
  instagram: string
  children: React.ReactNode
}) {
  const [topic, setTopic] = useState(contactTopics[0].key)
  const cardRef = useRef<HTMLDivElement>(null)

  const choose = (key: string) => {
    setTopic(key)
    cardRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    /* Deliberately not the subject picker: the subject is already decided, and
       the next thing to do is write. */
    document.getElementById('c-message')?.focus({ preventScroll: true })
  }

  const handle = instagram.replace(/\/+$/, '').split('/').pop() ?? 'ducksnpuddles'

  return (
    <>
      <div className={styles.split}>
        <div className={styles.copy}>
          {children}

          <ul className={styles.direct}>
            <li>
              <a className={styles.line} href={`mailto:${email}`}>
                <span className={styles.lineIcon} aria-hidden="true">
                  <At size={20} weight="bold" />
                </span>
                <span>
                  <span className={styles.lineLabel}>Email us</span>
                  <span className={styles.lineValue}>{email}</span>
                </span>
              </a>
            </li>
            <li>
              <a className={styles.line} href={instagram} target="_blank" rel="noopener noreferrer">
                <span className={styles.lineIcon} aria-hidden="true">
                  <InstagramLogo size={20} weight="bold" />
                </span>
                <span>
                  <span className={styles.lineLabel}>Come say hi</span>
                  <span className={styles.lineValue}>@{handle}</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.formWrap}>
          {/* Goosey, waving over the top of the card. Decorative, desktop only. */}
          <Duck who="goosey" pose="wave" className={styles.peeker} sizes="170px" float />

          <div className={styles.card} ref={cardRef}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle} id="get-in-touch">Get in Touch</h2>
              <p className={styles.cardBlurb}>
                Whether you have a question, an idea to share, some feedback, or simply
                want to say hello, our inbox is always open. Send us a message, and
                we&rsquo;ll get back to you as soon as we can!
              </p>
            </div>
            <div className={styles.cardBody}>
              <ContactForm email={email} topic={topic} onTopic={setTopic} />
            </div>
          </div>
        </div>
      </div>

      <section className={styles.topics} aria-labelledby="specific">
        <header className={styles.topicsHead}>
          <h2 id="specific" className={styles.topicsTitle}>Looking for Something Specific?</h2>
          <p className={styles.topicsBlurb}>
            Pick the one that fits and we&rsquo;ll pop it straight into the form above.
          </p>
        </header>

        <ul className={styles.grid}>
          {contactTopics.map((t, i) => (
            <li key={t.key}>
              <button
                type="button"
                className={styles.topic}
                style={{ ['--tint' as string]: TINTS[i % TINTS.length] } as React.CSSProperties}
                aria-pressed={topic === t.key}
                onClick={() => choose(t.key)}
              >
                <span className={styles.topicTop}>
                  <Motif name={MARKS[i % MARKS.length]} size={22} />
                  <span className={styles.topicTitle}>{t.label}</span>
                </span>
                <p>{t.body}</p>
                <span className={styles.topicGo}>
                  {topic === t.key ? 'Chosen' : 'Write about this'}
                  <ArrowRight size={13} weight="bold" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
