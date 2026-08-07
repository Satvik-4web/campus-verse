import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import KioskModel from '../components/about/KioskModel';

const About = () => {
  return (
    <div className="relative w-screen min-h-screen bg-[#040a18] text-white font-sans overflow-x-hidden">
      {/* Background Video with Dark Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-0 w-full h-full object-cover opacity-50"
      >
        <source src="/about_bg.mp4" type="video/mp4" />
      </video>
      {/* Top and Bottom dark gradients to seamlessly blend the video into the UI */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#040a18] via-[#040a18]/40 to-[#040a18] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-12 flex flex-col min-h-screen">
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span className="text-sm font-semibold tracking-widest uppercase">Back to Hub</span>
          </Link>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-2 tracking-tight">
            ABOUT US
          </h1>
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#3a7bd5]">
            CAMPUS VERSE
          </h2>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Information Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 max-w-xl"
          >
            {/* Card 1: Our Mission */}
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-white/80 leading-relaxed mb-6 font-medium">
                An immersive <span className="text-[#00d2ff] font-semibold">spatial computing platform</span> bridging the physical and digital worlds. We leverage cutting-edge VR to deliver 360-degree explorations of campus life.
              </p>
              
              <p className="text-white/60 leading-relaxed text-sm">
                Our mission is simple: transform passive observation into active engagement.
              </p>
            </div>

            {/* Card 2: Powered by ELC */}
            <div className="bg-black/40 backdrop-blur-md rounded-3xl p-10 border border-white/5 shadow-2xl relative">
              {/* Subtle top-right accent */}
              <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/20"></div>
              
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"></div>
                Powered by ELC
              </h2>
              
              <p className="text-white/80 leading-relaxed mb-8 font-medium">
                A flagship ECED initiative dedicated to hands-on innovation and experiential learning.
              </p>
              
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-sm font-mono text-[#00d2ff]">
                    01
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Bridging Theory & Practice</h3>
                    <p className="text-white/50 text-sm">Empowering students to transcend classroom boundaries.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-sm font-mono text-[#00d2ff]">
                    02
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Creative Freedom</h3>
                    <p className="text-white/50 text-sm">Providing resources to tackle cutting-edge challenges.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Explore Dashboard Button */}
            <Link 
              to="/dashboard" 
              className="mt-4 py-5 w-full bg-[#00d2ff] hover:bg-white text-[#040a18] font-bold text-sm tracking-[0.3em] uppercase rounded-2xl transition-colors shadow-[0_0_30px_rgba(0,210,255,0.3)] flex justify-center items-center hover:shadow-[0_0_40px_rgba(255,255,255,0.5)]"
            >
              Explore Dashboard
            </Link>

          </motion.div>

          {/* Right Column - Kiosk Image / 3D Model */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center items-center h-[700px] w-full"
          >
            <KioskModel />
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
