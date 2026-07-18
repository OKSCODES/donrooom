export const VERSION_INFO = Object.freeze({
  version: '1.0.0',
  buildNumber: import.meta.env.VITE_BUILD_NUMBER || '10000',
  releaseDate: '2026-07-18',
  channel: import.meta.env.VITE_RELEASE_CHANNEL || 'stable',
})
