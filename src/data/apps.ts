import type { Application } from '../types/app'

export const applications: Application[] = [
  {
    id: 'printledger',
    name: 'PrintLedger',
    status: 'Stable',
    platform: { ru: 'Self-hosted · Web', en: 'Self-hosted · Web' },
    category: { ru: 'Учёт инфраструктуры', en: 'Infrastructure inventory' },
    summary: {
      ru: 'Self-hosted система учета принтеров, картриджей, расходных материалов, ремонтов и резервных копий для небольших IT-команд.',
      en: 'A self-hosted inventory system for printers, cartridges, consumables, repairs, and backups for small IT teams.',
    },
    description: {
      ru: 'PrintLedger помогает небольшой IT-команде хранить в одном месте сведения о печатной инфраструктуре и расходных материалах. Приложение разворачивается в собственной инфраструктуре и делает повседневный учет понятным и проверяемым.',
      en: 'PrintLedger gives a small IT team one place to track printing infrastructure and consumables. It runs in your own environment and keeps day-to-day inventory work understandable and auditable.',
    },
    features: {
      ru: ['Учёт принтеров и картриджей', 'Расходные материалы и ремонты', 'История операций', 'Резервное копирование данных'],
      en: ['Printer and cartridge inventory', 'Consumables and repairs', 'Operation history', 'Data backups'],
    },
    limitations: {
      ru: ['Требуется собственное self-hosted развертывание', 'Настройка и резервное копирование остаются под контролем администратора'],
      en: ['Requires your own self-hosted deployment', 'Configuration and backups remain under administrator control'],
    },
    links: {
      github: 'https://github.com/fedorovdo/printledger',
      demo: 'https://demo.printledger.simplyadmin.org',
      documentation: 'https://github.com/fedorovdo/printledger#readme',
    },
    screenshots: {
      ru: '/images/apps/screenshots_ru/printledger.png',
      en: '/images/apps/screenshots_en/printledger.png',
    },
    badges: { ru: ['Open source', 'Self-hosted'], en: ['Open source', 'Self-hosted'] },
  },
  {
    id: 'iplocalscan',
    name: 'IPLocalScan',
    status: 'Stable',
    version: 'v0.4.0',
    platform: { ru: 'Windows', en: 'Windows' },
    category: { ru: 'Инвентаризация сети', en: 'Network inventory' },
    summary: {
      ru: 'Локальное приложение для инвентаризации сети: устройства, TCP-порты, сервисы, производители, сетевые принтеры, SNMP, история изменений и экспорт CSV.',
      en: 'A local Windows network inventory application for devices, TCP ports, services, vendors, network printers, SNMP, scan history, and CSV export.',
    },
    description: {
      ru: 'IPLocalScan исследует заданный CIDR-диапазон и собирает практический срез локальной сети без облачной учетной записи. Результаты и история сравнений хранятся локально, а текущий вид можно экспортировать в CSV.',
      en: 'IPLocalScan explores a selected CIDR range and builds a practical view of the local network without a cloud account. Results and comparison history stay local, and the current view can be exported to CSV.',
    },
    features: {
      ru: ['Поиск устройств в CIDR-подсети', 'TCP-порты, сервисы и OUI-производители', 'Обнаружение принтеров через LPD, IPP, JetDirect и SNMP', 'История сканирований, сравнение и CSV'],
      en: ['Device discovery in a CIDR subnet', 'TCP ports, services, and OUI vendors', 'Printer discovery through LPD, IPP, JetDirect, and SNMP', 'Scan history, comparison, and CSV'],
    },
    limitations: {
      ru: ['Сборка Windows может быть не подписана и вызвать предупреждение SmartScreen', 'SNMP работает через v2c с community public; SNMPv3 пока не поддерживается', 'Модель и серийный номер пока не вынесены в отдельные колонки таблицы'],
      en: ['The Windows build may be unsigned and trigger a SmartScreen warning', 'SNMP uses v2c with the public community; SNMPv3 is not supported yet', 'Model and serial number are not separate table columns yet'],
    },
    links: {
      github: 'https://github.com/fedorovdo/iplocalscan',
      website: 'https://iplocalscan.simplyadmin.org/',
      download: 'https://github.com/fedorovdo/iplocalscan/releases/latest',
      release: 'https://github.com/fedorovdo/iplocalscan/releases/tag/v0.4.0',
    },
    screenshots: {
      ru: '/images/apps/screenshots_ru/iplocalscan.png',
      en: '/images/apps/screenshots_en/iplocalscan.png',
    },
    badges: { ru: ['Локальная работа', 'CSV'], en: ['Local-first', 'CSV'] },
  },
  {
    id: 'voiceassistant',
    name: 'VoiceAssistant',
    status: 'Preview',
    version: 'v0.2.0',
    platform: { ru: 'Windows', en: 'Windows' },
    category: { ru: 'Технический помощник', en: 'Technical assistant' },
    summary: {
      ru: 'Локальный помощник для технических разговоров, обучения и быстрых практических подсказок с локальной базой знаний и опциональным OpenAI.',
      en: 'A local helper for technical conversations, learning, and quick practical guidance with a local knowledge base and optional OpenAI integration.',
    },
    description: {
      ru: 'VoiceAssistant объединяет локальную базу знаний и разговорный интерфейс для повседневных технических вопросов. Базовые сценарии работают локально, а интеграция с OpenAI подключается только при необходимости.',
      en: 'VoiceAssistant combines a local knowledge base with a conversational interface for everyday technical questions. Core scenarios run locally, while OpenAI integration is optional.',
    },
    features: {
      ru: ['Локальная база технических знаний', 'Разговоры и быстрые практические подсказки', 'Поддержка учебных сценариев', 'Опциональная интеграция с OpenAI'],
      en: ['Local technical knowledge base', 'Conversations and quick practical guidance', 'Learning-oriented workflows', 'Optional OpenAI integration'],
    },
    limitations: {
      ru: ['Проект находится в статусе Preview', 'Для функций OpenAI нужны собственный API-ключ и доступ к сети', 'Возможности и интерфейс продолжают меняться'],
      en: ['The project is currently in Preview', 'OpenAI features require your own API key and network access', 'Features and interface are still evolving'],
    },
    links: {
      github: 'https://github.com/fedorovdo/VoiceAssistant',
      download: 'https://github.com/fedorovdo/VoiceAssistant/releases/latest',
      release: 'https://github.com/fedorovdo/VoiceAssistant/releases/tag/v0.2.0',
    },
    screenshots: {
      ru: '/images/apps/screenshots_ru/voiceassistant.png',
      en: '/images/apps/screenshots_en/voiceassistant.png',
    },
    badges: { ru: ['Локальная база', 'OpenAI optional'], en: ['Local knowledge', 'OpenAI optional'] },
  },
  {
    id: 'officechat',
    name: 'OfficeChat',
    status: 'In development',
    platform: { ru: 'Self-hosted · Web', en: 'Self-hosted · Web' },
    category: { ru: 'Командная коммуникация', en: 'Team communication' },
    summary: {
      ru: 'Локальный корпоративный чат с группами, личными сообщениями, файлами, ботами и будущей поддержкой AI.',
      en: 'A local team chat with groups, direct messages, files, bots, and planned AI support.',
    },
    description: {
      ru: 'OfficeChat создается как понятный self-hosted мессенджер для небольших команд и локальной инфраструктуры. В фокусе — основные рабочие разговоры, обмен файлами и расширение через ботов без зависимости от внешнего облака.',
      en: 'OfficeChat is being built as a straightforward self-hosted messenger for small teams and local infrastructure. It focuses on core work conversations, file sharing, and bot extensions without depending on an external cloud.',
    },
    features: {
      ru: ['Групповые и личные сообщения', 'Обмен файлами', 'Боты и расширяемые сценарии', 'Планируемая поддержка AI'],
      en: ['Group and direct messages', 'File sharing', 'Bots and extensible workflows', 'Planned AI support'],
    },
    limitations: {
      ru: ['Проект находится в активной разработке', 'Стабильный публичный релиз пока не опубликован', 'Функции и схема развертывания могут измениться'],
      en: ['The project is under active development', 'A stable public release is not available yet', 'Features and deployment details may change'],
    },
    links: { github: 'https://github.com/fedorovdo/officechat' },
    screenshots: {
      ru: '/images/apps/screenshots_ru/officechat.png',
      en: '/images/apps/screenshots_en/officechat.png',
    },
    badges: { ru: ['Self-hosted', 'В разработке'], en: ['Self-hosted', 'In development'] },
  },
]

export function findApplication(id: string | null) {
  return applications.find((application) => application.id === id)
}
