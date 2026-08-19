import * as THREE from 'three';

/**
 * The kiosk's printed panels, drawn to 2D canvases and used as textures.
 *
 * They used to be assembled from dozens of individual <Text> meshes floating a
 * hair above each face, which never lined up and could not do rules, pills,
 * columns or artwork. Drawing each panel once into a canvas gives real
 * typography and layout, and costs three textures instead of ~60 draw calls.
 */

const NAVY = '#152a6b';
const NAVY_DEEP = '#0f1f52';
const BLUE = '#2f5fd0';
const INK = '#1a1a1a';
const GREY = '#6b7280';
const RULE = '#c9cfda';
const PAPER = '#ffffff';

/** Rounded rectangle path helper — canvas has roundRect only in newer engines. */
const roundRect = (ctx, x, y, w, h, r) => {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
};

const centreText = (ctx, text, x, y, font, colour, tracking = 0) => {
  ctx.font = font;
  ctx.fillStyle = colour;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (!tracking) {
    ctx.fillText(text, x, y);
    return;
  }
  // Manual letter-spacing: ctx.letterSpacing is not universally supported.
  const chars = [...text];
  const width = chars.reduce((w, c) => w + ctx.measureText(c).width + tracking, -tracking);
  let cx = x - width / 2;
  ctx.textAlign = 'left';
  for (const c of chars) {
    ctx.fillText(c, cx, y);
    cx += ctx.measureText(c).width + tracking;
  }
};

/** The headset-in-a-lattice mark that sits beside the wordmark. */
const drawMark = (ctx, cx, cy, s) => {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = s * 0.05;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    const px = Math.cos(a) * s * 0.9;
    const py = Math.sin(a) * s * 0.78;
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.globalAlpha = 1;
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * s * 0.9, Math.sin(a) * s * 0.78, s * 0.09, 0, Math.PI * 2);
    ctx.fillStyle = BLUE;
    ctx.fill();
  }
  // goggles
  ctx.fillStyle = NAVY;
  roundRect(ctx, -s * 0.62, -s * 0.3, s * 1.24, s * 0.6, s * 0.22);
  ctx.fill();
  ctx.fillStyle = '#4da3ff';
  roundRect(ctx, -s * 0.48, -s * 0.16, s * 0.96, s * 0.3, s * 0.15);
  ctx.fill();
  ctx.restore();
};

/* ------------------------------------------------------------------ front */

export const drawFront = (ctx, W, H) => {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  const cx = W / 2;

  // Wordmark: "CAMPUS" set solid, "Verse" in a script face as on the panel.
  ctx.textBaseline = 'middle';
  ctx.font = `700 ${W * 0.088}px Inter, Arial, sans-serif`;
  const campusW = ctx.measureText('CAMPUS').width;
  ctx.font = `italic 700 ${W * 0.125}px "Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive`;
  const verseW = ctx.measureText('Verse').width;

  const markS = W * 0.05;
  const totalW = markS * 2.4 + campusW + verseW;
  let x = cx - totalW / 2;

  drawMark(ctx, x + markS, H * 0.108, markS);
  x += markS * 2.4;

  ctx.textAlign = 'left';
  ctx.font = `700 ${W * 0.088}px Inter, Arial, sans-serif`;
  ctx.fillStyle = NAVY;
  ctx.fillText('CAMPUS', x, H * 0.108);
  x += campusW;

  ctx.font = `italic 700 ${W * 0.125}px "Segoe Script", "Brush Script MT", "Lucida Handwriting", cursive`;
  ctx.fillStyle = BLUE;
  ctx.fillText('Verse', x, H * 0.108);

  centreText(ctx, 'Explore. Experience. Discover.', cx, H * 0.148, `400 ${W * 0.028}px Inter, Arial, sans-serif`, GREY, W * 0.004);
  centreText(ctx, 'An ELC Initiative', cx, H * 0.176, `400 ${W * 0.024}px Inter, Arial, sans-serif`, GREY);

  // Institution lockups
  const logoY = H * 0.235;
  ctx.fillStyle = '#c8102e';
  roundRect(ctx, cx - W * 0.42, logoY - W * 0.032, W * 0.062, W * 0.064, W * 0.008);
  ctx.fill();
  ctx.textAlign = 'left';
  ctx.fillStyle = INK;
  ctx.font = `700 ${W * 0.021}px Inter, Arial, sans-serif`;
  ctx.fillText('THAPAR INSTITUTE OF', cx - W * 0.345, logoY - W * 0.014);
  ctx.fillText('ENGINEERING & TECHNOLOGY', cx - W * 0.345, logoY + W * 0.016);

  // ELC blocks
  const bx = cx + W * 0.10;
  ['E', 'L', 'C'].forEach((ch, i) => {
    ctx.fillStyle = NAVY_DEEP;
    roundRect(ctx, bx + i * W * 0.062, logoY - W * 0.036, W * 0.055, W * 0.072, W * 0.004);
    ctx.fill();
    centreText(ctx, ch, bx + i * W * 0.062 + W * 0.0275, logoY, `700 ${W * 0.046}px Inter, Arial, sans-serif`, PAPER);
  });
  centreText(ctx, 'EXPERIENTIAL LEARNING CENTRE', bx + W * 0.088, logoY + W * 0.056, `700 ${W * 0.015}px Inter, Arial, sans-serif`, '#c8102e');

  // Numbered steps — navy pills on the real panel, not glowing cyan.
  const steps = ['GRAB YOUR VR GEAR', 'CHOOSE YOUR QUEST', 'LOOK • MOVE • DISCOVER'];
  steps.forEach((label, i) => {
    const y = H * 0.365 + i * H * 0.072;
    ctx.fillStyle = NAVY;
    ctx.beginPath();
    ctx.arc(cx - W * 0.335, y, W * 0.032, 0, Math.PI * 2);
    ctx.fill();
    centreText(ctx, String(i + 1), cx - W * 0.335, y, `700 ${W * 0.034}px Inter, Arial, sans-serif`, PAPER);

    ctx.fillStyle = NAVY;
    roundRect(ctx, cx - W * 0.27, y - W * 0.035, W * 0.60, W * 0.07, W * 0.035);
    ctx.fill();
    centreText(ctx, label, cx + W * 0.03, y, `700 ${W * 0.029}px Inter, Arial, sans-serif`, PAPER, W * 0.002);
  });

  centreText(ctx, 'FOR ANY QUERIES:', cx, H * 0.60, `700 ${W * 0.024}px Inter, Arial, sans-serif`, INK, W * 0.003);

  ctx.fillStyle = NAVY;
  roundRect(ctx, cx - W * 0.32, H * 0.628, W * 0.64, W * 0.072, W * 0.036);
  ctx.fill();
  centreText(ctx, '✉  campusverseinfo@gmail.com', cx, H * 0.628 + W * 0.036, `600 ${W * 0.028}px Inter, Arial, sans-serif`, PAPER);
};

