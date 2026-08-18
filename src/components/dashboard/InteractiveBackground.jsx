import React, { useEffect, useRef } from 'react';

/**
 * Ambient backdrop for the dashboard.
 *
 * This used to run a React Three Fiber point-wave — 8100 vertices rebuilt on
 * the CPU every frame for something you could barely see behind the fog. It is
 * a 2D canvas starfield plus a few drifting colour fields now: constantly in
 * motion, visibly so, and a fraction of the cost.
 */

const STAR_LAYERS = [
  { count: 70, speed: 0.05, radius: [0.5, 1.1], alpha: [0.18, 0.4] },
  { count: 45, speed: 0.10, radius: [0.9, 1.7], alpha: [0.3, 0.6] },
  { count: 22, speed: 0.17, radius: [1.4, 2.4], alpha: [0.5, 0.9] },
];

const Starfield = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;
    let stars = [];
    let w = 0;
    let h = 0;

    const rand = ([min, max]) => min + Math.random() * (max - min);

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = [];
      STAR_LAYERS.forEach((layer, depth) => {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: rand(layer.radius),
            a: rand(layer.alpha),
            speed: layer.speed,
            depth,
            // Each star breathes on its own clock so the field never pulses in unison.
            phase: Math.random() * Math.PI * 2,
            twinkle: 0.4 + Math.random() * 0.6,
          });
        }
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      // Parallax: nearer layers lean further with the cursor.
      const px = (pointer.current.x - 0.5) * 2;
      const py = (pointer.current.y - 0.5) * 2;

      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < -4) {
          s.y = h + 4;
          s.x = Math.random() * w;
        }

        const shift = (s.depth + 1) * 6;
        const x = s.x + px * shift;
        const y = s.y + py * shift;

        const alpha = s.a * (0.65 + 0.35 * Math.sin(t * 0.0012 * s.twinkle + s.phase));

        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    const onPointer = (e) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = e.clientY / window.innerHeight;
    };

    build();
    frame = requestAnimationFrame(draw);
    window.addEventListener('resize', build);
    window.addEventListener('pointermove', onPointer);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', build);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#02060f]">
      {/* Keyframes live with the component rather than polluting the global sheet */}
      <style>{`
        @keyframes cvDriftA { 0%,100% { transform: translate3d(-6%, -4%, 0) scale(1); } 50% { transform: translate3d(8%, 6%, 0) scale(1.18); } }
        @keyframes cvDriftB { 0%,100% { transform: translate3d(6%, 4%, 0) scale(1.12); } 50% { transform: translate3d(-8%, -6%, 0) scale(1); } }
        @keyframes cvDriftC { 0%,100% { transform: translate3d(0, 6%, 0) scale(1.05); } 50% { transform: translate3d(5%, -8%, 0) scale(1.25); } }
      `}</style>

      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0d2547_0%,#050e21_48%,#01040c_100%)]" />

      {/* Slow colour fields. Long, offset durations mean they never line up
          into an obvious loop. */}
      <div
        className="absolute -left-[15%] top-[-10%] h-[70vh] w-[70vw] rounded-full opacity-[0.30] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent 68%)', animation: 'cvDriftA 26s ease-in-out infinite' }}
      />
      <div
        className="absolute -right-[10%] top-[15%] h-[60vh] w-[55vw] rounded-full opacity-[0.24] blur-[130px]"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 68%)', animation: 'cvDriftB 34s ease-in-out infinite' }}
      />
      <div
        className="absolute bottom-[-20%] left-[25%] h-[60vh] w-[60vw] rounded-full opacity-[0.18] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #67e8f9, transparent 70%)', animation: 'cvDriftC 42s ease-in-out infinite' }}
      />

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

      <Starfield />

      {/* Vignette, so page content stays dominant */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(1,4,12,0.88)_100%)]" />
    </div>
  );
}
