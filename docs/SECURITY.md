# Security

Authentication is provided by Firebase Authentication. Authorization uses the active Firestore user profile and is rechecked by rules. Users cannot promote themselves, alter immutable identity fields, or access another account's private records. Owners are restricted to their properties and related records. Administrators receive platform privileges only when their Firestore role is active.

Storage paths validate ownership, MIME type, and size. Booking locks prevent concurrent double booking. Mutations use validation and bounded submission states. Hosting provides CSP, clickjacking, MIME sniffing, referrer, and permissions protections.

Rate limiting, privileged email delivery, global force logout, account deletion, and server-trusted fraud controls must be implemented with Firebase App Check, Cloud Functions/Admin SDK, and provider quotas before processing real payments or regulated personal data.
