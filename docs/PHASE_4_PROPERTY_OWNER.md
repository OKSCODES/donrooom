# DONROOM Phase 4 — Property Owner Dashboard

## Access model

All `/property/*` routes are protected by Firebase Authentication, the active Firestore user profile, and the exact Firestore role `property`. Guests and administrators are redirected to `/unauthorized`. A property owner can query and modify only documents whose `ownerId` equals their Firebase Authentication UID.

## Routes

- `/property/dashboard`
- `/property/profile`
- `/property/rooms`
- `/property/gallery`
- `/property/amenities`
- `/property/bookings`
- `/property/reviews`
- `/property/calendar`
- `/property/settings`

`/property` redirects to `/property/dashboard`.

## Firestore data

Phase 4 uses `properties`, `rooms`, `roomImages`, `propertyGallery`, `availability`, `bookings`, and `reviews`. Every owner-managed document stores `ownerId`. Firestore rules verify that value against `request.auth.uid` and the authenticated user's Firestore role.

Property records contain profile, contact, policies, brand image URLs, amenities, settings, status, and timestamps. Property owners may submit `draft` or `pending`; they cannot approve or reject their own property. Administrators can manage approval status.

## Storage

Property media is stored below `property-images/{ownerUid}/{propertyId}/...`. Uploads are limited to JPEG, PNG, and WebP images no larger than 5 MB. Images are compressed to WebP in the browser before upload. Storage rules verify the owner UID and Firestore role.

## Room requirements

The interface warns until at least two rooms exist. Each room supports pricing, capacity, beds, bathrooms, room type, floor, size, discount, amenities, status, duplication, deletion, and a multi-image gallery.

## Deployment

Deploy the supplied rules after reviewing the Firebase project ID:

```bash
firebase deploy --only firestore:rules,storage
```

Firestore may request composite indexes for owner queries. Follow the index creation link shown by Firebase and create indexes for `ownerId + propertyId` on rooms, galleries, availability, bookings, and reviews where prompted.
