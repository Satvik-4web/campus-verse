import { runtime } from '../../shared/config/env';

export const MEDIA_BASE = runtime.mediaBaseUrl;

/**
 * Resolves a media asset path according to the active runtime environment.
 * In local/kiosk mode, serves relative files (e.g. `./videos/...`).
 * In cloud/web mode (Vercel), streams from the Supabase public CDN bucket.
 * 
 * @param {string} path 
 * @returns {string} Fully qualified or local relative media URL
 */
export const media = (path) => {
  if (!path) return '';
  if (!path.endsWith('.mp4')) {
    return path.startsWith('/') ? '.' + path : path;
  }
  const cleanPath = path.startsWith('/videos/')
    ? path.slice(8)
    : path.startsWith('/')
    ? path.slice(1)
    : path;

  const base = MEDIA_BASE === '' ? './videos' : MEDIA_BASE;
  return base + '/' + encodeURI(cleanPath);
};
