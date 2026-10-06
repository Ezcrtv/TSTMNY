import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { absoluteUrl, site } from '@/lib/site'

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
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
    </>
  )
}