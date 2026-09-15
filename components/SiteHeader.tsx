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
  { href: '/#store', label: 'The Range' },
  { href: '/#story', label: 'Our Story' },
  { href: '/journal', label: 'Journal' },
]

/**
 * The supplied lockup, used as supplied — no roundel behind it and no typeset
 * wordmark beside it. The mark already contains the brand name, so setting it
 * again in Excon was saying it twice in two different voices.
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
            <Link key={n.href} href={n.href}>
              <span className={styles.roll}><span>{n.label}</span></span>
            </Link>
          ))}
        </nav>

        <div className={styles.actions} data-menu-load="">
          <SoundToggle />
          <span className={styles.ctaWrap}>
            <Btn href="/#squad" size="sm" colour="var(--sun)">Join the Squad</Btn>
          </span>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}
