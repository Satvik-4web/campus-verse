import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Settings, User } from 'lucide-react';

const TopNav = () => {
  const navItems = ['Dashboard', 'Events', 'Labs', 'Projects', 'Resources', 'About'];

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between"
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2 cursor-pointer group">
        <div className="w-8 h-8 rounded-full bg-[#14D8FF]/10 border border-[#14D8FF]/30 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#14D8FF] opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
          <span className="text-[#14D8FF] font-bold text-xs tracking-widest relative z-10">CV</span>
        </div>
        <span className="font-bold tracking-widest uppercase text-white/90 group-hover:text-white transition-colors">
          CampusVerse
        </span>
      </div>

      {/* Center: Navigation Pills */}
      <div className="hidden lg:flex items-center gap-1 bg-[rgba(15,20,35,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] p-1.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {navItems.map((item, i) => (
          <button 
            key={item}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
              i === 0 
                ? 'bg-white/10 text-white shadow-inner border border-white/5' 
                : 'text-[rgba(255,255,255,0.55)] hover:text-white hover:bg-white/5'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Right: Search & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Floating Command Palette (Search) */}
        <div className="relative group hidden md:block">
          <div className="absolute inset-0 bg-[#14D8FF]/5 blur-lg group-hover:bg-[#14D8FF]/15 transition-colors rounded-full" />
          <div className="relative flex items-center gap-3 bg-[rgba(15,20,35,0.65)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] rounded-full px-4 py-2 cursor-text hover:border-[#14D8FF]/40 transition-colors">
            <Search size={14} className="text-[#14D8FF]" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none text-white text-xs font-medium w-48 placeholder:text-[rgba(255,255,255,0.3)]"
            />
            <div className="px-2 py-0.5 rounded-md bg-white/5 text-[rgba(255,255,255,0.55)] text-[10px] font-mono border border-white/10">
              ⌘K
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          <button className="text-[rgba(255,255,255,0.55)] hover:text-[#14D8FF] transition-colors relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF3CF8] shadow-[0_0_8px_#FF3CF8]" />
          </button>
          <button className="text-[rgba(255,255,255,0.55)] hover:text-white transition-colors">
            <Settings size={18} />
          </button>
        </div>

        {/* Profile */}
        <div className="relative cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#14D8FF] to-[#FF3CF8] p-[2px]">
            <div className="w-full h-full rounded-full bg-[#03040D] flex items-center justify-center overflow-hidden">
              <User size={16} className="text-white/80 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          {/* Online Indicator */}
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#14D8FF] border-2 border-[#03040D] shadow-[0_0_10px_#14D8FF]" />
        </div>

      </div>
    </motion.nav>
  );
};

export default TopNav;
