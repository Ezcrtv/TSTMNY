import type { ReactNode } from 'react'

type Props = {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  className?: string
  children: (props: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode
}

/** Label, control, hint, and error wired together for assistive tech. */
export default function Field({ id, label, error, hint, optional, className, children }: Props) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  return (
    <div className={`field ${className ?? ''}`.trim()}>
      <label htmlFor={id} className="field__label">
        {label}
        {optional && <span className="muted"> (optional)</span>}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {hint && (
        <p id={`${id}-hint`} className="field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field__error">
          {error}
        </p>
      )}
    </div>
  )
}
