import React from 'react';
import { DriftKeyframes, DriftBlob, Starfield } from '../AmbientField';

/**
 * Ambient backdrop for the dashboard.
 *
 * This used to run a React Three Fiber point-wave — 8100 vertices rebuilt on
 * the CPU every frame for something you could barely see behind the fog. It is
 * a 2D canvas starfield plus a few drifting colour fields now: constantly in
 * motion, visibly so, and a fraction of the cost. The drift/starfield pieces
 * live in AmbientField.jsx so the landing page's panels can reuse them.
 */

const STAR_LAYERS = [
  { count: 70, speed: 0.05, radius: [0.5, 1.1], alpha: [0.18, 0.4] },
  { count: 45, speed: 0.10, radius: [0.9, 1.7], alpha: [0.3, 0.6] },
  { count: 22, speed: 0.17, radius: [1.4, 2.4], alpha: [0.5, 0.9] },
];

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#02060f]">
      <DriftKeyframes />

      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0d2547_0%,#050e21_48%,#01040c_100%)]" />

      {/* Slow colour fields. Long, offset durations mean they never line up
          into an obvious loop. */}
      <DriftBlob preset="a" color="#0ea5e9" opacity={0.30} className="-left-[15%] top-[-10%] h-[70vh] w-[70vw]" />
      <DriftBlob preset="b" color="#3b82f6" opacity={0.24} className="-right-[10%] top-[15%] h-[60vh] w-[55vw]" />
      <DriftBlob preset="c" color="#67e8f9" opacity={0.18} blur={140} className="bottom-[-20%] left-[25%] h-[60vh] w-[60vw]" />

      {/* Survey grid, giving the space a floor */}
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          maskImage: 'radial-gradient(ellipse at center, black 5%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 5%, transparent 70%)',
        }}
      />

      <Starfield layers={STAR_LAYERS} />

      {/* Vignette, so page content stays dominant */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(1,4,12,0.88)_100%)]" />
    </div>
  );
}
