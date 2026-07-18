import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { ROUTES } from '../../constants/routes'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
export default function NotFoundPage() { useDocumentTitle('Page not found'); return <main className="grid min-h-screen place-items-center bg-donroom-background py-16"><PageContainer className="max-w-xl text-center"><p className="text-8xl font-black text-donroom-secondary">404</p><h1 className="mt-4 text-4xl font-extrabold tracking-tight">This page does not exist.</h1><p className="mt-4 text-muted">The address may be incorrect or the page may have moved.</p><Link className="mt-8 inline-flex rounded-full bg-donroom-primary px-6 py-3 font-semibold" to={ROUTES.HOME}>Return home</Link></PageContainer></main> }
