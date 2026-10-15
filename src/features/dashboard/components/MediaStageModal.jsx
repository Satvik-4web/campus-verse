import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X, ImageIcon } from 'lucide-react';
import DepartmentCard from './DepartmentCard';
import MediaThumb from './MediaThumb';
import { DEPARTMENTS_DATA } from '../../../data/departments';

const isImage = (url) => /\.(jpe?g|gif|png|webp)$/i.test(url);

export const MediaStageModal = ({
  selectedCard,
  activeTab,
  activeVideo,
  playlist,
  canStepBack,
  onDismiss,
  onSelectDepartment,
  onSelectVideo
}) => {
  if (!selectedCard) return null;

  return (
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

        {/* Modal Header */}
        <div className="relative z-10 flex shrink-0 items-start justify-between gap-6 border-b border-white/[0.06] px-7 py-6 sm:px-10">
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.34em]" style={{ color: selectedCard.color }}>
              {canStepBack ? selectedCard.title : selectedCard.subtitle}
            </span>
            <h2 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
              {canStepBack ? activeTab : selectedCard.title}
            </h2>
          </div>

          <button
            onClick={onDismiss}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-all hover:border-sky-400/40 hover:text-white cursor-pointer"
          >
            {canStepBack ? <ArrowLeft size={16} /> : <X size={16} />}
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 flex-1 overflow-y-auto px-7 py-7 sm:px-10">
          {!activeTab ? (
            <div className="grid grid-cols-1 gap-5 landscape:grid-cols-2 landscape:lg:grid-cols-4 portrait:sm:grid-cols-2">
              {DEPARTMENTS_DATA.map((dept, index) => (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <DepartmentCard dept={dept} index={index} onClick={(d) => onSelectDepartment(d.subtitle)} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex w-full flex-col">
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
                    {playlist.map((item) => (
                      <MediaThumb
                        key={item.url}
                        media={item}
                        active={activeVideo?.url === item.url}
                        onSelect={() => onSelectVideo(item)}
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
  );
};

export default MediaStageModal;
