# DONROOM v1.0.0

DONROOM is a production-oriented accommodation discovery and booking platform for Sohra, Meghalaya. It includes a public marketplace, Firebase authentication, guest self-service, property-owner operations, an administrator console, transactional room availability, PDF receipts, advanced discovery, PWA support, analytics architecture, and Firebase Hosting configuration.

## Requirements

- Node.js 22 LTS
- npm 10 or newer
- Firebase CLI for deployment
- A Firebase project with Authentication, Firestore, Storage, and Hosting enabled

## Local installation

```bash
npm install
cp .env.example .env
npm run dev
```

The uploaded project may already contain a local `.env`. Never commit that file.

## Quality commands

```bash
npm run validate:env
npm run lint
npm run build
npm run check
npm run preview
```

## Production deployment

```bash
npm install -g firebase-tools
firebase login
firebase use --add
npm run check
firebase deploy
```

`firebase.json` deploys Hosting, Firestore rules and indexes, and Storage rules. Hosting uses an SPA fallback, immutable asset caching, no-cache HTML, HTTPS security headers, and a production Content Security Policy.

## Application areas

- Public: `/`, `/search`, `/map`, `/properties`, `/property/:id`, `/gallery`, `/about`, `/contact`, `/faq`
- Authentication: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`
- Guest: `/guest/dashboard` and guest account routes
- Property owner: `/property/dashboard` and property management routes
- Admin: `/admin/dashboard` and platform management routes
- Legal: `/privacy`, `/terms`, `/cookies`, `/disclaimer`, `/refund-policy`

## Firebase role model

Website registration always creates an active `guest`. Administrator and property access is authorized using the authenticated user's Firestore `users/{uid}` document. Promotion must be performed by an administrator or trusted server environment. Firestore and Storage rules independently enforce ownership and role checks.

## Environment

See `.env.example` and `docs/ENVIRONMENT.md`. Firebase web configuration is safe to expose to the browser, but service-account JSON and CI deployment credentials must remain in secret storage.

## Documentation

Start with:

- `docs/INSTALLATION_GUIDE.md`
- `docs/FIREBASE_SETUP_GUIDE.md`
- `docs/DEPLOYMENT_GUIDE.md`
- `docs/ARCHITECTURE.md`
- `docs/FIRESTORE_SCHEMA.md`
- `docs/SECURITY.md`
- `docs/TESTING_REPORT.md`
- `docs/MAINTENANCE_GUIDE.md`
- `docs/USER_MANUAL.md`
- `docs/COMMERCIAL_CERTIFICATION.md`
- `docs/ROUTING_GUIDE.md`
- `docs/STORAGE_STRUCTURE.md`

## License

MIT. See `LICENSE`.

## Production operations

DONROOM 1.0.0 includes production operations tooling under `/admin/monitoring`, `/admin/operations`, `/admin/backups`, and `/admin/feedback`. Public support is available at `/help`, `/feedback`, and `/version`.

Operational settings are stored in `siteSettings/operations`; feature flags are stored in `featureFlags/global`. Both default safely when Firestore is unavailable. Maintenance mode never blocks active administrators.
