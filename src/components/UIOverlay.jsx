import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Monitor } from 'lucide-react';

const UIOverlay = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-10 font-sans tracking-wide">
      {/* Header / Logos */}
      <header className="flex justify-between items-start pointer-events-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
          className="flex flex-col gap-1 group cursor-pointer"
        >
          {/* Transparent Logo with clean hover interaction */}
          <div className="flex items-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <img 
              src="/thapar-logo-transparent.png" 
              alt="Thapar Institute Logo" 
              className="h-16 w-auto object-contain pointer-events-auto" 
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4"
        >
          <div className="flex flex-col items-end text-right">
            <h2 className="text-sm font-medium tracking-[0.3em] text-white">
              CAMPUS<span className="font-bold text-[#00d2ff]">VERSE</span>
            </h2>
            <p className="text-[8px] text-[#00d2ff]/60 tracking-[0.2em] uppercase mt-1">Explore. Experience. Discover.</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#00d2ff]/40 bg-[#00d2ff]/10 box-glow">
            <div className="w-4 h-1 bg-[#00d2ff] rounded-full shadow-[0_0_10px_#00d2ff]"></div>
          </div>
        </motion.div>
      </header>

      {/* Bottom Controls */}
      <div className="flex flex-col items-center justify-end pb-12 pointer-events-auto gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-[#00d2ff]/30 bg-[#040a18]/80 backdrop-blur-xl">
            <div className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff] animate-pulse"></div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#00d2ff] uppercase">System Ready</span>
          </div>
        </motion.div>

        <MagneticButton onClick={() => navigate('/about')} />
      </div>
    </div>
  );
};

const MagneticButton = ({ onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.2;
    const distanceY = (e.clientY - centerY) * 0.2;
    
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative px-16 py-4 rounded-full border border-[#00d2ff]/40 bg-[#040a18]/80 backdrop-blur-2xl text-white font-semibold tracking-[0.3em] text-xs transition-all duration-300 hover:bg-[#00d2ff]/20 hover:text-[#00d2ff] overflow-hidden group shadow-[0_0_20px_rgba(0,210,255,0.1)] hover:shadow-[0_0_30px_rgba(0,210,255,0.4)]"
    >
      <span className="relative z-10 transition-shadow duration-300 group-hover:text-glow">GO ON</span>
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 box-glow-strong"></div>
    </motion.button>
  );
};

export default UIOverlay;
