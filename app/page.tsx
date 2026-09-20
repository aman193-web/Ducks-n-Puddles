import { Suspense } from 'react'
import { Hero } from '@/components/sections/Hero'
import { HeroScene } from '@/components/HeroScene'
import { CardTilt } from '@/components/CardTilt'
import { Marquee } from '@/components/ui/Marquee'
import { Why } from '@/components/sections/Why'
import { DuckStage } from '@/components/sections/DuckStage'
import { Specs } from '@/components/sections/Specs'
import { Store } from '@/components/sections/Store'
import { Story } from '@/components/sections/Story'
import { InTheWild } from '@/components/sections/InTheWild'
import { Journal } from '@/components/sections/Journal'
import { Faq } from '@/components/sections/Faq'
import { Newsletter } from '@/components/sections/Newsletter'
import { Squad } from '@/components/sections/Squad'
import { WaveEdge } from '@/components/ui/WaveEdge'

/**
 * ORDER, and why.
 *
 * This is the client's own requested flow (Website Revisions, Sep 2026): they
 * asked for the homepage to tell a clearer story as someone scrolls, with each
 * section leading into the next rather than reading as separate blocks.
 *
 *   Hero          A Friend for Every Adventure — the official tagline
 *   Why           who we are and what we stand for, BEFORE any product. Speaks
 *                 to the parent and the child side by side.
 *   Meet the ducks  the three characters, so they are met before their bottles
 *   The range     our FIRST product — character and product together
 *   Features      why parents will love them, once they have seen one
 *   Our story     the family, and the bigger vision
 *   Everyday life the reels rail — real kids, real families
 *   Journal → Newsletter → FAQ → Duck Squad
 *
 * Two moves worth naming: Why now sits above everything, because the WHY used to
 * arrive two thirds down the page if at all; and Store swapped with Specs, so a
 * reader meets the ducks, then the thing they can own, then the reasons — rather
 * than reading a spec sheet about a product they have not seen.
 *
 * Pre-launch belongs in exactly two places: the hero chip and the waitlist at
 * the foot. Everywhere else the page shows the product the way any brand with
 * stock on the shelf would.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroScene />
      <CardTilt />
      <Marquee
        items={['Flip-top straw', 'Sized for small hands', 'Dishwasher safe', 'Spill-resistant', 'BPA-free']}
        colour="var(--sun-soft)" rot={-3.2}
      />
      <Why />
      <DuckStage />
      <Store />
      <Specs />
      <WaveEdge above="var(--sky-soft)" fill="var(--cream)" />
      <Story />
      <Marquee
        items={['A friend for every adventure', 'Comfort, carried', 'Quack']}
        colour="var(--chichi-soft)" rot={2.6} dir="rtl" seconds={36}
      />
      <InTheWild />
      {/* Reviews: hidden until the four quotes carry real names. The component
          and its content are intact — re-add <Reviews /> here to restore it. */}
      <Journal />
      {/* The yellow band and the Duck Squad form ask for the same address, so
          they are deliberately kept apart: the band is a light touchpoint, the
          FAQ answers the objections, and the full form closes. */}
      <Newsletter />
      <Faq />
      {/* Squad reads ?duck= via useSearchParams, which needs a boundary on a
          statically prerendered page. */}
      <Suspense fallback={null}><Squad /></Suspense>
    </>
  )
}
