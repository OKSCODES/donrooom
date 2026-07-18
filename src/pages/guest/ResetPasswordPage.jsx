import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { PasswordField } from '../../components/auth/PasswordField'
import { PasswordStrength } from '../../components/auth/PasswordStrength'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { FormField } from '../../components/ui/FormField'
import { ROUTES } from '../../constants/routes'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { resetPasswordWithCode, validatePasswordResetCode } from '../../services/authService'
import { resetPasswordSchema } from '../../utils/authSchemas'
import { getFirebaseErrorMessage } from '../../utils/firebaseError'

export default function ResetPasswordPage() {
  useDocumentTitle('Choose a new password')
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const code = params.get('oobCode')
  const [codeState, setCodeState] = useState({ loading: Boolean(code), valid: false, email: '' })
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(resetPasswordSchema), defaultValues: { password: '', confirmPassword: '' } })
  const password = useWatch({ control, name: 'password' })

  useEffect(() => {
    let active = true
    if (!code) return () => { active = false }
    validatePasswordResetCode(code).then((email) => { if (active) setCodeState({ loading: false, valid: true, email }) }).catch(() => { if (active) setCodeState({ loading: false, valid: false, email: '' }) })
    return () => { active = false }
  }, [code])

  const onSubmit = async ({ password }) => {
    try {
      await resetPasswordWithCode(code, password)
      toast.success('Password updated. You can now log in.')
      navigate(ROUTES.LOGIN, { replace: true })
    } catch (error) { toast.error(getFirebaseErrorMessage(error)) }
  }

  if (codeState.loading) return <AuthCard title="Validating reset link" description="Please wait while DONROOM verifies your request."><p className="text-sm text-muted">Checking secure action code…</p></AuthCard>
  if (!codeState.valid) return <AuthCard title="Reset link unavailable" description="This password reset link is invalid, expired, or already used."><Link className="font-semibold underline decoration-donroom-primary decoration-4 underline-offset-4" to={ROUTES.FORGOT_PASSWORD}>Request a new reset link</Link></AuthCard>

  return <AuthCard title="Choose a new password" description={`Set a new password for ${codeState.email}.`}><form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}><FormField error={errors.password?.message} id="password" label="New password"><PasswordField error={errors.password} id="password" autoComplete="new-password" {...register('password')} /><PasswordStrength password={password} /></FormField><FormField error={errors.confirmPassword?.message} id="confirmPassword" label="Confirm new password"><PasswordField error={errors.confirmPassword} id="confirmPassword" autoComplete="new-password" {...register('confirmPassword')} /></FormField><SubmitButton isLoading={isSubmitting} loadingLabel="Updating password">Update password</SubmitButton></form></AuthCard>
}
