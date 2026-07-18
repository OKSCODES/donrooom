# Dependency Audit — Version 1.1.0

`npm audit --omit=dev` reports zero vulnerabilities. Patch updates were applied to Vite, Tailwind CSS, the Tailwind Vite integration, Lucide React and React Hook Form. No package was added for capabilities already provided by the platform or Firebase SDK.

The Firebase and jsPDF chunks remain the largest bundles; both are isolated by Vite chunking, and PDF functionality is loaded through route-level code splitting. Re-run `npm outdated` monthly and evaluate major upgrades in a staging branch.
