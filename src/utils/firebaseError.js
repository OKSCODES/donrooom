export function getFirebaseErrorMessage(error) {
  if (!error || typeof error !== 'object') return 'An unexpected error occurred.'

  const messages = {
    'auth/email-already-in-use': 'This email address is already registered.',
    'auth/expired-action-code': 'This link has expired. Request a new one.',
    'auth/invalid-action-code': 'This link is invalid or has already been used.',
    'auth/invalid-credential': 'The email address or password is incorrect.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/network-request-failed': 'Check your internet connection and try again.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account was found for this email address.',
    'auth/weak-password': 'Choose a password with at least 8 characters.',
    'storage/unauthorized': 'You do not have permission to upload this file.',
    'storage/retry-limit-exceeded': 'The upload timed out. Please try again.',
  }

  return messages[error.code] ?? error.message ?? 'An unexpected error occurred.'
}
