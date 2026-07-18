# Environment Variables

Required Firebase web values: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, and `VITE_FIREBASE_APP_ID`.

Production values: `VITE_SITE_URL`, `VITE_SUPPORT_EMAIL`, `VITE_ENABLE_ANALYTICS`, `VITE_GA_MEASUREMENT_ID`, and `VITE_APP_VERSION`.

Only variables prefixed with `VITE_` are exposed to the browser. Never store service-account keys, SMTP credentials, private API secrets, or deployment tokens in these variables.
