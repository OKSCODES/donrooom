import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { OperationsProvider } from './contexts/OperationsContext'
import { AppRouter } from './routes/AppRouter'
import { OfflineBanner } from './components/system/OfflineBanner'
import { PwaInstallPrompt } from './components/system/PwaInstallPrompt'
import { CookieNotice } from './components/system/CookieNotice'
import { MaintenanceGate } from './components/operations/MaintenanceGate'

const queryClient = new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:false,retry:(failureCount,error)=>failureCount<2&&error?.code!=='permission-denied',staleTime:60_000,gcTime:10*60_000},mutations:{retry:0}}})
export default function App(){return <QueryClientProvider client={queryClient}><AuthProvider><OperationsProvider><OfflineBanner/><MaintenanceGate><AppRouter/></MaintenanceGate><PwaInstallPrompt/><CookieNotice/><Toaster position="top-right" toastOptions={{duration:4000,style:{background:'#2D2D2D',color:'#FFFFFF',borderRadius:'14px'}}}/></OperationsProvider></AuthProvider></QueryClientProvider>}
