import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Activity, Users, BookOpen, Layers } from 'lucide-react';

const MODULES = [
  {
    id: 1,
    title: 'Advanced Labs',
    category: 'FACILITIES',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    color: '#14D8FF',
    span: 'md:col-span-2 md:row-span-2',
    icon: Activity
  },
  {
    id: 2,
    title: 'AI Research',
    category: 'PROJECTS',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop',
    color: '#FF3CF8',
    span: 'md:col-span-1 md:row-span-1',
    icon: Layers
  },
  {
    id: 3,
    title: 'Student Groups',
    category: 'COMMUNITIES',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
    color: '#14D8FF',
    span: 'md:col-span-1 md:row-span-1',
    icon: Users
  },
  {
    id: 4,
    title: 'Digital Library',
    category: 'RESOURCES',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop',
    color: '#FF3CF8',
    span: 'md:col-span-3 md:row-span-1',
    icon: BookOpen
  }
];

const ModuleCard = ({ data, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(data)}
      className={`group relative rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[rgba(15,20,35,0.65)] backdrop-blur-xl overflow-hidden cursor-pointer shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${data.span} min-h-[300px] flex flex-col`}
      whileHover={{ y: -10, scale: 1.01, transition: { duration: 0.4 } }}
    >
      {/* Dynamic Hover Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
        style={{ background: `radial-gradient(circle at center, ${data.color}20, transparent 70%)` }}
      />
      
      {/* Animated Glowing Border */}
      <div className="absolute inset-0 border-2 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" style={{ borderColor: `${data.color}40` }} />

      {/* Image Cover (Top 65%) */}
      <div className="relative h-[65%] w-full overflow-hidden shrink-0 rounded-t-[28px]">
        <img 
          src={data.image} 
          alt={data.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
        />
        {/* Dark overlay & bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,20,35,1)] via-[rgba(15,20,35,0.2)] to-transparent opacity-100 z-10" />
      </div>

      {/* Floating Content over bottom 35% */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 z-20" style={{ transform: "translateZ(20px)" }}>
        
        <div className="flex items-center gap-2 mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
          <data.icon size={12} style={{ color: data.color }} />
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase" style={{ color: data.color }}>
            {data.category}
          </span>
        </div>

        <h3 className="text-3xl font-bold text-white mb-2 leading-tight drop-shadow-xl transform transition-transform duration-500 group-hover:-translate-y-1">
          {data.title}
        </h3>

        <div className="overflow-hidden h-6">
          <div className="flex items-center gap-2 text-white/60 font-semibold tracking-widest text-[10px] uppercase transform translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-white">
            <span>Access Terminal</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

    </motion.div>
  );
};

const MasonryGrid = ({ onCardClick }) => {
  return (
    <section className="relative z-10 w-full mb-32 px-4 md:px-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-1.5 rounded-full bg-[#14D8FF]" />
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-white/50">Core Systems</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {MODULES.map((mod, i) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.1, ease: "easeOut" }}
            className={`h-full ${mod.span}`}
          >
            <ModuleCard data={mod} onClick={onCardClick} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MasonryGrid;
