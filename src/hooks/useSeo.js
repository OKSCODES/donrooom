import { useEffect } from 'react'
import { APP_NAME } from '../constants/app'
import { PRODUCTION_CONFIG, SEO_DEFAULTS } from '../constants/production'

function upsertMeta(selector, attributes) {
  let node = document.head.querySelector(selector)
  if (!node) {
    node = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value))
    document.head.appendChild(node)
  }
  return node
}

function upsertLink(rel) {
  let node = document.head.querySelector(`link[rel="${rel}"]`)
  if (!node) { node = document.createElement('link'); node.rel = rel; document.head.appendChild(node) }
  return node
}

export function useSeo({ title, description = SEO_DEFAULTS.description, path = '/', image = SEO_DEFAULTS.image, keywords = SEO_DEFAULTS.keywords, type = 'website', structuredData = [] }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${APP_NAME}` : SEO_DEFAULTS.title
    const canonicalUrl = `${PRODUCTION_CONFIG.siteUrl}${path.startsWith('/') ? path : `/${path}`}`
    const imageUrl = image.startsWith('http') ? image : `${PRODUCTION_CONFIG.siteUrl}${image}`
    document.title = fullTitle

    const values = [
      ['meta[name="description"]', { name: 'description' }, description],
      ['meta[name="keywords"]', { name: 'keywords' }, Array.isArray(keywords) ? keywords.join(', ') : keywords],
      ['meta[property="og:title"]', { property: 'og:title' }, fullTitle],
      ['meta[property="og:description"]', { property: 'og:description' }, description],
      ['meta[property="og:type"]', { property: 'og:type' }, type],
      ['meta[property="og:url"]', { property: 'og:url' }, canonicalUrl],
      ['meta[property="og:image"]', { property: 'og:image' }, imageUrl],
      ['meta[property="og:site_name"]', { property: 'og:site_name' }, APP_NAME],
      ['meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image'],
      ['meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle],
      ['meta[name="twitter:description"]', { name: 'twitter:description' }, description],
      ['meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl],
    ]
    values.forEach(([selector, attributes, content]) => { upsertMeta(selector, attributes).content = content })
    upsertLink('canonical').href = canonicalUrl

    document.querySelectorAll('script[data-donroom-schema]').forEach((node) => node.remove())
    const schemas = Array.isArray(structuredData) ? structuredData : [structuredData]
    schemas.filter(Boolean).forEach((schema) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.donroomSchema = 'true'
      script.textContent = JSON.stringify(schema).replace(/</g, '\\u003c')
      document.head.appendChild(script)
    })
  }, [description, image, keywords, path, structuredData, title, type])
}
