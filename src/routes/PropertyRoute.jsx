import { USER_ROLES } from '../constants/auth'
import { RoleRoute } from './RoleRoute'
export function PropertyRoute() { return <RoleRoute allowedRole={USER_ROLES.PROPERTY} /> }
