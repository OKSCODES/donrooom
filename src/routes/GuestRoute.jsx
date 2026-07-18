import { USER_ROLES } from '../constants/auth'
import { RoleRoute } from './RoleRoute'
export function GuestRoute() { return <RoleRoute allowedRole={USER_ROLES.GUEST} /> }
