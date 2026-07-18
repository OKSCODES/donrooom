export const USER_ROLES = Object.freeze({
  ADMIN: 'admin',
  PROPERTY: 'property',
  GUEST: 'guest',
})

export const USER_STATUSES = Object.freeze({
  ACTIVE: 'active',
  DISABLED: 'disabled',
})

export const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024
export const PROFILE_IMAGE_TYPES = Object.freeze(['image/jpeg', 'image/png', 'image/webp'])
