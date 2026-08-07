import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#03040D]">
      
      {/* Central Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[150px] opacity-30 bg-[radial-gradient(ellipse_at_center,_#14D8FF_0%,_transparent_70%)]" />

      {/* Slow Moving Fog / Gradient Breathing */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_#14D8FF_0%,_transparent_40%)] opacity-20 blur-[100px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_#FF3CF8_0%,_transparent_50%)] opacity-10 blur-[120px]"
      />

      {/* Occasional Glowing Lines */}
      <motion.div
        animate={{
          y: ["-100%", "200%"],
          opacity: [0, 0.5, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute left-[30%] w-[1px] h-[50vh] bg-gradient-to-b from-transparent via-[#14D8FF] to-transparent opacity-20"
      />
      <motion.div
        animate={{
          y: ["200%", "-100%"],
          opacity: [0, 0.3, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 3 }}
        className="absolute right-[25%] w-[1px] h-[40vh] bg-gradient-to-b from-transparent via-[#FF3CF8] to-transparent opacity-10"
      />

      {/* Tiny Stars / Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -Math.random() * 50 - 20],
            opacity: [Math.random() * 0.3, Math.random() * 0.8, 0],
            scale: [1, Math.random() * 1.5 + 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

export default Background;
