import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import InteractiveBackground from '../../components/dashboard/InteractiveBackground';
import FacultyCard from './components/FacultyCard';
import { FACULTY_DATA } from '../../data/faculty';

export const FacultyPage = () => {
  return (
    <div className="relative w-screen min-h-screen text-white font-sans overflow-x-hidden selection:bg-sky-400/30">
      <InteractiveBackground />

      {/* Header */}
      <header className="relative z-10 w-full px-12 pt-16 pb-8 flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-all group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Return to Root</span>
          </Link>
          
          <div className="mt-2">
            <h1 className="text-5xl md:text-6xl font-light tracking-[0.1em] text-white flex items-center gap-2">
              ELC<span className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-200 to-sky-500 drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">FACULTY</span>
            </h1>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-[1px] bg-white/20" />
              <h2 className="text-[11px] font-semibold tracking-[0.5em] uppercase text-white/50">
                Experiential Learning Centre Innovators
              </h2>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="relative z-10 w-full px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {FACULTY_DATA.map((person, index) => (
            <FacultyCard key={person.email || index} person={person} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FacultyPage;
