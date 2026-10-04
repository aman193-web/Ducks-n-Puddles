'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGsap, prefersReduced } from '@/lib/motion'
import { useSearchParams } from 'next/navigation'
import { Picture } from '@/components/Picture'
import { asset } from '@/lib/assets'
import { Duck } from '@/components/ui/Duck'
import { NameSticker } from '@/components/NameSticker'
import { Btn } from '@/components/ui/Btn'
import { Sticker } from '@/components/ui/Sticker'
import { PuddleFace } from '@/components/ui/PuddleFace'
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
/* The client's Sep 2026 wording, verbatim. */
const SQUAD_PERKS: { title: string; body: string }[] = [
  { title: 'Be the first to know.',
    body: 'New ducks, products, stories, and launches \u2014 straight from the pond.' },
  { title: 'Get a peek behind the scenes.',
    body: 'Come along as we build Ducks \u2019n Puddles, from first ideas to finished products.' },
  { title: 'Help shape what\u2019s next.',
    body: 'We\u2019ll ask what you love, what you need, and what you\u2019d like us to create next.' },
]

/**
 * WHO PEEKS OUT OF WHICH BOTTLE, AND FROM WHICH SIDE.
 *
 * `edge` is a percentage of the trio render's own width, read off the file's
 * alpha channel rather than guessed: its three bottles occupy 0.5-28.2%,
 * 35.3-63.6% and 70.6-99.2%. So 0.5% is the LEFT edge of the first bottle,
 * 49.45% is the middle of the second, and 99.2% is the RIGHT edge of the
 * third — and because they are percentages, each duck stays on its own bottle
 * at every width instead of sliding across the set as the column grows.
 *
 * `side` drives both the CSS placement and the direction the duck enters from,
 * which have to agree: a duck that is hidden to the RIGHT has to travel LEFT
 * to appear, or it slides further under the bottle instead of out from it.
 */
const PEEKERS = [
  { id: 'vincey-peek-left',  side: 'fromLeft'  as const, edge: '0.5%' },
  { id: 'chichi-peek-top',   side: 'fromTop'   as const, edge: '49.45%' },
  { id: 'goosey-peek-right', side: 'fromRight' as const, edge: '99.2%' },
]

/** Where each one starts: behind its bottle, offset the way it will travel
 *  back from. The numbers are the client's. */
