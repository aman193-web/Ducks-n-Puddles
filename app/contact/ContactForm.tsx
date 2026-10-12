'use client'
import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { contactTopics } from '@/content/brand'
import styles from '../legal.module.css'

/**
 * THE CONTACT FORM — and it opens the visitor's own mail client rather than
 * posting anywhere. That is a deliberate choice, not a stub.
 *
 * There is nowhere to post to. The only endpoint this site has is
 * /api/subscribe, and its providers are AUDIENCE providers — a Mailchimp list,
 * a Resend contact book. None of them sends a message to anybody, so wiring
 * this to one would file support questions as newsletter subscriptions. And
 * building a /api/contact against no inbox would accept a message, say thank
 * you, and drop it — which is worse than having no form, because the visitor
 * believes they have been heard.
 *
 * A mailto hands the composed message to the visitor's own mail app, where
 * they can see it and press send. It cannot silently lose anything.
 *
 * TODO(client): give me a destination — a support inbox, a Formspree form id,
 * a webhook — and this becomes a POST. Everything above `href` stays; only
 * `onSubmit` changes.
 */
export function ContactForm({ email }: { email: string }) {
  const [topic, setTopic] = useState(contactTopics[0].key)
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [message, setMessage] = useState('')

  const label = contactTopics.find((t) => t.key === topic)?.label ?? 'Hello'

  const href = `mailto:${email}`
    + `?subject=${encodeURIComponent(label)}`
    + `&body=${encodeURIComponent(
        `${message}\n\n— ${name || 'A visitor'}${from ? `\n${from}` : ''}`,
      )}`

  return (
    <form
      className={styles.form}
      /* No action and no method: the submit opens a mailto instead. Handled
         here rather than with a plain <a> so the browser still runs `required`
         on the fields first. */
      onSubmit={(e) => { e.preventDefault(); window.location.href = href }}
    >
      <div className={styles.field}>
        <label htmlFor="c-topic">What is it about?</label>
        <select
          id="c-topic" name="topic" className={styles.select}
          value={topic} onChange={(e) => setTopic(e.target.value)}
        >
          {contactTopics.map((t) => (
            <option key={t.key} value={t.key}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="c-name">Your name</label>
          <input
            id="c-name" name="name" type="text" autoComplete="name" required
            className={styles.input} placeholder="So we know who we are talking to."
            value={name} onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="c-email">Your email</label>
          <input
            id="c-email" name="email" type="email" autoComplete="email" required
            className={styles.input} placeholder="Where we should write back."
            value={from} onChange={(e) => setFrom(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="c-message">Your message</label>
        <textarea
          id="c-message" name="message" rows={6} required
          className={styles.textarea} placeholder="Tell us everything."
          value={message} onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className={styles.formFoot}>
        <button type="submit" className={styles.send}>
          Send it over
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </button>
        {/* Said plainly, because it is not what a form usually does and a
            surprise at this point is how a message gets abandoned. */}
        <p className={styles.formNote}>
          This opens your email app with the message ready, so you can see it
          before it goes. Prefer to write it yourself?{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
    </form>
  )
}
