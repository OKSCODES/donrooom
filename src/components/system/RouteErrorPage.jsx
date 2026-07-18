import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import { logger } from '../../services/loggingService'

export default function RouteErrorPage() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : 500
  const message = status === 404 ? 'The requested page could not be found.' : 'The page could not be loaded safely.'
  logger.error('Route rendering failed', { status, message: error?.message })
  return <main id="main-content" className="grid min-h-screen place-items-center bg-donroom-background px-5 py-16"><section className="max-w-xl rounded-[2rem] border border-default bg-white p-8 text-center shadow-xl"><AlertTriangle className="mx-auto" size={44} aria-hidden="true"/><p className="mt-4 text-sm font-black uppercase tracking-[.22em] text-subtle">Error {status}</p><h1 className="mt-3 text-4xl font-black">Something went wrong</h1><p className="mt-4 text-black/65">{message}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" onClick={() => window.location.reload()} className="admin-primary"><RotateCcw size={16}/>Try again</button><Link to="/" className="admin-secondary"><Home size={16}/>Go home</Link></div></section></main>
}
