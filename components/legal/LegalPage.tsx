import Link from 'next/link'
import { Btn } from '@/components/ui/Btn'
import { LegalToc, MobileToc } from './LegalToc'
import { BrandDetail } from '@/components/ui/BrandDetail'
import { brand } from '@/content/brand'
import type { Block, LegalDoc } from '@/content/legal'
import styles from './LegalPage.module.css'

/**
 * TERMS AND PRIVACY, from one template.
 *
 * The two documents the client supplied are long — seventeen numbered sections
 * and thirteen — and the placeholder pages they replace were eight short ones
 * in a single column. At this length a single column stops being a page and
 * becomes a scroll: you cannot tell where you are, how much is left, or get
 * back to the clause you just read.
 *
 * So: a sticky contents list beside the prose on desktop, numbered to match the
 * client's own numbering, and the same numbers set large against each section
 * so the two halves are visibly the same list. Below 1040px the contents
 * collapses into a <details> that is closed by default — a seventeen-item index
 * above the first paragraph is worse on a phone than no index at all.
 *
 * The sections are rendered from data (content/legal.ts), not written here.
 */

/** The documents carry **bold** runs in two or three places. This is the whole
 *  of the inline formatting they use, so this is the whole of the renderer. */
function Rich({ text }: { text: string }) {
  if (!text.includes('**')) return <>{text}</>
  return (
    <>
      {text.split('**').map((part, i) =>
        i % 2 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  )
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if ('h' in b) return <h3 key={i} className={styles.sub}><Rich text={b.h} /></h3>
        if ('ul' in b) {
          return (
            <ul key={i} className={styles.list}>
              {b.ul.map((item, j) => <li key={j}><Rich text={item} /></li>)}
            </ul>
          )
        }
        return <p key={i}><Rich text={b.p} /></p>
      })}
    </>
  )
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const other = doc.slug === 'terms'
    ? { href: '/privacy', label: 'Privacy Policy' }
    : { href: '/terms', label: 'Terms of Service' }

  /* Where the document left the address blank, brand.supportEmail stands in.
     ⚠️ That address is a placeholder and does not receive mail yet — see the
     note on it in content/brand.ts. */
  const email = doc.contact.email.startsWith('[') ? brand.supportEmail : doc.contact.email

  return (
    <>
      <div className={styles.page}>
        <BrandDetail preset="shallows" opacity={0.09} />

        <div className="wrap">
          <header className={styles.masthead}>
            <p className="mono">{doc.eyebrow}</p>
            <h1 className="d d-xl">{doc.title}</h1>
            <p className={`lead ${styles.lede}`}>{doc.lede}</p>
          </header>

          <div className={styles.cols}>
            {/* DESKTOP: a sticky index. It is an <aside>, not a <nav> inside
                the article, so a screen reader can skip the whole thing in one
                move rather than hearing seventeen links before the text. */}
            <aside className={styles.rail} aria-label="On this page">
              <p className={styles.railTitle}>
                On this page
                <span className={styles.railCount}>{doc.sections.length}</span>
              </p>
              <LegalToc sections={doc.sections} />
            </aside>

            <article className={styles.doc}>
              <div className={styles.intro}>
                <Blocks blocks={doc.intro} />
              </div>

              {/* MOBILE: the same list, folded away. */}
              <MobileToc sections={doc.sections} />

              {doc.sections.map((s) => (
                <section key={s.n} id={`s-${s.n}`} className={styles.sec}>
                  <header className={styles.secHead}>
                    <span className={styles.secNum} aria-hidden="true">{s.n}</span>
                    <h2>{s.title}</h2>
                  </header>
                  <Blocks blocks={s.body} />
                </section>
              ))}

              {/* The address block, lifted out of the client's last section and
                  set as a card: it is the one thing on the page somebody scrolls
                  to the bottom looking for. */}
              <aside className={styles.card}>
                <p className={styles.cardName}>{doc.contact.name}</p>
                <p className={styles.cardPlace}>{doc.contact.place}</p>
                <p className={styles.cardMail}>
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
                <p className={styles.cardMore}>
                  Or use the <Link href="/contact">contact form</Link> &mdash; it
                  reaches the same inbox.
                </p>
              </aside>

              {doc.tagline && <p className={`d ${styles.tagline}`}>{doc.tagline}</p>}
            </article>
          </div>
        </div>
      </div>

      {/* The blue band the footer's wave paints itself against — a page that
          ends on cream leaves a stripe across the seam. */}
      <section className={styles.close}>
        <div className={`wrap ${styles.closeInner}`}>
          <h2 className={styles.closeTitle}>Still got a question?</h2>
          <p className={styles.closeBlurb}>
            We read everything that comes in, and we would rather you asked than
            wondered. Our {' '}
            <Link href={other.href} className={styles.closeLink}>{other.label}</Link>{' '}
            is next door if that is what you were after.
          </p>
          <Btn href="/contact" colour="var(--sun-soft)">Get in touch</Btn>
        </div>
      </section>
    </>
  )
}
