import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles } from 'lucide-react';

const LinkedInIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.47 1.47 0 1 0 0-2.94 1.47 1.47 0 0 0 0 2.94m1.39 9.74v-8.37H5.07v8.37z" />
  </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const TEAM_MEMBERS = [
  {
    id: 'satvik',
    name: 'Satvik Ganda',
    role: 'Lead Spatial & Full-Stack Developer',
    bio: 'Architected the React Three Fiber WebGL pipeline, dynamic kiosk integration & 3D digital twin interactions.',
    avatar: 'https://github.com/Satvik-4web.png',
    github: 'https://github.com/Satvik-4web',
    linkedin: 'https://www.linkedin.com/in/satvik-ganda/',
    accent: '#38bdf8',
    tags: ['Three.js', 'WebGL', 'React', 'Framer Motion'],
  },
  {
    id: 'teammate',
    name: 'Teammate',
    role: 'Co-Developer & Spatial Systems',
    bio: 'Spearheaded 3D asset engineering, VR headset workflows & interactive experience design.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    accent: '#818cf8',
    tags: ['VR Systems', '3D Modeling', 'UI/UX', 'System Design'],
  },
];

export default function TeamModal({ isOpen, onClose, members = TEAM_MEMBERS }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020510]/85 backdrop-blur-xl transition-all"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d2244]/90 via-[#050d1e]/95 to-[#01040a]/98 p-6 sm:p-10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_-10px_rgba(56,189,248,0.25)] backdrop-blur-3xl z-10"
        >
          {/* Top accent glow line */}
          <span className="pointer-events-none absolute inset-x-20 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-80" />

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-white hover:scale-105 cursor-pointer z-20"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-950/50 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles size={11} className="text-sky-400 animate-pulse" />
              Core Architects
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-white">
              The Minds Behind{' '}
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                Campus Verse
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl font-light leading-relaxed">
              Designed, built, and optimized for interactive spatial computing, seamless WebGL performance, and next-generation campus exploration.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                style={{ '--accent': member.accent }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--accent)]/50 hover:bg-white/[0.04] hover:shadow-[0_20px_45px_-12px_color-mix(in_srgb,var(--accent)_30%,transparent)]"
              >
                {/* Background glow spot */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                  style={{ background: member.accent }}
                />

                <div>
                  {/* Top Row: Avatar & Status */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="relative">
                      {/* Avatar container with glowing ring */}
                      <div className="relative h-20 w-20 sm:h-22 sm:w-22 rounded-2xl overflow-hidden border-2 border-white/20 p-0.5 transition-all duration-500 group-hover:border-[var(--accent)] group-hover:shadow-[0_0_25px_var(--accent)]">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-full w-full object-cover rounded-[14px] bg-slate-900 transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </div>
                      {/* Online beacon */}
                      <span
                        className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#050d1e] animate-pulse"
                        style={{ background: member.accent, boxShadow: `0 0 10px ${member.accent}` }}
                      />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-sky-100 transition-colors">
                        {member.name}
                      </h3>
                      <p
                        className="mt-0.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em]"
                        style={{ color: member.accent }}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mt-5 text-xs sm:text-[13px] text-slate-300/90 font-light leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Tech Tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[9px] font-mono tracking-wider text-slate-400 group-hover:border-white/15 group-hover:text-slate-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Action Links */}
                <div className="mt-6 sm:mt-7 flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-[#0077b5]/15 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-sky-200 shadow-sm transition-all duration-300 hover:border-sky-400 hover:bg-[#0077b5]/30 hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    >
                      <LinkedInIcon className="w-4 h-4 text-sky-400" />
                      <span>LinkedIn</span>
                      <ExternalLink size={11} className="opacity-60 ml-0.5" />
                    </a>
                  )}

                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-200 shadow-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub</span>
                      <ExternalLink size={11} className="opacity-60 ml-0.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
