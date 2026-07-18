import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const required = [
  'README.md','CHANGELOG.md','LICENSE','SECURITY.md','CODE_OF_CONDUCT.md','CONTRIBUTING.md',
  'firebase.json','firestore.rules','firestore.indexes.json','storage.rules','.env.example','.npmrc',
  'docs/ARCHITECTURE.md','docs/FIREBASE_SETUP_GUIDE.md','docs/FIRESTORE_SCHEMA.md',
  'docs/STORAGE_STRUCTURE.md','docs/ROUTING_GUIDE.md','docs/DEPLOYMENT_GUIDE.md',
  'docs/ADMIN_MANUAL.md','docs/PROPERTY_OWNER_MANUAL.md','docs/GUEST_USER_GUIDE.md',
  'docs/DEVELOPER_MANUAL.md','docs/BACKUP_GUIDE.md','docs/MAINTENANCE_GUIDE.md',
  'docs/SECURITY_AUDIT_REPORT.md','docs/SEO_AUDIT_REPORT.md','docs/PERFORMANCE_CERTIFICATION_REPORT.md',
  'docs/ACCESSIBILITY_CERTIFICATION_REPORT.md','docs/RESPONSIVE_CERTIFICATION_REPORT.md',
  'docs/TESTING_CERTIFICATION_REPORT.md','docs/RISK_ASSESSMENT.md','docs/RELEASE_NOTES_1.0.0.md'
]
const missing = required.filter(file => !existsSync(join(root, file)))
if (missing.length) throw new Error(`Missing certification files:\n${missing.join('\n')}`)

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
if (pkg.version !== '1.0.0') throw new Error(`Expected package version 1.0.0, received ${pkg.version}`)
const lock = readFileSync(join(root, 'package-lock.json'), 'utf8')
if (lock.includes('internal.api.openai') || lock.includes('applied-caas-gateway')) {
  throw new Error('package-lock.json contains a private package registry URL')
}
const npmrc = readFileSync(join(root, '.npmrc'), 'utf8')
if (!npmrc.includes('registry=https://registry.npmjs.org/')) throw new Error('.npmrc must use the public npm registry')

const sourceExtensions = new Set(['.js','.jsx','.mjs','.css','.html'])
function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}
const sourceFiles = ['src','public','scripts'].flatMap(dir => walk(join(root, dir)))
const offenders = []
for (const file of sourceFiles) {
  const ext = file.slice(file.lastIndexOf('.'))
  if (!sourceExtensions.has(ext)) continue
  const text = readFileSync(file, 'utf8')
  const marker = new RegExp('\\b' + ['TO','DO'].join('') + '|' + ['FIX','ME'].join('') + '\\b')
  if (marker.test(text)) offenders.push(file.replace(`${root}/`, ''))
}
if (offenders.length) throw new Error(`Unfinished markers found:\n${offenders.join('\n')}`)
process.stdout.write(`DONROOM 1.0.0 certification manifest passed (${required.length} required artifacts).\n`)
