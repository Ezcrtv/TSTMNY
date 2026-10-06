import type { Metadata } from 'next'
import PageHead from '@/components/sections/PageHead'
import DonateForm from '@/components/forms/DonateForm'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Support the work',
  description:
    'Support TSTMNY, a nonprofit archive of athlete testimony. Gifts fund filming, writing, and keeping every story free to read and watch.',
  alternates: { canonical: '/donate' },
}

const funds = [
  { title: 'Producing stories', text: 'Interviews, editing, and the time it takes to tell a story properly.' },
  { title: 'Filming athletes', text: 'Crews, travel, and equipment to meet athletes where their story happened.' },
  { title: 'Documenting testimony', text: 'Transcribing, writing, and fact-checking each account with care.' },
  { title: 'Keeping the archive free', text: 'Hosting, maintenance, and accessibility — with no paywall and no ads.' },
  { title: 'What comes next', text: 'New formats and ways for athletes to share their own stories with the community.' },
]

export default function DonatePage() {
  return (
    <>
      <PageHead eyebrow="Support" title="Help us keep the quiet moments on the record." />

      <section className="container" style={{ paddingBottom: 'var(--section)' }}>
        <div className="donate-grid">
          <div className="donate-grid__copy stack-8">
            <Reveal className="stack-5">
              <p className="t-statement">
                {site.name} is a nonprofit. We don’t sell the stories, and we don’t put them behind a subscription.
              </p>
              <p className="t-body-lg muted prose">
                What we can make depends on the people who give. A single gift helps fund the interview, the edit, and
                the page someone lands on at two in the morning when they need to hear that they’re not the only one.
              </p>
            </Reveal>

            <div className="stack-5">
              <h2 className="eyebrow">What your gift makes possible</h2>
              <ol className="funds">
                {funds.map((fund) => (
                  <li key={fund.title}>
                    <div className="stack-2">
                      <h3 className="t-h3">{fund.title}</h3>
                      <p className="t-body muted">{fund.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <p className="t-caption muted prose">
              {/* PLACEHOLDER — add EIN / registration details once confirmed. */}
              Registration and tax-deductibility details will be listed here once confirmed.
            </p>
          </div>

          <div className="donate-grid__form">
            <DonateForm />
          </div>
        </div>
      </section>
    </>
  )
}
