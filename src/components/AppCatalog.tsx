import { applications, findApplication } from '../data/apps'
import { siteCopy } from '../data/copy'
import type { Language } from '../types/app'
import { AppCard } from './AppCard'
import { AppDetails } from './AppDetails'

type AppCatalogProps = {
  language: Language
  selectedId: string | null
  onNavigate: (path: string) => void
}

export function AppCatalog({ language, selectedId, onNavigate }: AppCatalogProps) {
  const t = siteCopy[language]
  const selectedApplication = findApplication(selectedId)
  const notFound = Boolean(selectedId && !selectedApplication)

  const closeDetails = () => onNavigate('/apps')

  return (
    <main className="catalog-page">
      <header className="catalog-heading">
        <p className="eyebrow">{t.catalog.eyebrow}</p>
        <h1>{t.catalog.title}</h1>
        <p>{t.catalog.description}</p>
      </header>

      {notFound && <p className="not-found" role="status">{t.catalog.notFound}</p>}

      <div className={`catalog-layout${selectedApplication ? ' has-selection' : ''}`}>
        <div className="app-list">
          {applications.map((application) => (
            <div className="app-list-item" key={application.id}>
              <AppCard
                application={application}
                language={language}
                selected={application.id === selectedApplication?.id}
                onOpen={() => onNavigate(`/apps/${application.id}`)}
              />
              {application.id === selectedApplication?.id && (
                <div className="mobile-details">
                  <AppDetails application={application} language={language} instance="mobile" onClose={closeDetails} />
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedApplication && (
          <aside className="desktop-details">
            <AppDetails application={selectedApplication} language={language} instance="desktop" onClose={closeDetails} />
          </aside>
        )}
      </div>
    </main>
  )
}
