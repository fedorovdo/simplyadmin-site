import type { MouseEvent } from 'react'
import { applications } from '../data/apps'
import { githubUrl, siteCopy } from '../data/copy'
import type { Language } from '../types/app'

type HomePageProps = {
  language: Language
  onNavigate: (path: string) => void
}

export function HomePage({ language, onNavigate }: HomePageProps) {
  const t = siteCopy[language]

  const openApplications = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate('/apps')
  }

  return (
    <>
      <section className="home-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p className="person-name">{t.home.person}</p>
          <p className="hero-introduction">{t.home.introduction}</p>
          <p className="hero-description">{t.home.description}</p>
          <div className="button-row">
            <a className="button primary" href="/apps" onClick={openApplications}>{t.home.applicationsCta}</a>
            <a className="button secondary" href={githubUrl}>GitHub</a>
          </div>
          <ul className="hero-meta">
            {['LOCAL-FIRST', 'SELF-HOSTED', 'OPEN SOURCE', 'WINDOWS / LINUX / WEB'].map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </div>
        <aside className="hero-signal" aria-hidden="true">
          <div className="terminal-titlebar">
            <span className="terminal-dots"><i /><i /><i /></span>
            <span className="terminal-host">simplyadmin@local</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-mark">SA</div>
            <p><span>&gt;</span> practical tools</p>
            <p><span>&gt;</span> local-first</p>
            <p><span>&gt;</span> self-hosted</p>
            <p><span>&gt;</span> open source</p>
          </div>
        </aside>
      </section>

      <section className="page-section about-layout" id="about">
        <div className="section-heading">
          <p className="eyebrow">{t.home.aboutEyebrow}</p>
          <h2>{t.home.aboutTitle}</h2>
        </div>
        <div className="about-copy">
          <p className="lead">{t.home.aboutLead}</p>
          <p>{t.home.aboutBody}</p>
        </div>
      </section>

      <section className="page-section principles-section">
        <div className="section-heading narrow">
          <p className="eyebrow">{t.home.principlesEyebrow}</p>
          <h2>{t.home.principlesTitle}</h2>
        </div>
        <div className="principles-grid">
          {t.home.principles.map(([title, text], index) => (
            <article className="principle" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section preview-section">
        <div className="preview-copy">
          <p className="eyebrow">{t.home.previewEyebrow}</p>
          <h2>{t.home.previewTitle}</h2>
          <p>{t.home.previewText}</p>
          <a className="text-link" href="/apps" onClick={openApplications}>{t.home.previewCta}<span aria-hidden="true">→</span></a>
        </div>
        <div className="app-preview-list">
          {applications.map((application) => (
            <button key={application.id} type="button" onClick={() => onNavigate(`/apps/${application.id}`)}>
              <span>{application.name}</span>
              <small>{siteCopy[language].statuses[application.status]}{application.version ? ` · ${application.version}` : ''}</small>
            </button>
          ))}
        </div>
      </section>
    </>
  )
}
