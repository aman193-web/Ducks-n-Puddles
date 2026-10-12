'use client'
import { useRef, useState } from 'react'
import {
  ArrowRight, At, ChatCircleDots, HandHeart, Handshake, InstagramLogo,
  Question, Sparkle, Storefront, UsersThree,
} from '@phosphor-icons/react/dist/ssr'
import { Duck } from '@/components/ui/Duck'
import { contactTopics } from '@/content/brand'
import { ContactForm } from './ContactForm'
import styles from './contact.module.css'

/* An icon per subject, keyed to the subject rather than to the brand.
 *
 * These were the bottle motifs — droplets, a flower, a footprint. On a MENU
 * that was the wrong job for them: a flower beside "Feedback & Suggestions"
 * tells you nothing, and the whole point of this grid is that somebody scanning
 * for "wholesale" finds it by shape before they read a word. The brand marks
 * still carry the decoration elsewhere (BrandDetail); here the icon has to say
 * what the card is. */
const ICONS: Record<string, typeof Question> = {
  product: Question,
  squad: UsersThree,
  feedback: ChatCircleDots,
  partnerships: Handshake,
  foundation: HandHeart,
  wholesale: Storefront,
  other: Sparkle,
}

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
          {/* THE THREE OF THEM, over the top of the card — the same device the
              FAQ ends on and that Join the Family carries, so a character beat
              on this page reads as the house idiom rather than as a one-off.
              Behind the card, so only their heads and shoulders clear its top
              edge: that is what makes it peeking rather than a picture sat on
              top of a form. Decorative, desktop only. */}
          <Duck who="trio" pose="walk" className={styles.peeker} sizes="260px" float />

          <div className={styles.card} ref={cardRef}>
            <div className={styles.cardHead}>
              <h2 className={styles.cardTitle} id="get-in-touch">Get in Touch</h2>
              <p className={styles.cardBlurb}>Tell us anything &mdash; we read all of it.</p>
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
          {contactTopics.map((t) => {
            const Icon = ICONS[t.key] ?? Sparkle
            return (
              <li key={t.key}>
                <button
                  type="button"
                  className={styles.topic}
                  aria-pressed={topic === t.key}
                  onClick={() => choose(t.key)}
                >
                  <span className={styles.topicIcon} aria-hidden="true">
                    <Icon size={20} weight="regular" />
                  </span>
                  <span className={styles.topicTitle}>{t.label}</span>
                  <p>{t.body}</p>
                  <span className={styles.topicGo}>
                    {topic === t.key ? 'Chosen' : 'Write about this'}
                    <ArrowRight size={13} weight="bold" aria-hidden="true" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    </>
  )
}
