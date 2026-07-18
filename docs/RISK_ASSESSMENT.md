# Commercial Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---:|---:|---|
| Firebase service outage | Low | High | Offline messaging, retries, monitoring, incident plan |
| Misconfigured production rules | Medium | Critical | Deploy reviewed rules, emulator deny tests, least privilege |
| Fraudulent property or guest data | Medium | High | Approval workflow, audit logs, moderation, identity procedures |
| Double booking | Low | High | Transactional availability and status controls |
| Malicious uploads | Low | High | MIME/size/path rules, compression, moderation, App Check |
| Account takeover | Medium | High | Firebase Auth, password controls, MFA for admins, session review |
| Data loss | Low | Critical | Scheduled Firestore/Storage backup and restore drills |
| Legal/privacy mismatch | Medium | High | Jurisdiction-specific counsel and verified operator details |
| Traffic spike and cost growth | Medium | Medium | Query limits, caching, budgets, alerts and quota monitoring |
| Third-party analytics/email failure | Medium | Medium | Graceful degradation, monitoring and provider fallback plan |

No risk can be eliminated completely. Commercial launch approval requires named owners for security, privacy, backup and incident response.
