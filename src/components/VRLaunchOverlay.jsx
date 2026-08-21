import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function VRLaunchOverlay({ isVisible, vrError }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md"
        >
          <div className="flex flex-col items-center justify-center space-y-8 p-12 text-center relative max-w-2xl w-full">
            {/* Sleek glowing spinner (red if error, cyan if loading) */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-0 rounded-full border-t-2 border-r-2 ${vrError ? 'border-red-500 shadow-[0_0_15px_#ef4444]' : 'border-[#38bdf8] shadow-[0_0_15px_#38bdf8]'}`}
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-b-2 border-l-2 border-white/50"
              />
              <div className={`absolute inset-4 rounded-full ${vrError ? 'bg-red-500/20' : 'bg-[#38bdf8]/20'} blur-sm animate-pulse`} />
            </div>

            {/* Text content */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold tracking-[0.2em] text-white"
              >
                {vrError ? <span className="text-red-500">ERROR</span> : <>LAUNCHING <span className="text-[#38bdf8]">VR</span></>}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-lg tracking-wider font-light ${vrError ? 'text-red-300' : 'text-slate-300'}`}
              >
                {vrError ? vrError : 'Please put on the Meta Quest headset.'}
              </motion.p>
            </div>
            
            {/* Cinematic top/bottom lines */}
            <div className={`absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent ${vrError ? 'via-red-500/50' : 'via-[#38bdf8]/50'} to-transparent`} />
            <div className={`absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent ${vrError ? 'via-red-500/50' : 'via-[#38bdf8]/50'} to-transparent`} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
