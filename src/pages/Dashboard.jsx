import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Film, ImageIcon, Play, X } from 'lucide-react';
import InteractiveBackground from '../components/dashboard/InteractiveBackground';

/** One ramp for the whole page — it used to mix electric blue, purple and magenta. */
const SKY = '#38bdf8';
const BLUE = '#3b82f6';
const CYAN = '#67e8f9';

const CARDS_DATA = [
  { id: 1, title: 'Branchwise ELC', subtitle: 'Branch level event', image: '/thumb3.png', color: SKY },
  { id: 2, title: 'Summer ELC', subtitle: 'Summer event', image: '/thumb2.png', color: BLUE },
  { id: 3, title: 'Startups', subtitle: 'More events', image: '/thumb1.jpg', color: CYAN },
  { id: 4, title: 'ELC Projects', subtitle: 'Innovation & research', image: '/elc_project_thumb.png', color: SKY, imagePosition: 'object-[85%_center]' },
  { id: 5, title: 'Resources', subtitle: 'Equipment & facilities', image: '/resources_thumb.png', color: BLUE, imagePosition: 'object-center' },
  { id: 6, title: 'Campus Tours', subtitle: 'Explore campus', image: '/campus_tour_thumb.png', color: SKY, imagePosition: 'object-center' },
  { id: 7, title: 'Faculty', subtitle: 'Our team', image: '/faculty_thumb.jpg', color: CYAN, imagePosition: 'object-center' },
];

const isImage = (url) => /\.(jpe?g|gif|png|webp)$/i.test(url);

