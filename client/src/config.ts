// In development, use localhost:5001. In production, use the relative path /api or the environment variable.
// If the app is served from the same origin as the API (e.g. creating a production build),
// we can use a relative path or an empty string if we proxy.
// However, if we assume the API is at /api, we can leave the base as empty or set it explicitly.

// If VITE_API_URL is set, use it.
// Otherwise, if we are in production (import.meta.env.PROD), we might assume it's the same origin.
// But for now, let's keep it flexible.

export const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5001');

// Socket URL might be different (needs to be absolute or relative to host)
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || (import.meta.env.PROD ? window.location.origin : 'http://localhost:5001');
