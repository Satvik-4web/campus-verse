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

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const mediaBaseUrl = import.meta.env.VITE_MEDIA_BASE_URL || '';

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
