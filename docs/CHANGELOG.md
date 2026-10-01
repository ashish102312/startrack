# Changelog

All notable changes to Startrack are documented here.

## [2.1.0] - 2026-10-01
### Added
- Health check endpoints (`/` and `/api/health`)
- WebSocket connection error handler and reconnection limits
- Comprehensive deployment guide for Render and Vercel

### Fixed
- Removed redundant Autoprefixer to speed up Vite builds by ~220x
- Fixed ESLint flat config directory traversal
- Guarded database reset endpoint in production
- Sanitized auth error responses
