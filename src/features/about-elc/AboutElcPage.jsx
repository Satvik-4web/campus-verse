import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Layers, 
  Wrench, 
  Rocket, 
  Cpu, 
  GraduationCap, 
  Users, 
  ExternalLink, 
  Compass, 
  CheckCircle2, 
  Mail,
  Building2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import InteractiveBackground from '../../components/dashboard/InteractiveBackground';
import { ELC_INFO } from '../../data/elc';

const EASE = [0.16, 1, 0.3, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: EASE },
  }),
};

const PILLAR_ICONS = [Layers, Users, Wrench, Rocket];

export const AboutElcPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen min-h-screen text-white font-sans overflow-x-hidden selection:bg-blue-500/30">
      <InteractiveBackground />

      {/* Top Header Bar */}
      <header className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pb-6 pt-8 sm:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-white/70 backdrop-blur-xl transition-all hover:border-blue-400/40 hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Back</span>
            </button>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <Link to="/" className="hover:text-sky-300 transition-colors">Campus Verse</Link>
              <span className="text-white/20">/</span>
              <Link to="/dashboard" className="hover:text-blue-300 transition-colors">Dashboard</Link>
              <span className="text-white/20">/</span>
              <span className="text-blue-400 font-semibold">About ELC</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/faculty"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-xl transition-all hover:border-blue-400/40 hover:text-white"
            >
              <GraduationCap size={14} className="text-blue-400" />
              <span>Faculty Directory</span>
            </Link>

            <div className="flex items-center gap-2.5 rounded-full border border-blue-500/20 bg-blue-950/40 px-4 py-2 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-200">ELC Core Node</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-4 sm:px-10">
        
        {/* ===================== HERO SECTION ===================== */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative overflow-hidden rounded-[2rem] border border-blue-500/20 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-[0_20px_70px_-20px_rgba(14,165,233,0.15)]"
        >
          {/* Subtle top edge glow */}
          <span className="pointer-events-none absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-70" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-blue-950/70 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <Sparkles size={12} className="text-blue-400" />
                <span>Thapar Institute of Engineering & Technology</span>
              </div>

              {/* Title */}
              <h1 className="mt-6 text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white">
                EXPERIENTIAL{' '}
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                  LEARNING CENTRE
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-4 text-lg sm:text-xl font-medium text-sky-200/90 tracking-wide">
                {ELC_INFO.tagline}
              </p>

              {/* Description */}
              <p className="mt-4 text-sm sm:text-base font-light text-slate-300/90 leading-relaxed max-w-2xl">
                {ELC_INFO.description}
              </p>

              {/* Quick Action Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-500/50 bg-blue-600/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] backdrop-blur-xl transition-all hover:bg-blue-600/30 hover:border-blue-400 cursor-pointer active:scale-95"
                >
                  <span>Explore Student Projects</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/faculty"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
                >
                  <Users size={14} />
                  <span>Meet Faculty Mentors</span>
                </Link>
              </div>
            </div>

            {/* Logo Crest Plinth */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl lg:min-w-[300px]">
              <div className="relative flex items-center justify-center h-32 w-48 sm:h-36 sm:w-56 rounded-2xl bg-white/[0.04] p-4 border border-blue-400/20 shadow-[0_0_40px_rgba(59,130,246,0.2)]">
                <img
                  src="./elc-logo.png"
                  alt="ELC Logo"
                  className="h-full w-full object-contain filter drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  onError={(e) => {
                    e.currentTarget.src = './thapar-logo-transparent.png';
                  }}
                />
              </div>
              <div className="mt-4 text-center">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white">TIET Patiala</div>
                <div className="text-[10px] text-blue-300/60 uppercase tracking-widest mt-0.5">Established Excellence</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===================== METRICS STRIP ===================== */}
        <section className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ELC_INFO.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-200">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                {stat.label}
              </div>
              <div className="mt-1 text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </section>

        {/* ===================== THE 4 PILLARS OF ELC ===================== */}
        <section className="mt-20">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Sparkles size={11} className="text-blue-400 animate-pulse" />
              Pedagogical Framework
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Four Pillars of ELC
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl font-light">
              Transforming conventional engineering education into immersive, prototype-driven mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ELC_INFO.pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
              return (
                <motion.div
                  key={pillar.number}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40"
                >
                  <span className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-300 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                        <Icon size={18} />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">
                        Pillar {pillar.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-sky-300/80 uppercase tracking-wider">
                    {pillar.headline}
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ===================== INNOVATION LABORATORIES ===================== */}
        <section className="mt-20">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Building2 size={11} className="text-sky-400" />
              State-of-the-Art Infrastructure
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Specialized Innovation Laboratories
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl font-light">
              World-class bays equipped for fabrication, robotics, IoT, automotive engineering, and spatial computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ELC_INFO.labs.map((lab, i) => (
              <motion.div
                key={lab.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl transition-all duration-300 hover:border-sky-400/40 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-sky-400/30 bg-sky-950/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-sky-300">
                    {lab.badge}
                  </span>
                  <Cpu size={15} className="text-white/30 group-hover:text-sky-300 transition-colors" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  {lab.name}
                </h3>
                <p className="mt-2 text-xs text-slate-300 font-light leading-relaxed">
                  {lab.desc}
                </p>

                <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {lab.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/60 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================== ACADEMIC LEADERSHIP ===================== */}
        <section className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Users size={11} className="text-blue-400" />
                Mentorship & Guidance
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                ELC Academic Leadership
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xl font-light">
                Visionary leadership steering experiential learning, venture incubation, and multi-disciplinary engineering.
              </p>
            </div>

            <Link
              to="/faculty"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-blue-400/50 hover:bg-white/10 transition-all self-start sm:self-auto cursor-pointer"
            >
              <span>View All 30+ Faculty</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ELC_INFO.leadership.map((leader, i) => (
              <motion.div
                key={leader.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="h-full w-full object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {leader.name}
                    </h3>
                    <div className="text-xs font-semibold text-blue-400 mt-0.5">
                      {leader.role}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={`mailto:${leader.email}`}
                    className="inline-flex items-center gap-1.5 text-[11px] text-white/50 hover:text-white transition-colors"
                  >
                    <Mail size={12} className="text-blue-400" />
                    <span>{leader.email}</span>
                  </a>
                  <span className="text-[9px] uppercase tracking-wider text-white/30 font-medium">TIET</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===================== FOOTER CALL TO ACTION ===================== */}
        <section className="mt-20 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-blue-950/40 p-8 sm:p-12 text-center backdrop-blur-2xl">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Experience ELC Live in Virtual Reality
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Walk through the ELC labs, inspect student-built prototypes in 3D, and interact with the physical kiosk directly on campus.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-blue-400 bg-blue-600 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] active:scale-95 cursor-pointer"
              >
                <span>Browse ELC Projects</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
              >
                <Compass size={14} />
                <span>Return to Hub</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AboutElcPage;
