import type { Metadata } from 'next'
import Image from 'next/image'
import PageHead from '@/components/sections/PageHead'
import CtaTriad from '@/components/sections/CtaTriad'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Why TSTMNY exists: a home for testimonies of what God has done — real stories of faith, shared to give hope and inspire others.',
  alternates: { canonical: '/about' },
}

const beliefs = [
  {
    title: 'God is at the center.',
    text: 'These aren’t motivational stories. They’re testimonies of what God has done — and He gets the credit.',
  },
  {
    title: 'Honesty over highlight.',
    text: 'We don’t tidy stories into sermons. Doubt, failure, and unanswered prayers belong in the record too — that’s often where faith is forged.',
  },
  {
    title: 'Faith is lived, not performed.',
    text: 'We’re interested in how belief holds up on an ordinary Tuesday — not in slogans or celebrations.',
  },
  {
    title: 'Every testimony is for someone.',
    text: 'Each one is shared so that a young athlete, a parent, or anyone in a hard season might find hope and see God at work in their own life.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="Every testimony is a record of what God has done."
      />

      <div className="container">
        <Reveal variant="media" className="media media--cinema">
          <Image
            src="/images/stories/story-03.jpg"
            alt="A player looks down as he adjusts his captain’s armband, the crowd blurred behind him."
            fill
            sizes="100vw"
            priority
            style={{ objectPosition: '70% 35%' }}
          />
        </Reveal>
        <p className="t-caption muted" style={{ marginTop: 'var(--space-3)' }}>
          Temporary image — to be replaced with TSTMNY photography.
        </p>
      </div>

      <section className="container section" aria-labelledby="why">
        <div className="split">
          <div className="split__label">
            <SectionLabel index="01">The why</SectionLabel>
          </div>
          <div className="split__body stack-7">
            <Reveal as="h2" id="why" className="t-statement">
              Sport shows the result. A testimony shows who carried you there.
            </Reveal>
            <Reveal className="two-col t-body-lg muted" delay={120}>
              <p>
                Athletes live very public lives and very private ones. The public side is covered endlessly. The
                private side — the injury nobody filmed, the prayer in the car park, the season that almost ended a
                career — is often where God was most at work, and it’s usually told once, in passing, and forgotten.
              </p>
              <p>
                Those are the stories that stay with people. They’re also the ones others most need to hear, because
                they show what God can do in the part of the journey they’re living right now.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="theme-dark section" aria-labelledby="vision">
        <div className="container split">
          <div className="split__label">
            <SectionLabel index="02">The vision</SectionLabel>
          </div>
          <div className="split__body stack-7">
            <Reveal as="h2" id="vision" className="t-h1">
              A growing archive of testimonies, all pointing to Jesus.
            </Reveal>
            <Reveal className="two-col t-body-lg muted" delay={120}>
              <p>
                {site.name} is just getting started. We’re building a library of filmed and written testimonies from
                athletes at every level — and, in time, from everyday believers whose stories never made the papers.
              </p>
              <p>
                Our hope is simple: that someone hears a testimony at the right moment, finds hope or a stronger faith,
                and one day shares their own. One testimony can inspire the next.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="believe">
        <div className="section-head" style={{ paddingInline: 0 }}>
          <SectionLabel index="03">What we believe</SectionLabel>
        </div>
        <h2 id="believe" className="sr-only">
          What we believe
        </h2>
        <ol className="beliefs">
          {beliefs.map((belief, i) => (
            <Reveal as="li" key={belief.title} className="belief">
              <span className="belief__num t-meta muted">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="belief__title t-h2">{belief.title}</h3>
              <p className="belief__text t-body-lg muted">{belief.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="theme-surface section" aria-labelledby="closing">
        <div className="container split">
          <div className="split__label">
            <SectionLabel index="04">Sport and faith</SectionLabel>
          </div>
          <div className="split__body--narrow split__body stack-6">
            <Reveal as="h2" id="closing" className="t-statement">
              Sport asks you to give everything for something that ends. Faith asks what remains when it does.
            </Reveal>
            <Reveal as="p" className="t-body-lg muted" delay={120}>
              We think the space between those two questions is where God meets people. We’re here to listen for those
              stories, and to share them.
            </Reveal>
          </div>
        </div>
      </section>

      <CtaTriad heading="Pull up a chair." />
    </>
  )
}
