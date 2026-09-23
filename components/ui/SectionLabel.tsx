import type { ReactNode } from 'react'

/** Small numbered eyebrow used in the left column of `.split` layouts. */
export default function SectionLabel({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="eyebrow">
      {index && <span aria-hidden="true">{index} — </span>}
      {children}
    </p>
  )
}
