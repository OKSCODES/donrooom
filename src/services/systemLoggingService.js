import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { logger } from './loggingService'

const ALLOWED_EVENTS = new Set(['login','logout','booking','property_update','admin_action','review_action','gallery_upload','security_event','permission_failure'])

export async function writeSystemLog(event, details = {}) {
  if (!ALLOWED_EVENTS.has(event)) throw new Error('Unsupported system log event.')
  const entry = { event, userId: auth?.currentUser?.uid || null, details, route: location.pathname, createdAt: serverTimestamp() }
  logger.info(`System event: ${event}`, details)
  if (!db || !auth?.currentUser) return null
  return addDoc(collection(db, 'systemLogs'), entry)
}
