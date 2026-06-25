import { useEffect, useMemo, useState } from 'react'
import './App.css'

type Language = 'ru' | 'en'

type ProjectSummary = {
  name: string
  status: string
  description: string
}

const githubUrl = 'https://github.com/fedorovdo'
const printLedgerSiteUrl = 'https://printledger.simplyadmin.org'
const printLedgerGitHubUrl = 'https://github.com/fedorovdo/printledger'
const voiceAssistantSiteUrl = 'https://voiceassistant.simplyadmin.org/'
const voiceAssistantGitHubUrl = 'https://github.com/fedorovdo/VoiceAssistant'
const voiceAssistantDownloadUrl = 'https://github.com/fedorovdo/VoiceAssistant/releases/download/v0.2.0/VoiceAssistant-0.2.0-x64.exe'

const meta = {
  title: 'Simply Admin - self-hosted инструменты для системных администраторов и DevOps',
  description:
    'Simply Admin: open-source приложения, локальные сервисы и практические эксперименты для системных администраторов, DevOps и небольших IT-команд.',
  canonical: 'https://simplyadmin.org/',
  image: 'https://simplyadmin.org/og-simplyadmin.svg',
}

const copy = {
  ru: {
    navAria: 'Основная навигация',
    projects: 'Проекты',
    about: 'О проекте',
    github: 'GitHub',
    openSite: 'Открыть сайт',
    details: 'Подробнее',
    download: 'Скачать',
    soon: 'Скоро',
    redirecting: 'Перенаправляем на сайт VoiceAssistant...',
    home: {
      eyebrow: 'self-hosted · sysadmin · devops',
      title: 'Simply Admin',
      subtitle: 'Практичные инструменты для системных администраторов, DevOps и небольших IT-команд.',
      description:
        'Open-source приложения, локальные сервисы и рабочие эксперименты, созданные из реальных задач администрирования.',
      primary: 'Смотреть проекты',
      secondary: 'GitHub',
      catalogTitle: 'Проекты Simply Admin',
      catalogText:
        'Небольшой каталог прикладных инструментов: от учета инфраструктуры до локальных помощников для обучения и поддержки команд.',
      aboutTitle: 'О проекте',
      aboutText:
        'Simply Admin собирает практические идеи вокруг self-hosted инфраструктуры: простые приложения, заметки, проверенные команды и эксперименты, которые можно быстро повторить в небольшой IT-среде.',
    },
    projectsList: [
      {
        name: 'PrintLedger',
        status: 'Stable',
        description:
          'Self-hosted система учета принтеров, картриджей, расходников, ремонтов и резервных копий для IT-команд.',
      },
      {
        name: 'VoiceAssistant',
        status: 'Preview',
        description:
          'Локальный помощник для технических разговоров, обучения и быстрых практических подсказок.',
      },
      {
        name: 'OfficeChat',
        status: 'In development',
        description:
          'Локальный корпоративный чат с группами, файлами, ботами и будущей поддержкой AI.',
      },
      {
        name: 'Coming soon',
        status: 'Future tools',
        description: 'Место для следующих небольших инструментов Simply Admin. Без выдуманных продуктов.',
      },
    ],
    footerText: 'Open-source tools and practical infrastructure notes.',
  },
  en: {
    navAria: 'Primary navigation',
    projects: 'Projects',
    about: 'About',
    github: 'GitHub',
    openSite: 'Open site',
    details: 'Details',
    download: 'Download',
    soon: 'Soon',
    redirecting: 'Redirecting to the VoiceAssistant website...',
    home: {
      eyebrow: 'self-hosted · sysadmin · devops',
      title: 'Simply Admin',
      subtitle: 'Practical tools for system administrators, DevOps, and small IT teams.',
      description:
        'Open-source applications, local services, and working experiments built from real administration tasks.',
      primary: 'View projects',
      secondary: 'GitHub',
      catalogTitle: 'Simply Admin projects',
      catalogText:
        'A compact catalog of practical tools, from infrastructure inventory to local helpers for learning and team support.',
      aboutTitle: 'About the project',
      aboutText:
        'Simply Admin collects practical self-hosted infrastructure ideas: small applications, notes, tested commands, and experiments that can be repeated in a small IT environment.',
    },
    projectsList: [
      {
        name: 'PrintLedger',
        status: 'Stable',
        description:
          'A self-hosted printer, cartridge, consumable, repair, and backup inventory system for IT teams.',
      },
      {
        name: 'VoiceAssistant',
        status: 'Preview',
        description: 'A local helper for technical conversations, learning, and quick practical hints.',
      },
      {
        name: 'OfficeChat',
        status: 'In development',
        description: 'A local team chat with groups, files, bots, and future AI support.',
      },
      {
        name: 'Coming soon',
        status: 'Future tools',
        description: 'Reserved for the next small Simply Admin tools. No fake products here.',
      },
    ],
    footerText: 'Open-source tools and practical infrastructure notes.',
  },
} as const

