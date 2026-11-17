import { Suspense } from 'react'
import { Hero } from '@/components/sections/Hero'
import { HeroScene } from '@/components/HeroScene'
import { CardTilt } from '@/components/CardTilt'
import { Marquee } from '@/components/ui/Marquee'
import { Why } from '@/components/sections/Why'
import { DuckStage } from '@/components/sections/DuckStage'
import { Specs } from '@/components/sections/Specs'
import { Store } from '@/components/sections/Store'
import { MeetThePuddle } from '@/components/sections/MeetThePuddle'
import { Story } from '@/components/sections/Story'
import { WhatsNext } from '@/components/sections/WhatsNext'
import { InTheWild } from '@/components/sections/InTheWild'
import { Journal } from '@/components/sections/Journal'
import { Faq } from '@/components/sections/Faq'
import { Squad } from '@/components/sections/Squad'

/**
 * ORDER, and why — the client's reorganisation (Website Revisions, Nov 2026).
 *
 * The site goes from story first to product first: "Sell the water bottle
 * first. Introduce the world behind it second." Their order, section by
 * section, and the flow they wrote for it:
 *
 *   Hero          Their New Favorite Water Bottle.   fall in love with the bottles
 *   Benefits band
 *   The Puddle    the 2-in-1 sleeve and snack cup    understand their value
 *   Features      made with parents in mind
 *   The bottles   A Friend for Every Adventure       choose a favourite
 *   Meet the ducks + the community photos            meet the characters, see the community
 *   Why           why we make these                  understand our WHY
 *   FAQ                                              build confidence
 *   Our story     a message from the founders        get to know us
 *   Blog                                             explore what's next
 *   The bigger picture  the vision and the Foundation, as one section
 *   Get early access                                 join before the first collection launches
 *
 * Personalize Your Puddle is off the page for now — the client is saving it for
 * a later launch. So is the yellow newsletter band: its copy is the
 * personalisation teaser ("Something Personal Is Coming!"), and it is not in
 * the client's order. Both components are kept, ready to come back; the blog
 * pages still carry the band.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HeroScene />
      <CardTilt />
      <Marquee
        items={['Less Mess', 'BPA-Free', 'Dishwasher Safe', 'Spill-Resistant', '2-in-1 Bottle + Snack Cup']}
        /* Straight, and with no upward bleed: tilted, this band's high corner
           crossed the fold and showed under the hero on first view. */
        /* Far slower, on the client's note — five phrases repeating at 74s
           read as a ticker rather than as a band. */
        colour="var(--sun-soft)" rot={0} seconds={200}
      />
      {/* SECTION 02, PRODUCT FEATURES & DETAILS: the 2-in-1 reveal, then the
          details. Specs pulls itself up over the Puddle, and the bottles pull
          themselves up over Specs, so the three read as one run. */}
      <MeetThePuddle />
      <Specs />
      <Store />
      {/* The community photos sit inside Meet the Ducks rather than as a
          section of their own — the client's note — so no wave between them
          and no heading on the photos. */}
      <DuckStage />
      <InTheWild />
      <Why />
      <Faq />
      <Story />
      {/* Reviews stays out, deliberately, and stays BUILT: the four quotes are
          invented placeholders (see the TODO in content/brand.ts) and inventing
          social proof for a children's brand is not a copy decision. The moment
          real quotes arrive it is one line — <Reviews /> — wherever they want it. */}
      <Journal />
      {/* The vision and the Foundation, combined: WhatsNext holds the
          Foundation as its second half. */}
      <WhatsNext />
      {/* Squad reads ?duck= via useSearchParams, which needs a boundary on a
          statically prerendered page. */}
      <Suspense fallback={null}><Squad /></Suspense>
    </>
  )
}
