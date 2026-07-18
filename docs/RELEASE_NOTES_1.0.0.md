# DONROOM 1.0.0 Release Notes

DONROOM 1.0.0 is the certified commercial release for accommodation discovery and booking in Sohra.

## Included

Public discovery, authentication, Guest Dashboard, Property Owner Dashboard, Admin Dashboard, rooms, gallery, booking availability, lifecycle management, reviews, favorites, notifications, receipts/PDF, search, maps, analytics architecture, SEO, accessibility, PWA/offline support, monitoring, maintenance mode, feature flags, feedback and operational documentation.

## Migration

Deploy the included Firestore rules, indexes and Storage rules before the Hosting build. Use the public npm registry, copy `.env.example` to `.env`, set the production Firebase and site values, run `npm run check`, then deploy through Firebase CLI or the included GitHub Actions workflow.

## Compatibility

Node.js 22 LTS and npm 10 or newer are recommended. Existing Phase 1–11 Firestore documents are retained; no destructive migration is introduced by certification.
