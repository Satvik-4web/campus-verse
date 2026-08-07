import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, PlayCircle, Upload, X } from 'lucide-react';
import InteractiveBackground from '../components/dashboard/InteractiveBackground';

const CARDS_DATA = [
  {
    id: 1,
    title: 'Branchwise ELC',
    subtitle: 'BRANCH LEVEL EVENT',
    image: '/thumb3.png',
    color: '#0078FF'
  },
  {
    id: 2,
    title: 'Summer ELC',
    subtitle: 'SUMMER EVENT',
    image: '/thumb2.png',
    color: '#B535FF'
  },
  {
    id: 3,
    title: 'Startups',
    subtitle: 'MORE EVENTS',
    image: '/thumb1.jpg',
    color: '#00C6FF'
  },
  {
    id: 4,
    title: 'ELC Projects',
    subtitle: 'INNOVATION & RESEARCH',
    image: '/elc_project_thumb.png',
    color: '#0078FF',
    imagePosition: 'object-[85%_center]'
  },
  {
    id: 5,
    title: 'Resources',
    subtitle: 'EQUIPMENT & FACILITIES',
    image: '/resources_thumb.png',
    color: '#B535FF',
    imagePosition: 'object-center'
  },
  {
    id: 6,
    title: 'Campus Tours',
    subtitle: 'EXPLORE CAMPUS',
    image: '/campus_tour_thumb.png',
    color: '#0078FF',
    imagePosition: 'object-center'
  },
  {
    id: 7,
    title: 'Faculty',
    subtitle: 'OUR TEAM',
    image: '/faculty_thumb.jpg',
    color: '#00C6FF',
    imagePosition: 'object-center'
  }
];

