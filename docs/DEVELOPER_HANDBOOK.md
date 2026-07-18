# Developer Handbook

DONROOM uses React 19, Vite, Firebase, React Router, TanStack Query, Zustand and Tailwind CSS. Route pages are lazy loaded. Firebase access belongs in services, reusable UI in components, stateful cross-cutting behavior in contexts, and stable values in constants.

Every change must preserve role boundaries, validate inputs, avoid frontend-only authorization, keep writes ownership-scoped, pass lint/build, and update rules/indexes/documentation when data access changes.
