/**
 * Minimal fetch wrapper for the Monpolymet API (NestJS).
 * Base URL comes from .env → VITE_API_URL.
 */
const defaultHost = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : 'localhost';
const BASE_URL = import.meta.env.VITE_API_URL ?? `http://${defaultHost}:4000/api`;

async function handleResponse(res, path) {
  if (!res.ok) {
    // Session expired / token rejected on a protected call → force re-login.
    // The login request itself is exempt so bad credentials surface normally.
    if (res.status === 401 && !path.startsWith('/auth/login')) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login');
      }
    }
    const payload = await res.json().catch(() => null);
    const message = payload?.message ?? `Request failed with status ${res.status}`;
    throw new Error(Array.isArray(message) ? message.join(', ') : message);
  }

  if (res.status === 204) return null;
  return res.json();
}

async function request(path, { method = 'GET', body, headers = {} } = {}) {
  const token = localStorage.getItem('admin_token');

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  return handleResponse(res, path);
}

/**
 * Multipart upload (does NOT set Content-Type — the browser adds the boundary).
 * `formData` should be a FormData instance carrying the file under `file`.
 */
async function upload(path, formData) {
  const token = localStorage.getItem('admin_token');

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  return handleResponse(res, path);
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
  upload: (path, formData) => upload(path, formData),
};