/* ------------------------------------------------------------------- left */

/** Silhouette of a head in a headset, as printed on the left panel. */
const drawVrHead = (ctx, cx, cy, s) => {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.strokeStyle = BLUE;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = s * 0.015;
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.95, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // head
  ctx.fillStyle = NAVY_DEEP;
  ctx.beginPath();
  ctx.moveTo(-s * 0.30, s * 0.62);
  ctx.bezierCurveTo(-s * 0.44, s * 0.10, -s * 0.40, -s * 0.52, 0, -s * 0.58);
  ctx.bezierCurveTo(s * 0.36, -s * 0.52, s * 0.42, s * 0.02, s * 0.34, s * 0.30);
  ctx.lineTo(s * 0.24, s * 0.62);
  ctx.closePath();
  ctx.fill();

  // visor
  ctx.fillStyle = BLUE;
  roundRect(ctx, -s * 0.46, -s * 0.28, s * 0.92, s * 0.30, s * 0.12);
  ctx.fill();
  ctx.fillStyle = '#8ec5ff';
  roundRect(ctx, -s * 0.40, -s * 0.24, s * 0.52, s * 0.14, s * 0.07);
  ctx.fill();

  // signal arcs
  ctx.strokeStyle = BLUE;
  ctx.lineWidth = s * 0.03;
  for (let i = 1; i <= 3; i++) {
    ctx.globalAlpha = 0.5 - i * 0.1;
    ctx.beginPath();
    ctx.arc(s * 0.15, -s * 0.15, s * (0.55 + i * 0.16), -Math.PI * 0.42, Math.PI * 0.30);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
};

export const drawLeft = (ctx, W, H, names) => {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2;

  drawVrHead(ctx, cx, H * 0.155, W * 0.30);

  centreText(ctx, 'AN ELC INITIATIVE', cx, H * 0.300, `700 ${W * 0.030}px Inter, Arial, sans-serif`, INK, W * 0.003);
  centreText(ctx, 'UNDER THE GUIDANCE OF', cx, H * 0.330, `700 ${W * 0.030}px Inter, Arial, sans-serif`, INK, W * 0.003);

  const rule = (y) => {
    ctx.strokeStyle = RULE;
    ctx.lineWidth = Math.max(1, W * 0.004);
    ctx.beginPath();
    ctx.moveTo(W * 0.12, y);
    ctx.lineTo(W * 0.88, y);
    ctx.stroke();
  };

  rule(H * 0.356);

  centreText(ctx, 'Dr. Surbhi Sharma', cx - W * 0.20, H * 0.395, `700 ${W * 0.030}px Inter, Arial, sans-serif`, '#8f1d2d');
  centreText(ctx, 'Professor, DECE', cx - W * 0.20, H * 0.423, `600 ${W * 0.025}px Inter, Arial, sans-serif`, '#8f1d2d');
  centreText(ctx, 'Dr. Kulbir Singh', cx + W * 0.20, H * 0.395, `700 ${W * 0.030}px Inter, Arial, sans-serif`, '#8f1d2d');
  centreText(ctx, 'Head, DECE', cx + W * 0.20, H * 0.423, `600 ${W * 0.025}px Inter, Arial, sans-serif`, '#8f1d2d');

  rule(H * 0.452);
  centreText(ctx, 'THE MINDS BEHIND', cx, H * 0.487, `700 ${W * 0.036}px Inter, Arial, sans-serif`, INK, W * 0.004);
  rule(H * 0.518);

  const half = Math.ceil(names.length / 2);
  names.forEach((n, i) => {
    const col = i < half ? -1 : 1;
    const row = i < half ? i : i - half;
    centreText(ctx, n, cx + col * W * 0.21, H * 0.556 + row * H * 0.032, `500 ${W * 0.026}px Inter, Arial, sans-serif`, INK);
  });
};

/* ------------------------------------------------------------------ right */

/**
 * Decorative QR block. This is a deterministic pattern, not an encoded code —
 * it will not scan. Swap in a real generated QR image before printing.
 */
const drawQr = (ctx, x, y, size) => {
  const cells = 21;
  const c = size / cells;
  ctx.fillStyle = PAPER;
  ctx.fillRect(x, y, size, size);

  ctx.fillStyle = '#000';
  let seed = 20260819;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      const inFinder =
        (i < 7 && j < 7) || (i < 7 && j > cells - 8) || (i > cells - 8 && j < 7);
      if (inFinder) continue;
      if (rnd() > 0.55) ctx.fillRect(x + i * c, y + j * c, c, c);
    }
  }
  const finder = (fx, fy) => {
    ctx.fillStyle = '#000';
    ctx.fillRect(fx, fy, c * 7, c * 7);
    ctx.fillStyle = PAPER;
    ctx.fillRect(fx + c, fy + c, c * 5, c * 5);
    ctx.fillStyle = '#000';
    ctx.fillRect(fx + c * 2, fy + c * 2, c * 3, c * 3);
  };
  finder(x, y);
  finder(x + size - c * 7, y);
  finder(x, y + size - c * 7);
};

