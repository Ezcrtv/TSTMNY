import Link from 'next/link'
import { primaryNav, contactLink, site, socialLinks } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = socialLinks.filter((s) => s.href)

  return (
    <footer className="footer">
      <p className="footer__wordmark" aria-hidden="true">
        {site.name}
      </p>

      <div className="container footer__grid">
        <div className="footer__meta t-caption">
          <p>For the stories behind the score.</p>
          <p className="muted">
            © {year} {site.name}. A nonprofit storytelling archive. Based in {site.basedIn}.
          </p>
        </div>

        <nav aria-label="Footer" className="footer__links">
          <ul>
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="link link--reveal" rel="noopener noreferrer" target="_blank">
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
            {[...primaryNav.filter((i) => i.href !== '/'), contactLink].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link link--reveal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
