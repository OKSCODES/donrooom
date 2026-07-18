# Security Policy

## Supported version

DONROOM 1.0.0 is the supported commercial release. Security fixes are applied to the current stable branch.

## Reporting a vulnerability

Do not create a public issue containing exploit details, credentials, personal data or proof-of-concept attacks. Email the security contact configured by `VITE_SUPPORT_EMAIL` with:

- affected route, component or Firebase resource;
- impact and prerequisites;
- safe reproduction steps;
- suggested mitigation, when known.

A maintainer should acknowledge a complete report within three business days, triage severity, prepare a private fix and coordinate disclosure. Never include service-account keys, user tokens or production records.

## Security controls

Firestore and Storage rules are the authorization boundary. Client route guards improve UX but are not relied upon for security. Secrets belong in Firebase/GitHub secret stores. Production deployments require HTTPS, least-privilege Firebase IAM, MFA for privileged accounts, periodic dependency audits and tested backups.

See `docs/SECURITY.md` and `docs/SECURITY_AUDIT_REPORT.md` for the detailed control matrix.
