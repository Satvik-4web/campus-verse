import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import KioskModel from '../components/about/KioskModel';
import { media } from '../lib/media';

const EASE = [0.16, 1, 0.3, 1];

/** Shared reveal, so every block on the page arrives the same way. */
const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/**
 * Glass panel matching the language established on the landing hub: hairline
 * top edge, dot grid faded toward the base, corner brackets, and every glow
 * derived from a single --accent so a panel can be retinted in one place.
 */
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

const About = () => (
  <div className="relative w-screen min-h-screen bg-[#040a18] text-white font-sans overflow-x-hidden">
    {/* Atmosphere. The clip used to run at 50% with a single gradient, which
        left faces competing with the copy for attention — it is desaturated,
        dimmed and vignetted here so it reads as depth behind the page. */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed inset-0 z-0 h-full w-full object-cover opacity-[0.5] saturate-[0.75]"
    >
      <source src={media('/about_bg.mp4')} type="video/mp4" />
    </video>

    {/* Cool tint, so the footage sits inside the navy rather than beside it */}
    <div className="fixed inset-0 z-0 bg-[#0b2545]/30 mix-blend-color" />

    {/* Directional scrim rather than a global dim. Darkening the whole frame
        enough to make the copy legible also erased the footage; this weights
        the shadow to the left, where the text column lives, and lets the right
        side stay bright behind the kiosk. */}
    <div className="fixed inset-0 z-0 bg-gradient-to-r from-[#040a18] via-[#040a18]/75 to-[#040a18]/10" />

    {/* Top and bottom blend into the page background */}
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#040a18] via-transparent to-[#040a18]" />

    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 py-10 sm:px-8 sm:py-12">

      {/* Back */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: EASE }}>
        <Link
          to="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-white/50 backdrop-blur-xl transition-colors hover:border-sky-400/40 hover:text-white"
        >
          <ArrowLeft size={14} className="transition-transform duration-500 group-hover:-translate-x-0.5" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Back to hub</span>
        </Link>
      </motion.div>

      {/* Header — the weights were inverted before: a light 6xl "ABOUT US" over
          a heavier, smaller product name. The name carries the page now. */}
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

      {/* Body */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.14 }}
        className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:gap-12"
      >
        {/* Left column */}
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

          <Panel accent="#3b82f6">
            <h2 className="flex items-center gap-3 text-xl font-semibold text-slate-100 sm:text-2xl">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
              Powered by ELC
            </h2>
            <p className="mt-5 text-[15px] font-light leading-relaxed text-slate-300">
              A flagship ECED initiative dedicated to hands-on innovation and experiential learning.
            </p>

            <div className="mt-8 flex flex-col gap-6">
              {PILLARS.map(({ n, title, body }) => (
                <div key={n} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] font-mono text-[11px] tracking-widest text-sky-300/80">
                    {n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-slate-100">{title}</h3>
                    <p className="mt-1 text-[13px] font-light leading-relaxed text-slate-500">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Was a solid cyan block, which read as a stock form button next to
              all this glass. Same pill language as the landing page now. */}
          <motion.div variants={reveal}>
            <Link
              to="/dashboard"
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-sky-500/40 bg-sky-900/20 px-8 py-4 text-sky-200 shadow-[0_0_24px_-6px_rgba(56,189,248,0.35)] transition-shadow duration-500 hover:text-white hover:shadow-[0_0_46px_-4px_rgba(56,189,248,0.75)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-400/25 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
              <span className="relative z-10 text-[11px] font-semibold uppercase tracking-[0.28em]">
                Explore dashboard
              </span>
              <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right column — the kiosk is a model of the real, physically white
            unit, so instead of recolouring it, it gets a lit plinth to stand on
            and stops looking pasted onto the dark page. */}
        <motion.div variants={reveal} className="relative">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl">
            <span className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
            {/* Pool of light the unit stands in */}
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_58%,rgba(56,189,248,0.16),transparent_70%)]" />

            <div className="relative h-[420px] w-full sm:h-[560px] lg:h-[640px]">
              <KioskModel />
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] px-6 py-4">
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Campus Verse kiosk
              </span>
              <span className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-sky-300/70">
                <span className="h-1 w-1 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                On campus
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

export default About;