const CinematicCard = ({ card, onClick, heightClass = "h-[480px]" }) => {
  const ref = useRef(null);

  // Smooth springs for buttery interaction
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  const mouseXSpring = useSpring(0, { stiffness: 200, damping: 40 });
  const mouseYSpring = useSpring(0, { stiffness: 200, damping: 40 });

  // Increased rotation intensity for more extreme 3D effect
  const rotateX = useTransform(y, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-25deg", "25deg"]);

  // Inverse parallax for the background image
  const imageTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]);
  const imageTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
    mouseXSpring.set(mouseX / width - 0.5);
    mouseYSpring.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseXSpring.set(0);
    mouseYSpring.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(card)}
      // Base float
      animate={{ y: ["-5px", "5px", "-5px"] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`group relative ${heightClass} rounded-[32px] overflow-hidden cursor-pointer flex flex-col`}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      {/* Outer Glow (Visible on Hover) */}
      <div 
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ backgroundColor: card.color }}
      />

      {/* The Actual Card Body */}
      <div className="absolute inset-0 rounded-[32px] bg-[rgba(15,20,35,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.1)] shadow-2xl overflow-hidden">
        
        {/* Dynamic Specular Highlight (Mouse Tracking) */}
        <motion.div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30"
          style={{
            background: useTransform(
              [mouseXSpring, mouseYSpring],
              ([mx, my]) => `radial-gradient(circle at ${(mx + 0.5) * 100}% ${(my + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`
            )
          }}
        />

        {/* Card Image with Parallax */}
        <motion.div 
          className="absolute inset-[-10%] w-[120%] h-[120%]" // Extra size to prevent cropping during parallax
          style={{ x: imageTranslateX, y: imageTranslateY }}
        >
          <img 
            src={card.image} 
            alt={card.title} 
            className={`w-full h-full object-cover ${card.imagePosition || 'object-center'} transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-100`}
          />
          {/* Deep immersive gradient matching Meta's spatial feel, lightened in the middle for better image quality */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#03040D] via-[#03040D]/30 to-transparent pointer-events-none" />
        </motion.div>

        {/* Content Container (Lifted extremely via transformZ for insane 3D pop) */}
        <div 
          className="absolute inset-0 flex flex-col justify-end p-8 z-20"
          style={{ transform: "translateZ(80px)" }} // Pushed much further out
        >
          {/* Category Pill */}
          <div className="mb-4 self-start">
            <span 
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-white/10 bg-black/40 backdrop-blur-md"
              style={{ color: card.color, boxShadow: `0 0 20px ${card.color}40` }}
            >
              {card.subtitle}
            </span>
          </div>

          <h3 className="text-4xl font-black text-white mb-6 tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            {card.title}
          </h3>

          {/* Action Button */}
          <div className="overflow-hidden w-full">
            <div className="flex items-center justify-between w-full p-4 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-md group-hover:bg-white/15 transition-all duration-300">
              <span className="text-white text-xs font-bold tracking-widest uppercase">
                Explore
              </span>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                style={{ backgroundColor: card.color, color: "#FFF", boxShadow: `0 0 15px ${card.color}60` }}
              >
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const DepartmentCard = ({ dept, onClick }) => {
  return (
    <div 
      onClick={() => onClick(dept)}
      className="group relative h-[220px] rounded-[24px] overflow-hidden cursor-pointer flex flex-col bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.05)] transition-all duration-500 hover:border-white/20 hover:bg-[rgba(255,255,255,0.04)]"
    >
      {/* Subtle corner glow based on dept color */}
      <div 
        className="absolute -top-20 -right-20 w-40 h-40 blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: dept.color }}
      />
      
      {/* Numbering / Icon */}
      <div className="p-6 pb-0 flex justify-between items-start">
         <span className="text-white/20 font-mono text-[10px] tracking-widest uppercase">
           {dept.id.replace('-', ' ')}
         </span>
         <div 
           className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
           style={{ color: dept.color, borderColor: `${dept.color}40` }}
         >
           <ArrowRight size={14} />
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-end relative z-10">
        <h3 className="text-2xl font-black text-white tracking-tight mb-1 group-hover:translate-x-2 transition-transform duration-500">
          {dept.title}
        </h3>
        <p className="text-white/40 text-[10px] tracking-widest uppercase font-medium group-hover:translate-x-2 transition-transform duration-500 delay-75">
          {dept.subtitle}
        </p>
      </div>

      {/* Hover line at bottom */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{ backgroundColor: dept.color }}
      />
    </div>
  );
};

const DEPARTMENTS_DATA = [
  { id: 'dept-1', title: 'CSE', subtitle: 'Computer Science', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070', color: '#14D8FF' },
  { id: 'dept-2', title: 'ECE', subtitle: 'Electronics & Comm', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070', color: '#FF3CF8' },
  { id: 'dept-3', title: 'EIE', subtitle: 'Electrical & Instrumentation', image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=2070', color: '#14D8FF' },
  { id: 'dept-4', title: 'MECH', subtitle: 'Mechanical Engineering', image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=2070', color: '#FF3CF8' },
  { id: 'dept-5', title: 'CIVIL', subtitle: 'Civil Engineering', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070', color: '#14D8FF' },
  { id: 'dept-6', title: 'CHEM', subtitle: 'Chemical Engineering', image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070', color: '#FF3CF8' },
  { id: 'dept-7', title: 'BIOTECH', subtitle: 'Biotechnology', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070', color: '#14D8FF' },
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
    { title: 'Project 54', url: '/videos/ece/Copy of 54_Video.mp4' }
  ],
  'Startups': [
    { title: 'Startup Showcase', url: '/videos/startups/startup_video.mp4' }
  ],
  'Campus Tours': [
    { title: 'Virtual Tour 1', url: '/videos/campus_tours/Website_videos(3).mp4' },
    { title: 'Virtual Tour 2', url: '/videos/campus_tours/Website_videos(4).mp4' },
    { title: 'Virtual Tour 3', url: '/videos/campus_tours/Website_videos(5).mp4' },
    { title: 'Virtual Tour 4', url: '/videos/campus_tours/Website_videos(6).mp4' }
  ],
  'ELC Projects': [
    { title: 'Project Image 1', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 11.11.14 AM.jpeg' },
    { title: 'Project Image 2', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.17 PM.jpeg' },
    { title: 'Project Image 3', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.18 PM (1).jpeg' },
    { title: 'Project Image 4', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.18 PM (2).jpeg' },
    { title: 'Project Image 5', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.18 PM.jpeg' },
    { title: 'Project Image 6', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.19 PM (1).jpeg' },
    { title: 'Project Image 7', url: '/images/elc_projects/WhatsApp Image 2026-08-07 at 12.24.19 PM.jpeg' }
  ]
};

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // null means show department grid
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();

  const handleDepartmentClick = (deptSubtitle) => {
    setActiveTab(deptSubtitle);
    if (DEPARTMENT_VIDEOS[deptSubtitle] && DEPARTMENT_VIDEOS[deptSubtitle].length > 0) {
      setActiveVideo(DEPARTMENT_VIDEOS[deptSubtitle][0]);
    } else {
      setActiveVideo(null);
    }
  };

  const handleCardClick = (card) => {
    if (card.title === 'Faculty') {
      navigate('/faculty');
    } else {
      setSelectedCard(card);
      if (card.title === 'Startups' || card.title === 'Campus Tours' || card.title === 'ELC Projects') {
        setActiveTab(card.title);
        if (DEPARTMENT_VIDEOS[card.title] && DEPARTMENT_VIDEOS[card.title].length > 0) {
          setActiveVideo(DEPARTMENT_VIDEOS[card.title][0]);
        }
      }
    }
  };

  return (
    <div className="relative w-screen min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#14D8FF]/30">
      
      {/* Background */}
      <InteractiveBackground />

      {/* Header */}
      <header className="relative z-10 w-full px-12 pt-16 pb-12 flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/about" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-all group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Return to Root</span>
          </Link>
          
          <div className="mt-2">
            <h1 className="text-5xl md:text-6xl font-light tracking-[0.1em] text-white flex items-center gap-2">
              CAMPUS<span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0078FF] to-[#B535FF]">VERSE</span>
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-[1px] bg-white/20" />
              <h2 className="text-[11px] font-semibold tracking-[0.5em] uppercase text-white/50">
                Spatial Kiosk Array
              </h2>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl shadow-xl">
          <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_#0078FF]" style={{ backgroundColor: '#0078FF' }} />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/80">
            System Online
          </span>
        </div>
      </header>

      {/* Main Interactive Category Cards (Perspective wrapper added back for the tilt effect to pop) */}
      <main className="relative z-10 w-full max-w-[1500px] mx-auto px-12 pb-32 pt-6 perspective-[2000px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {CARDS_DATA.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 100 }}
                style={{ transformStyle: "preserve-3d" }}
                className={i === 6 ? 'lg:col-start-2' : ''}
              >
                <CinematicCard card={card} onClick={handleCardClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Holographic Access Terminal (Upload Modal) */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(25px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03040D]/70"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20, rotateX: 15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full max-w-6xl max-h-[95vh] bg-[rgba(10,14,25,0.85)] backdrop-blur-3xl border border-[rgba(255,255,255,0.08)] rounded-[32px] p-10 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-y-auto flex flex-col scrollbar-none"
            >
              {/* Modal Ambient Glow */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 rounded-full blur-[100px] opacity-15 pointer-events-none"
                style={{ background: selectedCard.color }}
              />

              <button 
                onClick={() => {
                  if (activeTab && selectedCard?.title !== 'Startups' && selectedCard?.title !== 'Campus Tours' && selectedCard?.title !== 'ELC Projects') {
                    setActiveTab(null);
                    setActiveVideo(null);
                  } else {
                    setActiveTab(null);
                    setActiveVideo(null);
                    setSelectedCard(null);
                  }
                  setIsUploading(false);
                }}
                className="absolute top-10 right-10 text-[rgba(255,255,255,0.3)] hover:text-white transition-all hover:rotate-90 z-20"
              >
                {activeTab && selectedCard?.title !== 'Startups' && selectedCard?.title !== 'Campus Tours' && selectedCard?.title !== 'ELC Projects' ? <ArrowLeft size={24} /> : <X size={24} />}
              </button>

              <div className="flex flex-col gap-1 mb-10 relative z-10">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: selectedCard.color }}>
                  {selectedCard.subtitle}
                </span>
                <h2 className="text-4xl font-light tracking-tight">{selectedCard.title}</h2>
              </div>
              <div className="flex flex-col relative z-10 w-full flex-1">
                {!activeTab ? (
                  /* Department Grid View */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-4">
                    {DEPARTMENTS_DATA.map((dept, index) => (
                      <motion.div
                        key={dept.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <DepartmentCard 
                          dept={dept} 
                          onClick={(card) => handleDepartmentClick(card.subtitle)} 
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Video Showcase Area */
                  <div className="w-full flex flex-col">
                    <div className="mb-6 flex justify-between items-end">
                      <div>
                        <h3 className="text-xl font-medium text-white mb-2">{activeTab}</h3>
                        <p className="text-white/40 text-sm">Event showcase and highlights.</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/50">4K FEED</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-[#0078FF]">LIVE</span>
                      </div>
                    </div>

                    {/* Main Video Player Container */}
                    <div 
                      className="w-full h-[45vh] lg:h-[50vh] max-h-[500px] shrink-0 rounded-[24px] overflow-hidden relative group bg-[rgba(0,0,0,0.5)] border border-white/10 shadow-2xl mb-4"
                    >
                      {activeVideo ? (
                        <>
                          {activeVideo.url.match(/\.(jpeg|jpg|gif|png)$/i) != null ? (
                            <img 
                              key={activeVideo.url}
                              src={activeVideo.url}
                              alt={activeVideo.title}
                              className="absolute inset-0 w-full h-full object-contain z-10 bg-black"
                            />
                          ) : (
                            <video 
                              key={activeVideo.url} // Force re-mount on source change
                              autoPlay 
                              controls 
                              className="absolute inset-0 w-full h-full object-contain z-10 bg-black"
                            >
                              <source src={activeVideo.url} type="video/mp4" />
                            </video>
                          )}
                          {/* Fake overlay for controls when not playing - optional, but let's just use native controls for actual videos */}
                        </>
                      ) : (
                        <>
                          {/* Placeholder for when no video is loaded */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                             <PlayCircle size={48} className="text-white/20 mb-4" />
                             <p className="text-white/40 font-light tracking-widest uppercase text-sm">NO SIGNAL DETECTED</p>
                             <p className="text-white/20 text-[10px] font-mono mt-2">WAITING FOR BACKEND FEED...</p>
                          </div>
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-20" />
                          
                          {/* Fake Video Controls */}
                          <div className="absolute bottom-0 left-0 w-full p-6 z-30 opacity-50 flex flex-col gap-4 pointer-events-none">
                             <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                               <div className="h-full w-0 bg-[#14D8FF] rounded-full" />
                             </div>
                             <div className="flex justify-between items-center text-white">
                               <div className="flex items-center gap-4">
                                 <PlayCircle size={20} className="text-white/50" />
                                 <span className="text-xs font-mono text-white/50">00:00 / 00:00</span>
                               </div>
                               <span className="text-[10px] tracking-widest font-bold uppercase text-white/30">SECURE LINK 01</span>
                             </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Playlist / Multiple Videos */}
                    <div className="flex flex-col mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">Archived Sequences</span>
                        <span className="text-[10px] font-mono text-white/30">
                          {DEPARTMENT_VIDEOS[activeTab] ? DEPARTMENT_VIDEOS[activeTab].length : 0} FILES
                        </span>
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent min-h-[100px]">
                        {DEPARTMENT_VIDEOS[activeTab] ? (
                          DEPARTMENT_VIDEOS[activeTab].map((video, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setActiveVideo(video)}
                              className={`w-[160px] shrink-0 h-[90px] bg-white/5 border rounded-2xl relative overflow-hidden group cursor-pointer transition-all ${activeVideo?.url === video.url ? 'border-[#0078FF] shadow-[0_0_15px_rgba(0,120,255,0.4)]' : 'border-white/10 hover:border-white/30'}`}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle size={24} className={`${activeVideo?.url === video.url ? 'text-[#0078FF]' : 'text-white/30 group-hover:text-white/80'} transition-colors`} />
                              </div>
                              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
                                <p className={`text-[10px] font-mono ${activeVideo?.url === video.url ? 'text-[#0078FF]' : 'text-white/60'} truncate`}>{video.title}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          // Placeholders if no videos
                          [1, 2, 3].map((item) => (
                            <div key={item} className="w-[160px] shrink-0 h-[90px] bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group pointer-events-none">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle size={24} className="text-white/10" />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
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
