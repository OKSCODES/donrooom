# DONROOM Phase 7 — Admin Panel

## Access
Only Firebase-authenticated users whose `users/{uid}` document contains `role: "admin"` and `status: "active"` can access `/admin/*`.

## Routes
Dashboard, profile, users, property owners, properties, approvals, rooms, bookings, reviews, gallery, categories, locations, amenities, reports, analytics, notifications, site settings, security, and audit logs are available under `/admin`.

## Security model
The browser never grants itself administrative privileges. `AdminRoute` reads the Firestore profile, while Firestore rules independently verify the same role for every protected mutation. User role changes, property moderation, resource deletion, site settings, and catalogue management are denied to non-admin users.

## Audit logs
All mutations made through `adminService` append an `auditLogs` document containing action, actor, target, and timestamp. Audit logs are immutable from the client.

## Collections
Phase 7 adds or manages: `categories`, `locations`, `amenities`, `auditLogs`, `siteSettings`, and `reports`. It also administers existing `users`, `properties`, `rooms`, `bookings`, `reviews`, `notifications`, and galleries.

## Reports
Users, bookings, properties, and reviews can be exported as CSV or a concise PDF summary. Financial gateway settlement reporting remains intentionally unavailable because payment gateways are not part of the current project phase.

## Deployment
Deploy Firestore rules, Storage rules, and indexes using Firebase CLI after review. Configure the first administrator in a trusted environment or Firebase Console by setting an existing active user document role to `admin`.

## Test checklist
- Verify guest/property users receive Unauthorized for every `/admin/*` route.
- Verify an active administrator can load all admin routes.
- Promote and demote a test user and confirm route changes after session refresh.
- Approve, reject, suspend, restore, feature and unfeature a test property.
- Enable and disable a room.
- Change booking status and moderate a review.
- Create/edit/delete category, location and amenity records.
- Create a broadcast notification.
- Save site settings.
- Export CSV/PDF reports.
- Confirm an audit record is created for each mutation.
