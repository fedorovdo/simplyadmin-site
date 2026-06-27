import type { KeyboardEvent, MouseEvent } from 'react'
import { siteCopy } from '../data/copy'
import type { Application, Language } from '../types/app'

type AppCardProps = {
  application: Application
  language: Language
  selected: boolean
  onOpen: () => void
}

export function AppCard({ application, language, selected, onOpen }: AppCardProps) {
  const t = siteCopy[language]

  const handleKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onOpen()
    }
  }

  const handleCardClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onOpen()
  }

  return (
    <article className={`app-card${selected ? ' selected' : ''}`}>
      <a
        className="app-card-main"
        href={`/apps/${application.id}`}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        aria-current={selected ? 'page' : undefined}
      >
        <div className="card-topline">
          <span className={`status status-${application.status.toLowerCase().replaceAll(' ', '-')}`}>
            {t.statuses[application.status]}
          </span>
          <span className="platform">{application.platform[language]}</span>
        </div>
        <div>
          <p className="app-category">{application.category[language]}</p>
          <h2>{application.name}</h2>
          {application.version && <span className="version">{application.version}</span>}
        </div>
        <p className="app-summary">{application.summary[language]}</p>
      </a>
      <button className="details-button" type="button" onClick={onOpen}>
        {t.catalog.details}<span aria-hidden="true">→</span>
      </button>
    </article>
  )
}
