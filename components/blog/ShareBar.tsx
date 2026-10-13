'use client'
import { useState } from 'react'
import { Check, LinkSimple, Envelope } from '@phosphor-icons/react/dist/ssr'
import { SocialMark } from './SocialMark'
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

  /* The real marks, each in its own colour, on the site's outlined chip. See
     SocialMark for why they are no longer white on a coloured disc. */
  const links: {
    key: string; label: string; href: string; colour: string
    mark?: 'facebook' | 'x' | 'whatsapp'
  }[] = [
    { key: 'facebook', label: 'Share on Facebook', mark: 'facebook', colour: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { key: 'x', label: 'Share on X', mark: 'x', colour: '#0F1419',
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { key: 'whatsapp', label: 'Share on WhatsApp', mark: 'whatsapp', colour: '#25D366',
      href: `https://wa.me/?text=${t}%20${u}` },
    { key: 'email', label: 'Share by email', colour: 'var(--duck-blue)',
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
        {links.map(({ key, label, href, colour, mark }) => (
          <li key={key}>
            <a
              className={styles.shareBtn} href={href}
              target="_blank" rel="noopener noreferrer"
              style={{ ['--s-ink' as string]: colour } as React.CSSProperties}
            >
              <span className="vh">{label}</span>
              {mark
                ? <SocialMark name={mark} />
                : <Envelope size={20} weight="fill" aria-hidden="true" />}
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
            {copied
              ? <Check size={18} weight="bold" aria-hidden="true" />
              : <LinkSimple size={18} weight="bold" aria-hidden="true" />}
          </button>
        </li>
      </ul>
      {/* Announced once, for anyone who cannot see the tick. */}
      <span className="vh" role="status">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  )
}
