import { Outlet } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'

export function GuestLayout() {
  return <div className="flex min-h-screen flex-col"><Navbar /><main className="flex flex-1 items-center py-12"><Outlet /></main><Footer /></div>
}
