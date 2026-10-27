'use client'
import { useId, useRef, useState } from 'react'
import type { INTERESTS } from '@/lib/subscribe-schema'
import styles from './FooterSignup.module.css'

type Interest = (typeof INTERESTS)[number]

interface Props {
  /** The submit button's accessible name. It is an arrow glyph, so this is the
   *  only name it has. Defaults to the Duck Squad wording used everywhere else;
   *  the personalisation block passes the client's own "Be the First to Know". */
  label?: string
  /** Show `label` as the button's text instead of the arrow alone. */
  showLabel?: boolean
  /** Tags the subscriber with what brought them here — see INTERESTS. */
  interest?: Interest
}

/**
 * Footer signup. Posts to the same /api/subscribe endpoint as the Duck Squad
 * section, so there is one list, one provider adapter and one honeypot rule —
 * only the presentation differs.
 */
export function FooterSignup({ label = 'Join the Duck Squad', showLabel, interest }: Props) {
  /* The ids used to be the literals `footer-email` / `footer-company`, which was
     safe only while this rendered once per page. The blog sign-off band now
     carries a second instance, and two elements sharing an id silently break
     the label association for both. */
  const uid = useId()
  const emailId = `signup-email-${uid}`
  const companyId = `signup-company-${uid}`
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const mounted = useRef(Date.now())

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setState('sending'); setMessage('')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: String(fd.get('email') ?? ''),
        duck: 'undecided',
        ...(interest ? { interest } : {}),
        consent: true,
        company: String(fd.get('company') ?? ''),
        elapsedMs: Date.now() - mounted.current,
      }),
    }).catch(() => null)

    const body = await res?.json().catch(() => null)
    if (res?.ok && body?.ok) { setState('done'); return }
    setState('error')
    setMessage(body?.message ?? 'We couldn’t reach the pond. Try again in a moment?')
  }

  if (state === 'done') {
    return (
      <p className={styles.msg} role="status" aria-live="polite">
        You&rsquo;re in &mdash; check your inbox to confirm.
      </p>
    )
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor={emailId} className="vh">Your email address</label>
      <div className={styles.pill}>
        <input
          id={emailId} name="email" type="email" required
          autoComplete="email" placeholder="Enter your email"
        />
        <button type="submit" className={showLabel ? `${styles.go} ${styles.goText}` : styles.go}
                disabled={state === 'sending'}>
          <span className={showLabel ? undefined : 'vh'}>{label}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Honeypot — off-screen rather than display:none, which some bots skip. */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={companyId}>Company</label>
        <input id={companyId} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state === 'error' && (
        <p className={`${styles.msg} ${styles.err}`} role="alert">{message}</p>
      )}

      <p className={styles.fine}>
        By subscribing you agree to receive email from us and accept our{' '}
        <a href="/privacy">privacy policy</a>. One click to leave, any time.
      </p>
    </form>
  )
}
