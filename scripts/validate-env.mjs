import fs from 'node:fs'
const required=['VITE_FIREBASE_API_KEY','VITE_FIREBASE_AUTH_DOMAIN','VITE_FIREBASE_PROJECT_ID','VITE_FIREBASE_STORAGE_BUCKET','VITE_FIREBASE_MESSAGING_SENDER_ID','VITE_FIREBASE_APP_ID']
if(!fs.existsSync('.env.example')) throw new Error('.env.example is missing')
const template=fs.readFileSync('.env.example','utf8')
const missing=required.filter((key)=>!template.includes(`${key}=`))
if(missing.length) throw new Error(`Missing environment keys: ${missing.join(', ')}`)
process.stdout.write('Environment template validation passed.\n')
