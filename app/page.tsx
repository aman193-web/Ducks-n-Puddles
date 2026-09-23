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
import { Foundation } from '@/components/sections/Foundation'
import { WhatsNext } from '@/components/sections/WhatsNext'
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
 *   Our story     the family, and where this came from
 *   Foundation    more than a brand — a whole screen, because it is a statement
 *   Bigger vision the bottles are just the beginning
 *   Everyday life the reels rail — real kids, real families
 *   Journal → Newsletter → FAQ → Duck Squad
 *
 * Two moves worth naming: Why now sits above everything, because the WHY used to
 * arrive two thirds down the page if at all; and Store swapped with Specs, so a
 * reader meets the ducks, then the thing they can own, then the reasons — rather
 * than reading a spec sheet about a product they have not seen.
 *
 * Pre-launch lives in the hero chip and the waitlist at the foot. The
 * dedicated Coming Soon section that sat after the range has been removed at
 * the client's request; the "not yet, and the Squad hears first" message is
 * still carried by the hero badge and by the Duck Squad itself.
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
      {/* The Foundation claims a whole screen — see its module for why. The
          bigger-vision list sits directly after it and overlaps its bottom edge,
          so the two read as one movement rather than two bands. */}
      <Foundation />
      <WhatsNext />
      <Marquee
        items={['A friend for every adventure', 'Comfort, carried', 'Quack']}
        colour="var(--chichi-soft)" rot={2.6} dir="rtl" seconds={58}
      />
      <InTheWild />
      {/* Reviews stays out, deliberately, and stays BUILT: the four quotes are
          invented placeholders (see the TODO in content/brand.ts) and inventing
          social proof for a children's brand is not a copy decision. The moment
          real quotes arrive it is one line — <Reviews /> — right here. */}
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
