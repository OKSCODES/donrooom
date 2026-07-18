import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { logger } from './loggingService'
import { VERSION_INFO } from '../constants/version'

const normalizeError = (error) => ({
  name: error?.name || 'Error',
  message: error?.message || String(error || 'Unknown error'),
  stack: error?.stack?.slice(0, 5000) || '',
  code: error?.code || '',
})

export async function reportError(error, context = {}) {
  const errorId = crypto.randomUUID()
  const record = {
    errorId,
    error: normalizeError(error),
    context: { source: context.source || 'application', route: location.pathname, ...context },
    userId: auth?.currentUser?.uid || null,
    version: VERSION_INFO.version,
    userAgent: navigator.userAgent,
    createdAt: serverTimestamp(),
  }
  logger.error('Reported application error', { errorId, ...record.error, source: record.context.source })
  if (db && auth?.currentUser) {
    try { await setDoc(doc(db, 'errorReports', errorId), record) } catch { /* local logging remains available */ }
  }
  return errorId
}

export function installGlobalErrorReporting() {
  const onError = (event) => { reportError(event.error || new Error(event.message), { source: 'window.error', filename: event.filename, line: event.lineno }) }
  const onRejection = (event) => { reportError(event.reason instanceof Error ? event.reason : new Error(String(event.reason)), { source: 'unhandledrejection' }) }
  const onImageError = (event) => {
    const target = event.target
    if (target instanceof HTMLImageElement) reportError(new Error(`Image failed to load: ${target.currentSrc || target.src}`), { source: 'image', alt: target.alt })
  }
  window.addEventListener('error', onError)
  window.addEventListener('unhandledrejection', onRejection)
  document.addEventListener('error', onImageError, true)
  return () => { window.removeEventListener('error', onError); window.removeEventListener('unhandledrejection', onRejection); document.removeEventListener('error', onImageError, true) }
}
