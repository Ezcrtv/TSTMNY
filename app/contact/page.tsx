import type { Metadata } from 'next'
import PageHead from '@/components/sections/PageHead'
import ContactForm from '@/components/forms/ContactForm'
import { CONTACT_REASONS, type ContactReason } from '@/lib/forms/contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Share your testimony, ask about partnerships or media, or just say hello to the TSTMNY team.',
  alternates: { canonical: '/contact' },
}

type Props = { searchParams: Promise<{ reason?: string | string[] }> }

export default async function ContactPage({ searchParams }: Props) {
  const { reason } = await searchParams
  const initialReason = CONTACT_REASONS.find((r) => r.value === reason)?.value as ContactReason | undefined

  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Have a story worth telling?"
        aside={<p>Or a question, an idea, a partnership. Write to us — a real person reads every message.</p>}
      />
      <section className="container" style={{ paddingBottom: 'var(--section)' }}>
        <div className="split">
          <div className="split__label">
            <p className="eyebrow">Write to us</p>
          </div>
          <div className="split__body--narrow split__body">
            <ContactForm key={initialReason} initialReason={initialReason} />
          </div>
        </div>
      </section>
    </>
  )
}
