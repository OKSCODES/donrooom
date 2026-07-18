import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../services/analyticsService'

export function usePageTracking() {
  const location = useLocation()
  useEffect(() => { trackPageView(location.pathname + location.search, document.title) }, [location])
}
