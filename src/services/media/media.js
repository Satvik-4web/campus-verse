import { runtime } from '../../shared/config/env';

export const MEDIA_BASE = runtime.mediaBaseUrl;

/**
 * Resolves a media asset path.
 * If VITE_MEDIA_BASE_URL is configured (e.g. external CDN/S3), it prepends that base URL.
 * Otherwise, it serves static files directly from Vite/Vercel/Electron using `./`.
 * 
 * @param {string} path 
 * @returns {string} Fully qualified or local media URL
 */
export const media = (path) => {
  if (!path) return '';

  // Already an absolute URL
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // If custom external CDN base URL is configured
  if (MEDIA_BASE && /^https?:\/\//i.test(MEDIA_BASE)) {
    const clean = path.replace(/^\/videos\//, '').replace(/^\//, '');
    return `${MEDIA_BASE.replace(/\/$/, '')}/${encodeURI(clean)}`;
  }

  // Default: Direct static deployment (Vercel, local dev, Electron Kiosk)
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const parts = cleanPath.split('/').map(segment => encodeURIComponent(segment));
  const isBrowser = typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http');
  const prefix = isBrowser ? '/' : './';
  return prefix + parts.join('/');
};
