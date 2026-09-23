export const CONTACT_REASONS = [
  { value: 'testimony', label: 'Share my testimony' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'media', label: 'Media' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'general', label: 'General inquiry' },
] as const

export type ContactReason = (typeof CONTACT_REASONS)[number]['value']

export type ContactData = {
  name: string
  email: string
  organization?: string
  reason: ContactReason
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactData, string>>

export type ContactResult =
  | { ok: true; data: ContactData }
  | { ok: false; errors: ContactErrors }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export function reasonLabel(reason: ContactReason): string {
  return CONTACT_REASONS.find((r) => r.value === reason)?.label ?? reason
}

export function validateContact(input: Record<string, unknown>): ContactResult {
  const name = text(input.name)
  const email = text(input.email)
  const organization = text(input.organization)
  const reason = text(input.reason)
  const message = text(input.message)
  const errors: ContactErrors = {}

  if (!name) errors.name = 'Tell us your name.'
  if (!email) errors.email = 'We need an email to reply.'
  else if (!EMAIL.test(email)) errors.email = 'That email doesn’t look right.'
  if (!CONTACT_REASONS.some((r) => r.value === reason)) errors.reason = 'Choose a reason.'
  if (!message) errors.message = 'Write a few words.'

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    data: {
      name,
      email,
      organization: organization || undefined,
      reason: reason as ContactReason,
      message,
    },
  }
}
