import { PRODUCTION_CONFIG } from '../constants/production'

const MAX_BUFFER = 50
const buffer = []

function sanitize(value) {
  if (value instanceof Error) return { name: value.name, message: value.message, stack: value.stack }
  if (!value || typeof value !== 'object') return value
  const clone = { ...value }
  for (const key of ['password', 'token', 'accessToken', 'refreshToken', 'authorization']) {
    if (key in clone) clone[key] = '[REDACTED]'
  }
  return clone
}

function record(level, message, context = {}) {
  const entry = {
    level,
    message: String(message),
    context: sanitize(context),
    timestamp: new Date().toISOString(),
    version: PRODUCTION_CONFIG.appVersion,
    path: typeof window === 'undefined' ? '' : window.location.pathname,
  }
  buffer.push(entry)
  if (buffer.length > MAX_BUFFER) buffer.shift()
  if (import.meta.env.DEV) console[level === 'error' ? 'error' : 'info']('[DONROOM]', entry)
  return entry
}

export const logger = Object.freeze({
  info: (message, context) => record('info', message, context),
  warn: (message, context) => record('warn', message, context),
  error: (message, context) => record('error', message, context),
  getRecent: () => [...buffer],
})