const BentoCard = ({ card, meta, onClick }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 260, damping: 30 });
  const y = useSpring(0, { stiffness: 260, damping: 30 });

  // Restrained tilt. The original ±25deg sheared the artwork at the corners.
  const rotateX = useTransform(y, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(x, [-0.5, 0.5], ['-5deg', '5deg']);
  const imgX = useTransform(x, [-0.5, 0.5], ['-2.5%', '2.5%']);
  const imgY = useTransform(y, [-0.5, 0.5], ['-2.5%', '2.5%']);
  const specular = useTransform(
    [x, y],
    ([mx, my]) => `radial-gradient(circle at ${(mx + 0.5) * 100}% ${(my + 0.5) * 100}%, rgba(255,255,255,0.14) 0%, transparent 55%)`
  );

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={() => onClick(card)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', '--accent': card.color }}
      whileHover={{ scale: 1.015, transition: { duration: 0.4 } }}
      className={`group relative flex h-[270px] w-full cursor-pointer sm:h-[300px] flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(9,14,28,0.65)] text-left shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-colors duration-500 hover:border-[var(--accent)]/45`}
    >
      <motion.div className="pointer-events-none absolute inset-0 z-30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: specular }} />

      <motion.div className="absolute inset-[-5%] h-[110%] w-[110%]" style={{ x: imgX, y: imgY }}>
        {/* Lightly desaturated and darkened so seven unrelated photos sit
            together, with a scrim carrying the type. No hue blend — that was
            forcing skin tones to navy. */}
        <img
          src={card.image}
          alt=""
          className={`h-full w-full object-cover saturate-[0.88] contrast-[1.03] brightness-[0.92] ${card.imagePosition || 'object-center'} transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03040D] via-[#03040D]/70 to-[#03040D]/10" />
      </motion.div>

      <span className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/70 to-transparent" />

      <div className="relative z-20 flex h-full flex-col justify-between p-5 sm:p-6" style={{ transform: 'translateZ(35px)' }}>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] backdrop-blur-md" style={{ color: card.color }}>
            {card.subtitle}
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">{meta}</span>
        </div>

        <div className="flex items-end justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)] sm:text-[28px]">
            {card.title}
          </h3>
          {/* One small affordance instead of a full-width EXPLORE bar on every
              tile — seven of those was most of the visual noise. */}
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md transition-all duration-500 group-hover:border-transparent group-hover:bg-[var(--accent)]"
          >
            <ArrowRight size={14} className="text-white transition-colors duration-500 group-hover:text-[#03040D]" />
          </span>
        </div>
      </div>
    </motion.button>
  );
};

const DEPARTMENTS_DATA = [
  { id: 'dept-1', title: 'CSE', subtitle: 'Computer Science', color: SKY },
  { id: 'dept-2', title: 'ECE', subtitle: 'Electronics & Comm', color: BLUE },
  { id: 'dept-3', title: 'EIE', subtitle: 'Electrical & Instrumentation', color: SKY },
  { id: 'dept-4', title: 'MECH', subtitle: 'Mechanical Engineering', color: CYAN },
  { id: 'dept-5', title: 'CIVIL', subtitle: 'Civil Engineering', color: SKY },
  { id: 'dept-6', title: 'CHEM', subtitle: 'Chemical Engineering', color: BLUE },
  { id: 'dept-7', title: 'BIOTECH', subtitle: 'Biotechnology', color: CYAN },
];

const DEPARTMENT_VIDEOS = {
  'Electronics & Comm': [
    { title: 'Project 21', url: '/videos/ece/Copy of 21.mp4' },
    { title: 'Fasal Kavach', url: '/videos/ece/Copy of 25_fasal_kavach_video.mp4' },
    { title: 'Project 31', url: '/videos/ece/Copy of 31_video.mp4' },
    { title: 'Project 32G', url: '/videos/ece/Copy of 32_g_VIDEO.mp4' },
    { title: 'Project 46', url: '/videos/ece/Copy of 46_video.mp4' },
    { title: 'Project 47', url: '/videos/ece/Copy of 47 video.mp4' },
    { title: 'Project 50', url: '/videos/ece/Copy of 50_video.mp4' },
    { title: 'Project 51B', url: '/videos/ece/Copy of 51B.mp4' },
    { title: 'Project 54', url: '/videos/ece/Copy of 54_Video.mp4' },
  ],
  Startups: [{ title: 'Startup Showcase', url: '/videos/startups/startup_video.mp4' }],
  'Campus Tours': [
    { title: 'Virtual Tour 1', url: '/videos/campus_tours/Website_videos(3).mp4' },
    { title: 'Virtual Tour 2', url: '/videos/campus_tours/Website_videos(4).mp4' },
    { title: 'Virtual Tour 3', url: '/videos/campus_tours/Website_videos(5).mp4' },
    { title: 'Virtual Tour 4', url: '/videos/campus_tours/Website_videos(6).mp4' },
  ],
  'ELC Projects': [
    { title: 'Project Image 2', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.17 PM.jpeg' },
    { title: 'Project Image 3', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.18 PM (1).jpeg' },
    { title: 'Project Image 4', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.18 PM (2).jpeg' },
    { title: 'Project Image 5', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.18 PM.jpeg' },
    { title: 'Project Image 6', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.19 PM (1).jpeg' },
    { title: 'Project Image 7', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.19 PM.jpeg' },
  ],
  Resources: [
    { title: 'Bajaj Centre', url: '/videos/resources/BajajCentre_1.mp4' },
    { title: 'Virtual Tour (Resources)', url: '/videos/resources/Website_videos(3).mp4' },
  ],
};

/** Counts come from the data itself, so a tile can never advertise media it lacks. */
const TOTAL_MEDIA = Object.values(DEPARTMENT_VIDEOS).reduce((n, list) => n + list.length, 0);

const metaFor = (card) => {
  if (card.title === 'Faculty') return 'Directory';
  const list = DEPARTMENT_VIDEOS[card.title];
  if (!list) return `${DEPARTMENTS_DATA.length} depts`;
  const images = list.filter((m) => isImage(m.url)).length;
  return images === list.length ? `${list.length} images` : `${list.length} films`;
};

const DepartmentCard = ({ dept, index, onClick }) => {
  const mediaCount = DEPARTMENT_VIDEOS[dept.subtitle]?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => onClick(dept)}
      style={{ '--accent': dept.color }}
      className="group relative flex h-[190px] w-full flex-col overflow-hidden rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-6 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)]/45 hover:bg-white/[0.04]"
    >
      <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-20 blur-[50px] transition-opacity duration-500 group-hover:opacity-50" style={{ backgroundColor: 'var(--accent)' }} />

      <span className="relative z-10 flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/25">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 opacity-50 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100" style={{ color: 'var(--accent)', borderColor: `${dept.color}40` }}>
          <ArrowRight size={12} />
        </span>
      </span>

      <span className="relative z-10 mt-auto flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1">
          {dept.title}
        </span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/40 transition-transform duration-500 group-hover:translate-x-1">
          {dept.subtitle}
        </span>

        {/* Every one of these tiles used to be an identical empty box. Showing
            what is actually inside makes the grid worth reading. */}
        <span className="mt-4 flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.16em]">
          {mediaCount > 0 ? (
            <>
              <Film size={11} style={{ color: dept.color }} />
              <span style={{ color: dept.color }}>{mediaCount} films</span>
            </>
          ) : (
            <span className="text-white/25">No media yet</span>
          )}
        </span>
      </span>

      <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 ease-out group-hover:w-full" style={{ backgroundColor: 'var(--accent)' }} />
    </button>
  );
};

/**
 * Playlist tile. The old version showed a grey box with a play glyph for every
 * item, so a nine-item list looked like nine empty slots. Videos seek to two
 * seconds for a real frame; images just show themselves.
 */
const MediaThumb = ({ media, active, onSelect }) => {
  const [duration, setDuration] = useState(null);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative h-[92px] w-[164px] shrink-0 overflow-hidden rounded-2xl border transition-all ${
        active ? 'border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.45)]' : 'border-white/10 hover:border-white/30'
      }`}
    >
      {isImage(media.url) ? (
        <img src={media.url} alt={media.title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
      ) : (
        <video
          src={`${media.url}#t=2`}
          preload="metadata"
          muted
          playsInline
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
        />
      )}

      <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {active && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-400/90 text-[#03040D]">
            <Play size={13} fill="currentColor" />
          </span>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-2.5">
        <span className={`truncate text-[10px] ${active ? 'text-sky-300' : 'text-white/70'}`}>{media.title}</span>
        {duration ? <span className="font-mono text-[9px] text-white/40">{fmt(duration)}</span> : null}
      </span>
    </button>
  );
};

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();

  const DIRECT_MEDIA = ['Startups', 'Campus Tours', 'ELC Projects', 'Resources'];

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

  // Inside a department, step back to the grid; otherwise close the panel.
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

      {/* Compact bar. The old header spent ~400px of first screen on a wordmark
          before a single collection was visible. */}
      <header className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-8 pt-8 sm:px-10">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Link to="/about" className="group inline-flex items-center gap-2 text-white/45 transition-colors hover:text-white">
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] sm:inline">Back</span>
            </Link>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <h1 className="text-lg font-light tracking-[0.14em] text-white sm:text-xl">
                CAMPUS<span className="bg-gradient-to-r from-sky-300 to-blue-500 bg-clip-text font-black text-transparent">VERSE</span>
              </h1>
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.32em] text-white/35">Spatial kiosk array</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Counts sit inline here now. As their own banded strip under a
                headline they took a whole row to say very little. */}
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

      <main className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-28 pt-4 perspective-[2200px] sm:px-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#03040D]/80 p-4 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.96, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-[rgba(8,12,24,0.9)] shadow-[0_40px_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl"
            >
              <span className="pointer-events-none absolute inset-x-24 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full opacity-20 blur-[100px]" style={{ background: selectedCard.color }} />

              {/* Header */}
              <div className="relative z-10 flex shrink-0 items-start justify-between gap-6 border-b border-white/[0.06] px-7 py-6 sm:px-10">
                <div className="flex min-w-0 flex-col gap-1">
                  {/* Stepped into a department, the eyebrow names the collection
                      you came from — repeating the department in both lines
                      told you nothing. */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.34em]" style={{ color: selectedCard.color }}>
                    {canStepBack ? selectedCard.title : selectedCard.subtitle}
                  </span>
                  <h2 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                    {canStepBack ? activeTab : selectedCard.title}
                  </h2>
                </div>

                <button
                  onClick={handleDismiss}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all hover:border-sky-400/40 hover:text-white"
                >
                  {canStepBack ? <ArrowLeft size={16} /> : <X size={16} />}
                </button>
              </div>

              {/* Body */}
              <div className="relative z-10 flex-1 overflow-y-auto px-7 py-7 sm:px-10">
                {!activeTab ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {DEPARTMENTS_DATA.map((dept, index) => (
                      <motion.div
                        key={dept.id}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: index * 0.05 }}
                      >
                        <DepartmentCard dept={dept} index={index} onClick={(d) => openMedia(d.subtitle)} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex w-full flex-col">
                    {/* Stage. The fake progress bar, "NO SIGNAL DETECTED" and
                        "SECURE LINK 01" chrome are gone — they dressed up an
                        empty state as a malfunction. */}
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-[20px] border border-white/10 bg-black shadow-2xl">
                      {activeVideo ? (
                        isImage(activeVideo.url) ? (
                          <img key={activeVideo.url} src={activeVideo.url} alt={activeVideo.title} className="absolute inset-0 h-full w-full object-contain" />
                        ) : (
                          <video key={activeVideo.url} autoPlay controls playsInline className="absolute inset-0 h-full w-full object-contain">
                            <source src={activeVideo.url} type="video/mp4" />
                          </video>
                        )
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                            <ImageIcon size={22} className="text-white/25" />
                          </span>
                          <p className="text-sm font-light text-white/45">Nothing published for this department yet</p>
                          <p className="text-[11px] text-white/25">Media added here will appear automatically</p>
                        </div>
                      )}
                    </div>

                    {activeVideo && (
                      <div className="mt-4 flex items-center justify-between gap-4">
                        <p className="truncate text-sm font-medium text-white/80">{activeVideo.title}</p>
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                          {isImage(activeVideo.url) ? 'Image' : 'Video'}
                        </span>
                      </div>
                    )}

                    {playlist?.length > 1 && (
                      <div className="mt-8 flex flex-col">
                        <div className="mb-3 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">In this collection</span>
                          <span className="font-mono text-[10px] text-white/30">{playlist.length} items</span>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                          {playlist.map((media) => (
                            <MediaThumb
                              key={media.url}
                              media={media}
                              active={activeVideo?.url === media.url}
                              onSelect={() => setActiveVideo(media)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
