import React, { useEffect, useRef } from 'react';

/**
 * Shared pieces of the "drifting colour fields + canvas starfield" backdrop
 * first built for the dashboard. Pulled out here so the landing page's DOM
 * panels (About / Explore) can reuse the same dynamic backdrop instead of
 * sitting on the plain gradient + sparse dots that were there before —
 * without duplicating the animation logic.
 */

/** Three long, offset drift keyframes shared by every consumer, defined once. */
export const DriftKeyframes = () => (
  <style>{`
    @keyframes cvDriftA { 0%,100% { transform: translate3d(-6%, -4%, 0) scale(1); } 50% { transform: translate3d(8%, 6%, 0) scale(1.18); } }
    @keyframes cvDriftB { 0%,100% { transform: translate3d(6%, 4%, 0) scale(1.12); } 50% { transform: translate3d(-8%, -6%, 0) scale(1); } }
    @keyframes cvDriftC { 0%,100% { transform: translate3d(0, 6%, 0) scale(1.05); } 50% { transform: translate3d(5%, -8%, 0) scale(1.25); } }
  `}</style>
);

const PRESETS = {
  a: { animation: 'cvDriftA 26s ease-in-out infinite' },
  b: { animation: 'cvDriftB 34s ease-in-out infinite' },
  c: { animation: 'cvDriftC 42s ease-in-out infinite' },
};

/** One soft, slowly drifting colour field. */
export const DriftBlob = ({ preset, color, opacity, blur = 130, className = '', style }) => (
  <div
    className={`absolute rounded-full ${className}`}
    style={{
      background: `radial-gradient(circle, ${color}, transparent 68%)`,
      opacity,
      filter: `blur(${blur}px)`,
      ...PRESETS[preset],
      ...style,
    }}
  />
);

/**
 * Canvas starfield: layered points drifting upward, each twinkling on its own
 * clock so the field never pulses in unison, with cursor parallax by depth.
 */
export const Starfield = ({ layers, rgb = '186, 230, 253', className = '' }) => {
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
      layers.forEach((layer, depth) => {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: rand(layer.radius),
            a: rand(layer.alpha),
            speed: layer.speed,
            depth,
            phase: Math.random() * Math.PI * 2,
            twinkle: 0.4 + Math.random() * 0.6,
          });
        }
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

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
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
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
  }, [layers, rgb]);

  return <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${className}`} />;
};
