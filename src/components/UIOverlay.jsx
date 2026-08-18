import React, { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Map, Cpu, ArrowRight } from 'lucide-react';
import { ElcMark, CampusVerseMark, VrGamesMark } from './BrandMarks';

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
    caption: 'EXPERIENTIAL LEARNING CENTRE',
    cta: 'Discover',
    Mark: ElcMark,
  },
  {
    id: 'campus',
    title: 'CAMPUS VERSE',
    caption: 'EXPLORE. EXPERIENCE. DISCOVER.',
    cta: 'Enter',
    Mark: CampusVerseMark,
  },
  {
    id: 'vr',
    title: 'VR GAMES',
    caption: 'IMMERSIVE ARCADE',
    // No VR route exists yet, so this deliberately goes nowhere rather than
    // dropping people somewhere unrelated.
    cta: 'Coming soon',
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

  const { Mark } = card;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      style={{ opacity, y, scale, filter, pointerEvents: interactive ? 'auto' : 'none' }}
      className="group relative flex h-[112px] w-full flex-row items-center gap-5 overflow-hidden
                 rounded-[1.75rem] border border-white/10 p-6 text-left backdrop-blur-2xl
                 bg-gradient-to-b from-white/[0.07] via-white/[0.03] to-white/[0.01]
                 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.12)]
                 transition-[transform,border-color,box-shadow] duration-700 ease-out
                 hover:-translate-y-2 hover:border-sky-400/45
                 hover:shadow-[0_0_70px_-10px_rgba(56,189,248,0.55),inset_0_1px_0_0_rgba(255,255,255,0.2)]
                 sm:h-[350px] sm:flex-col sm:justify-center sm:gap-0 sm:rounded-[2rem] sm:p-8 sm:text-center"
    >
      {/* Hairline along the top edge — the highlight that sells it as glass */}
      <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent" />

      {/* Light pooling in from above on hover */}
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100
                       bg-[radial-gradient(85%_60%_at_50%_0%,rgba(56,189,248,0.20),transparent_72%)]" />

      {/* Corner brackets: reads as a targeting reticle, ties into the HUD language */}
      {['left-4 top-4 border-l border-t', 'right-4 top-4 border-r border-t',
        'left-4 bottom-4 border-l border-b', 'right-4 bottom-4 border-r border-b'].map((pos) => (
        <span
          key={pos}
          className={`pointer-events-none absolute hidden h-4 w-4 rounded-[3px] border-sky-300/25 transition-colors duration-700 group-hover:border-sky-300/70 sm:block ${pos}`}
        />
      ))}

      <span
        className="relative z-10 shrink-0 transition-transform duration-700 group-hover:-translate-y-1.5 group-hover:scale-[1.07] sm:mb-7"
        style={{ filter: 'drop-shadow(0 0 22px rgba(56,189,248,0.45))' }}
      >
        <Mark size={card.id === 'elc' ? 124 : 104} />
      </span>

      <span className="relative z-10 flex min-w-0 flex-col sm:items-center">
        <span className="text-[15px] font-bold leading-tight tracking-[0.2em] text-white sm:text-[19px] sm:tracking-[0.22em]">
          {card.title}
        </span>

        <span className="mt-2 text-[9px] font-medium leading-relaxed tracking-[0.16em] text-sky-300/70 transition-colors duration-700 group-hover:text-sky-200 sm:mt-3 sm:tracking-[0.18em]">
          {card.caption}
        </span>

        <span className="mt-3 hidden items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/5 px-4 py-1.5
                         text-[8px] font-semibold uppercase tracking-[0.24em] text-sky-300/80
                         transition-all duration-700 group-hover:border-sky-300/60 group-hover:bg-sky-400/15 group-hover:text-white
                         sm:mt-7 sm:inline-flex">
          {card.cta}
          <ArrowRight size={10} className="transition-transform duration-700 group-hover:translate-x-1" />
        </span>
      </span>
    </motion.button>
  );
};

