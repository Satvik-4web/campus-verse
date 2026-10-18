import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Users, 
  Wrench, 
  Rocket, 
  CheckCircle2, 
  ExternalLink,
  GraduationCap,
  Cpu,
  Mail
} from 'lucide-react';
import { ELC_INFO } from '../../../data/elc';

const EASE = [0.16, 1, 0.3, 1];
const PILLAR_ICONS = [Layers, Users, Wrench, Rocket];

export const AboutElcDrawer = ({ onBack, onExploreProjects, onOpenFullPage }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="about-elc"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative flex flex-col items-center pointer-events-auto w-full px-4"
    >
      {/* Top Action Bar */}
      <div className="w-full max-w-6xl mt-4 sm:mt-6 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/70 backdrop-blur-xl transition-all hover:border-blue-400/40 hover:text-white cursor-pointer active:scale-95"
        >
          <ArrowLeft size={14} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Back to Destinations</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onExploreProjects}
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-900/30 px-4 py-2 text-blue-200 backdrop-blur-xl transition-all hover:border-blue-400 hover:bg-blue-800/40 hover:text-white cursor-pointer active:scale-95 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Projects Dashboard</span>
            <ArrowRight size={13} />
          </button>

          <button
            type="button"
            onClick={onOpenFullPage}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-white/60 backdrop-blur-xl transition-all hover:border-white/20 hover:text-white cursor-pointer active:scale-95"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Full Page</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Hero & Overview Section */}
      <div className="w-full max-w-6xl mt-6 sm:mt-8 grid grid-cols-1 landscape:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        {/* Left Column: Mission & Identity */}
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-blue-300 [text-shadow:_0_0_8px_rgb(59_130_246_/_50%)]">
              EXPERIENTIAL LEARNING CENTRE
            </span>
          </span>

          <h2 className="mt-1 bg-gradient-to-b from-white via-blue-200 to-blue-500 bg-clip-text text-4xl font-black leading-tight tracking-tighter text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.4)] sm:text-5xl uppercase">
            ABOUT ELC
          </h2>

          <p className="text-base sm:text-lg font-medium text-sky-200/90 leading-snug">
            {ELC_INFO.tagline}
          </p>

          <p className="text-[13px] sm:text-[14px] font-light leading-relaxed text-slate-300 max-w-xl">
            {ELC_INFO.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreProjects}
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-xl border border-blue-400 bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(59,130,246,0.6)] transition-all hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.8)] cursor-pointer active:scale-95"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span>Explore ELC Projects</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/faculty')}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl transition-all hover:border-blue-400/40 hover:bg-white/[0.08] hover:text-white cursor-pointer active:scale-95"
            >
              <Users size={14} className="text-blue-400" />
              <span>Faculty Mentors</span>
            </button>
          </div>
        </div>

        {/* Right Column: ELC Crest Plinth */}
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-b from-blue-950/30 via-slate-900/60 to-black/80 p-8 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center text-center">
          <span className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_50%,rgba(59,130,246,0.18),transparent_70%)]" />

          <div className="relative flex items-center justify-center h-36 w-36 sm:h-44 sm:w-44 rounded-2xl bg-white/[0.03] p-5 border border-blue-400/20 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
            <img
              src="./elc-logo.png"
              alt="ELC Logo"
              className="h-full w-full object-contain filter drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]"
              onError={(e) => {
                e.currentTarget.src = './thapar-logo-transparent.png';
              }}
            />
          </div>

          <h3 className="mt-5 text-lg font-bold tracking-tight text-white uppercase">
            Experiential Learning Centre
          </h3>
          <p className="text-xs text-blue-300 font-mono tracking-widest uppercase mt-0.5">
            TIET Patiala • Established Excellence
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-6 grid grid-cols-2 gap-3 w-full">
            {ELC_INFO.stats.slice(0, 4).map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-sky-200">
                  {s.value}
                </div>
                <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The 4 Pillars */}
      <div className="w-full max-w-6xl mt-14 sm:mt-16 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Sparkles size={11} className="text-blue-400 animate-pulse" />
            Pedagogical Core
          </span>
          <h3 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
            The 4 Pillars of Experiential Learning
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg font-light leading-relaxed">
            Transitioning engineering students from classroom theory to tangible physical building and commercial innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          {ELC_INFO.pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] || Layers;
            return (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.04] hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.3)]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs font-bold tracking-[0.25em] text-blue-400">
                    PILLAR {pillar.number}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-400">
                    <Icon size={18} />
                  </div>
                </div>

                <h4 className="mt-3 text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                  {pillar.title}
                </h4>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-400/80 mt-0.5">
                  {pillar.headline}
                </div>

                <p className="mt-2.5 text-xs text-slate-300 font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Innovation Labs Strip */}
      <div className="w-full max-w-6xl mt-14 sm:mt-16 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Cpu size={11} className="text-sky-400 animate-pulse" />
            Fabrication & Research
          </span>
          <h3 className="mt-3 text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
            Specialized ELC Laboratories
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-lg font-light leading-relaxed">
            Industrial-grade equipment and advanced computational platforms open to all multidisciplinary teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {ELC_INFO.labs.map((lab) => (
            <div
              key={lab.name}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">
                  {lab.badge}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
              </div>
              <h5 className="text-base font-bold text-white group-hover:text-blue-100 transition-colors">
                {lab.name}
              </h5>
              <p className="mt-2 text-xs text-slate-400 font-light leading-relaxed">
                {lab.desc}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {lab.tools.map((t) => (
                  <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[9px] font-mono text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Preview */}
      <div className="w-full max-w-6xl mt-14 sm:mt-16 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <GraduationCap size={12} className="text-blue-400" />
            Leadership
          </span>
          <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
            ELC Academic Leadership
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
          {ELC_INFO.leadership.map((leader) => (
            <div
              key={leader.name}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-xl"
            >
              <img
                src={leader.image}
                alt={leader.name}
                className="h-14 w-14 rounded-xl object-cover border border-blue-400/30 shadow-md shrink-0 bg-slate-900"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=400&auto=format&fit=crop';
                }}
              />
              <div className="min-w-0">
                <h6 className="text-sm font-bold text-white truncate">{leader.name}</h6>
                <p className="text-[11px] font-medium text-blue-400 uppercase tracking-wider">{leader.role}</p>
                <a 
                  href={`mailto:${leader.email}`} 
                  className="inline-flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-white mt-1 transition-colors"
                >
                  <Mail size={10} />
                  <span className="truncate">{leader.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Call-to-action */}
      <div className="w-full max-w-6xl mt-16 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[2rem] border border-blue-500/30 bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-blue-950/70 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(59,130,246,0.3)]">
        <div>
          <h4 className="text-xl sm:text-2xl font-black text-white">
            Ready to explore student innovations?
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
            Browse capstones, summer internships, startup incubations, and departmental projects.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onExploreProjects}
            className="flex items-center gap-2 rounded-full border border-blue-400 bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] cursor-pointer active:scale-95 transition-all"
          >
            <span>Launch Dashboard</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Drawer Footer */}
      <footer className="w-full py-6 border-t border-white/[0.05] bg-slate-950/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col landscape:md:flex-row items-center justify-between gap-4">
          <span className="text-slate-500 text-xs font-light tracking-wide select-none">
            © 2026 Experiential Learning Centre • Thapar Institute of Engineering & Technology
          </span>
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-medium text-slate-400">
            <button 
              type="button"
              onClick={onBack}
              className="py-1 px-1 transition-colors duration-300 hover:text-blue-400 cursor-pointer"
            >
              Destinations
            </button>
            <button 
              type="button"
              onClick={onExploreProjects}
              className="py-1 px-1 transition-colors duration-300 hover:text-blue-400 cursor-pointer"
            >
              Projects Dashboard
            </button>
            <button 
              type="button"
              onClick={() => navigate('/faculty')}
              className="py-1 px-1 transition-colors duration-300 hover:text-blue-400 cursor-pointer"
            >
              Faculty Directory
            </button>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default AboutElcDrawer;
