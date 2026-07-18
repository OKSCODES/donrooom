# DONROOM Phase 6 — Guest Dashboard

## Route protection
All `/guest/*` routes require an authenticated, active Firestore user with `role: guest`. Property owners and administrators are redirected to `/unauthorized`.

## Routes
- `/guest/dashboard`
- `/guest/profile`
- `/guest/bookings`
- `/guest/bookings/:bookingId`
- `/guest/favorites`
- `/guest/reviews`
- `/guest/notifications`
- `/guest/settings`

## Data ownership
Guest records use the authenticated Firebase UID through `guestId`, `userId`, or `recipientId`. Firestore rules prohibit cross-account access. Completed-booking validation is required before review creation.

## Collections
`favorites`, `recentlyViewed`, `guestSettings`, `notifications`, `reviews`, `bookings`, `bookingTimeline`, and `bookingReceipts`.

## Receipts
The dashboard reuses the Phase 5 jsPDF receipt generator for online viewing, download, printing, and WhatsApp confirmation.

## Testing checklist
- Guest route role enforcement
- Profile and image updates
- Booking search, filters, cancellation, details and receipts
- Favorites add/remove and recently viewed history
- Completed-booking review create/edit/delete and photo upload
- Notification read/delete actions
- Settings persistence
- Desktop, tablet and mobile navigation
- Firestore and Storage ownership rules
