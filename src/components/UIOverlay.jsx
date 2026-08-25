import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Map, Cpu, ArrowRight } from 'lucide-react';
import { ElcMark, CampusVerseMark, VrGamesMark } from './BrandMarks';
import KioskModel from './about/KioskModel';
import { useKioskBridge } from '../hooks/useKioskBridge';
import { VRLaunchOverlay } from './VRLaunchOverlay';

const EASE = [0.16, 1, 0.3, 1];

/**
 * The destination hub.
 *
 * These used to be <Html> panels parented to points in the 3D scene, which is
 * why the layout fell apart: their spacing was measured in world units, so it
 * changed with the camera and the viewport and they ran off the edges on
 * anything narrow. They are ordinary DOM now — a real responsive grid — while
 * their entrance is still driven straight off the scroll value, so they stay
 * locked to the same gesture that dissolves the headset.
 */
const HUB = [
  {
    id: 'elc',
    title: 'E L C',
    caption: 'Experiential Learning Centre',
    meta: 'Home of the initiative',
    status: 'Open',
    cta: 'Discover',
    accent: '#3b82f6',
    Mark: ElcMark,
  },
  {
    id: 'campus',
    title: 'CAMPUS VERSE',
    caption: 'Explore. Experience. Discover.',
    meta: 'Walk the digital twin',
    status: 'Live',
    cta: 'Enter',
    accent: '#38bdf8',
    featured: true,
    Mark: CampusVerseMark,
  },
  {
    id: 'vr',
    title: 'VR GAMES',
    caption: 'Immersive Arcade',
    meta: 'Built for headsets',
    status: 'In build',
    // No VR route exists yet, so this deliberately goes nowhere rather than
    // dropping people somewhere unrelated.
    cta: 'Coming soon',
    accent: '#67e8f9',
    Mark: VrGamesMark,
  },
];

