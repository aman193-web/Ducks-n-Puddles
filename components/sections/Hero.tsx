import { Picture } from '@/components/Picture'
import { Btn } from '@/components/ui/Btn'
import { ducks } from '@/content/brand'
import { bandPath, ribbonPath, PERIOD, BAND_NAVY, BAND_SKY } from '@/lib/wave'
import styles from './Hero.module.css'

/* -------------------------------------------------------------------------
   THE POND WINDOW

   coquelicots.nl's hero is one idea executed without compromise: a single
   enormous radiused media panel, inset by a constant gutter, that owns the whole
   fold — with a quiet intro line above it and every scrap of UI either in the
   header or inside the panel. Nothing is split 50/50; nothing sits beside
   anything. The impact is the panel.

   Their panel holds a video of a house. Ours holds a place: a pond, cut away so
   you can see both sides of the waterline at once. The three bottles stand in
   it, the brand's own measured wave IS the waterline, the headline lives in the
   sky above and casts a reflection into the water below.

   That gives us their composition (one window, one gutter, one radius, UI inside
   the frame) with content that could not belong to any other brand.
   ------------------------------------------------------------------------- */

const assetFor = (slug: string) => (slug === 'chi-chi' ? 'chichi' : slug)
const ORDER = ['vincey', 'chi-chi', 'goosey'] as const

/* THE SWIMMERS, in the order the client's line-up reads left to right: blue,
   pink, yellow. They cross rightward, so the yellow one leads and the blue one
   trails.

   `lead` is a negative animation-delay, and the three values are not decorative:
   the crest band repeats every 50cqw (see the CSS), and 12s of travel IS 50cqw,
   so a 12s stagger puts all three at the IDENTICAL point on the wave. That is
   what lets one `--sink` seat all three, and what keeps the spacing honest as
   the panel resizes.

   `size` is the only thing that varies — a little difference in height so the
   three read as being at different distances rather than on one rail. */
const SWIMMERS = [
  { id: 'vincey-swim', lead: -2,  park: '20cqw', size: '.92',  bob: '4.4s', rise: '6px' },
  { id: 'chichi-swim', lead: -14, park: '48cqw', size: '1',    bob: '3.8s', rise: '7px' },
  { id: 'goosey-swim', lead: -26, park: '76cqw', size: '1.07', bob: '4.1s', rise: '6px' },
] as const

const PERIODS = 4
const W = PERIOD * PERIODS

/* The viewBox height, not the element height, is what sets the wave's amplitude
   once `preserveAspectRatio="none"` is on: the crest-to-trough distance is a
   fixed 168 units, so 168/SPAN is the fraction of the element it occupies.
   640 puts it at 26% — bold enough to read as the brand mark, shallow enough
   that a bottle standing in it is never more than a quarter under. */
const SPAN = 640

/**
 * THE WATER, in three pieces that share one geometry.
 *
 * The brand banner is a navy crest band over a sky band over a splash body, all
 * three following the identical tall/short hump profile. Rebuilt from the
 * measured numbers, and split across the z-stack so the bottles can stand
 * INSIDE it: the body renders behind them, the two crest ribbons in front. The
 * ribbons are true constant-thickness bands rather than stacked fills, so they
 * are transparent below themselves and never leave a flat edge across the pond.
 */
