# DONROOM Public Website — Phase 3

## Routes

- `/` Home
- `/about` About DONROOM and local tourism
- `/properties` Searchable and filterable property catalogue
- `/property/:id` Property details
- `/gallery` Categorized masonry gallery
- `/contact` Contact information and form
- `/faq` Frequently asked questions
- `/privacy` Privacy policy
- `/terms` Terms and conditions

## Architecture

Public data is currently contained in `src/data/publicData.js` so Phase 3 remains independent of future property-management collections. Reusable presentation components are under `src/components/public`. Public route pages are lazy loaded in `src/routes/AppRouter.jsx`.

Authentication, Firebase configuration, role guards, profile management and protected dashboard routes from Phase 2 are preserved.

## SEO and accessibility

`useSeo` manages page titles, descriptions, Open Graph metadata, Twitter card metadata and canonical URLs. Interactive controls include labels, focus styles, keyboard semantics and reduced-motion support.

## Images

Phase 3 uses optimized remote royalty-free Unsplash images with query-based sizing and lazy loading. Production deployments may replace these URLs with Firebase Storage assets in a later property-management phase.
