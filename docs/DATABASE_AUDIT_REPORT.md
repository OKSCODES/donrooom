# Database Audit Report

## Collections

Core collections include users, properties, rooms, propertyGallery, roomImages, bookings, availability, bookingTimeline, bookingReceipts, notifications, favorites, recentlyViewed, guestSettings, reviews, inquiries, categories, locations, amenities, siteSettings, featureFlags, feedback, logs and analytics-support collections.

## Consistency

Identity fields use `uid`, `guestId`, `ownerId`, `propertyId`, `roomId` and `bookingId` consistently by relationship. Timestamps use `createdAt` and `updatedAt`; event-specific timestamps such as `viewedAt` are retained where semantically necessary. Status values are bounded by rules for users, bookings and payments.

## Indexes

Composite indexes cover guest and owner booking history, recipient notifications, favorites, recently viewed records, guest reviews and user activity ordered by time.

## Certification status

No duplicate collection name was found in rules. Existing compatibility fields are retained to avoid destructive migration. Production teams should monitor Firebase index suggestions and document any newly deployed index.
