import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useKioskBridge } from '../../shared/hooks/useKioskBridge';
import VRLaunchOverlay from '../vr-games/components/VRLaunchOverlay';
import DestinationHub from './components/DestinationHub';
import AboutDrawer from './components/AboutDrawer';
import AboutElcDrawer from './components/AboutElcDrawer';
import ExploreDrawer from './components/ExploreDrawer';
import VrGamesGrid from '../vr-games/components/VrGamesGrid';

const EASE = [0.16, 1, 0.3, 1];

export const UIOverlay = ({ menuState, activeView, setActiveView, smoothScroll, triggerTransition }) => {
  const { isVRLoading, vrError, launchCampusTours, launchVRGame } = useKioskBridge();
  const navigate = useNavigate();

  const [hubReady, setHubReady] = useState(false);
  useMotionValueEvent(smoothScroll, 'change', (v) => {
    const next = v > 0.76;
    if (next !== hubReady) setHubReady(next);
  });

  const onHubSelect = (id) => {
    if (id === 'elc') setActiveView('about-elc');
    else if (id === 'campus') setActiveView('about');
    else if (id === 'vr') setActiveView('vrgames');
  };

  const isAboutView = activeView === 'about' || activeView === 'about-elc';

  return (
    <>
      <VRLaunchOverlay isVisible={isVRLoading} vrError={vrError} />
      <div 
        className={`absolute inset-0 z-20 flex flex-col font-sans tracking-wide select-none [-webkit-tap-highlight-color:transparent] ${
          isAboutView 
            ? 'pointer-events-auto overflow-y-auto p-6 sm:p-10 scroll-smooth touch-pan-y [&::-webkit-scrollbar]:hidden' 
            : 'pointer-events-none justify-between p-6 sm:p-10'
        }`}
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Header / Logos & Quick Nav */}
        <header className="flex justify-between items-center pointer-events-auto w-full gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="flex flex-col gap-1 group cursor-pointer shrink-0"
            onClick={() => setActiveView('home')}
          >
            <div className="flex items-center transition-transform duration-300 ease-out group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <img
                src="/thapar-logo-transparent.png"
                alt="Thapar Institute Logo"
                className="h-12 w-auto object-contain pointer-events-auto sm:h-16"
              />
            </div>
          </motion.div>

          {/* Quick Nav Bar */}
          <nav className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-2xl">
            <button
              onClick={() => setActiveView('about-elc')}
              type="button"
              className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                activeView === 'about-elc'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.6)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About ELC
            </button>
            <button
              onClick={() => setActiveView('about')}
              type="button"
              className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                activeView === 'about'
                  ? 'bg-sky-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Campus Verse
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => setActiveView('vrgames')}
              type="button"
              className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                activeView === 'vrgames'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(103,232,249,0.6)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              VR Arcade
            </button>
            <button
              onClick={() => navigate('/faculty')}
              type="button"
              className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              Faculty
            </button>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
            className="flex items-center gap-4 shrink-0"
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
          isAboutView ? 'flex flex-col items-center' : 'flex items-center justify-center mt-10'
        }`}>
          {activeView === 'home' && (
            <DestinationHub
              smoothScroll={smoothScroll}
              hubReady={hubReady}
              triggerTransition={triggerTransition}
              onSelect={onHubSelect}
            />
          )}

          <AnimatePresence mode="wait">
            {activeView === 'about-elc' && (
              <AboutElcDrawer
                onBack={() => setActiveView('home')}
                onExploreProjects={() => navigate('/dashboard')}
                onOpenFullPage={() => navigate('/about-elc')}
              />
            )}

            {activeView === 'about' && (
              <AboutDrawer
                onBack={() => setActiveView('home')}
                onExplore={() => setActiveView('explore')}
                onOpenElc={() => setActiveView('about-elc')}
              />
            )}

            {activeView === 'explore' && (
              <ExploreDrawer
                onBack={() => setActiveView('about')}
                onLaunchTours={launchCampusTours}
                onLaunchLabs={() => {
                  console.log('Lab Simulators selected');
                }}
              />
            )}

            {activeView === 'vrgames' && (
              <VrGamesGrid
                onBack={() => setActiveView('home')}
                onSelectGame={launchVRGame}
              />
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
                  type="button"
                  onClick={() => triggerTransition && triggerTransition(1)}
                  className="group flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity animate-bounce cursor-pointer bg-transparent border-0 outline-none"
                >
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-white group-hover:text-[#38bdf8] group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)] transition-all uppercase">Scroll or Tap to Enter</span>
                  <ChevronDown size={16} className="text-white group-hover:text-[#38bdf8] transition-colors" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default UIOverlay;