const HubCard = ({ card, index, smoothScroll, interactive, onSelect }) => {
  // Each card leans into its own slice of the scroll, which is what produces
  // the stagger — and because it is a scrub rather than a timed animation, it
  // runs backwards perfectly when you scroll back up.
  const start = 0.58 + index * 0.06;
  const opacity = useTransform(smoothScroll, [start, start + 0.2], [0, 1]);
  const y = useTransform(smoothScroll, [start, start + 0.28], [80, 0]);
  const scale = useTransform(smoothScroll, [start, start + 0.28], [0.9, 1]);
  const blurPx = useTransform(smoothScroll, [start, start + 0.24], [14, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Cursor-tracked highlight, so the light source belongs to the room rather
  // than to the element.
  const px = useSpring(0, { stiffness: 260, damping: 32 });
  const py = useSpring(0, { stiffness: 260, damping: 32 });
  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${px}px ${py}px, color-mix(in srgb, var(--accent) 22%, transparent), transparent 72%)`;

  const track = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };

  const { Mark } = card;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.96 }}
      onMouseMove={track}
      style={{ opacity, y, scale, filter, '--accent': card.accent, pointerEvents: interactive ? 'auto' : 'none' }}
      className={`group relative flex h-[104px] w-full flex-row items-center gap-5 overflow-hidden
                  rounded-[1.5rem] border p-5 text-left backdrop-blur-2xl
                  bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-white/[0.01]
                  shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.10)]
                  transition-[transform,border-color,box-shadow] duration-700 ease-out
                  hover:-translate-y-2
                  hover:shadow-[0_0_70px_-12px_var(--accent),inset_0_1px_0_0_rgba(255,255,255,0.18)]
                  sm:h-[380px] sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[1.75rem] sm:p-7
                  ${card.featured ? 'border-sky-400/25' : 'border-white/10'} hover:border-[var(--accent)]/50`}
    >
      {/* Engineering dot grid, faded out toward the base */}
      <span
        className="pointer-events-none absolute inset-0 hidden opacity-70 sm:block"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(125,211,252,0.13) 1px, transparent 0)',
          backgroundSize: '22px 22px',
          maskImage: 'linear-gradient(to bottom, black, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent 72%)',
        }}
      />

      {/* Cursor spotlight */}
      <motion.span
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Accent bar along the top of the primary card */}
      {card.featured && (
        <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" />
      )}

      {/* Corner brackets: reads as a targeting reticle, ties into the HUD language */}
      {['left-3 top-3 border-l border-t', 'right-3 top-3 border-r border-t',
        'left-3 bottom-3 border-l border-b', 'right-3 bottom-3 border-r border-b'].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute hidden h-3.5 w-3.5 rounded-[3px] border-sky-300/20 transition-colors duration-700 group-hover:border-[var(--accent)]/70 sm:block ${pos}`}
        />
      ))}

      {/* Index + status */}
      <span className="relative z-10 hidden items-center justify-between sm:flex">
        <span className="font-mono text-[11px] tracking-[0.3em] text-sky-300/45 transition-colors duration-700 group-hover:text-[var(--accent)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          <span className="h-1 w-1 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
          {card.status}
        </span>
      </span>

      {/* Mark, framed so it sits in something instead of floating in dead space */}
      <span className="relative z-10 flex shrink-0 items-center justify-center sm:flex-1 sm:py-4">
        <span className="relative flex items-center justify-center rounded-[1.25rem] border border-white/[0.06] bg-white/[0.02] p-3 transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.04] sm:p-7">
          <span className="pointer-events-none absolute inset-0 rounded-[1.25rem] bg-[var(--accent)] opacity-[0.07] blur-2xl transition-opacity duration-700 group-hover:opacity-20" />
          <span className="relative" style={{ filter: 'drop-shadow(0 0 20px color-mix(in srgb, var(--accent) 55%, transparent))' }}>
            <Mark size={card.id === 'elc' ? 118 : 98} />
          </span>
        </span>
      </span>

      {/* Left-aligned block at the base: the editorial rhythm that stops every
          card reading as the same centred stack. */}
      <span className="relative z-10 flex min-w-0 flex-col">
        <span className="text-[15px] font-semibold leading-tight tracking-[0.16em] text-white sm:text-[21px]">
          {card.title}
        </span>

        <span className="mt-1.5 text-[10px] font-light tracking-[0.1em] text-slate-400 sm:mt-2 sm:text-[11px]">
          {card.caption}
        </span>

        <span className="my-5 hidden h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent sm:block" />

        <span className="hidden items-center justify-between sm:flex">
          <span className="flex flex-col">
            <span className="truncate whitespace-nowrap text-[8px] uppercase tracking-[0.24em] text-slate-600">{card.meta}</span>
            <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {card.cta}
            </span>
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-700 group-hover:border-[var(--accent)]/60 group-hover:bg-[var(--accent)]/15">
            <ArrowRight size={13} className="text-slate-400 transition-all duration-700 group-hover:translate-x-0.5 group-hover:text-white" />
          </span>
        </span>
      </span>
    </motion.button>
  );
};

