# Monitoring Guide

The browser health check measures Firebase configuration, current Authentication state, a safe Firestore read, a protected Storage listing and browser network status. Permission-denied Storage results are reported as `secured`, not failed.

Client errors receive UUID references. Signed-in errors are written to `errorReports`; structured product events use `systemLogs`; immutable administrative actions remain in `auditLogs`.

Firebase Console should provide production dashboards for Authentication activity, Firestore reads/writes, Storage transfer, Hosting traffic and Analytics. Configure budget alerts and alert policies in Google Cloud for abnormal error rates and usage.
