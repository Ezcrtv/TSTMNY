import Link from 'next/link'
import { Arrow } from '@/components/ui/ArrowLink'
import Reveal from '@/components/ui/Reveal'

const actions = [
  { href: '/testimony', title: 'Read a story', text: 'Start anywhere. Every story stands on its own.' },
  { href: '/contact?reason=testimony', title: 'Share your story', text: 'If you’ve lived one worth telling, we’d like to listen.' },
  { href: '/donate', title: 'Support the work', text: 'Help us film, write, and keep these stories free.' },
]

/** Closing invitation used at the end of long pages. */
export default function CtaTriad({ heading = 'Stay a while.' }: { heading?: string }) {
  return (
    <section className="container section" aria-labelledby="cta-title">
      <Reveal as="h2" id="cta-title" className="t-display" >
        {heading}
      </Reveal>
      <ul className="cta-list">
        {actions.map((action, i) => (
          <Reveal as="li" key={action.href} delay={i * 90}>
            <Link href={action.href} className="cta-row">
              <span className="t-h2 cta-row__title">{action.title}</span>
              <span className="t-body muted cta-row__text">{action.text}</span>
              <span className="cta-row__arrow" aria-hidden="true">
                <Arrow />
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
