import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AuthCard } from '../../components/auth/AuthCard'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { forgotPasswordSchema } from '../../utils/authSchemas'
import { getFirebaseErrorMessage } from '../../utils/firebaseError'

export default function ForgotPasswordPage() {
  useDocumentTitle('Forgot password')
  const { resetPassword } = useAuth()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(forgotPasswordSchema), defaultValues: { email: '' } })
  const onSubmit = async ({ email }) => {
    try {
      await resetPassword(email)
      reset()
      toast.success('If an account exists, a password reset email has been sent.')
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error))
    }
  }
  return <AuthCard title="Reset your password" description="Enter your account email and we will send a secure reset link." alternateText="Remembered your password?" alternateLinkText="Return to login" alternateTo={ROUTES.LOGIN}><form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}><FormField error={errors.email?.message} id="email" label="Email address"><Input aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" error={errors.email} id="email" type="email" {...register('email')} /></FormField><SubmitButton isLoading={isSubmitting} loadingLabel="Sending link">Send reset link</SubmitButton></form></AuthCard>
}
