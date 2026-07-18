# Backup and Disaster Recovery

Enable scheduled Firestore exports to a dedicated Cloud Storage bucket with retention and lifecycle rules. Export before schema or rules migrations. Mirror user-uploaded Storage objects to a separate regional bucket using scheduled Cloud Run/Functions or Storage Transfer Service. Protect backup projects and buckets with least-privilege IAM and retention locks.

Quarterly, restore an export into a non-production Firebase/GCP project, verify document counts and critical booking records, test Storage object recovery, and record recovery time. Maintain encrypted copies of rules, indexes, Hosting configuration, environment inventory, and DNS records in source control or a secure operations vault.
