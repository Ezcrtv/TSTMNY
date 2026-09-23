'use client'

import { useState, type FormEvent } from 'react'
import { Arrow } from '@/components/ui/ArrowLink'
import { DONATION_MAX, DONATION_MIN, DONATION_PRESETS, startDonation } from '@/lib/donations'

export default function DonateForm() {
  const [preset, setPreset] = useState<string>(String(DONATION_PRESETS[1]))
  const [custom, setCustom] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const amount = Number(custom || preset)
  const valid = Number.isFinite(amount) && amount >= DONATION_MIN && amount <= DONATION_MAX

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!valid) {
      setError(`Enter an amount between $${DONATION_MIN} and $${DONATION_MAX.toLocaleString()}.`)
      return
    }
    setError('')
    setPending(true)
    const result = await startDonation(amount)
    if (result.ok) {
      window.location.assign(result.redirectUrl)
      return
    }
    setPending(false)
    setError(result.error)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="panel stack-6" aria-labelledby="donate-form-title">
      <div className="stack-2">
        <h2 id="donate-form-title" className="t-h3">
          Give once
        </h2>
        <p className="t-caption muted">Every gift goes toward producing and keeping these stories free.</p>
      </div>

      <fieldset className="stack-4" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="field__label" style={{ marginBottom: 'var(--space-3)' }}>
          Choose an amount (USD)
        </legend>
        <div className="choices">
          {DONATION_PRESETS.map((value) => (
            <label key={value} className="choice">
              <input
                type="radio"
                name="preset"
                value={value}
                checked={!custom && preset === String(value)}
                onChange={() => {
                  setPreset(String(value))
                  setCustom('')
                }}
              />
              <span>${value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="custom-amount" className="field__label">
          Or enter another amount
        </label>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
          <span className="t-body-lg" aria-hidden="true">
            $
          </span>
          <input
            id="custom-amount"
            className="input"
            type="number"
            inputMode="decimal"
            min={DONATION_MIN}
            max={DONATION_MAX}
            step="1"
            placeholder="Other"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? 'donate-error' : undefined}
          />
        </div>
      </div>

      <div className="stack-4">
        <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={pending}>
          {pending ? 'Opening secure checkout…' : `Give ${valid ? `$${amount.toLocaleString()}` : ''}`}
          {!pending && <Arrow />}
        </button>
        <div aria-live="polite" role="status">
          {error && (
            <p id="donate-error" className="field__error">
              {error}
            </p>
          )}
        </div>
        <p className="t-caption muted">
          You’ll finish on a secure Stripe checkout page. We never see or store your card details.
        </p>
      </div>
    </form>
  )
}
