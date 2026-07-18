# SEO Implementation

DONROOM provides canonical URLs, robots directives, a public-route sitemap, Open Graph metadata, Twitter cards, keywords and dynamic metadata through `useSeo`.

Property detail pages emit LodgingBusiness and BreadcrumbList JSON-LD containing the property name, description, address, images, rating, review count and price range. The application shell emits Organization and WebSite schema.

## Deployment tasks

- Set `VITE_SITE_URL` to the final HTTPS origin.
- Regenerate `public/sitemap.xml` from approved Firestore properties during deployment or with a scheduled trusted backend job.
- Replace placeholder social icons with final PNG assets when brand assets are approved.
- Submit the production sitemap to search-engine webmaster consoles.
- Ensure Firebase Hosting rewrites application routes to `index.html` while serving `robots.txt`, `sitemap.xml`, `manifest.webmanifest` and `sw.js` directly.
