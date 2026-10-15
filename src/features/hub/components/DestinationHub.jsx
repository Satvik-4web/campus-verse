import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import HubCard from './HubCard';
import { ElcMark, CampusVerseMark, VrGamesMark } from '../../../components/BrandMarks';
import { HUB_ITEMS } from '../../../data/hub';

const MARKS = {
  elc: ElcMark,
  campus: CampusVerseMark,
  vr: VrGamesMark,
};

export const DestinationHub = ({ smoothScroll, hubReady, triggerTransition, onSelect }) => {
  const hubLabelOpacity = useTransform(smoothScroll, [0.5, 0.66], [0, 1]);
  const hubLabelY = useTransform(smoothScroll, [0.5, 0.66], [24, 0]);

  const cardsWithMarks = HUB_ITEMS.map(item => ({
    ...item,
    Mark: MARKS[item.markKey] || CampusVerseMark,
  }));

  return (
    <div className="w-full max-w-[1120px] px-2 sm:px-4">
      <motion.div
        style={{ opacity: hubLabelOpacity, y: hubLabelY }}
        className="mb-7 flex flex-col items-center sm:mb-10"
      >
        {hubReady && (
          <button
            type="button"
            onClick={() => triggerTransition && triggerTransition(-1)}
            className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-950/60 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300 hover:border-sky-400/80 hover:bg-sky-900/80 hover:text-white transition-all cursor-pointer pointer-events-auto shadow-[0_0_15px_rgba(56,189,248,0.2)]"
          >
            <ChevronUp size={13} />
            Back to 3D View
          </button>
        )}
        <span className="flex items-center gap-4">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-400/50 sm:w-16" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.34em] text-sky-300/80">
            Select a destination
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-sky-400/50 sm:w-16" />
        </span>
        <span className="mt-3 text-[11px] font-light tracking-[0.06em] text-slate-500">
          Three ways into the digital twin
        </span>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 landscape:sm:grid-cols-3 sm:gap-6 lg:gap-8">
        {cardsWithMarks.map((card, i) => (
          <HubCard
            key={card.id}
            card={card}
            index={i}
            smoothScroll={smoothScroll}
            interactive={hubReady}
            onSelect={() => onSelect(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DestinationHub;
