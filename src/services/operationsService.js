import { collection, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import { ref, listAll } from 'firebase/storage'
import { auth, db, isFirebaseConfigured, storage } from '../firebase'
import { DEFAULT_APP_SETTINGS, DEFAULT_FEATURE_FLAGS } from '../constants/operations'
import { VERSION_INFO } from '../constants/version'

const safe = async (name, operation) => {
  const startedAt = performance.now()
  try {
    const value = await operation()
    return { name, status: 'operational', latencyMs: Math.round(performance.now() - startedAt), value }
  } catch (error) {
    const secured = error?.code === 'permission-denied' || error?.code === 'storage/unauthorized'
    return { name, status: secured ? 'secured' : 'degraded', latencyMs: Math.round(performance.now() - startedAt), error: error?.message || 'Unavailable' }
  }
}

export async function runHealthCheck() {
  if (!isFirebaseConfigured) return { checkedAt: new Date().toISOString(), overall: 'degraded', checks: [{ name: 'Firebase', status: 'degraded', error: 'Firebase is not configured.' }] }
  const checks = await Promise.all([
    safe('Firebase configuration', async () => true),
    safe('Authentication', async () => ({ signedIn: Boolean(auth?.currentUser), uid: auth?.currentUser?.uid || null })),
    safe('Firestore', async () => { const snapshot = await getDoc(doc(db, 'siteSettings', 'global')); return { reachable: true, settingsExist: snapshot.exists() } }),
    safe('Storage', async () => { const result = await listAll(ref(storage, 'site-assets')); return { items: result.items.length, folders: result.prefixes.length } }),
    { name: 'Network', status: typeof navigator === 'undefined' || navigator.onLine ? 'operational' : 'degraded', latencyMs: 0, value: { online: typeof navigator === 'undefined' ? true : navigator.onLine } },
  ])
  const overall = checks.some((item) => item.status === 'degraded') ? 'degraded' : 'operational'
  return { checkedAt: new Date().toISOString(), overall, checks }
}

async function count(name) {
  const snapshot = await getCountFromServer(collection(db, name))
  return snapshot.data().count
}

export async function getMonitoringMetrics() {
  const [users, bookings, properties, reviews, logs] = await Promise.all([
    safe('users', () => count('users')),
    safe('bookings', () => count('bookings')),
    safe('properties', () => count('properties')),
    safe('reviews', () => count('reviews')),
    safe('logs', async () => { const snapshot = await getDocs(query(collection(db, 'systemLogs'), orderBy('createdAt', 'desc'), limit(20))); return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) }),
  ])
  return {
    users: users.value || 0,
    bookings: bookings.value || 0,
    properties: properties.value || 0,
    reviews: reviews.value || 0,
    recentLogs: logs.value || [],
    serverTime: new Date().toISOString(),
    version: VERSION_INFO,
  }
}

export async function getOperationalSettings() {
  if (!db) return { settings: DEFAULT_APP_SETTINGS, flags: DEFAULT_FEATURE_FLAGS }
  const [settingsSnapshot, flagsSnapshot] = await Promise.all([getDoc(doc(db, 'siteSettings', 'operations')), getDoc(doc(db, 'featureFlags', 'global'))])
  return {
    settings: { ...DEFAULT_APP_SETTINGS, ...(settingsSnapshot.exists() ? settingsSnapshot.data() : {}) },
    flags: { ...DEFAULT_FEATURE_FLAGS, ...(flagsSnapshot.exists() ? flagsSnapshot.data() : {}) },
  }
}

export async function saveOperationalSettings({ settings, flags, adminId }) {
  await Promise.all([
    setDoc(doc(db, 'siteSettings', 'operations'), { ...settings, updatedAt: serverTimestamp(), updatedBy: adminId }, { merge: true }),
    setDoc(doc(db, 'featureFlags', 'global'), { ...flags, updatedAt: serverTimestamp(), updatedBy: adminId }, { merge: true }),
  ])
}

export async function submitFeedback(payload) {
  const id = crypto.randomUUID()
  await setDoc(doc(db, 'feedback', id), { ...payload, id, status: 'open', createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  return id
}
