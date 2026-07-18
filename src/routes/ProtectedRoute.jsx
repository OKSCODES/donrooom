import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loading } from '../components/common/Loading'
import { ROUTES } from '../constants/routes'
import { USER_STATUSES } from '../constants/auth'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading, status } = useAuth()
  const location = useLocation()

  if (isLoading) return <Loading label="Checking your session" />
  if (!isAuthenticated) return <Navigate replace state={{ from: location }} to={ROUTES.LOGIN} />
  if (status !== USER_STATUSES.ACTIVE) return <Navigate replace to={ROUTES.UNAUTHORIZED} />
  return <Outlet />
}
