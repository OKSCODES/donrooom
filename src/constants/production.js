export const PRODUCTION_CONFIG = Object.freeze({
  siteUrl: (import.meta.env.VITE_SITE_URL || 'https://donroom.in').replace(/\/$/, ''),
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || 'support@donroom.in',
  analyticsMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  enableAnalytics: import.meta.env.PROD && import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
})

export const SEO_DEFAULTS = Object.freeze({
  title: 'DONROOM — Stays in Sohra',
  description: 'Discover and book verified homestays, hotels, guest houses and local accommodations across Sohra, Meghalaya.',
  keywords: ['Sohra accommodation', 'Cherrapunji hotels', 'Sohra homestays', 'Meghalaya stays', 'DONROOM'],
  image: '/icons/icon-512.svg',
})
