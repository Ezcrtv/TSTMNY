import Link from 'next/link'
import { THEMES, type Theme } from '@/lib/stories/types'
import { THEME_LABELS } from '@/lib/stories/themes'

type Props = {
  active?: Theme
  counts: Partial<Record<Theme, number>>
  total: number
}

/** Plain links (`?theme=`) so filtering works without JavaScript and every view is shareable. */
export default function ThemeFilter({ active, counts, total }: Props) {
  const themes = THEMES.filter((t) => (counts[t] ?? 0) > 0)

  return (
    <nav aria-label="Filter stories by theme">
      <ul className="filter t-body-lg">
        <li>
          <Link href="/testimony" scroll={false} aria-current={!active ? 'page' : undefined}>
            All<span className="filter__count">{total}</span>
          </Link>
        </li>
        {themes.map((theme) => (
          <li key={theme}>
            <Link
              href={`/testimony?theme=${theme}`}
              scroll={false}
              aria-current={active === theme ? 'page' : undefined}
            >
              {THEME_LABELS[theme]}
              <span className="filter__count">{counts[theme]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