function App() {
  const [language, setLanguage] = useState<Language>('ru')
  const t = copy[language]
  const currentYear = useMemo(() => new Date().getFullYear(), [])
  const isVoiceAssistantLegacyPath = window.location.pathname.toLowerCase().startsWith('/voiceassistant')

  useEffect(() => {
    applyMetadata(meta)
  }, [])

  useEffect(() => {
    if (isVoiceAssistantLegacyPath) {
      window.location.replace(voiceAssistantSiteUrl)
    }
  }, [isVoiceAssistantLegacyPath])

  if (isVoiceAssistantLegacyPath) {
    return (
      <main className="redirect-page">
        <a className="brand" href="/" aria-label="Simply Admin">
          <span className="brand-mark">SA</span>
          <span>Simply Admin</span>
        </a>
        <section className="quiet-card redirect-card">
          <h1>VoiceAssistant</h1>
          <p>{t.redirecting}</p>
          <a className="button primary" href={voiceAssistantSiteUrl}>
            {t.details}
          </a>
        </section>
      </main>
    )
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Simply Admin">
          <span className="brand-mark">SA</span>
          <span>Simply Admin</span>
        </a>
        <nav className="nav" aria-label={t.navAria}>
          <a href="#projects">{t.projects}</a>
          <a href="#about">{t.about}</a>
          <a href={githubUrl}>{t.github}</a>
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

      <section className="hero hero-home" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{t.home.eyebrow}</p>
          <h1>{t.home.title}</h1>
          <p className="subtitle">{t.home.subtitle}</p>
          <p className="description">{t.home.description}</p>
          <div className="button-row">
            <a className="button primary" href="#projects">
              {t.home.primary}
            </a>
            <a className="button secondary" href={githubUrl}>
              {t.home.secondary}
            </a>
          </div>
        </div>
        <div className="showcase-panel" aria-hidden="true">
          <div className="showcase-item active">VoiceAssistant</div>
          <div className="showcase-item">PrintLedger</div>
          <div className="showcase-item muted">OfficeChat</div>
          <div className="showcase-line" />
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">{t.projects}</p>
          <h2>{t.home.catalogTitle}</h2>
          <p>{t.home.catalogText}</p>
        </div>
        <div className="project-grid">
          {t.projectsList.map((project) => (
            <ProjectCard key={project.name} project={project} language={language} />
          ))}
        </div>
      </section>

      <section className="section compact-section" id="about">
        <article className="quiet-card">
          <p className="eyebrow">{t.about}</p>
          <h2>{t.home.aboutTitle}</h2>
          <p>{t.home.aboutText}</p>
        </article>
      </section>

      <footer className="footer">
        <div>
          <strong>Simply Admin</strong>
          <p>{t.footerText}</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href={githubUrl}>GitHub</a>
          <a href={voiceAssistantSiteUrl}>VoiceAssistant</a>
          <a href={printLedgerSiteUrl}>PrintLedger</a>
        </nav>
        <span className="copyright">© {currentYear}</span>
      </footer>
    </main>
  )
}

function ProjectCard({ project, language }: { project: ProjectSummary; language: Language }) {
  const t = copy[language]

  return (
    <article className="project-card">
      <div>
        <span className="status-pill">{project.status}</span>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <div className="card-actions">
        {project.name === 'PrintLedger' && (
          <>
            <a className="button primary small" href={printLedgerSiteUrl}>
              {t.openSite}
            </a>
            <a className="button secondary small" href={printLedgerGitHubUrl}>
              GitHub
            </a>
          </>
        )}
        {project.name === 'VoiceAssistant' && (
          <>
            <a className="button primary small" href={voiceAssistantSiteUrl}>
              {t.details}
            </a>
            <a className="button secondary small" href={voiceAssistantDownloadUrl}>
              {t.download}
            </a>
            <a className="button secondary small" href={voiceAssistantGitHubUrl}>
              GitHub
            </a>
          </>
        )}
        {(project.name === 'OfficeChat' || project.name === 'Coming soon') && (
          <span className="button disabled small" aria-disabled="true">
            {t.soon}
          </span>
        )}
      </div>
    </article>
  )
}

function applyMetadata(nextMeta: typeof meta) {
  document.title = nextMeta.title
  document.documentElement.lang = 'ru'
  setMeta('name', 'description', nextMeta.description)
  setMeta('property', 'og:title', nextMeta.title)
  setMeta('property', 'og:description', nextMeta.description)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:url', nextMeta.canonical)
  setMeta('property', 'og:image', nextMeta.image)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', nextMeta.title)
  setMeta('name', 'twitter:description', nextMeta.description)
  setMeta('name', 'twitter:image', nextMeta.image)
  setCanonical(nextMeta.canonical)
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(href: string) {
  let element = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

export default App
