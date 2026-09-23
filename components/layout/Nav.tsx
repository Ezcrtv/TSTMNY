'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { contactLink, primaryNav, site } from '@/lib/site'

function isCurrent(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  // Remember which page the menu was opened on; navigating away closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // Solid after leaving the top; hide while scrolling down, show on any upward scroll.
  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 480 && y > lastY + 4)
      if (Math.abs(y - lastY) > 4) lastY = y
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const close = useCallback(() => {
    setOpenOn(null)
    toggleRef.current?.focus()
  }, [])

  // Menu: lock scroll, focus first link, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return
    const menu = menuRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menu?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key !== 'Tab' || !menu) return
      const items = Array.from(menu.querySelectorAll<HTMLElement>('a, button'))
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return (
    <>
      <header className="nav" data-scrolled={scrolled} data-hidden={hidden && !open}>
        <div className="container nav__inner">
          <Link href="/" className="nav__brand" aria-label={`${site.name} — home`}>
            {site.name}
          </Link>

          <nav aria-label="Primary" className="nav__links">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link link--reveal"
                aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nav__end">
            <Link
              href={contactLink.href}
              className="link link--reveal nav__cta"
              aria-current={isCurrent(pathname, contactLink.href) ? 'page' : undefined}
            >
              {contactLink.label}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpenOn(pathname)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menuRef}
        id="site-menu"
        className="menu theme-dark"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
      >
        <div className="menu__top">
          <Link href="/" className="nav__brand">
            {site.name}
          </Link>
          <button type="button" className="nav__toggle" onClick={close}>
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className="menu__list">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <Link href={contactLink.href}>{contactLink.label}</Link>
        </nav>
        <div className="menu__foot t-caption muted">
          <span>For the stories behind the score.</span>
        </div>
      </div>
    </>
  )
}
