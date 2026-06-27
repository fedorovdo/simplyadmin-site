import type { MouseEvent } from 'react'
import { githubUrl, siteCopy } from '../data/copy'
import type { Language } from '../types/app'

type HeaderProps = {
  language: Language
  page: 'home' | 'apps'
  onLanguageChange: (language: Language) => void
  onNavigate: (path: string) => void
}

export function Header({ language, page, onLanguageChange, onNavigate }: HeaderProps) {
  const t = siteCopy[language]

  const navigate = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault()
    onNavigate(path)
  }

  return (
    <header className="site-header">
      <a className="brand" href="/" onClick={(event) => navigate(event, '/')} aria-label="Simply Admin">
        <span className="brand-mark" aria-hidden="true"><span>SA</span></span>
        <span>Simply Admin</span>
      </a>
      <nav className="nav" aria-label={t.nav.aria}>
        <a href={page === 'home' ? '#about' : '/#about'}>{t.nav.about}</a>
        <a className={page === 'apps' ? 'active' : ''} href="/apps" onClick={(event) => navigate(event, '/apps')}>
          {t.nav.applications}
        </a>
        <a href={githubUrl}>GitHub</a>
      </nav>
      <div className="language-switcher" aria-label={t.languageAria}>
        {(['ru', 'en'] as const).map((item) => (
          <button
            className={language === item ? 'active' : ''}
            key={item}
            type="button"
            onClick={() => onLanguageChange(item)}
            aria-pressed={language === item}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  )
}
