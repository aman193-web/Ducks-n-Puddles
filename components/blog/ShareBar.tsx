'use client'
import { useState } from 'react'
import { ShareIcon, type ShareIconName } from './ShareIcons'
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

  /* THE CLIENT'S OWN BADGES, used whole — see ShareIcons. Each is already a
     coloured disc with its mark in white, so the button carries no chip and no
     outline of its own. */
  const links: { key: string; label: string; icon: ShareIconName; href: string }[] = [
    { key: 'facebook', label: 'Share on Facebook', icon: 'facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { key: 'x', label: 'Share on X', icon: 'x',
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { key: 'whatsapp', label: 'Share on WhatsApp', icon: 'whatsapp',
      href: `https://wa.me/?text=${t}%20${u}` },
    { key: 'email', label: 'Share by email', icon: 'email',
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
      {/* The copy confirmation lands HERE rather than on the button. The fifth
          badge is the client's artwork and swapping it for a tick would mean
          drawing a sixth icon that does not exist; the label has room and is
          where the eye already is. */}
      <p className={styles.shareLabel}>{copied ? 'Link copied' : 'Share this'}</p>
      <ul className={styles.shareList}>
        {links.map(({ key, label, href, icon }) => (
          <li key={key}>
            <a className={styles.shareBtn} href={href} target="_blank" rel="noopener noreferrer">
              <span className="vh">{label}</span>
              <ShareIcon name={icon} />
            </a>
          </li>
        ))}
        <li>
          <button type="button" className={styles.shareBtn} onClick={copy}>
            <span className="vh">{copied ? 'Link copied' : 'Copy link'}</span>
            <ShareIcon name="share" />
          </button>
        </li>
      </ul>
      {/* Announced once, for anyone who cannot see the tick. */}
      <span className="vh" role="status">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  )
}
