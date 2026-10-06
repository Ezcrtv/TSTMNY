import Link from 'next/link'
import { Arrow } from '@/components/ui/ArrowLink'
import Reveal from '@/components/ui/Reveal'

const actions = [
  { href: '/testimony', title: 'Watch a testimony', text: 'Start anywhere. Every testimony stands on its own.' },
  { href: '/contact?reason=testimony', title: 'Share your testimony', text: 'What has God done in your life? Your story could be the one someone needs to hear.' },
  { href: '/donate', title: 'Support the mission', text: 'Help us film, write, and keep every testimony free.' },
]

/** Closing invitation used at the end of long pages. Giving always comes last. */
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