function WaveBody({ className, depth }: { className?: string; depth: number }) {
  return (
    <span className={className} aria-hidden="true" data-depth={depth}>
      <svg viewBox={`0 0 ${W} ${SPAN}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="dnp-depth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--splash)" />
            <stop offset="100%" stopColor="var(--duck-blue)" />
          </linearGradient>
        </defs>
        <path d={bandPath(BAND_NAVY + BAND_SKY, PERIODS, SPAN)} fill="url(#dnp-depth)" />
      </svg>
    </span>
  )
}

function WaveCrest({ className, depth }: { className?: string; depth: number }) {
  return (
    <span className={className} aria-hidden="true" data-depth={depth}>
      <svg viewBox={`0 0 ${W} ${SPAN}`} preserveAspectRatio="none">
        <path d={ribbonPath(0, BAND_NAVY, PERIODS)} fill="var(--duck-blue)" />
        <path d={ribbonPath(BAND_NAVY, BAND_NAVY + BAND_SKY, PERIODS)} fill="var(--sky)" />
      </svg>
    </span>
  )
}

/** A distant swell, breaking the horizon before the real waterline. */
function WaveFar({ className, depth }: { className?: string; depth: number }) {
  return (
    <span className={className} aria-hidden="true" data-depth={depth}>
      <svg viewBox={`0 0 ${W} ${SPAN}`} preserveAspectRatio="none">
        <path d={bandPath(0, PERIODS, SPAN)} fill="var(--sky)" />
      </svg>
    </span>
  )
}

export function Hero() {
  const squad = ORDER.map((slug) => ducks.find((d) => d.slug === slug)!)

  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-scene="hero">
      {/* ----------------------------- the window ---------------------------- */}
      <div className={styles.panelWrap}>
        <div className={styles.panel} data-hero-panel="">
          {/* their loadHeroMediaAfter: a curtain whose height collapses to nothing */}
          <span className={styles.curtain} aria-hidden="true" />

          <div className={styles.scene} data-hero-scene="">
            {/* -- above the waterline -- */}
            <span className={styles.sun} aria-hidden="true" data-depth="0.03" />
            <span className={styles.haze} aria-hidden="true" />

            {/* One column, anchored to the waterline and growing upward, so the
                headline and the CTA can never collide with each other or with
                the surface however short the panel gets. */}
            <div className={styles.copy}>
              {/* The pre-launch state, said in the first screen. It was a plain
                  mono line ending in "arriving soon", which the client read as
                  the coming-soon message being absent — at 12px, grey, and
                  tucked above a 116px headline, effectively it was. The badge
                  carries it now and the sentence sits beside it. */}
              <p className={`mono ${styles.rally}`}>
                <span className={styles.soon}>Coming soon</span>
                <span className={styles.rallyText}>Meet Chi&nbsp;Chi, Goosey &amp; Vincey</span>
              </p>

              <h1 id="hero-title" className={`d ${styles.title}`}>
                <span><span>A friend for </span></span>
                <span><span>every adventure</span></span>
              </h1>

              <div className={styles.ctas}>
                <Btn href="/#squad" colour="var(--sun-soft)">Join the Duck Squad</Btn>
                <span className={styles.second}>
                  <Btn href="/#ducks" colour="var(--paper)">Meet the ducks</Btn>
                </span>
              </div>
            </div>

            {/* the headline, thrown back off the water — decorative, so it is
                mirrored and faded rather than repeated for a screen reader */}
            <p className={`d ${styles.echo}`} aria-hidden="true" data-depth="0.05">
              <span>A friend for</span><span>every adventure</span>
            </p>

            {/* -- the waterline itself -- */}
            <WaveFar className={`${styles.wave} ${styles.waveFar}`} depth={0.04} />
            <WaveBody className={`${styles.wave} ${styles.waveBody}`} depth={0.07} />
            <div className={styles.water} aria-hidden="true">
              <span className={styles.caustic} /><span className={styles.caustic} /><span className={styles.caustic} />
              <i className={styles.bubble} /><i className={styles.bubble} /><i className={styles.bubble} />
              <i className={styles.bubble} /><i className={styles.bubble} />
            </div>

            {/* -- swimming across it --
                Behind the bottles and in front of the wave body, so a duck
                passes BEHIND the product and the crest ribbon still cuts across
                its hull: that overlap is the whole reason it reads as floating
                rather than as a sticker sliding over the panel. */}
            <div className={styles.swimmers} aria-hidden="true">
              {SWIMMERS.map((s) => (
                <span
                  key={s.id}
                  className={styles.lane}
                  style={{
                    ['--lead' as string]: `${s.lead}s`,
                    ['--park' as string]: s.park,
                    ['--size' as string]: s.size,
                    ['--bob' as string]: s.bob,
                    ['--rise' as string]: s.rise,
                  }}
                >
                  <span className={styles.rider}>
                    <Picture id={s.id} sizes="9vw" priority />
                  </span>
                </span>
              ))}
            </div>

            {/* -- standing in it -- */}
            <div className={styles.squad}>
              {squad.map((d, i) => (
                <span key={d.slug} className={styles.bottle} data-hero-bottle="" data-depth={0.09 + i * 0.02}>
                  <span className={styles.float} data-bob="">
                    <Picture
                      id={assetFor(d.slug)}
                      sizes="(min-width: 900px) 20vw, 34vw"
                      alt={`The ${d.name} bottle`}
                      priority
                    />
                  </span>
                </span>
              ))}
            </div>

            {/* in front of the product, so the bottles stand IN the water */}
            <WaveCrest className={`${styles.wave} ${styles.waveCrest}`} depth={0.07} />
            <span className={styles.glints} aria-hidden="true" data-depth="0.11">
              <i /><i /><i /><i /><i />
            </span>

            {/* -- UI, inside the frame, as the reference keeps it -- */}
          </div>
        </div>
      </div>
    </section>
  )
}
