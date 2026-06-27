import { useEffect, useState } from 'react'
import './App.css'
import { AppCatalog } from './components/AppCatalog'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { findApplication } from './data/apps'
import { siteCopy } from './data/copy'
import type { Language } from './types/app'

const siteUrl = 'https://simplyadmin.org'
const socialImage = `${siteUrl}/og-simplyadmin.svg`

function App() {
  const [language, setLanguage] = useState<Language>('ru')
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  const isAppsPage = path === '/apps' || path.startsWith('/apps/')
  const selectedId = isAppsPage && path !== '/apps' ? path.slice('/apps/'.length).split('/')[0] : null

  useEffect(() => {
    if (window.location.pathname.toLowerCase().startsWith('/voiceassistant')) {
      window.history.replaceState({}, '', '/apps/voiceassistant')
    }

    const handlePopState = () => setPath(normalizePath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    applyMetadata(path, language)
  }, [language, path])

  const navigate = (nextPath: string) => {
    const normalized = normalizePath(nextPath)
    if (normalized === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    window.history.pushState({}, '', normalized)
    setPath(normalized)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="site-shell">
      <Header language={language} page={isAppsPage ? 'apps' : 'home'} onLanguageChange={setLanguage} onNavigate={navigate} />
      {isAppsPage ? (
        <AppCatalog language={language} selectedId={selectedId} onNavigate={navigate} />
      ) : (
        <main><HomePage language={language} onNavigate={navigate} /></main>
      )}
      <Footer language={language} onNavigate={navigate} />
    </div>
  )
}

function normalizePath(pathname: string) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  if (normalized.toLowerCase().startsWith('/voiceassistant')) return '/apps/voiceassistant'
  return normalized
}

function applyMetadata(path: string, language: Language) {
  const isAppsPage = path === '/apps' || path.startsWith('/apps/')
  const selectedId = isAppsPage && path !== '/apps' ? path.slice('/apps/'.length).split('/')[0] : null
  const application = findApplication(selectedId)
  const catalogCopy = siteCopy[language].catalog

  let title = 'Simply Admin'
  let description = language === 'ru'
    ? 'Практические open-source инструменты для системных администраторов и небольших IT-команд.'
    : 'Practical open-source tools for system administrators and small IT teams.'
  let canonical = `${siteUrl}/`

  if (isAppsPage) {
    title = application ? `${application.name} · Simply Admin` : 'Applications · Simply Admin'
    description = application ? application.summary[language] : catalogCopy.description
    canonical = application ? `${siteUrl}/apps/${application.id}` : `${siteUrl}/apps`
  }

  document.title = title
  document.documentElement.lang = language
  setMeta('name', 'description', description)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:type', 'website')
  setMeta('property', 'og:url', canonical)
  setMeta('property', 'og:image', socialImage)
  setMeta('name', 'twitter:card', 'summary_large_image')
  setMeta('name', 'twitter:title', title)
  setMeta('name', 'twitter:description', description)
  setMeta('name', 'twitter:image', socialImage)
  setCanonical(canonical)
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
