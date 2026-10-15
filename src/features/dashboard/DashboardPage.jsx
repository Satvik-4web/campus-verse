import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InteractiveBackground from '../../components/dashboard/InteractiveBackground';
import BentoCard from './components/BentoCard';
import MediaStageModal from './components/MediaStageModal';
import { CARDS_DATA } from '../../data/cards';
import { DEPARTMENTS_DATA } from '../../data/departments';
import { DEPARTMENT_VIDEOS, DIRECT_MEDIA, TOTAL_MEDIA } from '../../data/departmentVideos';

const isImage = (url) => /\.(jpe?g|gif|png|webp)$/i.test(url);

const metaFor = (card) => {
  if (card.title === 'Faculty') return 'Directory';
  const list = DEPARTMENT_VIDEOS[card.title];
  if (!list) return `${DEPARTMENTS_DATA.length} depts`;
  const images = list.filter((m) => isImage(m.url)).length;
  return images === list.length ? `${list.length} images` : `${list.length} films`;
};

export const DashboardPage = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();

  const openMedia = (key) => {
    setActiveTab(key);
    setActiveVideo(DEPARTMENT_VIDEOS[key]?.[0] ?? null);
  };

  const handleCardClick = (card) => {
    if (card.title === 'Faculty') {
      navigate('/faculty');
      return;
    }
    setSelectedCard(card);
    if (DIRECT_MEDIA.includes(card.title)) openMedia(card.title);
  };

  const canStepBack = activeTab && !DIRECT_MEDIA.includes(selectedCard?.title);
  const handleDismiss = () => {
    setActiveTab(null);
    setActiveVideo(null);
    if (!canStepBack) setSelectedCard(null);
  };

  const playlist = activeTab ? DEPARTMENT_VIDEOS[activeTab] : null;

  return (
    <div className="relative w-screen min-h-screen text-white font-sans overflow-x-hidden selection:bg-sky-400/30">
      <InteractiveBackground />

      {/* Top Header Bar */}
      <header className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-8 pt-8 sm:px-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => navigate(-1)} 
              type="button" 
              className="group inline-flex items-center gap-2 text-white/45 transition-colors hover:text-white cursor-pointer bg-transparent border-0 outline-none"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] sm:inline">Back</span>
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <h1 className="text-lg font-light tracking-[0.14em] text-white sm:text-xl">
                CAMPUS<span className="bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text font-black text-transparent">VERSE</span>
              </h1>
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.32em] text-white/35">Spatial kiosk array</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-4 md:flex">
              {[[CARDS_DATA.length, 'Collections'], [TOTAL_MEDIA, 'Media'], [DEPARTMENTS_DATA.length, 'Depts']].map(([n, label]) => (
                <div key={label} className="text-right">
                  <div className="font-mono text-[13px] leading-none text-white/85">{String(n).padStart(2, '0')}</div>
                  <div className="mt-1 text-[7px] font-semibold uppercase tracking-[0.18em] text-white/30">{label}</div>
                </div>
              ))}
              <div className="h-7 w-px bg-white/10" />
            </div>

            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">System online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-28 pt-4 perspective-[2200px] sm:px-10">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:gap-6">
          {CARDS_DATA.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.65, delay: Math.min(i, 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: 'preserve-3d' }}
              className={i === 6 ? 'lg:col-start-2' : ''}
            >
              <BentoCard card={card} meta={metaFor(card)} onClick={handleCardClick} />
            </motion.div>
          ))}
        </div>
      </main>

      {/* Modal Stage for Departments & Media */}
      <AnimatePresence>
        {selectedCard && (
          <MediaStageModal
            selectedCard={selectedCard}
            activeTab={activeTab}
            activeVideo={activeVideo}
            playlist={playlist}
            canStepBack={canStepBack}
            onDismiss={handleDismiss}
            onSelectDepartment={openMedia}
            onSelectVideo={setActiveVideo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
