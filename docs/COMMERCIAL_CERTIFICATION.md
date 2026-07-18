# Commercial Release Certification

**Product:** DONROOM accommodation platform  
**Certified release:** 1.0.0  
**Certification date:** 18 July 2026  
**Scope:** client application, Firebase configuration, security rules, deployment assets, operational controls and documentation.

## Decision

The repository is approved as a production release candidate for commercial deployment, investor demonstration, tourism-board presentation and controlled hotel/property onboarding, subject to the launch conditions below.

## Evidence

- Dependency installation, environment validation, lint and production build pass.
- Public npm registry is pinned in `.npmrc`; the lockfile contains no private registry URLs.
- Firebase Hosting, Firestore rules/indexes and Storage rules are present.
- Route guards, Firestore rules and Storage rules provide layered authorization.
- Booking confirmation uses transactional availability protection.
- Public metadata, canonical URLs, structured data, sitemap and robots directives are implemented.
- Error boundaries, offline handling, service worker, analytics architecture and operational monitoring are included.
- Required administrator, property-owner, guest, developer, backup and maintenance documentation is present.

## Launch conditions

Before accepting real bookings, the operator must deploy to a staging Firebase project, run role-based rule tests, validate email/analytics integrations, replace business contact values with the legal operating entity's verified details, complete data-controller/legal review, configure backups and perform a real-device checkout test. These are environment and governance controls, not source-code modifications.

## Certification boundary

This certification does not guarantee third-party uptime, legal compliance in every jurisdiction, business identity verification, payment-provider settlement or production data quality. Those responsibilities belong to the deploying operator.
