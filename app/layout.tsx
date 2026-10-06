import type { Metadata, Viewport } from 'next'
import { Mona_Sans } from 'next/font/google'
import { site } from '@/lib/site'
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>

      <body>{children}</body>
    </html>
  )
}