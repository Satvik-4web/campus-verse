import React, { useState } from 'react';
import { Play } from 'lucide-react';

const isImage = (url) => /\.(jpe?g|gif|png|webp)$/i.test(url);
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export const MediaThumb = ({ media, active, onSelect }) => {
  const [duration, setDuration] = useState(null);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative h-[92px] w-[164px] shrink-0 overflow-hidden rounded-2xl border transition-all cursor-pointer ${
        active ? 'border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.45)]' : 'border-white/10 hover:border-white/30'
      }`}
    >
      {isImage(media.url) ? (
        <img src={media.url} alt={media.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
      ) : (
        <video
          src={`${media.url}#t=2`}
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        />
      )}

      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {active && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/90 text-[#03040D]">
            <Play size={13} fill="currentColor" />
          </span>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2.5">
        <span className={`truncate text-[10px] ${active ? 'text-sky-300' : 'text-white/70'}`}>{media.title}</span>
        {duration ? <span className="font-mono text-[9px] text-white/40">{fmt(duration)}</span> : null}
      </span>
    </button>
  );
};

export default MediaThumb;
