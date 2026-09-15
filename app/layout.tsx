import type { Metadata, Viewport } from 'next'
import { Poppins, DM_Mono, Edu_QLD_Beginner } from 'next/font/google'
import localFont from 'next/font/local'
import { brand } from '@/content/brand'
import { SiteHeader } from '@/components/SiteHeader'
import { HeaderChrome } from '@/components/HeaderChrome'
import { SiteFooter } from '@/components/SiteFooter'
import { MotionProvider } from '@/components/MotionProvider'
import { ScrollScenes } from '@/components/ScrollScenes'
import { ScrollDuck } from '@/components/ui/ScrollDuck'
import { ScrollTop } from '@/components/ScrollTop'
import { CursorTrail } from '@/components/ui/CursorTrail'
import '@/styles/tokens.css'
import '@/styles/global.css'

/* Display: Excon (Fontshare), self-hosted as a single variable file covering
   100-900. Chunky geometric with real display character — the closest of the
   shortlist to the reference's paid Pouf V0.5. Self-hosted rather than loaded
   from the Fontshare CDN so it is preloaded with the page and never blocks on a
   third-party origin. */
const excon = localFont({
  src: '../public/fonts/Excon-Variable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-excon',
  fallback: ['Arial Black', 'Impact', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

/* Micro-labels. Stands in for the reference's GT America Mono — tiny uppercase
   mono eyebrows are a large part of why that page reads as considered. */
const dmMono = DM_Mono({
  weight: ['400', '500'], subsets: ['latin'], display: 'swap', variable: '--font-dmmono',
})
const poppins = Poppins({
  weight: ['400', '500', '600'], subsets: ['latin'], display: 'swap', variable: '--font-poppins',
})
const edu = Edu_QLD_Beginner({
  weight: ['400', '600'], subsets: ['latin'], display: 'swap', variable: '--font-edu',
})

export const metadata: Metadata = {
  metadataBase: new URL(brand.domain),
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description:
    'Meet Vincey, Chi Chi and Goosey — three ducks from a family brand in South Florida. ' +
    'The water bottles are nearly ready. Join the Duck Squad and hear first.',
  applicationName: brand.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: brand.name,
    title: `${brand.name} | ${brand.tagline}`,
    description:
      'Three ducks, three personalities, and a water bottle that is nearly ready. ' +
      'Join the Duck Squad to hear first.',
    url: brand.domain,
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon-180.png',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#62BCEB',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${excon.variable} ${poppins.variable} ${dmMono.variable} ${edu.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <HeaderChrome />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollDuck />
        <ScrollTop />
        <CursorTrail />
        <MotionProvider />
        <ScrollScenes />
      </body>
    </html>
  )
}
