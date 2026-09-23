'use client'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Picture } from '@/components/Picture'
import { NameSticker } from '@/components/NameSticker'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { PuddleFace } from '@/components/ui/PuddleFace'
import { Duck } from '@/components/ui/Duck'
import { ducks } from '@/content/brand'
import { DUCKS } from '@/lib/subscribe-schema'
import { BrandDetail } from '@/components/ui/BrandDetail'
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
/** What being in the Squad actually gets you. Belonging, not benefits: each
 *  line is a thing that is true of members today, written as "you are", not
 *  "you will receive". No dates, no discounts, no invented perks. */
const SQUAD_PERKS: { title: string; body: string }[] = [
  { title: 'You are there first.',
    body: 'You hear the day the ducks arrive before the shop does.' },
  { title: 'You get a say.',
    body: 'Once a month we ask what to make next, and it changes what we build.' },
  { title: 'You are in their world.',
    body: 'The characters, the stories and the Foundation, as they happen.' },
]

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
      <BrandDetail preset="splashdown" />
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <Sticker colour="var(--sun-soft)" rot={-3} data-pop="" data-pop-rot="-3">Join the Duck Squad</Sticker>
          <h2 id="squad-title" className="d d-xl" data-anim="">
            Come into the pond.
          </h2>
          <p className={`lead ${styles.sub}`} data-anim="">
            The Duck Squad is where the Ducks &rsquo;n Puddles world opens up first. You will
            know before anyone else when the ducks arrive, and once a month we ask what we
            should make next. We mean that literally; it changes what we build.
          </p>

          {/* The client: "we'd like this to feel more like joining the Ducks 'n
              Puddles community/world rather than simply signing up for a
              newsletter." A form asking for an email reads as a newsletter no
              matter what the heading says, so this states what MEMBERSHIP is
              before the form asks for anything — three things you get by being
              in, in the language of belonging rather than of subscribing.
              Every line is something that is actually true today; none of it
              promises a date, a discount or a programme that does not exist. */}
          <ul className={styles.perks} data-anim="">
            {SQUAD_PERKS.map((p) => (
              <li key={p.title}>
                <span>
                  <strong>{p.title}</strong> {p.body}
                </span>
              </li>
            ))}
          </ul>
          {/* the payoff, and the thing that was leaving this column half empty
              next to a form four times its height */}
          {/* Goosey alone, greeting you beside the bottles — NOT the trio.
              trio-walk runs Chi Chi, Goosey, Vincey left to right while the
              bottle render runs Vincey, Chi Chi, Goosey, so overlaying them put
              the pink duck in front of the blue VINCEY bottle and quietly
              contradicted the "their Vincey" pairing the range cards make
              properly. One character implies no mapping, and Goosey is the
              right one to open a door with. */}
          <div className={styles.art} aria-hidden="true">
            <Picture id="trio" sizes="(min-width: 900px) 42vw, 78vw" alt="" data-bob="" />
            <Duck who="goosey" pose="wave" density="always" float
                  className={styles.artDuck} sizes="(min-width: 900px) 14vw, 26vw" />
          </div>

          <p className={styles.note}>
            We don&rsquo;t sell your address and we don&rsquo;t share it. One click to leave, any time.
          </p>
        </div>

        <div className={styles.panel}>
        {state === 'done' ? (
          <div className={styles.success} role="status" aria-live="polite">
            {/* Goosey cheering, because the moment someone joins the squad is
                exactly "there's always room for one more friend". */}
            <Duck who="goosey" pose="cheer" density="always"
                  className={styles.success_duck} float
                  sizes="180px" />
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
                    size="l"
                    /* d.soft, not d.colour. Every other control on the site
                       moved to the soft ramp; these two were the last at full
                       saturation, which is why they read as un-updated beside
                       everything else. It also buys contrast: --ink measures
                       8.4 / 7.7 / 11.1 on the soft blues, pink and yellow
                       against 4.97 / 4.50 / 8.88 on the full ones, where Chi
                       Chi sat exactly ON the AA minimum with nothing spare. */
                    colour={d.soft}
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

            <Btn type="submit" colour="var(--sun-soft)" block disabled={state === 'sending'}>
              {state === 'sending' ? 'One moment…' : 'Let me into the pond'}
            </Btn>
          </form>
        )}
        </div>
      </div>
    </section>
  )
}
