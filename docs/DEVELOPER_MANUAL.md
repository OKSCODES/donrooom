# Developer Manual

## Local workflow

Use Node.js 22 LTS and npm 10 or newer. Copy `.env.example` to `.env`, configure a non-production Firebase project, then run `npm install`, `npm run validate:env`, `npm run lint`, `npm run dev` and `npm run build`.

## Architecture rules

- Pages orchestrate data and layouts; reusable UI belongs under `src/components`.
- Firebase access belongs under `src/services`.
- Route authorization belongs under `src/routes` and is duplicated by Firebase rules.
- Shared constants and validation schemas must not be redefined in page files.
- Every async flow must surface a user-safe error and preserve a diagnostic reference.
- Never commit `.env`, service-account JSON, exported user data or generated `dist` files.

## Change validation

Run `npm run certify` before review. Any Firestore query change must be checked against `firestore.indexes.json`; any new collection or upload path requires explicit deny-by-default rules and documentation.
