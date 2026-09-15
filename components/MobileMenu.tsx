'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Pill } from './ui/Pill'
import { Btn } from './ui/Btn'
import styles from './MobileMenu.module.css'

const NAV = [
  { href: '/#ducks', label: 'The Ducks' },
  { href: '/#features', label: 'Features' },
  { href: '/#store', label: 'The Range' },
  { href: '/#store', label: 'Store', note: 'Coming soon' },
  { href: '/#story', label: 'Our Story' },
  { href: '/journal', label: 'Journal' },
]

/**
 * Mobile navigation. Without this the small-viewport header carried no links and
 * no CTA at all — on a site whose first stated requirement is mobile-first.
 *
 * Focus moves into the sheet on open and returns to the trigger on close, Escape
 * dismisses, and the page behind is locked from scrolling.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLSpanElement>(null)
  const sheet = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    sheet.current?.querySelector<HTMLElement>('a,button')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      trigger.current?.querySelector('button')?.focus()
    }
  }, [open])

  /* The sheet is portalled to <body> rather than rendered in place. The header's
     entrance animation leaves a transform on its action group, and ANY non-none
     transform makes an element the containing block for position:fixed — which
     collapsed the full-screen sheet into a small box in the corner. A portal is
     immune to whatever an ancestor does. */
  const sheetEl = open ? (
    <div className={styles.sheet} id="mobile-menu" ref={sheet} role="dialog" aria-modal="true"
         aria-label="Menu">
        <div className={styles.sheetTop}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)}>
            <span className="vh">Close menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className={styles.links} aria-label="Primary">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} onClick={() => setOpen(false)}>
              <span>
                {n.label}
                {n.note && <em className={styles.note}>{n.note}</em>}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </Link>
          ))}
        </nav>

        <div className={styles.foot}>
          <Btn href="/#squad" colour="var(--sun)" block>Join the Duck Squad</Btn>
        </div>
    </div>
  ) : null

  return (
    <>
      <span className={styles.triggerWrap} ref={trigger}>
        <Pill
          icon="menu"
          label="Open menu"
          bg="var(--sky)"
          discBg="var(--sky)"
          discInk="var(--ink)"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        />
      </span>
      {sheetEl && createPortal(sheetEl, document.body)}
    </>
  )
}
