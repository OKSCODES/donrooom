function calculateStrength(password) {
  if (!password) return 0
  return [password.length >= 8, /[A-Z]/.test(password), /[a-z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length
}

const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong']

export function PasswordStrength({ password }) {
  const strength = calculateStrength(password)
  return (
    <div aria-live="polite" className="space-y-2">
      <div className="grid grid-cols-5 gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((item) => <span className={`h-1.5 rounded-full ${item <= strength ? 'bg-donroom-text' : 'bg-black/10'}`} key={item} />)}
      </div>
      <p className="text-xs text-muted">Password strength: {strength ? labels[strength - 1] : 'Not entered'}</p>
    </div>
  )
}
