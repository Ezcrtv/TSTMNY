import type { Metadata } from 'next'
import ArrowLink from '@/components/ui/ArrowLink'

export const metadata: Metadata = {
  title: 'Thank you',
  robots: { index: false },
}

export default function DonateSuccessPage() {
  return (
    <section className="container page-head" style={{ minHeight: '80svh' }}>
      <p className="eyebrow fade-in">Thank you</p>
      <h1 className="t-h1" style={{ marginTop: 'var(--space-5)', maxWidth: '16ch' }}>
        <span className="rise">
          <span>Your gift helps the next story get told.</span>
        </span>
      </h1>
      <p className="t-body-lg muted prose fade-in" style={{ marginTop: 'var(--space-6)' }}>
        A receipt is on its way to your inbox from Stripe. While you’re here, sit with one of the stories you just
        helped make possible.
      </p>
      <div style={{ marginTop: 'var(--space-7)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', alignItems: 'center' }}>
        <ArrowLink href="/testimony" variant="primary">
          Read a story
        </ArrowLink>
        <ArrowLink href="/">Back home</ArrowLink>
      </div>
    </section>
  )
}
