import Link from 'next/link'
import { Picture } from './Picture'
import { brand } from '@/content/brand'
import { Btn } from './ui/Btn'
import { SoundToggle } from './SoundToggle'
import { MobileMenu } from './MobileMenu'
import styles from './SiteHeader.module.css'

const NAV = [
  { href: '/#ducks', label: 'The Ducks' },
  { href: '/#features', label: 'Features' },
  { href: '/#story', label: 'Our Story' },
  { href: '/journal', label: 'Journal' },
  /* Last, and set apart as a button. Points at the on-page section until the
     dedicated /store route exists — swap the href when it does. */
  { href: '/#store', label: 'Store', note: 'Coming soon', cta: true },
]

/**
 * The supplied lockup, used as supplied — no roundel behind it and no typeset
 * wordmark beside it. The mark already contains the brand name, so setting it
 * again in the display face was saying it twice in two different voices.
 *
 * `logo-mark` is the tagline-free cut. At 46px tall the "A Friend for Every
 * Adventure" line in the primary lockup is unreadable and only shrinks the duck.
 */
export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.brand} data-menu-load="" aria-label={`${brand.name} home`}>
          <Picture id="logo-mark" sizes="120px" alt="" priority />
        </Link>

        <nav className={styles.nav} aria-label="Primary" data-menu-load="">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className={n.cta ? styles.storeLink : undefined}>
              <span className={styles.roll}><span>{n.label}</span></span>
              {n.note && <span className={styles.note}>{n.note}</span>}
            </Link>
          ))}
        </nav>

        <div className={styles.actions} data-menu-load="">
          <SoundToggle />
          <span className={styles.ctaWrap}>
            <Btn href="/#squad" size="sm" colour="var(--sun-soft)">Join the Squad</Btn>
          </span>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
