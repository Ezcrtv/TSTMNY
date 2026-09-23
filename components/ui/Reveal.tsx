'use client'

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react'

type RevealProps = {
  as?: ElementType
  /** "fade" rises and fades text; "media" unclips and settles an image. */
  variant?: 'fade' | 'media'
  delay?: number
  className?: string
  id?: string
  children: ReactNode
}

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer || typeof IntersectionObserver === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer?.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return observer
}

/** Reveals its content once as it scrolls into view. Visible without JS and under reduced motion. */
export default function Reveal({ as: Tag = 'div', variant = 'fade', delay = 0, className, id, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    const io = getObserver()
    if (!node) return
    if (!io) {
      node.classList.add('is-in')
      return
    }
    io.observe(node)
    return () => io.unobserve(node)
  }, [])

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant}
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
