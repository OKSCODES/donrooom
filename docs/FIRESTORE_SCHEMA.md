# Firestore Schema

Core collections include `users`, `properties`, `rooms`, `bookings`, `availability`, `bookingTimeline`, `bookingReceipts`, `notifications`, `reviews`, `favorites`, `recentlyViewed`, `guestSettings`, `propertyGallery`, `roomImages`, `inquiries`, `offers`, `announcements`, `categories`, `locations`, `amenities`, `siteSettings`, `reports`, `auditLogs`, `userActivity`, `recentSearches`, `searchHistory`, `propertyViews`, `shareLogs`, `recommendations`, and `promoCodes`.

Identity documents use Firebase UID. Owner-managed records include `ownerId`; guest records include `guestId` or `userId`. Booking availability uses deterministic per-room, per-night lock IDs and Firestore transactions to reject overlapping reservations. Index definitions are maintained in `firestore.indexes.json`.
