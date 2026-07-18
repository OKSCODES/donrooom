import { Navigate, Outlet } from 'react-router-dom'
import { Loading } from '../components/common/Loading'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'

export function RoleRoute({ allowedRole }) {
  const { isLoading, role } = useAuth()
  if (isLoading) return <Loading label="Verifying access" />
  if (role !== allowedRole) return <Navigate replace to={ROUTES.UNAUTHORIZED} />
  return <Outlet />
}
