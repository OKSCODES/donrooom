import { Download, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export function PwaInstallPrompt() {
  const [event, setEvent] = useState(null)
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('donroom-install-dismissed') === '1')

  useEffect(() => {
    const capture = (installEvent) => { installEvent.preventDefault(); setEvent(installEvent) }
    const installed = () => setEvent(null)
    window.addEventListener('beforeinstallprompt', capture)
    window.addEventListener('appinstalled', installed)
    return () => { window.removeEventListener('beforeinstallprompt', capture); window.removeEventListener('appinstalled', installed) }
  }, [])

  if (!event || dismissed) return null
  const install = async () => { await event.prompt(); await event.userChoice; setEvent(null) }
  const dismiss = () => { sessionStorage.setItem('donroom-install-dismissed', '1'); setDismissed(true) }
  return <aside aria-label="Install DONROOM" className="fixed bottom-4 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl border border-default bg-white p-3 shadow-2xl"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-action"><Download size={19}/></div><div className="min-w-0 flex-1"><p className="font-black">Install DONROOM</p><p className="truncate text-xs text-muted">Faster access and offline support.</p></div><button className="rounded-lg bg-dark-surface px-3 py-2 text-xs font-black text-white" onClick={install}>Install</button><button aria-label="Dismiss install prompt" className="rounded-lg p-2 hover:bg-black/5" onClick={dismiss}><X size={17}/></button></aside>
}
