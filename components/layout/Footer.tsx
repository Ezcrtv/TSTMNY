import Link from 'next/link'
import ArrowLink from '@/components/ui/ArrowLink'
import { site, socialLinks } from '@/lib/site'

const explore = [
  { href: '/testimony', label: 'Stories' },
  { href: '/about', label: 'About' },
  { href: '/donate', label: 'Support the work' },
  { href: '/contact?reason=testimony', label: 'Share your story' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = socialLinks.filter((s) => s.href)

  return (
    <footer className="theme-dark" style={{ overflow: 'hidden' }}>
      <div className="container section--tight" style={{ paddingBottom: 0 }}>
        <div className="footer__grid">
          <div className="footer__statement stack-6">
            <p className="t-h2">For the stories behind the score.</p>
            <p className="t-body-lg muted prose">
              {site.name} is a nonprofit archive of athlete testimony. Every story is shared freely, and kept that way
              by people who give.
            </p>
            <ArrowLink href="/donate" variant="primary">
              Support the work
            </ArrowLink>
          </div>

          <div className="footer__cols">
            <nav aria-label="Footer" className="stack-4">
              <p className="eyebrow">Explore</p>
              <ul className="footer__list">
                {explore.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link link--reveal">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="stack-4">
              <p className="eyebrow">Connect</p>
              <ul className="footer__list">
                <li>
                  <Link href="/contact" className="link link--reveal">
                    Contact
                  </Link>
                </li>
                {socials.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="link link--reveal" rel="noopener noreferrer" target="_blank">
                      {item.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
                {socials.length === 0 && <li className="t-caption muted">Social channels soon.</li>}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="t-caption muted"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-9)',
            paddingBlock: 'var(--space-5)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p>
            © {year} {site.name}. A nonprofit storytelling archive.
          </p>
          <p>Est. {site.founded}</p>
        </div>

        <p className="footer__wordmark" aria-hidden="true">
          {site.name}
        </p>
      </div>
    </footer>
  )
}
