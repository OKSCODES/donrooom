import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { registerServiceWorker } from './services/serviceWorker'
import { startPerformanceMonitoring } from './services/performanceMonitoringService'
import { installGlobalErrorReporting } from './services/errorReportingService'
import './styles/index.css'

registerServiceWorker()
startPerformanceMonitoring()
installGlobalErrorReporting()
createRoot(document.getElementById('root')).render(<StrictMode><ErrorBoundary><App/></ErrorBoundary></StrictMode>)
