import { Outlet } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { PageTracking } from '../components/system/PageTracking'

export function PublicLayout() {
  return <div className="flex min-h-screen flex-col"><a className="skip-link" href="#main-content">Skip to main content</a><PageTracking/><Navbar/><main id="main-content" tabIndex="-1" className="flex-1"><Outlet/></main><Footer/></div>
}
