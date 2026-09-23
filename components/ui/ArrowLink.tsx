import Link from 'next/link'
import type { ReactNode } from 'react'

type ArrowLinkProps = {
  href: string
  children: ReactNode
  variant?: 'text' | 'primary' | 'ghost'
  className?: string
}

export function Arrow() {
  return (
    <svg className="btn__arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M0 5h12.5M8.5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

/** Primary navigation CTA. `text` renders an underlined link; `primary`/`ghost` render a pill. */
export default function ArrowLink({ href, children, variant = 'text', className = '' }: ArrowLinkProps) {
  const base = variant === 'text' ? 'link-arrow' : `btn btn--${variant}`
  return (
    <Link href={href} className={`${base} ${className}`.trim()}>
      <span className={variant === 'text' ? 'link' : undefined}>{children}</span>
      <Arrow />
    </Link>
  )
}
