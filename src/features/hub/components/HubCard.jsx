import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const HubCard = ({ card, index, smoothScroll, interactive, onSelect }) => {
  const start = 0.58 + index * 0.06;
  const opacity = useTransform(smoothScroll, [start, start + 0.2], [0, 1]);
  const y = useTransform(smoothScroll, [start, start + 0.28], [80, 0]);
  const scale = useTransform(smoothScroll, [start, start + 0.28], [0.9, 1]);

  const { Mark } = card;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      style={{ opacity, y, scale, '--accent': card.accent, pointerEvents: interactive ? 'auto' : 'none' }}
      className={`group relative flex h-[104px] w-full flex-row items-center gap-5 overflow-hidden
                  rounded-[1.5rem] border p-5 text-left backdrop-blur-md
                  bg-gradient-to-br from-white/[0.05] via-transparent to-black/40
                  shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)]
                  transition-all duration-500 ease-out
                  hover:-translate-y-2
                  hover:shadow-[0_20px_50px_-15px_color-mix(in_srgb,var(--accent)_30%,transparent)]
                  sm:h-[380px] sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[2rem] sm:p-8
                  ${card.featured ? 'border-sky-400/30 bg-white/[0.05]' : 'border-white/10'} hover:border-[var(--accent)]/60`}
    >
      {/* Engineering dot grid, faded out toward the base */}
      <span
        className="pointer-events-none absolute inset-0 hidden opacity-[0.85] sm:block transition-opacity duration-700 group-hover:opacity-100"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--accent) 30%, transparent) 1px, transparent 0)',
          backgroundSize: '24px 24px',
          maskImage: 'linear-gradient(to bottom, black, transparent 75%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 75%)',
        }}
      />

      {/* Subtle hover gradient */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-t from-[var(--accent)]/15 via-transparent to-transparent"
      />

      {/* Accent bar along the top of the primary card */}
      <span className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] transition-all duration-700 ${card.featured ? 'bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-80' : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:via-[var(--accent)]'}`} />

      {/* Corner brackets: HUD reticle */}
      {['left-4 top-4 border-l border-t', 'right-4 top-4 border-r border-t',
        'left-4 bottom-4 border-l border-b', 'right-4 bottom-4 border-r border-b'].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute hidden h-4 w-4 rounded-[3px] border-white/20 transition-all duration-700 group-hover:border-[var(--accent)]/80 group-hover:scale-110 sm:block ${pos}`}
        />
      ))}

      {/* Index + status */}
      <span className="relative z-10 hidden items-center justify-between sm:flex">
        <span className="font-mono text-[12px] font-medium tracking-[0.3em] text-white/40 transition-colors duration-700 group-hover:text-[var(--accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 group-hover:text-white transition-colors duration-700">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] animate-pulse" />
          {card.status}
        </span>
      </span>

      {/* Mark */}
      <span className="relative z-10 flex shrink-0 items-center justify-center sm:flex-1 sm:py-6">
        <span className="relative flex items-center justify-center rounded-[1.5rem] transition-all duration-700 group-hover:-translate-y-1 group-hover:scale-105 sm:p-4">
          <span className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-[var(--accent)] opacity-[0.07] blur-2xl transition-opacity duration-700 group-hover:opacity-20" />
          <span className="relative" style={{ filter: 'drop-shadow(0 0 20px color-mix(in srgb, var(--accent) 55%, transparent))' }}>
            <Mark size={card.id === 'elc' ? 118 : 98} />
          </span>
        </span>
      </span>

      {/* Title & Caption */}
      <span className="relative z-10 flex min-w-0 flex-col">
        <span className="text-[15px] font-semibold tracking-[0.12em] text-white/90 sm:text-[18px] transition-all duration-700 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
          {card.title}
        </span>

        <span className="mt-1.5 text-[10px] font-medium tracking-[0.12em] text-slate-400 sm:mt-2 sm:text-[11px] group-hover:text-slate-300 transition-colors duration-700">
          {card.caption}
        </span>

        <span className="my-5 hidden h-px w-full bg-gradient-to-r from-white/20 via-white/5 to-transparent sm:block transition-all duration-700 group-hover:from-[var(--accent)]/40 group-hover:via-[var(--accent)]/10" />

        <span className="hidden items-center justify-between sm:flex">
          <span className="flex flex-col">
            <span className="truncate whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-400 transition-colors duration-700">{card.meta}</span>
            <span className="mt-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[var(--accent)] group-hover:drop-shadow-[0_0_10px_var(--accent)] transition-all duration-700">
              {card.cta}
            </span>
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 shadow-inner transition-all duration-700 group-hover:border-[var(--accent)]/50 group-hover:bg-[var(--accent)]/10 group-hover:shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_30%,transparent)] group-hover:scale-110">
            <ArrowRight size={15} className="text-slate-400 transition-all duration-700 group-hover:translate-x-1 group-hover:text-white" />
          </span>
        </span>
      </span>
    </motion.button>
  );
};

export default HubCard;
