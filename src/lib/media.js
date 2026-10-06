export const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE_URL || (window.location.hostname.includes('vercel.app') ? 'https://cnckzaybkmlcfxnhvrmp.supabase.co/storage/v1/object/public/kiosk-media' : '');

export const media = (path) => {
    if (!path.endsWith('.mp4')) return path.startsWith('/') ? '.' + path : path;
    const cleanPath = path.startsWith('/videos/') ? path.slice(8) : (path.startsWith('/') ? path.slice(1) : path);
    const base = MEDIA_BASE === '' ? './videos' : MEDIA_BASE;
    return base + '/' + encodeURI(cleanPath);
};
