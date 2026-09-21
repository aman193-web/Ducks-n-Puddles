import Link from 'next/link'
import { Picture } from './Picture'
import { brand, ducks } from '@/content/brand'
import { WaveEdge } from './ui/WaveEdge'
import styles from './SiteFooter.module.css'

const EXPLORE = [
  { href: '/#ducks', label: 'The Ducks' },
  { href: '/#features', label: 'Features' },
  { href: '/#store', label: 'The Range' },
  { href: '/#story', label: 'Our Story' },
  { href: '/journal', label: 'Journal' },
]

const HELP = [
  { href: '/contact', label: 'Contact Us' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/accessibility', label: 'Accessibility' },
]

const IG = 'M12 2.2c3.2 0 3.6 0 4.9.07 3.25.15 4.77 1.7 4.92 4.92.06 1.28.07 1.67.07 4.9s-.01 3.62-.07 4.9c-.15 3.22-1.66 4.77-4.92 4.92-1.28.06-1.67.07-4.9.07s-3.62-.01-4.9-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.11 15.62 2.1 15.23 2.1 12s.01-3.62.07-4.9C2.32 3.88 3.83 2.33 7.1 2.18 8.38 2.12 8.77 2.2 12 2.2Zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11.05a4.35 4.35 0 1 1 0-8.7 4.35 4.35 0 0 1 0 8.7Zm6.96-11.3a1.57 1.57 0 1 0 0 3.13 1.57 1.57 0 0 0 0-3.13Z'
const FB = 'M14.5 8.5H17V5.2c-.43-.06-1.7-.19-3.18-.19-3.15 0-5.3 1.9-5.3 5.4V13H5.4v3.7h3.12V24h3.83v-7.3h3.1l.48-3.7h-3.58v-2.2c0-1.07.3-1.8 1.86-1.8Z'
const MAIL = 'M3.5 5.5h17a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm.9 2L12 12.6l7.6-5.1'

const assetFor = (slug: string) => (slug === 'chi-chi' ? 'chichi' : slug)

/**
 * Footer, rebuilt on Koa's (measured at /collections/refill-pack, 1440):
 *
 *   signup column left (heading 32/700 display, sub 16, pill input, terms line,
 *   two social squares) · two link columns right at x=922 and x=1150 · a
 *   hairline rule at y=593 with the logo sitting ASTRIDE it · copyright under
 *   it · three mascots along the bottom, each 315x299 and CROPPED by the
 *   footer's own bottom edge so only their heads show.
 *
 * Two translations rather than copies: their scalloped top edge becomes the
 * brand's measured wave, and their koalas become the top half of the three
 * bottles. A duck paddles across the waterline, left to right.
 */
export function SiteFooter() {
  const SOCIALS = [
    { href: brand.instagram, label: 'Instagram', bg: 'var(--chichi)', d: IG, fill: true },
    { href: brand.facebook, label: 'Facebook', bg: 'var(--sun)', d: FB, fill: true },
    { href: `mailto:${brand.email}`, label: 'Email us', bg: 'var(--sky)', d: MAIL, fill: false },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.crest}>
        <WaveEdge above="var(--duck-blue-soft)" fill="var(--cream)" />
        <span className={styles.swimmer} aria-hidden="true">
          <span className={styles.paddle}>
            <img src="/img/mascot-140.webp" width={54} height={60} alt="" />
          </span>
        </span>
      </div>

      <div className={`wrap ${styles.inner}`}>
        <div className={styles.grid}>
          {/* ---- identity + socials. The signup lives in the Newsletter band
                  directly above this, so the footer does not ask a third time. ---- */}
          <div className={styles.signup}>
            <h2 className={styles.h}>{brand.tagline}</h2>
            <p className={styles.blurb}>
              {brand.founders} &mdash; two parents in {brand.place}, making things we
              wanted for our own kids. Write to us any time; it really is us reading it.
            </p>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  className={styles.social}
                  href={s.href}
                  rel="me noopener"
                  style={{ ['--s-bg' as string]: s.bg } as React.CSSProperties}
                >
                  <span className="vh">{s.label}</span>
                  <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true"
                       fill={s.fill ? 'currentColor' : 'none'}
                       stroke={s.fill ? 'none' : 'currentColor'}
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ---- link columns ---- */}
          <nav className={styles.cols} aria-label="Footer">
            <div>
              <h2 className={styles.colH}>Explore</h2>
              <ul className={styles.links}>
                {EXPLORE.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
              </ul>
            </div>
            <div>
              <h2 className={styles.colH}>Support</h2>
              <ul className={styles.links}>
                {HELP.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
              </ul>
            </div>
          </nav>
        </div>

        {/* ---- the rule, broken by the mark ---- */}
        <div className={styles.rule}>
          <span className={styles.line} />
          <Link href="/" className={styles.mark} aria-label={`${brand.name} home`}>
            <img src="/img/logo-mark-240.webp" width={104} height={90} alt="" />
          </Link>
          <span className={styles.line} />
        </div>

        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} {brand.name}. {brand.founders}, {brand.place}.</span>
          <span className="hand">{brand.closing}</span>
        </div>
      </div>

      {/* ---- the squad, cropped by the page's own bottom edge ----
              NO character cameo here, deliberately. This row is a tuned crop —
              540px renders in a 358px box, so ~60% of each bottle shows and the
              cut lands below the name decal. An illustrated duck in front of it
              is 50% clipped by that same box and its feet land on the decals;
              the only clear ground is outside the bottle group, and that gap
              closes below about 1400px. The illustrated trio lives in the Duck
              Squad section instead, which has a column built for art. */}
      <div className={styles.bottles} aria-hidden="true">
        {ducks.map((d) => (
          <span key={d.slug} className={styles.bottle}>
            <Picture id={assetFor(d.slug)} sizes="(min-width: 900px) 22vw, 40vw" alt="" />
          </span>
        ))}
      </div>
    </footer>
  )
}
