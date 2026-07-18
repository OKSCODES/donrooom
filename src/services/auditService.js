import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '../firebase'
import { logger } from './loggingService'

const allowedActions = new Set(['login', 'logout', 'booking_created', 'booking_cancelled', 'review_created', 'profile_updated', 'room_updated'])

export async function recordUserActivity({ action, userId, role, targetId = '', metadata = {} }) {
  if (!allowedActions.has(action) || !userId || !isFirebaseConfigured) return null
  try {
    return await addDoc(collection(db, 'userActivity'), {
      action,
      userId,
      role: role || 'unknown',
      targetId,
      metadata,
      createdAt: serverTimestamp(),
      client: 'web',
    })
  } catch (error) {
    logger.warn('User activity could not be recorded', { action, error })
    return null
  }
}
