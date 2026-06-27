export type Language = 'ru' | 'en'

export type LocalizedText = Record<Language, string>

export type AppLinks = {
  github: string
  website?: string
  download?: string
  demo?: string
  documentation?: string
  release?: string
}

export type Application = {
  id: string
  name: string
  status: 'Stable' | 'Preview' | 'In development'
  version?: string
  platform: LocalizedText
  category: LocalizedText
  summary: LocalizedText
  description: LocalizedText
  features: Record<Language, string[]>
  limitations: Record<Language, string[]>
  links: AppLinks
  screenshots: Record<Language, string>
  badges?: Record<Language, string[]>
}
