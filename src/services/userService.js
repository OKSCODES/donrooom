import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { USER_ROLES, USER_STATUSES } from '../constants/auth'

function requireFirestore() {
  if (!db) throw new Error('Firebase Firestore is not configured.')
  return db
}

export async function createUserProfile(user, input) {
  const firestore = requireFirestore()
  const ref = doc(firestore, 'users', user.uid)
  const profile = {
    uid: user.uid,
    fullName: input.fullName.trim(),
    email: user.email ?? input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    role: USER_ROLES.GUEST,
    status: USER_STATUSES.ACTIVE,
    profileImage: user.photoURL ?? '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
  await setDoc(ref, profile)
  return profile
}

export async function getUserProfile(uid) {
  const firestore = requireFirestore()
  const snapshot = await getDoc(doc(firestore, 'users', uid))
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

export async function updateUserProfileDocument(uid, updates) {
  const firestore = requireFirestore()
  const allowed = {}
  if (typeof updates.fullName === 'string') allowed.fullName = updates.fullName.trim()
  if (typeof updates.phone === 'string') allowed.phone = updates.phone.trim()
  if (typeof updates.profileImage === 'string') allowed.profileImage = updates.profileImage
  for (const key of ['dateOfBirth','gender','address','city','state','country','emergencyContact']) {
    if (typeof updates[key] === 'string') allowed[key] = updates[key].trim()
  }
  allowed.updatedAt = serverTimestamp()
  await updateDoc(doc(firestore, 'users', uid), allowed)
}
