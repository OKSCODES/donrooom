# Feature Flags

Document: `featureFlags/global`.

Flags: `reviews`, `bookings`, `registration`, `propertyCreation`, `notifications`, `announcements`, `offers`.

Public clients may read flags. Only active administrators may write them. A missing document falls back to safe release defaults. Flags are operational controls, not substitutes for Firestore authorization.
