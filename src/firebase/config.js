import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCdcC9w_NzbDILuE7D0_0Bw0UmTpuS_R_8",
  authDomain: "phidonkam-f6b9f.firebaseapp.com",
  projectId: "phidonkam-f6b9f",
  storageBucket: "phidonkam-f6b9f.firebasestorage.app",
  messagingSenderId: "826017670660",
  appId: "1:826017670660:web:045617c21978ac79d9b751"
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean)

const app = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null

export const firebaseApp = app
export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
export const storage = app ? getStorage(app) : null
