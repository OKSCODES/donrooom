# Incident Response Guide

1. **Detect:** capture time, scope, error references, affected roles and routes.
2. **Triage:** classify severity and identify the last healthy release.
3. **Contain:** disable the affected feature flag or enable maintenance mode.
4. **Preserve:** export audit logs, error reports and relevant Firebase logs.
5. **Recover:** roll back Hosting or restore data using the backup procedure.
6. **Validate:** test authentication, authorization, booking locks and affected CRUD flows.
7. **Communicate:** publish a plain-language status update.
8. **Review:** document root cause, impact, corrective actions and ownership.

Never restore production data directly from an unverified export. Use an isolated project first.
