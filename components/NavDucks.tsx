'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { ducks } from '@/content/brand'
import styles from './SiteHeader.module.css'

/**
 * "The Ducks", with the three bottles' own pages under it.
 *
 * The label itself still goes to the homepage section, as it always has; the
 * menu opens on hover, and on focus for the keyboard. It closes on Escape, when
 * the pointer or focus leaves, and once a bottle is chosen — the header lives in
 * the layout, so after a client-side navigation it would otherwise stay open on
 * the new page.
 */
export function NavDucks() {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  return (
    <div
      className={styles.drop}
      data-open={open || undefined}
      ref={root}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) setOpen(false) }}
      onKeyDown={(e) => {
        if (e.key !== 'Escape' || !open) return
        setOpen(false)
        root.current?.querySelector<HTMLElement>('a')?.focus()
      }}
    >
      <Link href="/#ducks" aria-haspopup="true" aria-expanded={open}>
        <span className={styles.roll}><span>The Ducks</span></span>
        <svg className={styles.caret} width="12" height="12" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"
             aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Link>
      <ul className={styles.menu}>
        {ducks.map((d) => (
          <li key={d.slug}>
            <Link href={`/ducks/${d.slug}`} onClick={() => { setOpen(false); (document.activeElement as HTMLElement)?.blur() }}
                  style={{ ['--duck' as string]: d.colour } as React.CSSProperties}>
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.item}>
                <span className={styles.itemName}>{d.name}</span>
                <span className={styles.itemRole}>{d.role}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
