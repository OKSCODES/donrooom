import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, MailCheck, UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { SubmitButton } from '../../components/auth/SubmitButton'
import { PageContainer } from '../../components/common/PageContainer'
import { FormField } from '../../components/ui/FormField'
import { Input } from '../../components/ui/Input'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { uploadProfileImage } from '../../services/storageService'
import { profileSchema } from '../../utils/authSchemas'
import { getFirebaseErrorMessage } from '../../utils/firebaseError'

export default function ProfilePage() {
  useDocumentTitle('My profile')
  const { user, profile, updateProfile } = useAuth()
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(profileSchema), defaultValues: { fullName: '', phone: '' } })

  useEffect(() => { if (profile) reset({ fullName: profile.fullName ?? '', phone: profile.phone ?? '' }) }, [profile, reset])

  const onSubmit = async (values) => {
    try { await updateProfile(values); toast.success('Profile details updated.') }
    catch (error) { toast.error(getFirebaseErrorMessage(error)) }
  }

  const onPhotoChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const profileImage = await uploadProfileImage(user.uid, file)
      await updateProfile({ profileImage })
      toast.success('Profile photo updated.')
    } catch (error) { toast.error(getFirebaseErrorMessage(error)) }
    finally { setUploading(false); event.target.value = '' }
  }

  const initials = profile?.fullName?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'DR'
  return (
    <PageContainer className="max-w-4xl py-12 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] border border-default bg-donroom-cream p-6 text-center">
          <div className="relative mx-auto h-32 w-32">
            {profile?.profileImage ? <img alt={`${profile.fullName}'s profile`} className="h-full w-full rounded-full object-cover ring-4 ring-white" src={profile.profileImage} /> : <div className="flex h-full w-full items-center justify-center rounded-full bg-donroom-primary text-3xl font-extrabold ring-4 ring-white">{initials}</div>}
            <button aria-label="Change profile photo" className="absolute bottom-0 right-0 rounded-full bg-donroom-text p-3 text-white shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-donroom-primary" disabled={uploading} onClick={() => fileRef.current?.click()} type="button"><Camera size={18} /></button>
            <input accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={onPhotoChange} ref={fileRef} type="file" />
          </div>
          <h1 className="mt-5 text-xl font-extrabold">{profile?.fullName}</h1>
          <p className="mt-1 text-sm capitalize text-muted">{profile?.role} account</p>
          <p className="mt-4 text-xs leading-5 text-muted">JPG, PNG, or WebP. Maximum 5 MB.</p>
        </aside>
        <section className="rounded-[2rem] border border-default bg-white p-6 shadow-[0_24px_80px_rgba(45,45,45,0.06)] sm:p-8">
          <div className="flex items-center gap-3"><UserRound size={24} /><div><h2 className="text-2xl font-extrabold">Profile details</h2><p className="text-sm text-muted">Manage the personal information shown on DONROOM.</p></div></div>
          <form className="mt-8 space-y-5" noValidate onSubmit={handleSubmit(onSubmit)}>
            <FormField error={errors.fullName?.message} id="fullName" label="Full name"><Input aria-describedby={errors.fullName ? 'fullName-error' : undefined} aria-invalid={Boolean(errors.fullName)} autoComplete="name" error={errors.fullName} id="fullName" {...register('fullName')} /></FormField>
            <FormField id="email" label="Email address" hint="Email changes are disabled in this phase to protect account ownership."><Input disabled id="email" value={profile?.email ?? user?.email ?? ''} /></FormField>
            <FormField error={errors.phone?.message} id="phone" label="Phone number"><Input aria-describedby={errors.phone ? 'phone-error' : undefined} aria-invalid={Boolean(errors.phone)} autoComplete="tel" error={errors.phone} id="phone" inputMode="tel" {...register('phone')} /></FormField>
            <SubmitButton isLoading={isSubmitting} loadingLabel="Saving profile">Save changes</SubmitButton>
          </form>
          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-donroom-background p-4"><MailCheck className="mt-0.5 shrink-0" size={20} /><div className="text-sm"><p className="font-semibold">Email status: {user?.emailVerified ? 'Verified' : 'Not verified'}</p>{!user?.emailVerified ? <Link className="mt-1 inline-block font-semibold underline decoration-donroom-primary decoration-4 underline-offset-4" to={ROUTES.VERIFY_EMAIL}>Verify email now</Link> : null}</div></div>
        </section>
      </div>
    </PageContainer>
  )
}
