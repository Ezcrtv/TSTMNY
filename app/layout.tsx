import type { Metadata, Viewport } from 'next'
import { Mona_Sans } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { absoluteUrl, site } from '@/lib/site'
import './globals.css'

const sans = Mona_Sans({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-mona-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    images: [{ url: site.ogImage, width: 1600, height: 1200 }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
}

export const viewport: Viewport = {
  themeColor: '#cfc3a8',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        {/* Enables reveal-on-scroll styles only when JS runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'NGO',
            name: site.name,
            url: absoluteUrl('/'),
            description: site.description,
            foundingDate: site.founded,
          }}
        />
        <Nav />
        <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
