import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import KioskModel from '../../components/about/KioskModel';
import { TeamCardsGrid } from '../../components/TeamModal';
import { media } from '../../services/media/media';

const EASE = [0.16, 1, 0.3, 1];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const Panel = ({ accent = '#38bdf8', className = '', children }) => (
  <motion.div
    variants={reveal}
    style={{ '--accent': accent }}
    className={`group relative overflow-hidden rounded-[1.75rem] border border-white/10 p-8 backdrop-blur-2xl
                bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-white/[0.01]
                shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.10)]
                transition-[border-color,box-shadow] duration-700
                hover:border-[var(--accent)]/40 hover:shadow-[0_0_60px_-18px_var(--accent),inset_0_1px_0_0_rgba(255,255,255,0.16)]
                sm:p-10 ${className}`}
  >
    <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent" />
    <span
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(125,211,252,0.11) 1px, transparent 0)',
        backgroundSize: '22px 22px',
        maskImage: 'linear-gradient(to bottom, black, transparent 70%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 70%)',
      }}
    />
    {['left-3 top-3 border-l border-t', 'right-3 top-3 border-r border-t',
      'left-3 bottom-3 border-l border-b', 'right-3 bottom-3 border-r border-b'].map((pos) => (
      <span
        key={pos}
        className={`pointer-events-none absolute hidden h-3.5 w-3.5 rounded-[3px] border-sky-300/20 transition-colors duration-700 group-hover:border-[var(--accent)]/60 sm:block ${pos}`}
      />
    ))}
    <div className="relative z-10">{children}</div>
  </motion.div>
);

const PILLARS = [
  {
    n: '01',
    title: 'Bridging theory and practice',
    body: 'Students take an idea past the lecture hall and build the thing itself.',
  },
  {
    n: '02',
    title: 'Creative freedom',
    body: 'Equipment, space and mentorship to take on problems without a known answer.',
  },
];

export const AboutPage = () => (
  <div className="relative w-screen min-h-screen bg-[#040a18] text-white font-sans overflow-x-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 z-0 h-full w-full object-cover opacity-[0.5] saturate-[0.75]"
    >
      <source src={media('/about_bg.mp4')} type="video/mp4" />
    </video>

    <div className="fixed inset-0 z-0 bg-[#0b2545]/30 mix-blend-color" />
    <div className="fixed inset-0 z-0 bg-gradient-to-r from-[#040a18] via-[#040a18]/75 to-[#040a18]/10" />
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#040a18] via-transparent to-[#040a18]" />

    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-10 sm:px-8 sm:py-12">
      {/* Top Bar with Hub and Projects Navigation */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-white/50 backdrop-blur-xl transition-colors hover:border-sky-400/40 hover:text-white"
        >
          <ArrowLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Back to hub</span>
        </Link>

        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-4 py-2 text-sky-300 backdrop-blur-xl transition-all hover:border-sky-400 hover:text-white hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Projects Dashboard</span>
          <ArrowRight size={14} className="transition-transform duration-500 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

      <motion.header
        initial="hidden"
        animate="visible"
        variants={reveal}
        className="mt-10 max-w-3xl sm:mt-14"
      >
        <span className="flex items-center gap-3">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400/60" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-sky-300/80">About us</span>
        </span>

        <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Campus Verse
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed text-slate-400 sm:text-base">
          A spatially accurate digital twin of Thapar Institute, streamed as geometry rather than
          video — so the campus can be walked from a browser, a phone, or a headset.
        </p>
      </motion.header>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.14 }}
        className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 landscape:grid-cols-[1.05fr_1fr] landscape:items-start landscape:gap-12"
      >
        <div className="flex flex-col gap-6 sm:gap-8">
          <Panel>
            <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">Our mission</h2>
            <p className="mt-5 text-[15px] font-light leading-relaxed text-slate-300">
              An immersive <span className="font-medium text-sky-300">spatial computing platform</span>{' '}
              bridging the physical and digital campus. Cutting-edge VR delivers 360-degree
              explorations of campus life.
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-slate-500">
              Turning passive observation into active engagement.
            </p>
          </Panel>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <Panel key={p.n} className="sm:p-8">
                <span className="font-mono text-xs font-semibold tracking-widest text-sky-400/80">
                  {p.n}
                </span>
                <h3 className="mt-3 text-base font-semibold text-slate-100">{p.title}</h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-slate-400">{p.body}</p>
              </Panel>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[500px]">
            <KioskModel />
          </div>
        </div>
      </motion.div>

      {/* Core Team Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={reveal}
        className="mt-20 flex flex-col items-center w-full"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <span className="flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Sparkles size={11} className="text-sky-400 animate-pulse" />
            Core Development Team
          </span>

          <h2 className="mt-3 bg-gradient-to-b from-white via-sky-200 to-sky-500 bg-clip-text text-3xl sm:text-4xl font-black tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] uppercase">
            The Minds Behind Campus Verse
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl font-light leading-relaxed">
            Engineered for interactive spatial computing, tactile physical kiosk integration, and wireless Meta Quest 3 hardware synchronization.
          </p>
        </div>

        <TeamCardsGrid />
      </motion.section>
    </div>
  </div>
);

export default AboutPage;