const PEEK_FROM = {
  fromLeft:  { x: 35,  y: 0 },
  fromTop:   { x: 0,   y: 45 },
  fromRight: { x: -35, y: 0 },
}

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

  /* ---- THE DUCKS COMING OUT FROM BEHIND THE BOTTLES ----------------------
     GSAP owns x / y / opacity on these three outright. They carry no data-anim
     or data-pop and are not inside the hero, so nothing else writes a
     transform here — see the channel note at the top of Hero.module.css. The
     horizontal centring of the middle duck is on `translate`, a different
     property, so the two compose instead of overwriting each other. */
  const art = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = art.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>('[data-peeker]'))
    if (!els.length) return
    /* The whole art block is display:none below 900px — the form is the job on
       a phone. No boxes means nothing to animate and no observer to leave
       running. */
    if (!els[0].getClientRects().length) return

    /* Composed and still, in their final positions, for anyone who asked for
       less motion. The ducks are the point; they are never withheld. */
    if (prefersReduced()) {
      gsap.set(els, { opacity: 1, x: 0, y: 0 })
      return
    }

    initGsap()
    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const from = PEEK_FROM[el.dataset.peeker as keyof typeof PEEK_FROM]
        gsap.set(el, { opacity: 0, ...from })
      })

      const tl = gsap.timeline({ paused: true })
      tl.to(els, {
        opacity: 1, x: 0, y: 0,
        duration: 0.8,
        ease: 'back.out(1.4)',
        stagger: 0.18,
        /* THE IDLE STARTS ONLY WHEN THE ENTRANCE IS DONE. Both write `y`, so
           overlapping them would have the loop fighting the arrival — and on
           the middle duck, which arrives ON y, it would fight it visibly. */
        onComplete: () => {
          els.forEach((el, i) => {
            gsap.to(el, {
              y: -4,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              /* Out of phase, so three ducks never breathe in lockstep. */
              delay: i * 0.3,
            })
          })
        },
      })

      ScrollTrigger.create({
        trigger: root.closest('section') ?? root,
        start: 'top 75%',
        once: true,
        onEnter: () => tl.play(),
      })
      /* A refresh partway down the page, or a jump straight to #squad, never
         crosses that line — so the trigger never fires and three ducks would
         sit at opacity 0 for good. */
      if (root.getBoundingClientRect().top < window.innerHeight * 0.75) tl.play()
    }, root)

    return () => ctx.revert()
  }, [])

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
          <Sticker colour="var(--sun-soft)" rot={-3} data-pop="" data-pop-rot="-3">Join the family</Sticker>
          <h2 id="squad-title" className="d d-xl" data-anim="">
            Come Into the Pond.
          </h2>
          <p className={`lead ${styles.sub}`} data-anim="">
            Be part of the Ducks &rsquo;n Puddles world as it grows. Get little notes from
            the pond, first looks at what&rsquo;s coming, and a chance to help shape what
            we create next.
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
          <div className={styles.art} aria-hidden="true" ref={art}>
            {/* THREE DUCKS, THREE DIFFERENT EDGES — and the art is cut for it.
                The `-peeking` set every other section uses is cut on its left
                edge only, so all three of those can hide behind a bottle's
                RIGHT side and nowhere else; this is what made the first pass
                here read as one move repeated three times. The new poses are
                cut one side each: Vincey on his right so he leans out to the
                LEFT of the first bottle, Chi Chi along her bottom so she comes
                over the TOP of the middle one, Goosey on his left so he leans
                out to the RIGHT of the last.

                Every position is a percentage of the trio render's own alpha —
                its three bottles occupy 0.5-28.2%, 35.3-63.6% and 70.6-99.2%
                of the image's width — so the ducks stay on their bottles at any
                size rather than drifting across them as the column grows.

                The render is z-index 1 and the ducks 0, so they are genuinely
                behind it: the entrance below slides each one OUT from under the
                bottle rather than fading it in beside one. */}
            <Picture id="trio" sizes="(min-width: 900px) 42vw, 78vw" alt="" data-bob="" />
            {PEEKERS.map((pk) => (
              <span
                key={pk.id}
                className={`${styles.peek} ${styles[pk.side]}`}
                data-peeker={pk.side}
                style={{
                  ['--edge' as string]: pk.edge,
                  ['--peek-aspect' as string]: String(asset(pk.id).aspect),
                } as React.CSSProperties}
              >
                <Picture id={pk.id} sizes="(min-width: 900px) 10vw, 24vw" alt="" />
              </span>
            ))}
          </div>

        </div>

        <div className={styles.panel}>
        {state === 'done' ? (
          <div className={styles.success} role="status" aria-live="polite">
            {/* The puddle face, back in place of the Goosey render. Its eyes
                follow the cursor, so the panel that confirms you joined is the
                one thing on the page that looks back — which a still image of a
                duck cannot do. It rests centred on touch and under reduced
                motion, where the face still reads. */}
            <div className={styles.success_face}>
              <PuddleFace colour="var(--sun)" />
            </div>
            <h3 className="d d-lg">You&rsquo;re in.</h3>
            <p className="hand">Check your inbox to confirm &mdash; we only count you once you do.</p>
            <p className={styles.note}>Nothing there in a few minutes? Have a look in Promotions.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <fieldset className={styles.pick}>
              <legend className={styles.pickLabel}>Which duck is your little one most like?</legend>
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
              <label htmlFor="firstName">First name</label>
              <input id="firstName" name="firstName" autoComplete="given-name"
                     placeholder="So we know what to call you." />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required autoComplete="email"
                     placeholder="Where should we send your notes from the pond?" />
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
                <span>Yes, I&rsquo;d like to receive Ducks &rsquo;n Puddles emails.</span>
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
