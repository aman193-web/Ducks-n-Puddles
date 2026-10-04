import Link from 'next/link'
import { FooterDucks } from './ui/FooterDucks'
import { brand } from '@/content/brand'
import { WaveEdge } from './ui/WaveEdge'
import styles from './SiteFooter.module.css'

/* Relabelled and reordered to the client's Sep 2026 list. "Shipping & Returns"
   is on their list marked "(when live)" and is deliberately NOT here — a link
   to a page that does not exist is worse than no link. */
const EXPLORE = [
  { href: '/#ducks', label: 'Meet the Ducks' },
  { href: '/#store', label: 'The Bottles' },
  { href: '/#story', label: 'Our Story' },
  { href: '/#next', label: 'Our Bigger Vision' },
  { href: '/#foundation', label: 'The Foundation' },
  { href: '/blog', label: 'From the Pond' },
]

/* The client's own list, and only theirs. Accessibility was an addition of
   mine and is out at their request; "Shipping & Returns (when live)" stays out
   until shipping is live, which is what the client's own note asks for. */
const HELP = [
  { href: '/#faq', label: 'FAQs' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

const IG = 'M12 2.2c3.2 0 3.6 0 4.9.07 3.25.15 4.77 1.7 4.92 4.92.06 1.28.07 1.67.07 4.9s-.01 3.62-.07 4.9c-.15 3.22-1.66 4.77-4.92 4.92-1.28.06-1.67.07-4.9.07s-3.62-.01-4.9-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.11 15.62 2.1 15.23 2.1 12s.01-3.62.07-4.9C2.32 3.88 3.83 2.33 7.1 2.18 8.38 2.12 8.77 2.2 12 2.2Zm0 3.1a6.7 6.7 0 1 0 0 13.4 6.7 6.7 0 0 0 0-13.4Zm0 11.05a4.35 4.35 0 1 1 0-8.7 4.35 4.35 0 0 1 0 8.7Zm6.96-11.3a1.57 1.57 0 1 0 0 3.13 1.57 1.57 0 0 0 0-3.13Z'
const FB = 'M14.5 8.5H17V5.2c-.43-.06-1.7-.19-3.18-.19-3.15 0-5.3 1.9-5.3 5.4V13H5.4v3.7h3.12V24h3.83v-7.3h3.1l.48-3.7h-3.58v-2.2c0-1.07.3-1.8 1.86-1.8Z'
const MAIL = 'M3.5 5.5h17a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm.9 2L12 12.6l7.6-5.1'

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
  /* THE PLATFORMS' OWN COLOURS, at the client's request — these were the
     brand's pink and yellow before, which looked tidy but made the two
     networks unrecognisable at 50px.

     Instagram is its real radial gradient, and the stop order matters: the
     yellow corner is the one place a white glyph fails (1.85 against white),
     so the gradient is anchored bottom-left where the mark is not, and the
     glyph sits over the magenta at 4.73. Facebook is #1877F2, white on it
     4.23. Email has no brand of its own so it takes --duck-blue, 7.92. All
     three clear the 3.0 that WCAG asks of a non-text graphic. */
  const SOCIALS = [
    {
      href: brand.instagram, label: 'Instagram', d: IG, fill: true,
      bg: 'radial-gradient(circle at 28% 108%, #FEDA75 0%, #FA7E1E 22%, #D62976 52%, #962FBF 76%, #4F5BD5 100%)',
    },
    { href: brand.facebook, label: 'Facebook', d: FB, fill: true, bg: '#1877F2' },
    { href: `mailto:${brand.email}`, label: 'Email us', d: MAIL, fill: false, bg: 'var(--duck-blue)' },
  ]

  return (
    <footer className={styles.footer}>
      {/* data-footer-crest: ScrollDuck steps aside when this arrives. */}
      <div className={styles.crest} data-footer-crest="">
        <WaveEdge above="var(--footer-above)" fill="var(--cream)" />
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
              Thoughtful products for parents. Little friends for kids. Made to bring more
              ease, comfort, and connection to everyday adventures.
            </p>
            <p className={`hand ${styles.socialsLabel}`}>Come hang with us</p>
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
              <h2 className={styles.colH}>Help</h2>
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
          <span>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          <span className="hand">Here&rsquo;s to all the adventures ahead.</span>
        </div>
      </div>

      {/* ---- the squad, at the foot of the page ----
              This was three bottle renders cropped by the page's bottom edge.
              It is the characters now, on the supplied video, turning to follow
              the cursor — the client asked for the bottles here to become the
              ducks. Not cropped: their note is that all three stay clearly
              visible, so the frame keeps its aspect and the footer grows.
              See FooterDucks for the seek-throttling and the reduced-motion
              and touch paths.

              ⚠️ TWO ARTWORK CHANGES ARE OUTSTANDING HERE, not code ones. The
              client asked for the blue pants/diapers to be added to all three so
              they match their character designs, and for Chi Chi's pink to be
              brighter and closer to her signature. These three are a single
              pre-rendered video, so both need a new render from whoever produced
              it — see media/video/. */}
      <p className={styles.sendoff}>Come Back to the Pond Soon!</p>
      <FooterDucks />
    </footer>
  )
}
