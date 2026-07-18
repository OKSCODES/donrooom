# Routing Guide

DONROOM uses React Router with route-level lazy loading and a global route error element.

## Public routes

`/`, `/about`, `/properties`, `/property/:id`, `/gallery`, `/contact`, `/faq`, `/privacy`, `/terms`, `/cookies`, `/disclaimer`, `/refund-policy`, `/feedback`, `/help`, `/version`, `/search`, `/map`, `/property/:id/share`, `/unauthorized`.

## Authentication routes

`/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`.

## Authenticated shared routes

`/profile`, `/favorites`, `/recently-viewed`, `/booking`, `/booking/:bookingId`, `/checkout`, `/receipt/:bookingId`.

## Guest routes

`/guest/dashboard`, `/guest/profile`, `/guest/bookings`, `/guest/bookings/:bookingId`, `/guest/favorites`, `/guest/reviews`, `/guest/notifications`, `/guest/settings`.

## Property-owner routes

`/property/dashboard`, `/property/profile`, `/property/rooms`, `/property/gallery`, `/property/amenities`, `/property/bookings`, `/property/reviews`, `/property/calendar`, `/property/settings`.

## Administrator routes

`/admin/dashboard`, `/admin/profile`, `/admin/users`, `/admin/property-owners`, `/admin/properties`, `/admin/property-approval`, `/admin/rooms`, `/admin/bookings`, `/admin/reviews`, `/admin/gallery`, `/admin/categories`, `/admin/locations`, `/admin/amenities`, `/admin/reports`, `/admin/analytics`, `/admin/notifications`, `/admin/site-settings`, `/admin/security`, `/admin/audit-logs`, `/admin/monitoring`, `/admin/operations`, `/admin/backups`, `/admin/feedback`.

Protected, Guest, Property and Admin guards redirect unauthenticated or unauthorized users. The wildcard route renders the 404 page. Firebase rules independently enforce data access.
