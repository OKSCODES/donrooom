# DONROOM Operations Manual

## Daily checks
1. Open `/admin/monitoring` and confirm the overall status is operational.
2. Review degraded services, latency, recent errors and security events.
3. Confirm new registrations, bookings, properties and reviews are within expected ranges.
4. Review open feedback and audit logs.

## Maintenance mode
Use `/admin/operations`. Enter a customer-facing message, enable maintenance mode and save. Active administrators retain access. Disable it immediately after validation.

## Feature flags
Flags are kill switches for reviews, bookings, registration, property creation, notifications, announcements and offers. Disable only the affected capability during incidents; document the reason in the incident record.

## Escalation
Security incidents, suspected data loss, failed backups and broad authentication failures are severity 1. Stop risky writes, enable maintenance mode, preserve logs and follow the incident guide.
