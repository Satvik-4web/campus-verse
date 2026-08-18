import React from 'react';

/**
 * Dark-theme adaptations of the Campus Verse / ELC brand marks.
 *
 * The supplied artwork is navy-and-red on white, which turns to mud on a deep
 * navy glass panel, so each mark keeps its structure — ELC's three tilted
 * blocks, the headset inside its node lattice — and is re-cut in the sky ramp
 * used across the site. Drawn as SVG rather than bitmaps so they stay sharp on
 * any display and can pick up the card's hover glow.
 */

/** Three tilted blocks, as on the ELC lockup. */
export const ElcMark = ({ size = 96, className = '' }) => (
  <svg
    width={size}
    height={size * 0.5}
    viewBox="0 0 132 64"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="ELC"
  >
    <defs>
      <linearGradient id="elcBlockFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>

    {[
      { x: 2, letter: 'E', rot: -7 },
      { x: 47, letter: 'L', rot: 2.5 },
      { x: 92, letter: 'C', rot: -4.5 },
    ].map(({ x, letter, rot }) => (
      <g key={letter} transform={`rotate(${rot} ${x + 19} 32)`}>
        <rect
          x={x}
          y={13}
          width={38}
          height={38}
          rx={2.5}
          fill="url(#elcBlockFill)"
          stroke="#7dd3fc"
          strokeOpacity={0.45}
          strokeWidth={1}
        />
        <text
          x={x + 19}
          y={32}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ffffff"
          fontSize={25}
          fontWeight={700}
          fontFamily="Inter, system-ui, sans-serif"
        >
          {letter}
        </text>
      </g>
    ))}
  </svg>
);

/** Headset inside the node lattice, as on the Campus Verse lockup. */
export const CampusVerseMark = ({ size = 96, className = '' }) => {
  const cx = 60;
  const cy = 48;
  const nodes = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + Math.cos(rad) * 42, y: cy + Math.sin(rad) * 38 };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 96"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Campus Verse"
    >
      <defs>
        {/* Dark goggle shell, as in the lockup */}
        <linearGradient id="cvShell" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12224a" />
          <stop offset="100%" stopColor="#0a1330" />
        </linearGradient>
        {/* The lit visor panel — the bright cyan band that carries the mark */}
        <linearGradient id="cvVisor" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="55%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Lattice: hexagon ring, spokes into the headset, nodes on each vertex */}
      <polygon
        points={nodes.map((n) => `${n.x},${n.y}`).join(' ')}
        stroke="#38bdf8"
        strokeOpacity={0.3}
        strokeWidth={1}
        fill="none"
      />
      {nodes.map((n, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="#38bdf8" strokeOpacity={0.18} strokeWidth={1} />
          <circle cx={n.x} cy={n.y} r={3.6} fill="#7dd3fc" fillOpacity={0.95} />
          <circle cx={n.x} cy={n.y} r={6} fill="#38bdf8" fillOpacity={0.14} />
        </g>
      ))}

      {/* Headset: goggle body, two lenses, side straps */}
      <path d="M24 44 H18 a3 3 0 0 0 -3 3 v6 a3 3 0 0 0 3 3 h6" stroke="#38bdf8" strokeWidth={2} strokeLinecap="round" />
      <path d="M96 44 h6 a3 3 0 0 1 3 3 v6 a3 3 0 0 1 -3 3 h-6" stroke="#38bdf8" strokeWidth={2} strokeLinecap="round" />

      {/* Shell, then the lit visor inset into it */}
      <rect x={24} y={34} width={72} height={32} rx={13} fill="url(#cvShell)" stroke="#7dd3fc" strokeOpacity={0.85} strokeWidth={1.8} />
      <rect x={30} y={40} width={60} height={17} rx={8.5} fill="url(#cvVisor)" />
      {/* Specular streak across the visor */}
      <path d="M35 45 q11 -3 22 -1" stroke="#e0f2fe" strokeOpacity={0.65} strokeWidth={2} strokeLinecap="round" fill="none" />
      {/* Nose notch along the lower edge */}
      <path d="M53 66 q7 5 14 0" stroke="#7dd3fc" strokeOpacity={0.7} strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </svg>
  );
};

/** Controller mark for the VR arcade tile. */
export const VrGamesMark = ({ size = 96, className = '' }) => (
  <svg
    width={size}
    height={size * 0.72}
    viewBox="0 0 120 86"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="VR Games"
  >
    <defs>
      <linearGradient id="padFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.28} />
        <stop offset="100%" stopColor="#1e3a8a" stopOpacity={0.18} />
      </linearGradient>
    </defs>

    {/* Body: two grips joined by a bridge */}
    <path
      d="M40 26 h40 a26 26 0 0 1 24 17 l8 22 a12 12 0 0 1 -21 11 l-11 -14 h-42 l-11 14 a12 12 0 0 1 -21 -11 l8 -22 a26 26 0 0 1 24 -17 z"
      fill="url(#padFill)"
      stroke="#38bdf8"
      strokeWidth={2.2}
      strokeLinejoin="round"
    />

    {/* D-pad */}
    <path d="M34 46 h14 M41 39 v14" stroke="#7dd3fc" strokeWidth={3.4} strokeLinecap="round" />

    {/* Face buttons */}
    <circle cx={81} cy={41} r={4.2} fill="#7dd3fc" />
    <circle cx={90} cy={50} r={4.2} fill="#7dd3fc" fillOpacity={0.65} />

    {/* Status bar, echoes the headset's indicator strip */}
    <rect x={53} y={44} width={14} height={3.4} rx={1.7} fill="#38bdf8" fillOpacity={0.75} />
  </svg>
);
