import type { MouseEvent } from 'react'
import { siteCopy, siteMetadata } from '../data/copy'
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
      <div className="site-header-inner">
        <a className="brand" href="/" onClick={(event) => navigate(event, '/')} aria-label="Simply Admin home">
          <picture>
            <source media="(max-width: 390px)" srcSet="/brand/simply-admin-mark-dark.png" />
            <img className="brand-logo" src="/brand/simply-admin-logo-dark.png" alt="Simply Admin logo" />
          </picture>
        </a>
        <nav className="nav" aria-label={t.nav.aria}>
          <a className={page === 'home' ? 'active' : ''} href={page === 'home' ? '#about' : '/#about'} aria-current={page === 'home' ? 'page' : undefined}>
            {t.nav.about}
          </a>
          <a className={page === 'apps' ? 'active' : ''} href="/apps" onClick={(event) => navigate(event, '/apps')} aria-current={page === 'apps' ? 'page' : undefined}>
            {t.nav.applications}
          </a>
          <a href={page === 'home' ? '#contact' : '/#contact'}>{t.contactNav}</a>
          <a href={siteMetadata.github}>GitHub</a>
        </nav>
        <div className="language-switcher" role="group" aria-label={t.languageAria}>
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
      </div>
    </header>
  )
}
