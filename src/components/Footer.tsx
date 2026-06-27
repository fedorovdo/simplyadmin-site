import type { MouseEvent } from 'react'
import { githubUrl, siteCopy } from '../data/copy'
import type { Language } from '../types/app'

type FooterProps = {
  language: Language
  onNavigate: (path: string) => void
}

export function Footer({ language, onNavigate }: FooterProps) {
  const t = siteCopy[language]
  const year = new Date().getFullYear()

  const openApplications = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onNavigate('/apps')
  }

  return (
    <footer className="footer">
      <div className="footer-intro">
        <strong>Simply Admin</strong>
        <p>{t.footer.note}</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href="/apps" onClick={openApplications}>{t.footer.applications}</a>
        <a href={githubUrl}>GitHub</a>
      </nav>
      <span className="copyright">© {year}</span>
    </footer>
  )
}
