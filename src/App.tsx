import { useState } from 'react'
import './App.css'

type Language = 'ru' | 'en'

const githubUrl = 'https://github.com/fedorovdo'
const printLedgerSiteUrl = 'https://printledger.simplyadmin.org'
const printLedgerGitHubUrl = 'https://github.com/fedorovdo/printledger'

const translations = {
  ru: {
    navAria: 'Основная навигация',
    projects: 'Проекты',
    github: 'GitHub',
    printLedger: 'PrintLedger',
    hero: {
      title: 'Simply Admin',
      subtitle: 'Практичные self-hosted инструменты, заметки системного администратора и DevOps-эксперименты.',
      description:
        'Здесь будут собраны мои open-source проекты, внутренние IT-инструменты, заметки по системному администрированию, автоматизации и self-hosted решениям.',
    },
    projectsSection: {
      title: 'Проекты',
      description:
        'Self-hosted система учета принтеров, картриджей, расходников, ремонтов и резервных копий для IT-команд.',
      openWebsite: 'Открыть сайт',
    },
    note: {
      title: 'Сайт развивается',
      text: 'Пока здесь размещена минимальная главная страница. Постепенно я буду добавлять новые проекты, заметки и материалы.',
    },
  },
  en: {
    navAria: 'Primary navigation',
    projects: 'Projects',
    github: 'GitHub',
    printLedger: 'PrintLedger',
    hero: {
      title: 'Simply Admin',
      subtitle: 'Practical self-hosted tools, sysadmin notes, and DevOps experiments.',
      description:
        'A small hub for my open-source projects, internal IT tools, system administration notes, automation experiments, and self-hosted solutions.',
    },
    projectsSection: {
      title: 'Projects',
      description: 'Self-hosted printer and cartridge inventory system for IT teams.',
      openWebsite: 'Open website',
    },
    note: {
      title: 'Work in progress',
      text: 'This is a minimal homepage for now. More projects, notes, and materials will be added over time.',
    },
  },
} satisfies Record<Language, object>

function App() {
  const [language, setLanguage] = useState<Language>('ru')
  const t = translations[language]

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Simply Admin">
          <span className="brand-mark">SA</span>
          <span>Simply Admin</span>
        </a>
        <nav className="nav" aria-label={t.navAria}>
          <a href="#projects">{t.projects}</a>
          <a href={githubUrl}>{t.github}</a>
          <a href={printLedgerSiteUrl}>{t.printLedger}</a>
        </nav>
        <div className="language-switcher" aria-label="Language switcher">
          {(['ru', 'en'] as const).map((item) => (
            <button
              className={language === item ? 'active' : ''}
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              aria-pressed={language === item}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">self-hosted · sysadmin · devops</p>
          <h1>{t.hero.title}</h1>
          <p className="subtitle">{t.hero.subtitle}</p>
          <p className="description">{t.hero.description}</p>
        </div>
        <div className="hero-panel" aria-hidden="true">
          <div className="terminal-card">
            <span className="dot-row">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <code>$ docker compose up -d</code>
            <code>$ backup verified</code>
            <code>$ notes synced</code>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-heading">
          <p className="eyebrow">{t.projectsSection.title}</p>
          <h2>{t.projectsSection.title}</h2>
        </div>
        <article className="project-card">
          <div>
            <h3>PrintLedger</h3>
            <p>{t.projectsSection.description}</p>
          </div>
          <div className="card-actions">
            <a className="button primary" href={printLedgerSiteUrl}>
              {t.projectsSection.openWebsite}
            </a>
            <a className="button secondary" href={printLedgerGitHubUrl}>
              GitHub
            </a>
          </div>
        </article>
      </section>

      <section className="section note-section">
        <article className="note-card">
          <p className="eyebrow">status</p>
          <h2>{t.note.title}</h2>
          <p>{t.note.text}</p>
        </article>
      </section>

      <footer className="footer">
        <span>Dmitrii Fedorov</span>
        <span>Simply Admin</span>
        <a href={githubUrl}>GitHub</a>
      </footer>
    </main>
  )
}

export default App
