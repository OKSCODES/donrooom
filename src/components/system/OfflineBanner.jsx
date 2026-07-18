import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

export function OfflineBanner() {
  const online = useOnlineStatus()
  if (online) return null
  return <div role="status" aria-live="polite" className="fixed inset-x-0 top-0 z-[100] flex items-center justify-center gap-2 bg-donroom-text px-4 py-2 text-sm font-bold text-white"><WifiOff size={16} aria-hidden="true"/>You are offline. Saved pages remain available; live updates will resume when your connection returns.</div>
}
