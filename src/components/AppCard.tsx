import type { KeyboardEvent, MouseEvent } from 'react'
import { siteCopy } from '../data/copy'
import type { Application, Language } from '../types/app'

type AppCardProps = {
  application: Application
  language: Language
  selected: boolean
  onOpen: () => void
}

const appMonograms: Record<string, string> = {
  printledger: 'PL',
  longpathguard: 'LP',
  iplocalscan: 'IP',
  voiceassistant: 'VA',
  officechat: 'OC',
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
          <span className="app-monogram" aria-hidden="true">
            {appMonograms[application.id] ?? application.name.slice(0, 2).toUpperCase()}
          </span>
          <span className={`status status-${application.status.toLowerCase().replaceAll(' ', '-')}`}>
            {t.statuses[application.status]}
          </span>
        </div>
        <div className="card-metadata">
          <p className="app-category">{application.category[language]}</p>
          <span className="platform">{application.platform[language]}</span>
        </div>
        <div className="card-title-row">
          <h2>{application.name}</h2>
          {application.version && <span className="version">{application.version}</span>}
        </div>
        <p className="app-summary">{application.summary[language]}</p>
      </a>
      <button className="details-button" type="button" onClick={onOpen}>
        {t.catalog.details}<span aria-hidden="true">→</span>
      </button>
      <div className="card-secondary-actions" aria-label={`${application.name} links`}>
        <a href={application.links.github}>{t.details.github}</a>
        {application.links.demo && <a href={application.links.demo}>{t.details.demo}</a>}
        {application.links.download && <a href={application.links.download}>{t.details.download}</a>}
      </div>
    </article>
  )
}
