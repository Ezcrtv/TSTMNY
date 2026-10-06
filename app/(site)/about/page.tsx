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
    'Why TSTMNY exists: a calm, curated home for the stories athletes rarely tell — faith, discipline, doubt, and purpose.',
  alternates: { canonical: '/about' },
}

const beliefs = [
  {
    title: 'The unseen hours matter most.',
    text: 'What happens before and after the match shapes a person more than the match itself. That’s where we point the camera.',
  },
  {
    title: 'Honesty over highlight.',
    text: 'We don’t tidy stories into sermons. Doubt, failure, and unanswered prayers belong in the record too.',
  },
  {
    title: 'Faith is lived, not performed.',
    text: 'We’re interested in how belief holds up on an ordinary Tuesday — not in slogans or celebrations.',
  },
  {
    title: 'Stories are for someone.',
    text: 'Every testimony is told so that a young athlete, a parent, or a coach might recognise themselves in it.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHead
        eyebrow="About"
        title="The most important parts of an athlete’s story rarely happen under the lights."
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
              Sport gives us the result in high definition. Everything that led there stays out of frame.
            </Reveal>
            <Reveal className="two-col t-body-lg muted" delay={120}>
              <p>
                Athletes live very public lives and very private ones. The public side is covered endlessly. The
                private side — the injuries nobody filmed, the prayer in the car park, the season that almost ended a
                career — is usually told once, in passing, and forgotten.
              </p>
              <p>
                Those are the stories that stay with people. They’re also the ones young athletes most need to hear,
                because they describe the part of the journey they’re living right now.
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
              An archive of honest testimony, kept in one calm place.
            </Reveal>
            <Reveal className="two-col t-body-lg muted" delay={120}>
              <p>
                {site.name} is just getting started. We’re building a library of filmed and written stories from
                athletes at every level — professionals, academy players, and the ones whose careers never made the
                papers.
              </p>
              <p>
                Over time we want it to become a place athletes come to share, not just to read: a community where the
                next generation can find someone who’s already walked the road they’re on.
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
              We think the space between those two questions is where the best stories live. We’re here to listen for
              them, and to keep them.
            </Reveal>
          </div>
        </div>
      </section>

      <CtaTriad heading="Pull up a chair." />
    </>
  )
}
