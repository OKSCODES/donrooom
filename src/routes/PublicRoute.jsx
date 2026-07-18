import { Navigate, Outlet } from 'react-router-dom'
import { Loading } from '../components/common/Loading'
import { ROUTES } from '../constants/routes'
import { USER_ROLES } from '../constants/auth'
import { useAuth } from '../hooks/useAuth'

function destinationForRole(role) {
  if (role === USER_ROLES.ADMIN) return ROUTES.ADMIN
  if (role === USER_ROLES.PROPERTY) return ROUTES.PROPERTY
  return ROUTES.GUEST
}

export function PublicRoute() {
  const { isAuthenticated, isLoading, role } = useAuth()
  if (isLoading) return <Loading label="Checking your session" />
  if (isAuthenticated) return <Navigate replace to={destinationForRole(role)} />
  return <Outlet />
}
