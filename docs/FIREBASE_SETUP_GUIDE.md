# Firebase Setup Guide

Create a Firebase project and web app. Enable Email/Password Authentication, Firestore in production mode, Storage, and Hosting. Add localhost and the production domain to Authentication authorized domains. Copy the web-app configuration into `.env` using the documented `VITE_FIREBASE_*` names.

Deploy configuration with:

```bash
firebase login
firebase use --add
firebase deploy --only firestore:rules,firestore:indexes,storage,hosting
```

Create the first administrator by registering normally, then update `users/{uid}.role` to `admin` from a trusted Firebase Console/Admin SDK environment. Keep `status` as `active`. Never place service-account credentials in Vite environment variables.
