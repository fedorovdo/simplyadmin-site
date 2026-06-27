import { useState } from 'react'
import { siteCopy } from '../data/copy'
import type { Application, Language } from '../types/app'

type AppDetailsProps = {
  application: Application
  language: Language
  instance: 'desktop' | 'mobile'
  onClose: () => void
}

export function AppDetails({ application, language, instance, onClose }: AppDetailsProps) {
  const t = siteCopy[language]
  const titleId = `details-${application.id}-${instance}`
  const monogram = application.name.match(/[A-Z]/g)?.slice(0, 2).join('') ?? application.name.slice(0, 2).toUpperCase()
  const referenceLink = application.links.documentation
    ? { href: application.links.documentation, label: t.details.documentation }
    : application.links.release
      ? { href: application.links.release, label: t.details.release }
      : null

  return (
    <article className="app-details" aria-labelledby={titleId}>
      <button className="details-back" type="button" onClick={onClose}>
        <span aria-hidden="true">←</span>{t.details.back}
      </button>
      <header className="details-header">
        <div className="details-identity">
          <span className="app-monogram details-monogram" aria-hidden="true">{monogram}</span>
          <div className="details-title">
            <p className="app-category">{application.category[language]}</p>
            <h2 id={titleId}>{application.name}</h2>
            <div className="detail-meta">
              <span className={`status status-${application.status.toLowerCase().replaceAll(' ', '-')}`}>
                {t.statuses[application.status]}
              </span>
              {application.version && <span>{application.version}</span>}
              <span>{application.platform[language]}</span>
            </div>
          </div>
        </div>
        <button className="icon-button" type="button" onClick={onClose} aria-label={t.details.close} title={t.details.close}>×</button>
      </header>

      <p className="details-description">{application.description[language]}</p>

      {application.badges && (
        <div className="badge-row">
          {application.badges[language].map((badge) => <span className="badge" key={badge}>{badge}</span>)}
        </div>
      )}

      <ApplicationScreenshot key={`${application.id}-${language}`} application={application} language={language} />

      <div className="details-columns">
        <section>
          <h3>{t.details.features}</h3>
          <ul>{application.features[language].map((feature) => <li key={feature}>{feature}</li>)}</ul>
        </section>
        <section>
          <h3>{t.details.limitations}</h3>
          <ul>{application.limitations[language].map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
        </section>
      </div>

      <div className="details-actions">
        {application.links.demo && <a className="button primary" href={application.links.demo} rel="noreferrer">{t.details.demo}</a>}
        {application.links.download && <a className="button primary" href={application.links.download} rel="noreferrer">{t.details.download}</a>}
        <a className="button secondary" href={application.links.github} rel="noreferrer">{t.details.github}</a>
        {referenceLink && <a className="button secondary" href={referenceLink.href} rel="noreferrer">{referenceLink.label}</a>}
        {application.links.website && <a className="button secondary" href={application.links.website} rel="noreferrer">{t.details.website}</a>}
      </div>
    </article>
  )
}

function ApplicationScreenshot({ application, language }: { application: Application; language: Language }) {
  const [attempt, setAttempt] = useState(0)
  const t = siteCopy[language]
  const preferredSources = language === 'ru'
    ? [application.screenshots.ru, application.screenshots.en]
    : [application.screenshots.en, application.screenshots.ru]
  const sources = preferredSources.filter((source, index) => preferredSources.indexOf(source) === index)
  const currentSource = sources[attempt]

  return (
    <figure className="screenshot-section">
      <figcaption className="screenshot-heading">{t.details.screenshotAlt}</figcaption>
      <div className="screenshot-frame">
      {currentSource ? (
        <img
          className="application-screenshot"
          src={currentSource}
          alt={`${t.details.screenshotAlt}: ${application.name}`}
          data-screenshot-source={currentSource}
          onError={() => setAttempt((currentAttempt) => currentAttempt + 1)}
        />
      ) : (
        <div className="screenshot-placeholder" role="img" aria-label={`${application.name}: ${t.details.screenshotMissing}`}>
          <div className="placeholder-mark" aria-hidden="true">{application.name.slice(0, 2).toUpperCase()}</div>
          <strong>{application.name}</strong>
          <span>{t.details.screenshotMissing}</span>
        </div>
      )}
      </div>
    </figure>
  )
}
