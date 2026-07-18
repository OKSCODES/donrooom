# Architecture

DONROOM is a Vite React single-page application. React Router supplies lazy route boundaries. Context providers handle authentication and theme, TanStack Query provides server-state caching, Zustand stores lightweight application state, and Firebase supplies identity, Firestore, Storage, Analytics, and Hosting.

Feature code is separated into public, authentication, booking, guest, property, admin, and discovery pages. Reusable UI lives under `components`; Firebase access is isolated in `services`; validation and deterministic calculations live in `utils`; security is enforced independently by `firestore.rules` and `storage.rules`.

The browser is never trusted for role or ownership decisions. The UI route guards improve experience; Firebase rules remain the enforcement boundary.
