import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FeaturedEvent = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
      className="relative z-10 w-full mb-24 px-4 md:px-0"
    >
      <div className="group relative w-full h-[500px] rounded-[32px] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-[rgba(255,255,255,0.08)]">
        
        {/* Background Image with Parallax effect (simulated via scale) */}
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" 
          alt="Featured Event" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03040D] via-[#03040D]/60 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#03040D] via-[#03040D]/40 to-transparent opacity-80" />
        
        {/* Hover Highlight Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_bottom_left,_rgba(20,216,255,0.15),_transparent_50%)] pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#FF3CF8] animate-pulse" />
            <span className="text-[#FF3CF8] text-xs font-bold tracking-[0.3em] uppercase">
              Featured Summit
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 max-w-3xl leading-[1.1] drop-shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
            Global Tech Innovation Symposium 2035
          </h2>
          
          <p className="text-[rgba(255,255,255,0.65)] text-lg md:text-xl font-light max-w-2xl mb-10 transition-transform duration-700 group-hover:-translate-y-2 delay-75">
            Join the brightest minds on campus as we explore the intersection of artificial intelligence, spatial computing, and neuro-interfaces.
          </p>

          <button className="self-start inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#14D8FF] text-[#03040D] font-bold tracking-widest text-xs uppercase overflow-hidden transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_0_30px_rgba(20,216,255,0.4)]">
            <span>Explore Event</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </motion.section>
  );
};

export default FeaturedEvent;