const UIOverlay = ({ menuState, activeView, setActiveView, smoothScroll }) => {
  const { isVRLoading, vrError, launchCampusTours } = useKioskBridge();
  const navigate = useNavigate();

  // Motion values drive the visuals; this only gates clicks, so the panels
  // cannot be pressed while they are still faded out and drifting in.
  const [hubReady, setHubReady] = useState(false);
  useMotionValueEvent(smoothScroll, 'change', (v) => {
    const next = v > 0.76;
    if (next !== hubReady) setHubReady(next);
  });

  const hubLabelOpacity = useTransform(smoothScroll, [0.5, 0.66], [0, 1]);
  const hubLabelY = useTransform(smoothScroll, [0.5, 0.66], [24, 0]);

  const onHubSelect = (id) => {
    if (id === 'elc') navigate('/about');
    else if (id === 'campus') setActiveView('about');
  };

  return (
    <>
      <VRLaunchOverlay isVisible={isVRLoading} vrError={vrError} />
      <div 
        className={`absolute inset-0 z-20 flex flex-col font-sans tracking-wide select-none [-webkit-tap-highlight-color:transparent] ${
          activeView === 'about' 
            ? 'pointer-events-auto overflow-y-auto p-6 sm:p-10 scroll-smooth touch-pan-y [&::-webkit-scrollbar]:hidden' 
            : 'pointer-events-none justify-between p-6 sm:p-10'
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Header / Logos */}
        <header className="flex justify-between items-start pointer-events-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="flex flex-col gap-1 group cursor-pointer"
            onClick={() => setActiveView('home')}
          >
            {/* Transparent Logo with clean hover interaction */}
            <div className="flex items-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <img
                src="/thapar-logo-transparent.png"
                alt="Thapar Institute Logo"
                className="h-12 w-auto object-contain pointer-events-auto sm:h-16"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="flex items-center gap-4"
          >
            <div className="flex flex-col items-end text-right">
              <h2 className="text-sm font-medium tracking-[0.3em] text-white">
                CAMPUS<span className="font-bold text-[#38bdf8]">VERSE</span>
              </h2>
              <p className="text-[8px] text-[#38bdf8]/60 tracking-[0.2em] uppercase mt-1">Explore. Experience. Discover.</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#38bdf8]/40 bg-[#38bdf8]/10 box-glow">
              <div className="w-4 h-1 bg-[#38bdf8] rounded-full shadow-[0_0_10px_#38bdf8]"></div>
            </div>
          </motion.div>
        </header>

        {/* Main Content Area */}
        <div className={`relative flex-1 w-full pointer-events-none ${
          activeView === 'about' ? 'flex flex-col items-center' : 'flex items-center justify-center mt-10'
        }`}>
          {/* Destination hub — scrubbed by scroll, so it is part of the same
              motion as the headset dissolving rather than a separate reveal. */}
          {activeView === 'home' && (
            <div className="w-full max-w-[1120px] px-2 sm:px-4">
              <motion.div
                style={{ opacity: hubLabelOpacity, y: hubLabelY }}
                className="mb-7 flex flex-col items-center sm:mb-10"
              >
                <span className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400/50 sm:w-16" />
                  <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-sky-300/80">
                    Select a destination
                  </span>
                  <span className="h-px w-10 bg-gradient-to-l from-transparent to-sky-400/50 sm:w-16" />
                </span>
                <span className="mt-3 text-[11px] font-light tracking-[0.06em] text-slate-500">
                  Three ways into the digital twin
                </span>
              </motion.div>

              <div className="grid grid-cols-1 gap-4 landscape:sm:grid-cols-3 sm:gap-6 lg:gap-8">
                {HUB.map((card, i) => (
                  <HubCard
                    key={card.id}
                    card={card}
                    index={i}
                    smoothScroll={smoothScroll}
                    interactive={hubReady}
                    onSelect={() => onHubSelect(card.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {activeView === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative flex flex-col items-center pointer-events-auto w-full px-4"
              >
                {/* Two columns: the pitch on the left, the physical kiosk on the
                    right. It was two generic bento boxes stacked over a button,
                    which said little and showed nothing. */}
                <div className="mb-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 landscape:grid-cols-[1fr_0.85fr] landscape:gap-12 mt-8 lg:mt-12">

                  {/* Copy */}
                  <div className="flex flex-col">
                    <span className="flex items-center gap-3">
                      <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-sky-300 [text-shadow:_0_0_8px_rgb(56_189_248_/_50%)]">
                        THE DIGITAL TWIN
                      </span>
                    </span>

                    <h2 className="mt-3 bg-gradient-to-br from-white via-sky-100 to-sky-400 bg-clip-text text-4xl font-black leading-tight tracking-tighter text-transparent sm:text-5xl uppercase">
                      ABOUT CAMPUS VERSE
                    </h2>

                    <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed text-slate-300">
                      A spatially accurate replica of the institute, streamed as geometry rather than
                      video — walkable from a browser, a phone, or the kiosk standing on campus.
                    </p>

                    <div className="mt-5 flex flex-col gap-3">
                      {[
                        ['THE VISION', 'Immersive Spatial Computing', 'One model behind every tour, lab and event, so walking out of a hall puts you in the quad that actually adjoins it.'],
                        ['CORE TECHNOLOGY', 'Zero-Install WebGL', 'A React Three Fiber pipeline streams the twin straight to the browser — no download, no plugin, nothing to keep updated.'],
                      ].map(([eyebrow, title, body]) => (
                        <div key={title} className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.01] p-4 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-sky-500/30 hover:bg-white/[0.03]">
                          <div className="absolute -inset-px bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                          <div className="relative z-10 flex gap-4">
                            <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-sky-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
                            <div className="min-w-0">
                              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-sky-400/90">{eyebrow}</div>
                              <h3 className="mt-1 text-lg font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-sky-200">{title}</h3>
                              <p className="mt-1.5 text-[13px] font-light leading-relaxed text-slate-400">{body}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* The kiosk itself, on its lit plinth */}
                  <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl">
                    <span className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
                    <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_58%,rgba(56,189,248,0.16),transparent_70%)]" />

                    <div className="relative h-[300px] w-full sm:h-[380px] lg:h-[440px]">
                      <KioskModel />
                    </div>

                    <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                        Campus Verse kiosk
                      </span>
                      <span className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-sky-300/70">
                        <span className="h-1 w-1 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                        Drag to inspect
                      </span>
                    </div>
                  </div>

                  {/* Explore button placed at the very bottom on portrait */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveView('explore')}
                    className="landscape:col-span-2 group relative mt-2 flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full border border-sky-500/50 bg-sky-900/30 px-8 py-4 text-sky-100 shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)] transition-shadow duration-500 hover:text-white hover:shadow-[0_0_50px_-5px_rgba(56,189,248,0.8)] mx-auto"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
                    <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.25em]">Explore Campus Verse</span>
                    <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
                  </motion.button>
                </div>

                {/* Premium Minimalist Footer */}
                <footer className="w-full mt-16 py-6 border-t border-white/[0.05] bg-slate-950/20 backdrop-blur-sm relative z-10">
                  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left Section (Branding & Copyright) */}
                    <span className="text-slate-500 text-sm font-light tracking-wide select-none">
                      © 2026 Campus Verse. All rights reserved.
                    </span>

                    {/* Right Section (Professional Navigation & Team Link) */}
                    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-sm font-medium text-slate-400">
                      <motion.button whileTap={{ scale: 0.96 }} className="py-2 px-1 transition-colors duration-300 hover:text-sky-400">
                        Privacy Policy
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.96 }} className="py-2 px-1 transition-colors duration-300 hover:text-sky-400">
                        Terms
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.96 }} className="py-2 px-1 transition-colors duration-300 hover:text-sky-400">
                        About Team of Campus Verse
                      </motion.button>
                    </div>
                  </div>
                </footer>
              </motion.div>
            )}

            {activeView === 'explore' && (
              <motion.div
                key="explore"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-auto md:flex-row md:gap-10"
              >
                {[
                  { key: 'tours', Icon: Map, top: 'CAMPUS', bottom: 'TOURS' },
                  { key: 'labs', Icon: Cpu, top: 'LAB', bottom: 'SIMULATORS' },
                ].map(({ key, Icon, top, bottom }) => (
                  <motion.div
                    key={key}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } }
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="relative bg-white/[0.03] p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.4)] border border-white/10 border-t-white/20 border-l-white/20 hover:border-[#38bdf8]/40 backdrop-blur-2xl flex flex-col items-center justify-center w-[300px] h-[300px] md:w-[320px] md:h-[360px] transition-all duration-700 overflow-hidden cursor-pointer group"
                    onClick={() => {
                      if (key === 'tours') {
                        launchCampusTours();
                      } else {
                        /* Navigation Logic for other keys */
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#38bdf8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <Icon size={80} className="text-[#38bdf8] mb-8 transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700" style={{ filter: 'drop-shadow(0px 0px 20px rgba(56,189,248,0.6))' }} />
                    <h2 className="text-2xl font-bold tracking-[0.2em] text-white mt-2 z-10 text-center">
                      {top}<br/><span className="text-[#38bdf8] transition-colors duration-700 group-hover:text-white">{bottom}</span>
                    </h2>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="flex flex-col items-center justify-end pb-8 pointer-events-auto gap-6 sm:pb-12">
          <AnimatePresence>
            {activeView === 'home' && menuState === 'home' && (
              <motion.div
                key="home-controls"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="flex flex-col items-center gap-6"
              >
                <div className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity animate-bounce cursor-default">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-white group-hover:text-[#38bdf8] group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all uppercase">Scroll to Enter</span>
                  <ChevronDown size={16} className="text-white group-hover:text-[#38bdf8] transition-colors" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default UIOverlay;
