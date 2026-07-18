# Analytics Architecture

Analytics is disabled by default. Set `VITE_ENABLE_ANALYTICS=true` only after consent and privacy requirements are satisfied. Firebase Analytics loads dynamically and supports page views, authenticated role properties and custom events.

Recommended event names:

- `search`
- `view_item`
- `add_to_favorites`
- `begin_checkout`
- `booking_created`
- `booking_confirmed`
- `review_created`
- `inquiry_created`

Admin charts should aggregate trusted analytics exports or scheduled Firestore summary documents. Do not query unbounded raw analytics events from the browser. Booking conversion is `confirmed bookings / unique checkout starts` for the selected reporting period.
