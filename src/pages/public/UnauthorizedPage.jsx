import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { ROUTES } from '../../constants/routes'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export default function UnauthorizedPage() {
  useDocumentTitle('Unauthorized')
  return <PageContainer className="py-20 text-center"><ShieldAlert className="mx-auto" size={54} /><p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-subtle">Access denied</p><h1 className="mt-3 text-4xl font-extrabold tracking-tight">You cannot open this area</h1><p className="mx-auto mt-4 max-w-xl leading-7 text-muted">Your authenticated account does not have the required Firestore role or active status for this route.</p><Link className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-donroom-primary px-6 text-sm font-semibold" to={ROUTES.HOME}>Return home</Link></PageContainer>
}
