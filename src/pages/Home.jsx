import React from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Scene from '../components/Scene';
import UIOverlay from '../components/UIOverlay';

function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Smooth out the mouse movement for the background text parallax
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });
  const rotateXSpring = useSpring(rotateX, { stiffness: 50, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;
    
    // Parallax movement
    x.set(normX * -60);
    y.set(normY * -60);
    
    // 3D Tilt effect
    rotateX.set(normY * 15); // Tilt up/down
    rotateY.set(normX * -15); // Tilt left/right
  };

  return (
    <div 
      className="relative w-screen h-screen bg-[#040a18] overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
      style={{ perspective: '1000px' }}
    >
      
      {/* Background Huge Text - Placed BEHIND the 3D Canvas */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden"
        style={{ 
          x: mouseXSpring, 
          y: mouseYSpring,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: 'preserve-3d'
        }}
      >
        <h1 className="flex flex-col items-center justify-center font-bold tracking-[0.15em] select-none text-[#3a6be4] opacity-20 mix-blend-screen leading-[0.85] drop-shadow-[0_0_30px_rgba(58,107,228,0.4)]">
          <span className="text-[13vw]">CAMPUS</span>
          <span className="text-[13vw]">VERSE</span>
        </h1>
      </motion.div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene />
        </Canvas>
      </div>

      {/* 2D UI Overlay */}
      <UIOverlay />
    </div>
  );
}

export default Home;
