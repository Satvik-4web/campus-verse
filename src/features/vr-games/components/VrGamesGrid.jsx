import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { VR_GAMES } from '../../../data/vrGames';

const EASE = [0.16, 1, 0.3, 1];

export const VrGamesGrid = ({ onBack, onSelectGame }) => {
  return (
    <motion.div
      key="vrgames"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto mt-16 sm:mt-0"
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute top-6 left-6 sm:top-10 sm:left-10 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/70 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:text-white cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Back to Destinations</span>
      </button>

      <div className="mb-10 flex flex-col items-center">
        <span className="flex items-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/50 sm:w-16" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-cyan-300/80">
            Immersive Arcade
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/50 sm:w-16" />
        </span>
        <h2 className="mt-3 text-3xl font-black tracking-[0.1em] text-white sm:text-4xl">VR GAMES</h2>
        <span className="mt-2 text-[11px] font-light tracking-[0.06em] text-slate-400">
          Select a game to launch directly to the headset
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:gap-10 landscape:lg:grid-cols-4">
        {VR_GAMES.map((game) => (
          <motion.div
            key={game.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectGame(game.pkg)}
            className="group relative flex cursor-pointer flex-col items-center gap-6 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.04] via-transparent to-black/30 p-8 backdrop-blur-3xl shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-4 hover:border-cyan-400/50 hover:bg-white/[0.06] hover:shadow-[0_40px_80px_-15px_color-mix(in_srgb,cyan_30%,transparent),inset_0_1px_0_0_rgba(255,255,255,0.3)] w-[200px] sm:w-[260px] md:w-[300px]"
          >
            {/* Inner accent glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-cyan-400/0 to-cyan-400/0 transition-colors duration-700 group-hover:from-cyan-400/10 group-hover:to-transparent" />
            
            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-black/40 shadow-inner sm:h-28 sm:w-28 border border-white/10 transition-all duration-700 group-hover:scale-110 group-hover:border-cyan-400/60 group-hover:bg-cyan-950/30 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              <span className="text-4xl font-black text-white/50 transition-all duration-700 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] sm:text-5xl">
                {game.name.charAt(0)}
              </span>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <span className="text-lg font-black tracking-[0.12em] text-white sm:text-xl md:text-2xl group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-700">
                {game.name}
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500/70 group-hover:text-cyan-400 transition-colors duration-700 sm:text-[12px]">
                {game.sub}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VrGamesGrid;
