import { firebaseApp, isFirebaseConfigured } from '../firebase'
import { PRODUCTION_CONFIG } from '../constants/production'
import { logger } from './loggingService'

let analyticsPromise

async function getAnalyticsInstance() {
  if (!PRODUCTION_CONFIG.enableAnalytics || !isFirebaseConfigured) return null
  analyticsPromise ??= import('firebase/analytics').then(async ({ getAnalytics, isSupported }) => {
    if (!(await isSupported())) return null
    return getAnalytics(firebaseApp)
  }).catch((error) => {
    logger.warn('Analytics initialization failed', error)
    return null
  })
  return analyticsPromise
}

export async function trackEvent(name, parameters = {}) {
  const analytics = await getAnalyticsInstance()
  if (!analytics) return false
  const { logEvent } = await import('firebase/analytics')
  logEvent(analytics, name, parameters)
  return true
}

export function trackPageView(path, title) {
  return trackEvent('page_view', { page_location: window.location.href, page_path: path, page_title: title })
}

export async function identifyAnalyticsUser(user, profile) {
  const analytics = await getAnalyticsInstance()
  if (!analytics) return
  const { setUserId, setUserProperties } = await import('firebase/analytics')
  setUserId(analytics, user?.uid || null)
  if (profile) setUserProperties(analytics, { role: profile.role || 'unknown', account_status: profile.status || 'unknown' })
}
