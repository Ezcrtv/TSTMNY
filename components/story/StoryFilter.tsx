import Link from 'next/link'
import { archiveHref, type FilterOption, type StoryFilters } from '@/lib/stories/filter'

type Props = {
  /** Which filter this row controls. */
  param: keyof StoryFilters
  label: string
  options: FilterOption[]
  /** All active filters, so changing one keeps the other. */
  active: StoryFilters
  total: number
}

/** Plain links (`?topic=` / `?sport=`) so filtering works without JavaScript and every view is shareable. */
export default function StoryFilter({ param, label, options, active, total }: Props) {
  const current = active[param]

  return (
    <nav aria-label={`Filter testimonies by ${label.toLowerCase()}`} className="filter-row">
      <p className="eyebrow filter-row__label">{label}</p>
      <ul className="filter t-body-lg">
        <li>
          <Link href={archiveHref({ ...active, [param]: undefined })} scroll={false} aria-current={!current ? 'page' : undefined}>
            All<span className="filter__count">{total}</span>
          </Link>
        </li>
        {options.map((option) => (
          <li key={option.slug}>
            <Link
              href={archiveHref({ ...active, [param]: option.slug })}
              scroll={false}
              aria-current={current === option.slug ? 'page' : undefined}
            >
              {option.title}
              <span className="filter__count">{option.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