export const drawRight = (ctx, W, H) => {
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  const cx = W / 2;

  const rows = [
    ['Branch ELC', 'Discover Every ELC Wing'],
    ['Summer ELC', 'Hands-on Learning & Innovation'],
    ['VR Tour', 'Explore the campus lively in VR'],
  ];

  rows.forEach(([title, sub], i) => {
    const y = H * 0.135 + i * H * 0.085;

    ctx.fillStyle = '#eef3fb';
    ctx.beginPath();
    ctx.arc(W * 0.20, y, W * 0.055, 0, Math.PI * 2);
    ctx.fill();

    if (i === 0) drawMark(ctx, W * 0.20, y, W * 0.032);
    if (i === 1) {
      ['E', 'L', 'C'].forEach((ch, k) => {
        ctx.fillStyle = NAVY_DEEP;
        roundRect(ctx, W * 0.20 - W * 0.048 + k * W * 0.033, y - W * 0.020, W * 0.029, W * 0.040, W * 0.003);
        ctx.fill();
        centreText(ctx, ch, W * 0.20 - W * 0.048 + k * W * 0.033 + W * 0.0145, y, `700 ${W * 0.026}px Inter, Arial, sans-serif`, PAPER);
      });
    }
    if (i === 2) {
      ctx.fillStyle = NAVY;
      roundRect(ctx, W * 0.20 - W * 0.040, y - W * 0.022, W * 0.080, W * 0.044, W * 0.016);
      ctx.fill();
      ctx.fillStyle = '#8ec5ff';
      roundRect(ctx, W * 0.20 - W * 0.030, y - W * 0.012, W * 0.060, W * 0.020, W * 0.010);
      ctx.fill();
    }

    ctx.textAlign = 'left';
    ctx.fillStyle = INK;
    ctx.font = `700 ${W * 0.040}px Inter, Arial, sans-serif`;
    ctx.fillText(title, W * 0.30, y - W * 0.012);
    ctx.fillStyle = GREY;
    ctx.font = `400 ${W * 0.024}px Inter, Arial, sans-serif`;
    ctx.fillText(sub, W * 0.30, y + W * 0.030);
  });

  centreText(ctx, 'SCAN TO', cx, H * 0.455, `700 ${W * 0.052}px Inter, Arial, sans-serif`, INK, W * 0.004);

  const qr = W * 0.40;
  drawQr(ctx, cx - qr / 2, H * 0.487, qr);

  centreText(ctx, 'SHARE YOUR FEEDBACK', cx, H * 0.487 + qr + H * 0.032, `700 ${W * 0.046}px Inter, Arial, sans-serif`, INK, W * 0.003);
};

/* --------------------------------------------------------------- texture */

export const makePanelTexture = (draw, w, h, ...args) => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  draw(ctx, w, h, ...args);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
};
