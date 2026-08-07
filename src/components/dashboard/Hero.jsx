import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, PointMaterial, Points } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const HolographicGlobe = () => {
  const ref = useRef();
  // Generate random points on a sphere
  const sphere = random.inSphere(new Float32Array(3000), { radius: 1.5 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#14D8FF"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
      {/* Central Core Glow */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#14D8FF" transparent opacity={0.05} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.45, 16, 16]} />
        <meshBasicMaterial color="#FF3CF8" transparent opacity={0.02} wireframe />
      </mesh>
    </group>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full min-h-[60vh] mt-32 flex items-center justify-between z-10 px-4 md:px-0">
      
      {/* Left Content */}
      <div className="flex-1 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#14D8FF]/30 bg-[#14D8FF]/5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#14D8FF] animate-pulse" />
            <span className="text-[#14D8FF] text-[10px] font-bold tracking-[0.2em] uppercase">
              System Initialization v2.0
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
            Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14D8FF] to-[#FF3CF8]">Verse</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[rgba(255,255,255,0.8)] font-light tracking-wide mb-4 leading-snug">
            Your gateway to innovation, research and immersive campus experiences.
          </p>
          
          <p className="text-[rgba(255,255,255,0.55)] text-sm font-medium tracking-wide mb-10 max-w-lg leading-relaxed">
            A next-generation spatial computing environment designed for elite academic exploration.
          </p>
          
          <div className="flex items-center gap-6">
            <button className="relative group overflow-hidden px-8 py-4 rounded-2xl bg-white text-[#03040D] font-bold tracking-widest text-xs uppercase hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <span className="relative z-10">Explore Spaces</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#14D8FF] to-[#FF3CF8] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white z-20">
                Explore Spaces
              </span>
            </button>
            
            <button className="px-8 py-4 rounded-2xl bg-[rgba(15,20,35,0.65)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] text-white font-bold tracking-widest text-xs uppercase hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Launch Experience
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Content - 3D Sphere */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="hidden lg:block flex-1 h-[600px] relative"
      >
        {/* Glow behind sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#14D8FF]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <Canvas camera={{ position: [0, 0, 3.5] }}>
          <HolographicGlobe />
        </Canvas>
      </motion.div>

    </section>
  );
};

export default Hero;
