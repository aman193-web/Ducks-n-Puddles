'use client'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Picture } from '@/components/Picture'
import { NameSticker } from '@/components/NameSticker'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { PuddleFace } from '@/components/ui/PuddleFace'
import { ducks } from '@/content/brand'
import { DUCKS } from '@/lib/subscribe-schema'
import styles from './Squad.module.css'

type Duck = (typeof DUCKS)[number]

/**
 * Picking a duck is the child's job and the parent types the email — a form a
 * four-year-old takes part in is a form that gets finished, and it hands the client
 * clean segmentation as a side effect rather than as a tax on the visitor.
 *
 * Deliberately absent: signup counters, countdowns, "only 50 spots left", and any
 * number we cannot stand behind.
 */
export function Squad() {
  /* 'undecided' is still the value posted when nobody picks — it just no longer
     has a button of its own, which was an option competing with the three that
     matter. */
  const [duck, setDuck] = useState<Duck>('undecided')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const mounted = useRef(0)

  /* `useSearchParams` rather than a one-off read on mount. The range cards link
     to /?duck=x#squad from further up the SAME page, which Next handles as a
     client navigation — it fires neither `hashchange` (the query changed too)
     nor `popstate` (it is a push, not a pop), so a listener-based read never
     saw it. This hook re-renders on exactly that navigation. */
  const params = useSearchParams()

  useEffect(() => { mounted.current = Date.now() }, [])

  useEffect(() => {
    const q = params.get('duck')
      ?? new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('duck')
    if (q && (DUCKS as readonly string[]).includes(q)) setDuck(q as Duck)
  }, [params])

  const selected = ducks.findIndex((d) => d.slug === duck)
  const rovingIndex = selected === -1 ? 0 : selected

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setState('sending'); setMessage('')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: String(fd.get('email') ?? ''),
        firstName: String(fd.get('firstName') ?? ''),
        duck,
        consent: fd.get('consent') === 'on',
        company: String(fd.get('company') ?? ''),
        elapsedMs: Date.now() - mounted.current,
      }),
    }).catch(() => null)

    const body = await res?.json().catch(() => null)
    if (res?.ok && body?.ok) { setState('done'); return }
    setState('error')
    setMessage(body?.message ?? 'We couldn’t reach the pond. Try again in a moment?')
  }

  return (
    <section className={styles.section} id="squad" aria-labelledby="squad-title">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <Sticker colour="var(--sun)" rot={-3} data-pop="" data-pop-rot="-3">Join the Duck Squad</Sticker>
          <h2 id="squad-title" className="d d-xl" data-anim="">
            Come into the pond.
          </h2>
          <p className={`lead ${styles.sub}`} data-anim="">
            The Duck Squad is where the Ducks &rsquo;n Puddles world opens up first. You will
            know before anyone else when the ducks arrive, and once a month we ask what we
            should make next. We mean that literally; it changes what we build.
          </p>
          {/* the payoff, and the thing that was leaving this column half empty
              next to a form four times its height */}
          <div className={styles.art} aria-hidden="true">
            <Picture id="trio" sizes="(min-width: 900px) 42vw, 78vw" alt="" data-bob="" />
          </div>

          <p className={styles.note}>
            We don&rsquo;t sell your address and we don&rsquo;t share it. One click to leave, any time.
          </p>
        </div>

        <div className={styles.panel}>
        {state === 'done' ? (
          <div className={styles.success} role="status" aria-live="polite">
            <div style={{ inlineSize: 180 }}><PuddleFace colour="var(--sun)" /></div>
            <h3 className="d d-lg">You&rsquo;re in.</h3>
            <p className="hand">Check your inbox to confirm &mdash; we only count you once you do.</p>
            <p className={styles.note}>Nothing there in a few minutes? Have a look in Promotions.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <fieldset className={styles.pick}>
              <legend className={styles.pickLabel}>Which duck is your kid&rsquo;s?</legend>
              <div className={styles.stickers} role="radiogroup" aria-label="Pick your duck">
                {ducks.map((d, i) => (
                  <NameSticker
                    key={d.slug}
                    as="button"
                    role="radio"
                    ariaChecked={duck === d.slug}
                    /* Roving tabindex. With "Still deciding" gone, nothing is
                       selected on load — without this fallback every option
                       would be tabIndex -1 and the group unreachable. */
                    tabIndex={i === rovingIndex ? 0 : -1}
                    name={d.stickerName}
                    motif={d.motif}
                    colour={d.colour}
                    onClick={() => setDuck(d.slug as Duck)}
                  />
                ))}
              </div>
            </fieldset>

            <div className={styles.field}>
              <label htmlFor="firstName">First name (optional)</label>
              <input id="firstName" name="firstName" autoComplete="given-name"
                     placeholder="So we can say hi properly" />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                     placeholder="name@example.com" />
            </div>

            {/* Honeypot — positioned off-screen rather than display:none, which some bots skip. */}
            <div className={styles.hp} aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" tabIndex={-1} autoComplete="off" />
            </div>

            {/* The privacy link lives OUTSIDE the label: nested inside it, a tap would
                both follow the link and toggle the checkbox. */}
            <div className={styles.consentRow}>
              <label className={styles.consent} htmlFor="consent">
                <input id="consent" type="checkbox" name="consent" required />
                <span>Email me about Ducks &rsquo;n Puddles. Nothing else, ever.</span>
              </label>
              <a className={styles.privacy} href="/privacy">Read the privacy policy</a>
            </div>

            {state === 'error' && <p className={styles.error} role="alert">{message}</p>}

            <Btn type="submit" colour="var(--sun)" block disabled={state === 'sending'}>
              {state === 'sending' ? 'One moment…' : 'Quack me up'}
            </Btn>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}
