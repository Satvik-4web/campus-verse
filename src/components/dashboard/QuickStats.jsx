import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Microscope, FlaskConical, Server } from 'lucide-react';

const STATS_DATA = [
  { id: 1, label: 'Upcoming Events', value: '24', icon: Calendar, color: '#14D8FF', trend: '+12%' },
  { id: 2, label: 'Research Projects', value: '156', icon: Microscope, color: '#FF3CF8', trend: '+4%' },
  { id: 3, label: 'Active Labs', value: '42', icon: FlaskConical, color: '#14D8FF', trend: 'Stable' },
  { id: 4, label: 'Resources', value: '8.4k', icon: Server, color: '#FF3CF8', trend: '+22%' },
];

const QuickStats = () => {
  return (
    <section className="relative z-10 w-full mb-24 px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS_DATA.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 + 0.5, ease: "easeOut" }}
            className="group relative bg-[rgba(15,20,35,0.65)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-[20px] p-6 overflow-hidden hover:-translate-y-2 transition-transform duration-500 cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Hover Glow */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle at top right, ${stat.color}15, transparent 70%)` }}
            />
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10" style={{ color: stat.color }}>
                {stat.trend}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-4xl font-black text-white mb-1 tracking-tight">{stat.value}</h3>
              <p className="text-[rgba(255,255,255,0.55)] text-xs font-semibold tracking-widest uppercase">
                {stat.label}
              </p>
            </div>

            {/* Decorative Mini Graph (Abstract lines) */}
            <div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                <path 
                  d={`M0,30 Q20,10 40,20 T80,10 T100,20 L100,30 L0,30 Z`} 
                  fill={`url(#gradient-${stat.id})`} 
                />
                <defs>
                  <linearGradient id={`gradient-${stat.id}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={stat.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={stat.color} stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default QuickStats;
