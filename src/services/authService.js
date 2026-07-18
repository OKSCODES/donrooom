import {
  applyActionCode,
  browserLocalPersistence,
  browserSessionPersistence,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reload,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  verifyPasswordResetCode,
} from 'firebase/auth'
import { auth } from '../firebase'
import { createUserProfile, updateUserProfileDocument } from './userService'

function requireAuth() {
  if (!auth) throw new Error('Firebase Authentication is not configured.')
  return auth
}

export function observeAuthState(callback) {
  if (!auth) {
    callback(null)
    return () => undefined
  }
  return onAuthStateChanged(auth, callback)
}

export async function registerWithEmail(input) {
  const firebaseAuth = requireAuth()
  const credential = await createUserWithEmailAndPassword(firebaseAuth, input.email.trim(), input.password)
  try {
    await updateProfile(credential.user, { displayName: input.fullName.trim() })
    await createUserProfile(credential.user, input)
    await sendEmailVerification(credential.user)
    return credential.user
  } catch (error) {
    await credential.user.delete().catch(() => undefined)
    throw error
  }
}

export async function loginWithEmail({ email, password, remember }) {
  const firebaseAuth = requireAuth()
  await setPersistence(firebaseAuth, remember ? browserLocalPersistence : browserSessionPersistence)
  return signInWithEmailAndPassword(firebaseAuth, email.trim(), password)
}

export async function logoutUser() {
  return signOut(requireAuth())
}

export async function sendResetPasswordEmail(email) {
  return sendPasswordResetEmail(requireAuth(), email.trim(), {
    url: `${window.location.origin}/login`,
  })
}

export async function validatePasswordResetCode(actionCode) {
  return verifyPasswordResetCode(requireAuth(), actionCode)
}

export async function resetPasswordWithCode(actionCode, newPassword) {
  return confirmPasswordReset(requireAuth(), actionCode, newPassword)
}

export async function verifyEmailWithCode(actionCode) {
  return applyActionCode(requireAuth(), actionCode)
}

export async function resendVerificationEmail(user) {
  if (!user) throw new Error('You must be signed in to resend verification.')
  await sendEmailVerification(user)
}

export async function refreshFirebaseUser(user) {
  if (!user) return null
  await reload(user)
  return requireAuth().currentUser
}

export async function updateAuthProfile(user, updates) {
  if (!user) throw new Error('You must be signed in to update your profile.')
  const authUpdates = {}
  if (typeof updates.fullName === 'string') authUpdates.displayName = updates.fullName.trim()
  if (typeof updates.profileImage === 'string') authUpdates.photoURL = updates.profileImage
  await updateProfile(user, authUpdates)
  await updateUserProfileDocument(user.uid, updates)
  return refreshFirebaseUser(user)
}