const UIOverlay = ({ menuState, isTransitioning, setIsTransitioning, activeView, setActiveView, smoothScroll }) => {
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
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 font-sans tracking-wide sm:p-10">
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
      <div className="relative flex-1 flex items-center justify-center pointer-events-none mt-10">
        {/* Destination hub — scrubbed by scroll, so it is part of the same
            motion as the headset dissolving rather than a separate reveal. */}
        {activeView === 'home' && (
          <div className="w-full max-w-[1120px] px-2 sm:px-4">
            <motion.p
              style={{ opacity: hubLabelOpacity, y: hubLabelY }}
              className="mb-6 text-center text-[9px] font-semibold uppercase tracking-[0.34em] text-sky-300/70 sm:mb-9"
            >
              Select a destination
            </motion.p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:gap-8">
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
              className="absolute inset-0 flex flex-col items-center justify-center overflow-y-auto pointer-events-auto px-4 py-2"
            >
              <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 text-3xl font-black tracking-tighter mb-8 text-center sm:text-4xl sm:mb-10">
                DISCOVER THE DIGITAL TWIN
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto w-full">
                {/* Bento Box 1 */}
                <div className="relative group bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] p-8 md:p-10 overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-sky-500/30 hover:-translate-y-1">
                  <div className="absolute -inset-px bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  <div className="text-sky-400 font-bold tracking-[0.2em] text-xs mb-3 flex items-center gap-2 relative z-10">
                    <svg className="w-2 h-2 text-sky-400" viewBox="0 0 8 8" fill="currentColor">
                      <circle cx="4" cy="4" r="4" className="animate-pulse shadow-[0_0_8px_currentColor]"/>
                    </svg>
                    THE VISION
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-100 mb-4 relative z-10">Immersive Spatial Computing</h3>
                  <p className="text-slate-400/80 leading-relaxed font-light text-[15px] relative z-10">
                    Experience a fully interactive digital twin of the campus, designed for seamless exploration and interaction.
                  </p>
                </div>

                {/* Bento Box 2 */}
                <div className="relative group bg-white/[0.02] backdrop-blur-3xl border border-white/[0.08] rounded-[2rem] p-8 md:p-10 overflow-hidden transition-all duration-700 hover:bg-white/[0.04] hover:border-sky-500/30 hover:-translate-y-1">
                  <div className="absolute -inset-px bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                  <div className="text-sky-400 font-bold tracking-[0.2em] text-xs mb-3 flex items-center gap-2 relative z-10">
                    <svg className="w-2 h-2 text-sky-400" viewBox="0 0 8 8" fill="currentColor">
                      <circle cx="4" cy="4" r="4" className="animate-pulse shadow-[0_0_8px_currentColor]"/>
                    </svg>
                    CORE TECHNOLOGY
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-100 mb-4 relative z-10">Zero-Latency WebGL</h3>
                  <p className="text-slate-400/80 leading-relaxed font-light text-[15px] relative z-10">
                    Powered by a custom React Three Fiber pipeline. Our rendering engine delivers desktop-class cinematic visuals directly in your browser.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveView('explore')}
                className="mt-10 sm:mt-12 relative px-10 py-4 bg-sky-900/20 border border-sky-500/40 rounded-full text-sky-300 font-medium tracking-wide overflow-hidden shadow-[0_0_20px_rgba(56,189,248,0.15)] hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] transition-shadow duration-500 cursor-pointer"
              >
                Explore Campus Verse
              </motion.button>
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
                  className="relative bg-white/[0.03] p-10 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.4)] border border-white/10 border-t-white/20 border-l-white/20 hover:border-[#38bdf8]/40 backdrop-blur-2xl flex flex-col items-center justify-center w-[300px] h-[300px] md:w-[320px] md:h-[360px] transition-all duration-700 overflow-hidden cursor-pointer group"
                  onClick={() => { /* Navigation Logic */ }}
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
              <button
                onClick={() => setIsTransitioning(true)}
                disabled={isTransitioning}
                className={`group flex items-center gap-3 px-6 py-2 rounded-full border ${isTransitioning ? 'border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.8)]' : 'border-white/20 hover:border-[#38bdf8]/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.4)]'} bg-[#040a18]/80 backdrop-blur-xl transition-all cursor-pointer`}
              >
                <div className={`w-2 h-2 rounded-full bg-[#38bdf8] ${isTransitioning ? 'shadow-[0_0_15px_#38bdf8] scale-150' : 'shadow-[0_0_8px_#38bdf8] animate-pulse'} transition-all duration-500`}></div>
                <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors ${isTransitioning ? 'text-[#38bdf8]' : 'text-white group-hover:text-[#38bdf8]'}`}>System Ready</span>
              </button>

              <div className="group flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity mt-4 animate-bounce cursor-default">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-white group-hover:text-[#38bdf8] group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all uppercase">Scroll to Enter</span>
                <ChevronDown size={16} className="text-white group-hover:text-[#38bdf8] transition-colors" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UIOverlay;
