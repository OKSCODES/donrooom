import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { PasswordField } from '../../components/auth/PasswordField'
import { PasswordStrength } from '../../components/auth/PasswordStrength'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { registerSchema } from '../../utils/authSchemas'
import { getFirebaseErrorMessage } from '../../utils/firebaseError'

export default function RegisterPage() {
  useDocumentTitle('Register')
  const { register: createAccount } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false },
  })
  const password = useWatch({ control, name: 'password' })

  const onSubmit = async (values) => {
    try {
      await createAccount(values)
      toast.success('Account created. Verify your email to continue.')
      navigate(ROUTES.VERIFY_EMAIL, { replace: true })
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error))
    }
  }

  return (
    <AuthCard title="Create your account" description="Join DONROOM as a guest and discover accommodation in Sohra." alternateText="Already registered?" alternateLinkText="Log in" alternateTo={ROUTES.LOGIN}>
      <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField error={errors.fullName?.message} id="fullName" label="Full name"><Input aria-describedby={errors.fullName ? 'fullName-error' : undefined} aria-invalid={Boolean(errors.fullName)} autoComplete="name" error={errors.fullName} id="fullName" {...register('fullName')} /></FormField>
        <FormField error={errors.email?.message} id="email" label="Email address"><Input aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" error={errors.email} id="email" type="email" {...register('email')} /></FormField>
        <FormField error={errors.phone?.message} hint="Use 10 to 15 digits. An optional leading + is accepted." id="phone" label="Phone number"><Input aria-describedby={errors.phone ? 'phone-error' : undefined} aria-invalid={Boolean(errors.phone)} autoComplete="tel" error={errors.phone} id="phone" inputMode="tel" {...register('phone')} /></FormField>
        <FormField error={errors.password?.message} id="password" label="Password"><PasswordField error={errors.password} id="password" autoComplete="new-password" {...register('password')} /><PasswordStrength password={password} /></FormField>
        <FormField error={errors.confirmPassword?.message} id="confirmPassword" label="Confirm password"><PasswordField error={errors.confirmPassword} id="confirmPassword" autoComplete="new-password" {...register('confirmPassword')} /></FormField>
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6"><input className="mt-1 h-4 w-4 shrink-0 accent-donroom-text" type="checkbox" {...register('acceptTerms')} /><span>I accept the <Link className="font-semibold underline" to={ROUTES.ABOUT}>terms of use</Link> and privacy policy.</span></label>
          {errors.acceptTerms ? <p className="mt-2 text-sm font-medium text-red-700" role="alert">{errors.acceptTerms.message}</p> : null}
        </div>
        <SubmitButton isLoading={isSubmitting} loadingLabel="Creating account">Create account</SubmitButton>
      </form>
    </AuthCard>
  )
}
