# Accessibility Certification Report

## Reviewed areas

Semantic landmarks, headings, labels, keyboard operation, focus visibility, reduced motion, status announcements, dialogs, tables and error states.

## Implemented controls

- Skip-to-content navigation and stable main landmark.
- Visible `:focus-visible` treatment.
- Accessible names for icon buttons and search controls.
- Form labels, required indicators and inline validation messages.
- Screen-reader loading and offline announcements.
- Keyboard-operable navigation and dialogs.
- Reduced-motion preference support.
- Responsive tables with accessible headers.

## Certification status

The source meets the project's WCAG 2.1 AA foundation. Final certification requires automated axe/Lighthouse scans and manual screen-reader testing on the deployed domain because computed color contrast, browser extensions, remote images and Firebase-rendered data cannot be fully certified from source alone.
