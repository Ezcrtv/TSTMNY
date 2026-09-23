import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: ReactNode
  aside?: ReactNode
}

/** Interior page opening: eyebrow, large serif title, optional short aside. */
export default function PageHead({ eyebrow, title, aside }: Props) {
  return (
    <header className="container page-head">
      <p className="eyebrow fade-in">{eyebrow}</p>
      <div className="page-head__grid" style={{ marginTop: 'var(--space-5)' }}>
        <h1 className="t-h1 page-head__title">
          <span className="rise">
            <span>{title}</span>
          </span>
        </h1>
        {aside && <div className="page-head__aside t-body muted fade-in">{aside}</div>}
      </div>
    </header>
  )
}
