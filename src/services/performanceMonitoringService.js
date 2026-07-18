import { logger } from './loggingService'

const supported = typeof window !== 'undefined' && 'PerformanceObserver' in window

export function startPerformanceMonitoring() {
  if (!supported || !import.meta.env.PROD) return () => {}
  const observers = []
  const observe = (type, handler) => {
    try {
      const observer = new PerformanceObserver((list) => list.getEntries().forEach(handler))
      observer.observe({ type, buffered: true })
      observers.push(observer)
    } catch (error) { logger.error(error.message, { source: 'performance-monitor', type }) }
  }
  observe('largest-contentful-paint', (entry) => logger.info('web_vital', { metric: 'LCP', value: Math.round(entry.startTime) }))
  observe('layout-shift', (entry) => { if (!entry.hadRecentInput) logger.info('web_vital', { metric: 'CLS', value: entry.value }) })
  observe('event', (entry) => { if (entry.duration > 200) logger.info('web_vital', { metric: 'INP-candidate', value: Math.round(entry.duration) }) })
  return () => observers.forEach((observer) => observer.disconnect())
}
