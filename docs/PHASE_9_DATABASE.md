# Database and Index Audit

Existing collection names and core fields remain unchanged for backward compatibility. Phase 9 adds `userActivity` with `action`, `userId`, `role`, `targetId`, `metadata`, `createdAt` and `client`.

A composite index supports user activity ordered by creation time. Existing indexes cover guest and owner bookings, notifications, favorites, recently viewed items and guest reviews.

Do not remove apparently duplicated display fields from bookings or receipts without a migration plan. These snapshots intentionally preserve historical names and prices when a property or room changes later.
