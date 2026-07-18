# Public Beta Testing Checklist

## Automated gates

- `npm ci`
- `npm run lint`
- `npm run build`
- Fresh ZIP extraction and repeat build
- Firebase Rules emulator tests before deployment

## Functional regression

- Register, verify email, login, remember session, logout and password reset
- Guest dashboard, profile, favorites, reviews, notifications and settings
- Property profile, rooms, galleries, amenities, bookings and availability
- Admin role protection, approvals, moderation, reports and settings
- Booking availability, adjacent dates, overlap rejection, cancellation and receipts
- Search, filters, maps, comparison, sharing and inquiries

## Accessibility and responsive

- Complete every flow using keyboard only
- Test screen-reader landmarks, names and error announcements
- Test 320 px, 375 px, 768 px, 1024 px and wide desktop
- Test reduced motion and browser zoom at 200%

## Production

- Confirm CSP and security headers
- Confirm App Check enforcement
- Confirm robots and sitemap production URLs
- Confirm analytics consent behavior
- Test offline fallback and service-worker update behavior
