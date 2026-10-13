'use client'
import { useState } from 'react'
import {
  Check, Copy, Envelope, FacebookLogo, WhatsappLogo, XLogo,
} from '@phosphor-icons/react/dist/ssr'
import styles from './blog-extras.module.css'

/**
 * SHARE, on the client's reference.
 *
 * WHICH NETWORKS IS NOT THE REFERENCE'S LIST. Theirs is Twitter, LinkedIn,
 * Facebook, Reddit, Hacker News, email and a copy link — a set aimed at
 * accountants. LinkedIn, Reddit and Hacker News are not where a parent shares a
 * post about a toddler's water bottle, and a row of dead-weight icons is worse
 * than a short row. This is Facebook, X, WhatsApp, email and copy, and WhatsApp
 * is in it because it is how parents actually pass things to each other.
 *
 * Instagram has no share URL at all — no web intent exists — so it is absent
 * rather than linked to something that would not work.
 *
 * The URL is passed in rather than read from `window`: it is known on the
 * server, and reading location would make the markup depend on hydration.
 */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  /* FROM PHOSPHOR, which the site already depends on — the Nucleo set is out at
     the client's request, and pulling a third-party icon library into a public
     repo for three glyphs was never worth the licence question anyway.
     All at weight="fill": solid marks, each in its own colour, on the site's
     own outlined chip. */
  const links = [
    { key: 'facebook', label: 'Share on Facebook', Icon: FacebookLogo, colour: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { key: 'x', label: 'Share on X', Icon: XLogo, colour: '#0F1419',
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { key: 'whatsapp', label: 'Share on WhatsApp', Icon: WhatsappLogo, colour: '#25D366',
      href: `https://wa.me/?text=${t}%20${u}` },
    { key: 'email', label: 'Share by email', Icon: Envelope, colour: 'var(--duck-blue)',
      href: `mailto:?subject=${t}&body=${u}` },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* Clipboard access can be refused — an insecure origin, a permission
         prompt declined. Say nothing rather than claim a copy that did not
         happen; the address bar still has the URL. */
    }
  }

  return (
    <div className={styles.share}>
      <p className={styles.shareLabel}>Share this</p>
      <ul className={styles.shareList}>
        {links.map(({ key, label, href, colour, Icon }) => (
          <li key={key}>
            <a
              className={styles.shareBtn} href={href}
              target="_blank" rel="noopener noreferrer"
              style={{ ['--s-ink' as string]: colour } as React.CSSProperties}
            >
              <span className="vh">{label}</span>
              <Icon size={24} weight="fill" aria-hidden="true" />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className={`${styles.shareBtn} ${styles.shareCopy}`}
            onClick={copy}
          >
            {/* The label changes rather than a toast appearing: the button is
                where the attention already is. */}
            <span className="vh">{copied ? 'Link copied' : 'Copy link'}</span>
            {/* Fill, like the rest of the row — this was the one glyph still
                drawn as a stroke. `Copy` rather than `LinkSimple`: Phosphor's
                filled link is a solid SQUARE with a chain knocked out of it,
                which inside a yellow circle reads as a rendering fault. It also
                says what the button does more plainly. */}
            {copied
              ? <Check size={22} weight="fill" aria-hidden="true" />
              : <Copy size={22} weight="fill" aria-hidden="true" />}
          </button>
        </li>
      </ul>
      {/* Announced once, for anyone who cannot see the tick. */}
      <span className="vh" role="status">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  )
}
