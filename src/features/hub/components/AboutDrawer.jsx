import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import KioskModel from '../../../components/about/KioskModel';
import TeamModal, { TeamCardsGrid } from '../../../components/TeamModal';

const EASE = [0.16, 1, 0.3, 1];

export const AboutDrawer = ({ onBack, onExplore }) => {
  const [showTeamModal, setShowTeamModal] = useState(false);

  const scrollToTeam = () => {
    const el = document.getElementById('team-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setShowTeamModal(true);
    }
  };

  return (
    <>
      <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />

      <motion.div
        key="about"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative flex flex-col items-center pointer-events-auto w-full px-4"
      >
        {/* Back button */}
        <div className="w-full max-w-6xl mt-4 sm:mt-6 flex items-center justify-start">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white/70 backdrop-blur-xl transition-all hover:border-sky-400/40 hover:text-white cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Back to Destinations</span>
          </button>
        </div>

        <div className="mb-auto grid w-full max-w-6xl grid-cols-1 items-start gap-8 landscape:grid-cols-[1fr_0.85fr] landscape:gap-12 mt-4 sm:mt-6">
          {/* Copy */}
          <div className="flex flex-col gap-4 sm:gap-5">
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-sky-300 [text-shadow:_0_0_8px_rgb(56_189_248_/_50%)]">
                THE DIGITAL TWIN
              </span>
            </span>

            <h2 className="mt-1 bg-gradient-to-b from-white via-sky-200 to-sky-500 bg-clip-text text-4xl font-black leading-tight tracking-tighter text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] sm:text-5xl uppercase">
              ABOUT CAMPUS VERSE
            </h2>

            <p className="mt-1 max-w-xl text-[14px] font-normal leading-relaxed text-sky-100/90 tracking-wide">
              Bringing ELC beyond the physical campus. A digital and immersive platform designed to showcase the work, projects, and learning experiences taking place within the Experiential Learning Centre.
            </p>

            <div className="mt-2 flex flex-col gap-2">
              {[
                ['EXPLORE', 'Discover ELC Projects', 'Explore student-driven projects that combine engineering knowledge and creativity—understanding how they work, the technologies used, and real-world applications.'],
                ['EXPERIENCE', 'Step Inside With VR', 'Don\'t just see the lab, step inside it. Using Meta Quest VR, enter immersive digital replicas of ELC labs to interact with equipment and processes.'],
                ['VISION', 'Interactive Learning', 'Creating a connected ecosystem where physical labs, digital platforms, and immersive tech come together to make learning more engaging and accessible.'],
              ].map(([eyebrow, title, body]) => (
                <div key={title} className="group relative overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.01] p-3 backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 hover:border-sky-500/30 hover:bg-white/[0.03]">
                  <div className="absolute -inset-px bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                  <div className="relative z-10 flex gap-4">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-sky-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
                    <div className="min-w-0">
                      <div className="text-[10px] portrait:text-[11px] font-bold uppercase tracking-[0.25em] text-sky-400/90">{eyebrow}</div>
                      <h3 className="text-base portrait:text-lg font-bold tracking-wide text-white transition-colors duration-300 group-hover:text-sky-200">{title}</h3>
                      <p className="mt-1 text-[12px] portrait:text-[13px] font-light leading-relaxed text-slate-400">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The kiosk model plinth */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-xl">
            <span className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_58%,rgba(56,189,248,0.16),transparent_70%)]" />

            <div className="relative h-[300px] w-full sm:h-[380px] lg:h-[440px] portrait:h-[400px]">
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

          {/* Explore button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onExplore}
            className="landscape:col-span-2 group relative mt-2 flex w-full sm:w-auto items-center justify-center gap-3 overflow-hidden rounded-full border border-sky-500/50 bg-sky-900/30 px-8 py-4 text-sky-100 shadow-[0_0_30px_-5px_rgba(56,189,248,0.4)] transition-shadow duration-500 hover:text-white hover:shadow-[0_0_50px_-5px_rgba(56,189,248,0.8)] mx-auto cursor-pointer"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent transition-transform duration-[1100ms] ease-out group-hover:translate-x-full" />
            <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.25em]">Explore Campus Verse</span>
            <ArrowRight size={14} className="relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* ===================== THE CORE TEAM SECTION (Front & Center) ===================== */}
        <section id="team-section" className="w-full max-w-6xl mt-16 mb-8 flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/60 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles size={11} className="text-sky-400 animate-pulse" />
              Core Development Team
            </span>

            <h3 className="mt-3 bg-gradient-to-b from-white via-sky-200 to-sky-500 bg-clip-text text-3xl sm:text-4xl font-black tracking-tight text-transparent drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] uppercase">
              The Minds Behind Campus Verse
            </h3>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl font-light leading-relaxed">
              Engineered for interactive spatial computing, tactile physical kiosk integration, and wireless Meta Quest 3 hardware synchronization.
            </p>
          </div>

          <TeamCardsGrid />
        </section>

        {/* Footer */}
        <footer className="w-full mt-8 py-6 border-t border-white/[0.05] bg-slate-950/20 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col landscape:md:flex-row items-center justify-between gap-4">
            <span className="text-slate-500 text-sm font-light tracking-wide select-none">
              © 2026 Campus Verse. All rights reserved.
            </span>
            <div className="flex flex-wrap justify-center items-center gap-6 landscape:md:gap-8 text-sm font-medium text-slate-400">
              <motion.button whileTap={{ scale: 0.96 }} className="py-2 px-1 transition-colors duration-300 hover:text-sky-400">
                Privacy Policy
              </motion.button>
              <motion.button whileTap={{ scale: 0.96 }} className="py-2 px-1 transition-colors duration-300 hover:text-sky-400">
                Terms
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.96 }} 
                onClick={scrollToTeam}
                className="py-2 px-1 transition-colors duration-300 hover:text-sky-400 text-sky-300/90 font-semibold cursor-pointer"
              >
                About Team of Campus Verse
              </motion.button>
            </div>
          </div>
        </footer>
      </motion.div>
    </>
  );
};

export default AboutDrawer;
