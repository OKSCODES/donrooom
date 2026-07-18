# Operational FAQ

## Why does npm try an internal registry?
Use the included `.npmrc` and lockfile. `npm config get registry` must return `https://registry.npmjs.org/`.

## Why does a protected route redirect?
The account is unauthenticated, disabled, unverified where required, or its Firestore role does not match the route.

## Why is a property not public?
Only properties with approved status are readable as public listings.

## Why can an image upload fail?
The file is too large, has an unsupported MIME type, the user does not own the path, or Firebase Storage rules are not deployed.

## Why does a query request an index?
Deploy `firestore.indexes.json` and wait until Firebase reports the index as ready.

## What should be checked after deployment?
Authentication, role redirects, one booking transaction, one image upload, rules denial tests, receipts, analytics consent, PWA update and custom-domain HTTPS.
