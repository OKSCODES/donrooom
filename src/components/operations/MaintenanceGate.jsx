import { Wrench } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useOperations } from '../../hooks/useOperations'

export function MaintenanceGate({ children }) {
  const { settings, isLoading } = useOperations()
  const { role } = useAuth()
  if (isLoading || !settings.maintenanceMode || role === 'admin') return children
  return <main className="grid min-h-screen place-items-center bg-page p-6"><section className="max-w-xl rounded-[2rem] border border-default bg-white p-8 text-center shadow-xl"><Wrench className="mx-auto h-12 w-12 text-donroom-success"/><p className="mt-5 text-sm font-bold uppercase tracking-[.2em] text-donroom-success">Scheduled maintenance</p><h1 className="mt-3 text-3xl font-black">DONROOM will be back shortly</h1><p className="mt-4 text-muted">{settings.maintenanceMessage}</p><p className="mt-6 text-sm text-subtle">Administrators can continue to access the platform.</p></section></main>
}
