# Security Audit Report

## Controls verified

- Authentication identity is provided by Firebase Authentication.
- Roles and account status are read from Firestore rather than trusted from URL state or form values.
- Guest, Property Owner and Admin routes use independent guards.
- New registrations cannot self-assign privileged roles.
- Property owners can manage only documents with their own `ownerId`.
- Guests can manage only their own bookings, favorites, settings, inquiries, receipts and reviews.
- Admin-only collections remain protected by `admin()` checks.
- Storage validates authentication, ownership, MIME type and a 5 MB maximum.
- Availability locks and booking transactions protect against overlapping bookings and duplicate submissions.
- Client logs redact common credential fields.
- SEO JSON-LD escapes `<` to prevent script termination injection.
- User activity events are immutable and may be read only by the owner or an administrator.

## Trusted-backend requirements before full public release

- Rate-limit login, registration, inquiry, review, booking and notification endpoints using App Check and Cloud Functions.
- Send transactional email only from trusted server code.
- Perform account deletion, force logout, role changes and bulk exports through Admin SDK functions.
- Add abuse monitoring, alerting and retention policies for audit records.
- Enable Firebase App Check for Firestore, Storage and callable functions.
- Configure CSP, HSTS, Referrer-Policy and Permissions-Policy in the production hosting layer.

## CSRF and injection

Firebase bearer-token APIs do not rely on ambient cookie authentication, reducing traditional CSRF exposure. All Firestore writes are validated by rules. User-provided text must remain rendered through React text nodes; do not introduce `dangerouslySetInnerHTML` for user content.
