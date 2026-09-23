'use client'

import { useRef, useState, type FormEvent } from 'react'
import Field from './Field'
import { Arrow } from '@/components/ui/ArrowLink'
import { CONTACT_REASONS, validateContact, type ContactErrors, type ContactReason } from '@/lib/forms/contact'
import { postJSON } from '@/lib/forms/submit'

type Status = { state: 'idle' | 'sending' | 'sent' } | { state: 'error'; message: string }

export default function ContactForm({ initialReason = 'general' }: { initialReason?: ContactReason }) {
  const [reason, setReason] = useState<ContactReason>(initialReason)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })
  const formRef = useRef<HTMLFormElement>(null)
  const isTestimony = reason === 'testimony'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const values = Object.fromEntries(form.entries())
    const result = validateContact(values)

    if (!result.ok) {
      setErrors(result.errors)
      const first = Object.keys(result.errors)[0]
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setErrors({})
    setStatus({ state: 'sending' })

    // Testimonies are also saved to Sanity for review; everything else is emailed.
    const response = isTestimony
      ? await postJSON('/api/submit-testimony', {
          name: result.data.name,
          email: result.data.email,
          story: result.data.message,
          videoUrl: String(values.videoUrl ?? '').trim() || undefined,
        })
      : await postJSON('/api/contact', result.data)

    if (response.ok) {
      setStatus({ state: 'sent' })
      return
    }
    if (response.fieldErrors) setErrors(response.fieldErrors)
    setStatus({ state: 'error', message: response.error })
  }

  if (status.state === 'sent') {
    return (
      <div className="stack-5" role="status" aria-live="polite">
        <p className="t-h2">Thank you. We’ll be in touch.</p>
        <p className="t-body-lg muted prose">
          {isTestimony
            ? 'We read every story personally. If it feels like a fit, someone from our team will reach out to talk about next steps.'
            : 'Your message is with us. We usually reply within a few days.'}
        </p>
        <button type="button" className="btn btn--ghost" onClick={() => setStatus({ state: 'idle' })}>
          Send another message
        </button>
      </div>
    )
  }

  const sending = status.state === 'sending'

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="stack-7">
      <div className="form-grid">
        <Field id="name" label="Name" error={errors.name}>
          {(a) => <input {...a} name="name" type="text" autoComplete="name" className="input" required />}
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          {(a) => <input {...a} name="email" type="email" autoComplete="email" className="input" required />}
        </Field>
        <Field id="organization" label="Organization" optional error={errors.organization}>
          {(a) => <input {...a} name="organization" type="text" autoComplete="organization" className="input" />}
        </Field>
        <Field id="reason" label="Reason for reaching out" error={errors.reason}>
          {(a) => (
            <select
              {...a}
              name="reason"
              className="input"
              value={reason}
              onChange={(e) => setReason(e.target.value as ContactReason)}
            >
              {CONTACT_REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          )}
        </Field>
        {isTestimony && (
          <Field
            id="videoUrl"
            label="Link to a video"
            optional
            hint="YouTube, Vimeo, or a shared folder — only if you already have one."
            className="form-grid__full"
          >
            {(a) => <input {...a} name="videoUrl" type="url" inputMode="url" className="input" />}
          </Field>
        )}
        <Field
          id="message"
          label={isTestimony ? 'Your story' : 'Message'}
          hint={isTestimony ? 'Start wherever feels right. A few sentences is enough for now.' : undefined}
          error={errors.message}
          className="form-grid__full"
        >
          {(a) => <textarea {...a} name="message" rows={6} className="input" required />}
        </Field>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-5)' }}>
        <button type="submit" className="btn btn--primary" disabled={sending}>
          {sending ? 'Sending…' : isTestimony ? 'Share your story' : 'Send message'}
          {!sending && <Arrow />}
        </button>
        <div aria-live="polite" role="status" className="t-caption">
          {status.state === 'error' && <p className="field__error">{status.message}</p>}
        </div>
      </div>
    </form>
  )
}
