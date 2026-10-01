# Security Policy

Startrack takes application security seriously.

## Reporting Vulnerabilities
Please email security concerns to `security@startrack.app` rather than opening public GitHub issues.

## Security Measures
- Helmet HTTP security headers
- Rate limiting (200 requests / 15 minutes)
- JWT-based stateless authorization
- Password hashing with bcrypt salt rounds
- Parameterized MongoDB queries via Mongoose
