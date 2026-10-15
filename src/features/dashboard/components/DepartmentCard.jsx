import React from 'react';
import { ArrowRight, Film } from 'lucide-react';
import { DEPARTMENT_VIDEOS } from '../../../data/departmentVideos';

export const DepartmentCard = ({ dept, index, onClick }) => {
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

export default DepartmentCard;
