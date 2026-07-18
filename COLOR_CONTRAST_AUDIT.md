# DONROOM Global Color and Contrast Audit

## Scope
Typography, foreground/background contrast, focus visibility, form readability, status colors, and light/dark surface consistency were updated without changing application layout, business logic, routes, or animations.

## Centralized design system
The global Tailwind theme and CSS variables now define page, cream, card, dark, primary, secondary, hover, heading, body, muted, subtle, border, focus, success, warning, danger, and information colors.

Semantic utilities added:
- `bg-page`, `bg-cream`, `bg-card`, `bg-dark-surface`, `bg-primary-action`
- `text-heading`, `text-body`, `text-muted`, `text-subtle`
- `text-on-dark`, `text-on-dark-muted`, `text-on-dark-subtle`
- `text-link`, `text-button`, `text-caption`, `text-placeholder`
- `text-error`, `text-success`, `border-default`, `focus-accessible`

## Accessibility improvements
- Raised low-opacity black and white text to readable values.
- Guaranteed dark text on yellow surfaces.
- Improved placeholder, disabled field, helper, and muted text contrast.
- Standardized a visible green 3px focus ring.
- Preserved minimum 44px interactive targets on small screens.
- Added dark-theme semantic token overrides.
- Improved form controls and legacy utility compatibility.

## Updated application areas
Semantic tokens were applied across public pages, navigation, footer, authentication, guest dashboard, property dashboard, admin dashboard, cards, forms, tables, dialogs, badges, booking pages, reviews, notifications, settings, and responsive navigation.

## Validation
- ESLint: passed.
- Vite production build: passed.
