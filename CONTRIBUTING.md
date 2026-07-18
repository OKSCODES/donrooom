# Contributing to DONROOM

1. Create a focused branch from `main`.
2. Never commit `.env`, service-account files, exports, or guest data.
3. Keep Firestore and Storage changes backward-compatible and ownership-safe.
4. Run `npm ci`, `npm run validate:env`, `npm run lint`, and `npm run build` before opening a pull request.
5. Include route, role, mobile, keyboard, and error-state verification for UI changes.
6. Document collection/index/rule changes and migration impact.
7. Require code review before production deployment.
