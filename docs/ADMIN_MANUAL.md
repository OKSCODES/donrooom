# Administrator Manual

Administrators manage platform governance from `/admin`.

## Daily operation

1. Review Monitoring for Firebase health, activity and error trends.
2. Review pending property approvals and verify listing identity, images and policies.
3. Review booking, review and feedback queues.
4. Investigate permission failures and audit events.
5. Confirm backup status before major releases or rule changes.

## Access control

Never promote users through browser developer tools or direct client writes. Role changes must be made through approved administrator workflows or a trusted Firebase Admin environment. Do not delete the currently signed-in administrator account.

## Maintenance and feature flags

Use `/admin/operations` to enable maintenance mode, customize the message and control feature flags. Confirm admin bypass before activation. Announce planned maintenance and disable the mode immediately after validation.

## Incident handling

Preserve error IDs, audit records and timestamps. Restrict affected features, rotate credentials when necessary, restore from a verified backup, and document the incident according to `INCIDENT_RESPONSE_GUIDE.md`.
