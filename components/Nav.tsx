import Link from 'next/link'

export default function Nav() {
  return (
    <header className="border-b border-[#e6d7b8] bg-[#fbf8ef]">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.2em] text-[#2f3f34]"
        >
          TSTMNY
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-[#2f3f34]">
          <Link href="/about">About</Link>
          <Link href="/testimonies">Testimonies</Link>
          <Link href="/donate">Donate</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  )
}