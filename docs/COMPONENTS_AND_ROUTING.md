# Components and Routing

Public routes use `PublicLayout`; authentication routes use `GuestLayout`; role workspaces use `GuestDashboardLayout`, `PropertyLayout`, and `AdminLayout`. `ProtectedRoute` requires authentication, while role guards require the matching active Firestore role.

Reusable components are grouped by domain under `src/components`. Pages are lazy loaded in `AppRouter`. Common controls expose labels, keyboard focus, loading states, and responsive styling. Services own Firebase operations and utility modules own pure validation, sanitization, image compression, booking calculations, and retry behavior.
