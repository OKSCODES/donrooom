# Backup and Restore Guide

## Schedule
- Firestore managed export: daily, retained 35 days.
- Storage bucket replication/export: weekly, retained 90 days.
- Release artifacts and rules: every tagged release.
- Recovery drill: quarterly.

## Firestore export
Run from a trusted Google Cloud environment with least-privilege IAM:
`gcloud firestore export gs://BACKUP_BUCKET/firestore/DATE`

## Firestore restore
Restore into an isolated Firebase project, validate document counts and ownership, then schedule the approved production import:
`gcloud firestore import gs://BACKUP_BUCKET/firestore/DATE`

## Storage
Enable object versioning or replicate the bucket. Verify checksums and lifecycle policies. Restore into a temporary prefix before replacing production objects.

## Rollback
Redeploy the previous signed release, restore only affected data, invalidate caches and execute the complete smoke checklist.
