/**
 * Where the large video files are served from.
 *
 * The mp4s are no longer in git: two of them are over GitHub's 100MB hard
 * limit and the set totals roughly 870MB. They still sit in public/ for local
 * development, so an unset base resolves to the same paths as before. In
 * production point VITE_MEDIA_BASE_URL at wherever the files are hosted —
 * Vercel Blob, Cloudinary, S3 — with no trailing slash:
 *
 *   VITE_MEDIA_BASE_URL=https://cdn.example.com
 *
 * Only videos are rerouted. Images are small enough to stay in the repo, so
 * they keep resolving locally either way.
 */
export const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE_URL ?? '';

export const media = (path) => (path.endsWith('.mp4') ? `${MEDIA_BASE}${path}` : path);
