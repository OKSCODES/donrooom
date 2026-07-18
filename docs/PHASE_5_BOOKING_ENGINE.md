# DONROOM Phase 5 Booking Engine

## Booking flow
Guests select a property, room, dates and guest count. The client calculates nightly/weekend pricing, discount, 5% tax and 6% service fee. On confirmation, Firestore runs a transaction that creates one deterministic availability lock for every occupied night. Check-out is exclusive. If any lock already represents an active booking, the whole transaction fails and no booking is created.

## Collections
- `bookings`: immutable booking identity, stay details, price snapshot and statuses.
- `availability`: deterministic `{roomId}_{YYYY-MM-DD}` locks plus owner blocks and maintenance dates.
- `bookingTimeline`: append-only status history.
- `bookingReceipts`: receipt identity and audit metadata.
- `notifications`: recipient-specific in-app notification records.
- `bookingDrafts`: optional per-guest booking form persistence.

## Status transitions
`pending → confirmed|rejected`, `confirmed → checked_in|cancelled`, `checked_in → checked_out`, `checked_out → completed`. Guest cancellation is allowed only while pending or confirmed. Rejection and cancellation release nightly locks.

## Price snapshot
Each booking stores room price, weekend price, discount, room subtotal, discount amount, taxes, service fee and grand total. Later room-price changes do not change an existing booking.

## Receipt system
`jsPDF` creates an A4 receipt with booking/receipt numbers, guest/property/room details, dates, price breakdown, statuses, generation time, terms and DONROOM footer. It supports download and browser printing.

## Messaging architecture
Email event names are prepared but no provider is connected. WhatsApp links use a pre-filled booking summary and owner number. Payment gateway integration is intentionally excluded; new bookings use `paymentStatus: pending`.

## Deployment
Deploy `firestore.rules`, `firestore.indexes.json`, and the existing Storage rules with Firebase CLI. Ensure authenticated user documents contain an active role. For public production listings, property and room documents must be approved/active and contain the owner UID.

## Test checklist
- Adjacent bookings where the second check-in equals the first check-out succeed.
- Overlapping dates fail inside the transaction.
- Past, same-day and over-30-night ranges fail.
- Guest count cannot exceed room capacity.
- Duplicate clicks are blocked by loading state and database locks.
- Guests can read/cancel only their bookings.
- Owners can manage only bookings with their UID.
- Every status transition appends timeline and notification records.
- Rejected/cancelled bookings release date locks.
- PDF download and print render the stored price snapshot.
