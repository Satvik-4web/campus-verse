import React, { useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const BentoCard = ({ card, meta, onClick }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 260, damping: 30 });
  const y = useSpring(0, { stiffness: 260, damping: 30 });

  const rotateX = useTransform(y, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-5deg', '5deg']);
  const imgX = useTransform(x, [-0.5, 0.5], ['-2.5%', '2.5%']);
  const imgY = useTransform(y, [-0.5, 0.5], ['-2.5%', '2.5%']);
  const specular = useTransform(
    [x, y],
    ([mx, my]) => `radial-gradient(circle at ${(mx + 0.5) * 100}% ${(my + 0.5) * 100}%, rgba(255,255,255,0.14) 0%, transparent 55%)`
  );

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => onClick(card)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', '--accent': card.color }}
      whileHover={{ scale: 1.015, transition: { duration: 0.4 } }}
      className="group relative flex h-[270px] w-full cursor-pointer sm:h-[300px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(9,14,28,0.65)] text-left shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-colors duration-500 hover:border-[var(--accent)]/45"
    >
      <motion.div className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: specular }} />

      <motion.div className="absolute inset-[-5%] h-[110%] w-[110%]" style={{ x: imgX, y: imgY }}>
        <img
          src={card.image}
          alt=""
          className={`h-full w-full object-cover saturate-[0.88] contrast-[1.03] brightness-[0.92] ${card.imagePosition || 'object-center'} transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03040D] via-[#03040D]/70 to-[#03040D]/10" />
      </motion.div>

      <span className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent" />

      <div className="relative z-20 flex h-full flex-col justify-between p-5 sm:p-6" style={{ transform: 'translateZ(35px)' }}>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] backdrop-blur-md" style={{ color: card.color }}>
            {card.subtitle}
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{meta}</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] sm:text-[28px]">
            {card.title}
          </h3>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--accent)]"
          >
            <ArrowRight size={14} className="text-white transition-colors duration-500 group-hover:text-[#03040D]" />
          </span>
        </div>
      </div>
    </motion.button>
  );
};

export default BentoCard;
