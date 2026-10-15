import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

export const FacultyCard = ({ person, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
    className="group relative w-full h-[400px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-white/[0.05] via-transparent to-black/40 border border-white/[0.04] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-3xl hover:-translate-y-2 hover:border-sky-400/40 hover:shadow-[0_30px_60px_-15px_rgba(56,189,248,0.2)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
  >
    {/* Inner Image with Parallax Hover */}
    <div className="absolute inset-0 w-full h-full">
      <img 
        src={person.image} 
        alt={person.name} 
        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 saturate-[0.8] contrast-[1.15] brightness-[0.9] opacity-90 group-hover:saturate-100 group-hover:opacity-100"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1000&auto=format&fit=crop'; }}
      />
      {/* Soft gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#03040D] via-[#03040D]/60 to-transparent opacity-90 pointer-events-none" />
    </div>

    {/* Content Container */}
    <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 pointer-events-none">
      <div className="transform transition-transform duration-500 group-hover:-translate-y-2 pointer-events-auto">
        <h3 className="text-2xl font-black text-white tracking-tight mb-1 drop-shadow-md">
          {person.name}
        </h3>
        <p className="text-sky-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 drop-shadow-md">
          {person.role}
        </p>

        {/* Action Button (Email) */}
        <a 
          href={`mailto:${person.email}`}
          className="flex items-center gap-3 w-fit p-3 pr-5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-sky-400/10 hover:border-sky-400/50 hover:scale-105 transition-all duration-500 shadow-xl"
        >
          <div className="w-8 h-8 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Mail size={14} />
          </div>
          <span className="text-white text-[11px] font-bold tracking-wider">
            {person.email}
          </span>
        </a>
      </div>
    </div>
  </motion.div>
);

export default FacultyCard;
