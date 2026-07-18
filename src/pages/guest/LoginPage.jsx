import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthCard } from '../../components/auth/AuthCard'
import { PasswordField } from '../../components/auth/PasswordField'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { USER_ROLES } from '../../constants/auth'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { loginSchema } from '../../utils/authSchemas'
import { getFirebaseErrorMessage } from '../../utils/firebaseError'

function destinationForRole(role) {
  if (role === USER_ROLES.ADMIN) return ROUTES.ADMIN
  if (role === USER_ROLES.PROPERTY) return ROUTES.PROPERTY
  return ROUTES.GUEST
}

export default function LoginPage() {
  useDocumentTitle('Log in')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: true },
  })

  const onSubmit = async (values) => {
    try {
      const result = await login(values)
      toast.success('Welcome back to DONROOM.')
      const from = location.state?.from
      const requestedPath = from ? `${from.pathname ?? ''}${from.search ?? ''}${from.hash ?? ''}` : ''
      navigate(requestedPath || destinationForRole(result.profile.role), { replace: true })
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error))
    }
  }

  return (
    <AuthCard title="Welcome back" description="Access your DONROOM account securely." alternateText="New to DONROOM?" alternateLinkText="Create an account" alternateTo={ROUTES.REGISTER}>
      <form className="space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormField error={errors.email?.message} id="email" label="Email address">
          <div className="relative"><Mail aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-subtle" size={18} /><Input aria-describedby={errors.email ? 'email-error' : undefined} aria-invalid={Boolean(errors.email)} autoComplete="email" className="pl-11" error={errors.email} id="email" placeholder="you@example.com" type="email" {...register('email')} /></div>
        </FormField>
        <FormField error={errors.password?.message} id="password" label="Password">
          <div className="relative"><LockKeyhole aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-subtle" size={18} /><PasswordField className="pl-11" error={errors.password} id="password" autoComplete="current-password" {...register('password')} /></div>
        </FormField>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <label className="flex cursor-pointer items-center gap-2"><input className="h-4 w-4 accent-donroom-text" type="checkbox" {...register('remember')} />Remember me</label>
          <Link className="font-semibold underline decoration-donroom-primary decoration-4 underline-offset-4" to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
        </div>
        <SubmitButton isLoading={isSubmitting} loadingLabel="Signing in">Log in</SubmitButton>
        <button aria-disabled="true" className="min-h-11 w-full cursor-not-allowed rounded-full border border-default bg-white px-5 py-2.5 text-sm font-semibold text-subtle" disabled type="button">Continue with Google — unavailable</button>
      </form>
    </AuthCard>
  )
}
