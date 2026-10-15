/**
 * @typedef {Object} RuntimeConfig
 * @property {boolean} isKiosk - True if running in an Electron kiosk environment.
 * @property {boolean} isElectron - True if running inside an Electron renderer.
 * @property {boolean} isWeb - True if running in a standard web browser (e.g., Vercel).
 * @property {boolean} bridgeEnabled - True if local WebSocket bridge should connect.
 * @property {'local' | 'cdn'} mediaMode - 'local' when serving from filesystem, 'cdn' when streaming via Supabase.
 * @property {string} questIp - Configured IP for Meta Quest 3.
 * @property {string} bridgeUrl - Local bridge WebSocket URL.
 * @property {string} supabaseUrl - Supabase project URL.
 * @property {string} supabaseKey - Supabase anon/public API key.
 * @property {string} mediaBaseUrl - Root media URL prefix.
 */

/**
 * Single source of truth for runtime detection and environment configuration.
 * Replaces scattered `window.location` or hardcoded protocol checks across the app.
 * @type {RuntimeConfig}
 */
export const runtime = (() => {
  const isBrowser = typeof window !== 'undefined';
  const isHttps = isBrowser && window.location.protocol === 'https:';
  
  // Detect Electron environment
  const isElectron = isBrowser && Boolean(
    window.navigator?.userAgent?.includes('Electron') || 
    (typeof window.process !== 'undefined' && window.process?.type === 'renderer')
  );

  const isKiosk = Boolean(import.meta.env.VITE_IS_KIOSK === 'true' || isElectron);
  const isWeb = !isKiosk;

  // On HTTPS (Vercel), browsers block ws://localhost as mixed content.
  // Bridge is only active on Electron, local dev (http), or explicit override.
  const bridgeEnabled = isBrowser && !isHttps && (
    isElectron ||
    isKiosk ||
    import.meta.env.VITE_BRIDGE_ENABLED === 'true' ||
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );

  const defaultSupabaseUrl = 'https://cnckzaybkmlcfxnhvrmp.supabase.co';
  const defaultSupabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuY2t6YXlia21sY2Z4bmh2cm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MjQ0NDYsImV4cCI6MjEwNDMwMDQ0Nn0.K5_AlEAFqUFQDQJVHd3DSAuffUxVxeMTQDR8wu0PoYY';

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseKey;

  const mediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL || (
    isBrowser && (window.location.hostname.includes('vercel.app') || isWeb)
      ? `${supabaseUrl}/storage/v1/object/public/kiosk-media`
      : ''
  );

  const mediaMode = mediaBaseUrl ? 'cdn' : 'local';

  return {
    isKiosk,
    isElectron,
    isWeb,
    bridgeEnabled,
    mediaMode,
    questIp: import.meta.env.VITE_QUEST_IP || '172.31.242.30',
    bridgeUrl: import.meta.env.VITE_BRIDGE_URL || 'ws://localhost:8080',
    supabaseUrl,
    supabaseKey,
    mediaBaseUrl,
  };
})();
