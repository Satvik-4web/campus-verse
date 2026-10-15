import React from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen({ message = 'INITIALIZING SPATIAL ENVIRONMENT...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0e2547] via-[#050e21] to-[#01040c] text-white select-none">
      <div className="relative flex flex-col items-center space-y-6">
        {/* Animated Double Ring Glow */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-sky-400 shadow-[0_0_20px_#38bdf8]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2.5 rounded-full border-b-2 border-l-2 border-cyan-300/60"
          />
          <div className="h-4 w-4 rounded-full bg-sky-400/40 blur-xs animate-pulse" />
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <h2 className="text-sm font-semibold tracking-[0.35em] text-white">
            CAMPUS<span className="text-sky-400 font-bold">VERSE</span>
          </h2>
          <p className="mt-2 text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
