import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Map, Cpu } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

export const ExploreDrawer = ({ onBack, onLaunchTours, onLaunchLabs }) => {
  return (
    <motion.div
      key="explore"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
      }}
      className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-auto landscape:md:flex-row landscape:md:gap-10"
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute top-6 left-6 sm:top-10 sm:left-10 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/70 backdrop-blur-xl transition-all hover:border-sky-400/40 hover:text-white cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Back to Campus Verse</span>
      </button>

      {[
        { key: 'tours', Icon: Map, top: 'CAMPUS', bottom: 'TOURS' },
        { key: 'labs', Icon: Cpu, top: 'LAB', bottom: 'SIMULATORS' },
      ].map(({ key, Icon, top, bottom }) => (
        <motion.div
          key={key}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
          }}
          whileTap={{ scale: 0.96 }}
          className="relative bg-white/[0.03] p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.4)] border border-white/10 border-t-white/20 border-l-white/20 hover:border-[#38bdf8]/40 backdrop-blur-2xl flex flex-col items-center justify-center w-[300px] h-[300px] landscape:md:w-[320px] landscape:md:h-[360px] transition-all duration-700 overflow-hidden cursor-pointer group"
          onClick={() => {
            if (key === 'tours') {
              onLaunchTours();
            } else {
              onLaunchLabs();
            }
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          <Icon size={80} className="text-[#38bdf8] mb-8 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700" style={{ filter: 'drop-shadow(0px 0px 20px rgba(56,189,248,0.6))' }} />
          <h2 className="text-2xl font-bold tracking-[0.2em] text-white mt-2 z-10 text-center">
            {top}<br/><span className="text-[#38bdf8] transition-colors duration-700 group-hover:text-white">{bottom}</span>
          </h2>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExploreDrawer;
