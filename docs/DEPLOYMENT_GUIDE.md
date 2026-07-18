# Deployment Guide

## Firebase Hosting

Run `npm run check`, select the Firebase project with `firebase use --add`, and run `firebase deploy`. The Hosting configuration serves `dist`, rewrites client routes to `index.html`, caches hashed assets for one year, prevents caching HTML, and supplies security headers.

## Custom domain

Add the domain in Firebase Hosting, complete DNS verification, wait for the managed TLS certificate, update `VITE_SITE_URL`, Authentication authorized domains, canonical sitemap URLs, and analytics settings, then rebuild and deploy.

## GitHub Actions

The workflow in `.github/workflows/ci.yml` validates every pull request and deploys `main`. Configure repository secrets for Firebase web values, Google Analytics, the Firebase project ID, and `FIREBASE_SERVICE_ACCOUNT_DONROOM`. Configure `VITE_SITE_URL` as an Actions variable.

GitHub Pages is not the recommended production target because DONROOM depends on Firebase SPA rewrites and security headers. A static Pages deployment can host the frontend only when its base URL and route fallback are separately configured.
