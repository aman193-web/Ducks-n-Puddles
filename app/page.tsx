import { Hero } from '@/components/sections/Hero'
import { HeroScene } from '@/components/HeroScene'
import { Marquee } from '@/components/ui/Marquee'
import { DuckStage } from '@/components/sections/DuckStage'
import { Specs } from '@/components/sections/Specs'
import { Store } from '@/components/sections/Store'
import { Story } from '@/components/sections/Story'
import { InTheWild } from '@/components/sections/InTheWild'
import { Reviews } from '@/components/sections/Reviews'
import { Journal } from '@/components/sections/Journal'
import { Faq } from '@/components/sections/Faq'
import { Newsletter } from '@/components/sections/Newsletter'
import { Squad } from '@/components/sections/Squad'
import { WaveEdge } from '@/components/ui/WaveEdge'

/**
 * ORDER, and why.
 *
 * Pre-launch belongs in exactly two places: the hero chip and the waitlist at
 * the foot. Between them the page sells the product the way any brand with
 * stock on the shelf would — features, range, story, reels, reviews, journal.
 * Before this, every one of those sections opened by explaining that nothing was
 * for sale, which is a thing a visitor only needs to be told once.
 *
 * The two sections that existed purely to say "not yet" have moved rather than
 * been deleted: the sample diary is now the first journal post, and the roadmap
 * lives with the waitlist where a reader has already opted into the wait.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroScene />
      <Marquee
        items={['Made by two parents', 'Sized for small hands', 'Dishwasher safe', 'Spill-resistant', 'BPA-free']}
        colour="var(--sun)" rot={-3.2}
      />
      <DuckStage />
      <Specs />
      <WaveEdge above="var(--sky)" fill="var(--cream)" />
      <Store />
      <Story />
      <Marquee
        items={['A friend for every adventure', 'Nine ounces of courage', 'Quack']}
        colour="var(--chichi)" rot={2.6} dir="rtl" seconds={36}
      />
      <InTheWild />
      <Reviews />
      <Journal />
      {/* The yellow band and the Duck Squad form ask for the same address, so
          they are deliberately kept apart: the band is a light touchpoint, the
          FAQ answers the objections, and the full form closes. */}
      <Newsletter />
      <Faq />
      <Squad />
    </>
  )
}
