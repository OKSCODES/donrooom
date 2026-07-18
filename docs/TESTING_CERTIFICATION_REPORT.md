# Testing Certification Report

## Automated release gates

- Dependency installation.
- Environment validation.
- ESLint.
- Vite production build.
- Certification manifest/version/registry checks.
- Production dependency security audit.

## Journey matrix

Public discovery, authentication, guest bookings, property inventory, owner booking lifecycle, administrator moderation, feedback, monitoring, legal pages, receipts and PWA fallback are represented by routes and service modules. Authorization is enforced both in route guards and Firebase rules.

## Staging tests required before launch

Use separate Guest, Property and Admin accounts to execute registration, login, property submission, approval, room upload, booking, cancellation, stay completion, review creation, receipt download, notification and logout. Test allow and deny cases with the Firebase Rules emulator or staging project. Validate Firefox, Chrome, Edge, Android and iOS Safari.

## Result

Repository-level certification passes. Environment-dependent Firebase CRUD and email/analytics delivery require staging credentials and live service configuration.
