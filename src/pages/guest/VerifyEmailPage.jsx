import { MailCheck, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { PageContainer } from '../../components/common/PageContainer'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { verifyEmailWithCode } from '../../services/authService'
import { getFirebaseErrorMessage } from '../../utils/firebaseError'

export default function VerifyEmailPage() {
  useDocumentTitle('Verify email')
  const { user, isEmailVerified, refreshUser, resendVerification } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const code = params.get('oobCode')
  const [busy, setBusy] = useState(Boolean(code))

  useEffect(() => {
    if (!code) return
    let active = true
    verifyEmailWithCode(code)
      .then(async () => {
        if (!active) return
        await refreshUser()
        toast.success('Your email has been verified.')
        navigate(ROUTES.GUEST, { replace: true })
      })
      .catch((error) => { if (active) toast.error(getFirebaseErrorMessage(error)) })
      .finally(() => { if (active) setBusy(false) })
    return () => { active = false }
  }, [code, navigate, refreshUser])

  const handleResend = async () => {
    setBusy(true)
    try { await resendVerification(); toast.success('A new verification email has been sent.') }
    catch (error) { toast.error(getFirebaseErrorMessage(error)) }
    finally { setBusy(false) }
  }

  return (
    <PageContainer className="max-w-xl py-16">
      <section className="rounded-[2rem] border border-default bg-white p-8 text-center shadow-[0_24px_80px_rgba(45,45,45,0.08)] sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-donroom-primary"><MailCheck size={30} /></span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">{isEmailVerified ? 'Email verified' : 'Verify your email'}</h1>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted">{isEmailVerified ? 'Your email address is verified and your account is ready.' : `We sent a verification link to ${user?.email ?? 'your email address'}. Open it to secure your account.`}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {!isEmailVerified ? <Button disabled={busy} onClick={handleResend}><RefreshCw className={busy ? 'mr-2 animate-spin' : 'mr-2'} size={17} />Resend email</Button> : null}
          <Link className="inline-flex min-h-11 items-center justify-center rounded-full border border-default bg-white px-5 py-2.5 text-sm font-semibold hover:bg-donroom-cream" to={ROUTES.GUEST}>Continue to account</Link>
        </div>
      </section>
    </PageContainer>
  )
}
