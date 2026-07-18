# Performance Optimization Report

- Public, booking, guest, property and admin pages use route-level dynamic imports.
- Firebase Analytics is dynamically imported only when explicitly enabled in production.
- Vendor chunks separate React, Firebase, PDF, motion and utility libraries for long-term browser caching.
- TanStack Query uses a one-minute default stale time, ten-minute garbage-collection window and bounded retries.
- Images use lazy loading throughout listing and gallery experiences; upload paths already compress property and review images.
- The PWA shell caches only same-origin successful GET responses and uses a dedicated offline navigation page.
- Static metadata files are served outside the JavaScript bundle.

Future production measurement should use Lighthouse CI and real-user Web Vitals. Large Firestore tables should retain pagination and indexed queries rather than reading full collections.
