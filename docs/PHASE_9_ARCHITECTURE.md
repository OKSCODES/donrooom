# DONROOM Phase 9 Architecture

## Runtime layers

1. React Router provides route-level code splitting with `React.lazy` and `Suspense`.
2. TanStack Query provides request caching, stale-data control and bounded retries.
3. Firebase Authentication establishes identity; Firestore user documents remain the role and status authority.
4. Firestore and Storage rules independently enforce ownership and role permissions.
5. Shared production services provide analytics, immutable user-activity events, retry behavior, logging, offline detection and service-worker registration.

## Production configuration

The runtime reads only `VITE_` variables. Secrets must never be stored in Vite variables because browser bundles are public. Trusted email delivery, rate limiting, scheduled reminders, account deletion and privileged exports belong in Cloud Functions or another trusted backend.

## Routing

Public, Guest, Property Owner and Admin route trees remain separated by reusable guards. Each large page is loaded as an independent browser chunk. A route error element handles render and loader failures, while the root error boundary catches failures outside the router.

## Data integrity

Existing collection shapes are preserved. Phase 9 adds the immutable `userActivity` collection for non-sensitive client activity events. Administrative actions continue using `auditLogs`. Server-side enrichment such as IP address, trusted user agent parsing and tamper-resistant security events must be written by Cloud Functions.
