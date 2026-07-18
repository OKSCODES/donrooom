import { USER_ROLES } from '../constants/auth'
import { RoleRoute } from './RoleRoute'
export function AdminRoute() { return <RoleRoute allowedRole={USER_ROLES.ADMIN} /> }
