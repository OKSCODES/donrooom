# Troubleshooting Guide

- **Application Error:** record the UUID, inspect `errorReports`, clear stale service-worker caches and reproduce in an incognito window.
- **Permission denied:** verify the Firestore user document has an active status and correct role; deploy matching rules.
- **Booking conflict:** inspect deterministic availability documents for the room and nightly dates.
- **Images fail:** verify MIME type, size, ownership path and Storage rules.
- **Offline:** confirm browser connectivity, service-worker state and Firebase reachability.
- **Build failure:** run `npm ci`, `npm run lint`, then `npm run build`; do not reuse copied `node_modules` folders.
