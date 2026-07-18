# DONROOM Phase 8 — Advanced Discovery and Communication

## Routes
- `/search` — debounced multi-field search, filters, sorting and recent searches.
- `/map` — responsive map/list experience with property marker previews.
- `/favorites` — authenticated guest favorites.
- `/recently-viewed` — authenticated history limited by the existing service to 20 records.
- `/property/:id/share` — share sheet for WhatsApp, Facebook, Telegram, X, email and copy link.

## Firestore collections
`recentSearches`, `searchHistory`, `propertyViews`, `inquiries`, `offers`, `announcements`, `recommendations`, `shareLogs`, and `promoCodes` are secured in `firestore.rules`.

## Search architecture
The UI performs a 300 ms debounced search over property name, village, location, property type, room type and amenities. Filters are composed in one memoized pipeline and sorting is deterministic. Recent searches are scoped to the signed-in user.

## Map architecture
The current map is provider-independent and deploys without an API key. Marker coordinates are deterministic presentation positions for the sample dataset. The `PropertyMap` component is isolated so Google Maps, Mapbox or Leaflet can replace the renderer without changing routes or search state.

## Inquiry security
Guests create inquiries with their authenticated UID. Firestore allows reads only for the guest, matching property owner or admin. Owners may reply and change status but cannot alter ownership fields.

## Sharing
Share events are recorded without allowing client updates or deletion. Native share channels use generated canonical property URLs.

## Offers and announcements
Owners may create offers only for their own properties. Admins can moderate all offers and exclusively manage announcements and promo-code documents.
