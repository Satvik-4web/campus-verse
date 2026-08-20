import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionValueEvent, useTransform } from 'framer-motion';
import Scene from '../components/Scene';
import UIOverlay from '../components/UIOverlay';
import { DriftKeyframes, DriftBlob, Starfield } from '../components/AmbientField';

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// Tuned against real hardware: ~22 mouse notches walks the whole sequence, so
// the cinematic has room to breathe instead of being over in a flick.
const SCROLL_SPEED = 0.00046;
// Per-event ceiling. A violent trackpad flick fires huge deltas and used to
// teleport past the whole animation in one frame.
const MAX_STEP = 0.046;
const TOUCH_GAIN = 3.6;

function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const scrollProgress = useMotionValue(0);
  // Overdamped (ratio ~1.45): glides to rest without ever overshooting, so the
  // headset sequence never springs backwards at the end of a flick.
  const smoothScroll = useSpring(scrollProgress, {
    stiffness: 80,
    damping: 26,
    mass: 1,
    restDelta: 0.0001,
  });

  const [menuState, setMenuState] = useState('home');
  const [activeView, setActiveView] = useState('home'); // 'home', 'about', 'explore'
  // Drives the wireframe + glitch pass in Scene. Nothing triggers it now that
  // the SYSTEM READY button is gone, but the wiring stays so it can be driven
  // again later without rebuilding that path.
  const isTransitioning = false;

  const containerRef = useRef(null);
  const touchLastY = useRef(0);
  const activeViewRef = useRef(activeView);

  useEffect(() => {
    activeViewRef.current = activeView;
    // The wheel listener below only drives scrollProgress on 'home'. Pin it to
    // the end the instant a DOM panel takes over, so the headset is guaranteed
    // fully dissolved and docked rather than wherever it happened to settle —
    // otherwise scrolling inside the panel used to drag it back into frame.
    if (activeView !== 'home') scrollProgress.set(1);
  }, [activeView, scrollProgress]);

  // Update menuState specifically for the 2D UI overlay based on smooth scroll
  useMotionValueEvent(smoothScroll, "change", (latest) => {
    if (latest < 0.3) {
      if (menuState !== 'home') setMenuState('home');
    } else if (latest < 0.7) {
      if (menuState !== 'pipes') setMenuState('pipes');
    } else {
      if (menuState !== 'logos') setMenuState('logos');
    }
  });

  // Smooth out the mouse movement for the background text parallax
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });
  const rotateXSpring = useSpring(rotateX, { stiffness: 50, damping: 20 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 50, damping: 20 });

  // Fade out background text gracefully as we scroll in
  const bgOpacity = useTransform(smoothScroll, [0.04, 0.36], [1, 0]);

  // Detonation flash. Peaks the instant the headset lets go, which hides the
  // hand-off between the 3D burst and the panels arriving.
  const flashOpacity = useTransform(smoothScroll, [0.5, 0.68, 0.88], [0, 0.16, 0]);

  const handleMouseMove = (e) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;

    // Parallax movement
    x.set(normX * -60);
    y.set(normY * -60);

    // 3D Tilt effect
    rotateX.set(normY * 15);
    rotateY.set(normX * -15);
  };

  /** Single clamped, device-normalised way to advance the sequence. */
  const advance = useCallback((deltaPx) => {
    const step = clamp(deltaPx * SCROLL_SPEED, -MAX_STEP, MAX_STEP);
    scrollProgress.set(clamp(scrollProgress.get() + step, 0, 1));
  }, [scrollProgress]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Registered manually rather than via onWheel/onTouchMove props: React
    // attaches those passively, so preventDefault is ignored and the browser
    // still fires its own overscroll / swipe-to-go-back over the scrub.
    const onWheel = (e) => {
      // Once a DOM panel (About/Explore) is open, this listener steps aside
      // entirely: no preventDefault, no advance(). Previously it always fired,
      // so scrolling inside a panel also dragged the headset back into frame
      // behind it and blocked the panel's own overflow-y-auto from receiving
      // wheel input at all.
      if (activeViewRef.current !== 'home') return;
      e.preventDefault();
      // deltaMode 0 = pixels, 1 = lines, 2 = pages. Firefox mouse wheels report
      // lines while trackpads report pixels, so normalise before scaling —
      // otherwise the same gesture moves ~16x further on one browser.
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      advance(e.deltaY * unit);
    };

    const onTouchStart = (e) => {
      touchLastY.current = e.touches[0].clientY;
    };

    // Continuous, so the scene tracks the finger instead of jumping once on release.
    const onTouchMove = (e) => {
      if (activeViewRef.current !== 'home') return;
      e.preventDefault();
      const yNow = e.touches[0].clientY;
      advance((touchLastY.current - yNow) * TOUCH_GAIN);
      touchLastY.current = yNow;
    };

    const onKeyDown = (e) => {
      if (activeViewRef.current !== 'home') return;
      // Let the overlay's own controls keep their keyboard behaviour.
      if (e.target.closest && e.target.closest('button, a, input, textarea')) return;
      const jump = { ArrowDown: 420, PageDown: 1300, ' ': 1300, ArrowUp: -420, PageUp: -1300 }[e.key];
      if (jump !== undefined) {
        e.preventDefault();
        advance(jump);
      } else if (e.key === 'Home') {
        scrollProgress.set(0);
      } else if (e.key === 'End') {
        scrollProgress.set(1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [advance, scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden perspective-1000 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0e2547] via-[#050e21] to-[#01040c]"
      onMouseMove={handleMouseMove}
      style={{
        perspective: '1000px',
        // The scrub owns the gesture; stop mobile Safari/Chrome from also
        // panning or triggering pull-to-refresh underneath it.
        touchAction: 'none',
        overscrollBehavior: 'none',
      }}
    >

      {/* Background Huge Text - Placed BEHIND the 3D Canvas */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          opacity: bgOpacity,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Vertical fade instead of a flat 20% tint — the letters sink into the
            background at the base rather than sitting on it as solid blocks. */}
        <h1 className="flex flex-col items-center justify-center font-bold tracking-[0.15em] select-none leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-sky-400/45 via-sky-500/25 to-sky-600/10 drop-shadow-[0_0_45px_rgba(56,189,248,0.18)]">
          <span className="text-[14vw]">CAMPUS</span>
          <span className="text-[14vw]">VERSE</span>
        </h1>
      </motion.div>

      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Canvas gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 8], fov: 45 }}>
          <Scene menuState={menuState} smoothScroll={smoothScroll} isTransitioning={isTransitioning} />
        </Canvas>
      </div>

      {/* Ambient backdrop for the About / Explore panels. The panels used to
          sit on a plain radial gradient plus a sparse dot field once the
          headset had dissolved out of frame — flat next to the glass. This
          fades in behind them only: slow drifting colour fields plus a
          canvas starfield, transparent so it composites over the existing
          gradient and 3D canvas rather than covering them. */}
      <AnimatePresence>
        {activeView !== 'home' && (
          <motion.div
            key="hub-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-[15] overflow-hidden pointer-events-none"
          >
            <DriftKeyframes />
            <DriftBlob preset="a" color="#38bdf8" opacity={0.16} blur={160} className="-left-[10%] top-[-15%] h-[65vh] w-[65vw]" />
            <DriftBlob preset="b" color="#3b82f6" opacity={0.14} blur={170} className="-right-[8%] bottom-[-10%] h-[60vh] w-[55vw]" />
            <Starfield
              layers={[
                { count: 55, speed: 0.045, radius: [0.5, 1.0], alpha: [0.15, 0.35] },
                { count: 30, speed: 0.09, radius: [0.9, 1.6], alpha: [0.25, 0.5] },
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burst flash — screen-blended so it blows out to white at the centre
          without washing the navy at the edges. */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none mix-blend-screen bg-[radial-gradient(circle_at_center,rgba(186,230,253,0.75),rgba(56,189,248,0.22)_45%,transparent_70%)]"
        style={{ opacity: flashOpacity }}
      />

      {/* 2D UI Overlay */}
      <UIOverlay menuState={menuState} activeView={activeView} setActiveView={setActiveView} smoothScroll={smoothScroll} />
    </div>
  );
}

export default Home;
