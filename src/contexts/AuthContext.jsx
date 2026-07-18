import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  loginWithEmail,
  logoutUser,
  refreshFirebaseUser,
  registerWithEmail,
  resendVerificationEmail,
  sendResetPasswordEmail,
  updateAuthProfile,
} from '../services/authService'
import { getUserProfile } from '../services/userService'
import { USER_STATUSES } from '../constants/auth'
import { observeAuthState } from '../services/authService'
import { AuthContext } from './auth-context'
import { recordUserActivity } from '../services/auditService'
import { identifyAnalyticsUser } from '../services/analyticsService'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadProfile = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      setUser(null)
      setProfile(null)
      return null
    }
    const firestoreProfile = await getUserProfile(firebaseUser.uid)
    setUser(firebaseUser)
    setProfile(firestoreProfile)
    identifyAnalyticsUser(firebaseUser, firestoreProfile)
    return firestoreProfile
  }, [])

  useEffect(() => {
    const unsubscribe = observeAuthState(async (nextUser) => {
      try {
        await loadProfile(nextUser)
      } catch {
        setUser(nextUser)
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    })
    return unsubscribe
  }, [loadProfile])

  const login = useCallback(async (input) => {
    const credential = await loginWithEmail(input)
    const nextProfile = await loadProfile(credential.user)
    if (!nextProfile) {
      await logoutUser()
      throw new Error('Your user profile is missing. Contact support.')
    }
    if (nextProfile.status !== USER_STATUSES.ACTIVE) {
      await logoutUser()
      throw new Error('This account is not active.')
    }
    recordUserActivity({ action: 'login', userId: credential.user.uid, role: nextProfile.role })
    return { user: credential.user, profile: nextProfile }
  }, [loadProfile])

  const register = useCallback(async (input) => {
    const nextUser = await registerWithEmail(input)
    await loadProfile(nextUser)
    return nextUser
  }, [loadProfile])

  const logout = useCallback(async () => {
    if (user?.uid) await recordUserActivity({ action: 'logout', userId: user.uid, role: profile?.role })
    await logoutUser()
    setUser(null)
    setProfile(null)
  }, [profile, user])

  const resetPassword = useCallback((email) => sendResetPasswordEmail(email), [])

  const updateProfile = useCallback(async (updates) => {
    const refreshedUser = await updateAuthProfile(user, updates)
    await loadProfile(refreshedUser)
    recordUserActivity({ action: 'profile_updated', userId: refreshedUser.uid, role: profile?.role })
    return refreshedUser
  }, [loadProfile, profile?.role, user])

  const refreshUser = useCallback(async () => {
    const refreshedUser = await refreshFirebaseUser(user)
    await loadProfile(refreshedUser)
    return refreshedUser
  }, [loadProfile, user])

  const resendVerification = useCallback(() => resendVerificationEmail(user), [user])

  const value = useMemo(() => ({
    user,
    currentUser: user,
    profile,
    role: profile?.role ?? null,
    status: profile?.status ?? null,
    isAuthenticated: Boolean(user && profile),
    isEmailVerified: Boolean(user?.emailVerified),
    isLoading,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
    refreshUser,
    resendVerification,
  }), [isLoading, login, logout, profile, refreshUser, register, resendVerification, resetPassword, updateProfile, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
