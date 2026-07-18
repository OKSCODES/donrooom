# Upgrade Guide: 1.0.0 to 1.1.0

1. Back up Firestore and Storage.
2. Deploy updated Firestore rules and indexes.
3. Deploy the 1.1.0 Hosting build.
4. Sign in as admin and open `/admin/operations`.
5. Save default operational settings and feature flags.
6. Verify `/admin/monitoring`, `/help`, `/feedback` and `/version`.

New collections: `featureFlags`, `feedback`, `systemLogs`, and `errorReports`. No existing collection is migrated or removed.
