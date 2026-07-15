/**
 * ASCII shape draw functions — ported from the Framer AsciiSphere family
 * (canvas 2D, one glyph ramp, depth/intensity → glyph, 0.2–1.0 opacity, compound
 * tumble). Each factory returns a `DrawFn` that the shared <AsciiShape> engine
 * calls every frame with the live canvas context, time, size, color, and glyph size.
 */

// depth/intensity ramp — solid blocks read as the near/dense faces
export const GLYPHS = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";

export type DrawCtx = {
  ctx: CanvasRenderingContext2D;
  t: number;
  w: number;
  h: number;
  color: string;
  fontSize: number;
};
export type DrawFn = (d: DrawCtx) => void;

const glyph = (v: number) => GLYPHS[Math.floor(Math.max(0, Math.min(1, v)) * (GLYPHS.length - 1))];

function setup(d: DrawCtx) {
  const { ctx, w, h, color, fontSize } = d;
  ctx.clearRect(0, 0, w, h);
  ctx.font = `${fontSize}px monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
}

/* -------------------------------------------------- sphere ---------------- */
export function sphere(opts: { angleStep?: number; radiusScale?: number } = {}): DrawFn {
  const angleStep = opts.angleStep ?? 0.15;
  const radiusScale = opts.radiusScale ?? 0.5;
  return (d) => {
    setup(d);
    const { ctx, t, w, h } = d;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * radiusScale;
    const pts: { x: number; y: number; z: number; c: string }[] = [];
    for (let phi = 0; phi < Math.PI * 2; phi += angleStep) {
      for (let theta = 0; theta < Math.PI; theta += angleStep) {
        const x = Math.sin(theta) * Math.cos(phi + t * 0.5);
        const y = Math.sin(theta) * Math.sin(phi + t * 0.5);
        const z = Math.cos(theta);
        const rotY = t * 0.3;
        const nx = x * Math.cos(rotY) - z * Math.sin(rotY);
        const nz = x * Math.sin(rotY) + z * Math.cos(rotY);
        const rotX = t * 0.2;
        const ny = y * Math.cos(rotX) - nz * Math.sin(rotX);
        const fz = y * Math.sin(rotX) + nz * Math.cos(rotX);
        pts.push({ x: cx + nx * radius, y: cy + ny * radius, z: fz, c: glyph((fz + 1) / 2) });
      }
    }
    pts.sort((a, b) => a.z - b.z);
    for (const p of pts) {
      ctx.globalAlpha = Math.min(1, 0.2 + (p.z + 1) * 0.4);
      ctx.fillText(p.c, p.x, p.y);
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- cuboid ---------------- */
export function cuboid(
  opts: { gridStep?: number; scale?: number; wRatio?: number; hRatio?: number; dRatio?: number } = {},
): DrawFn {
  const gridStep = opts.gridStep ?? 0.15;
  const scale = opts.scale ?? 0.35;
  const wRatio = opts.wRatio ?? 1.6;
  const hRatio = opts.hRatio ?? 1;
  const dRatio = opts.dRatio ?? 0.6;
  return (d) => {
    setup(d);
    const { ctx, t, w, h } = d;
    const cx = w / 2;
    const cy = h / 2;
    const size = Math.min(w, h) * scale;
    const maxRatio = Math.max(wRatio, hRatio, dRatio, 0.001);
    const hx = (size * wRatio) / maxRatio;
    const hy = (size * hRatio) / maxRatio;
    const hz = (size * dRatio) / maxRatio;
    const bound = Math.sqrt(hx * hx + hy * hy + hz * hz) || 1;
    const cz = Math.cos(t * 0.5);
    const sz = Math.sin(t * 0.5);
    const cyr = Math.cos(t * 0.3);
    const syr = Math.sin(t * 0.3);
    const cxr = Math.cos(t * 0.2);
    const sxr = Math.sin(t * 0.2);
    const pts: { x: number; y: number; z: number; c: string }[] = [];
    const add = (px: number, py: number, pz: number) => {
      const x1 = px * cz - py * sz;
      const y1 = px * sz + py * cz;
      const x2 = x1 * cyr - pz * syr;
      const z2 = x1 * syr + pz * cyr;
      const y3 = y1 * cxr - z2 * sxr;
      const fz = y1 * sxr + z2 * cxr;
      const zn = Math.max(-1, Math.min(1, fz / bound));
      pts.push({ x: cx + x2, y: cy + y3, z: zn, c: glyph((zn + 1) / 2) });
    };
    const steps = Math.max(2, Math.round(2 / gridStep));
    for (let i = 0; i <= steps; i++) {
      const u = -1 + (2 * i) / steps;
      for (let j = 0; j <= steps; j++) {
        const v = -1 + (2 * j) / steps;
        add(hx, u * hy, v * hz);
        add(-hx, u * hy, v * hz);
        add(u * hx, hy, v * hz);
        add(u * hx, -hy, v * hz);
        add(u * hx, v * hy, hz);
        add(u * hx, v * hy, -hz);
      }
    }
    pts.sort((a, b) => a.z - b.z);
    for (const p of pts) {
      ctx.globalAlpha = Math.min(1, 0.2 + (p.z + 1) * 0.4);
      ctx.fillText(p.c, p.x, p.y);
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- triangle (tetra) ------ */
const TETRA_V: [number, number, number][] = [
  [1, 1, 1],
  [-1, -1, 1],
  [-1, 1, -1],
  [1, -1, -1],
];
const TETRA_F: [number, number, number][] = [
  [0, 1, 2],
  [0, 1, 3],
  [0, 2, 3],
  [1, 2, 3],
];
export function tetra(opts: { gridStep?: number; scale?: number } = {}): DrawFn {
  const gridStep = opts.gridStep ?? 0.15;
  const scale = opts.scale ?? 0.42;
  return (d) => {
    setup(d);
    const { ctx, t, w, h } = d;
    const cx = w / 2;
    const cy = h / 2;
    const s = Math.min(w, h) * scale;
    const bound = s * Math.sqrt(3) || 1;
    const cz = Math.cos(t * 0.5);
    const sz = Math.sin(t * 0.5);
    const cyr = Math.cos(t * 0.3);
    const syr = Math.sin(t * 0.3);
    const cxr = Math.cos(t * 0.2);
    const sxr = Math.sin(t * 0.2);
    const pts: { x: number; y: number; z: number; c: string }[] = [];
    const add = (px: number, py: number, pz: number) => {
      const x1 = px * cz - py * sz;
      const y1 = px * sz + py * cz;
      const x2 = x1 * cyr - pz * syr;
      const z2 = x1 * syr + pz * cyr;
      const y3 = y1 * cxr - z2 * sxr;
      const fz = y1 * sxr + z2 * cxr;
      const zn = Math.max(-1, Math.min(1, fz / bound));
      pts.push({ x: cx + x2, y: cy + y3, z: zn, c: glyph((zn + 1) / 2) });
    };
    const steps = Math.max(2, Math.round(2 / gridStep));
    for (const [ia, ib, ic] of TETRA_F) {
      const a = TETRA_V[ia];
      const b = TETRA_V[ib];
      const c = TETRA_V[ic];
      for (let i = 0; i <= steps; i++) {
        for (let j = 0; j <= steps - i; j++) {
          const u = i / steps;
          const v = j / steps;
          add(
            (a[0] + (b[0] - a[0]) * u + (c[0] - a[0]) * v) * s,
            (a[1] + (b[1] - a[1]) * u + (c[1] - a[1]) * v) * s,
            (a[2] + (b[2] - a[2]) * u + (c[2] - a[2]) * v) * s,
          );
        }
      }
    }
    pts.sort((a, b) => a.z - b.z);
    for (const p of pts) {
      ctx.globalAlpha = Math.min(1, 0.2 + (p.z + 1) * 0.4);
      ctx.fillText(p.c, p.x, p.y);
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- metaballs ------------- */
export function metaballs(
  opts: { ballRadius?: number; separation?: number; threshold?: number } = {},
): DrawFn {
  const ballRadius = opts.ballRadius ?? 0.16;
  const separation = opts.separation ?? 0.2;
  const threshold = opts.threshold ?? 1;
  return (d) => {
    setup(d);
    const { ctx, t, w, h, fontSize } = d;
    const cx = w / 2;
    const cy = h / 2;
    const base = Math.min(w, h);
    const offset = separation * base * Math.sin(t + 1);
    const r = ballRadius * base;
    const r2 = r * r;
    const balls = [
      { x: cx - offset, y: cy },
      { x: cx + offset, y: cy },
    ];
    const cellW = fontSize * 0.6;
    const cellH = fontSize;
    const cols = Math.ceil(w / cellW);
    const rows = Math.ceil(h / cellH);
    for (let row = 0; row < rows; row++) {
      const py = (row + 0.5) * cellH;
      for (let col = 0; col < cols; col++) {
        const px = (col + 0.5) * cellW;
        let field = 0;
        for (const b of balls) {
          const dx = px - b.x;
          const dy = py - b.y;
          field += r2 / (dx * dx + dy * dy + 0.0001);
        }
        if (field < threshold) continue;
        const v = Math.min(1, field / threshold - 1);
        ctx.globalAlpha = 0.2 + v * 0.8;
        ctx.fillText(glyph(v), px, py);
      }
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- shield (scan) --------- */
const SH_CX = 100;
const SH_TOP = 20;
const SH_BOT = 145;
const SH_H = SH_BOT - SH_TOP;
function quad(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  t: number,
): [number, number] {
  const mt = 1 - t;
  return [
    mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0],
    mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1],
  ];
}
function shieldPoly(seg = 14): [number, number][] {
  const p: [number, number][] = [
    [100, 20],
    [150, 40],
    [150, 90],
  ];
  for (let i = 1; i <= seg; i++) p.push(quad([150, 90], [150, 130], [100, 145], i / seg));
  for (let i = 1; i <= seg; i++) p.push(quad([100, 145], [50, 130], [50, 90], i / seg));
  p.push([50, 40]);
  return p;
}
function inPoly(nx: number, ny: number, poly: [number, number][]): boolean {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > ny !== yj > ny) {
      const xc = ((xj - xi) * (ny - yi)) / (yj - yi) + xi;
      if (nx < xc) hit = !hit;
    }
  }
  return hit;
}
export function shield(opts: { scale?: number; scanWidth?: number } = {}): DrawFn {
  const scale = opts.scale ?? 0.72;
  const scanWidth = opts.scanWidth ?? 0.18;
  const poly = shieldPoly(14);
  return (d) => {
    setup(d);
    const { ctx, t, w, h, fontSize } = d;
    const cx = w / 2;
    const cy = h / 2;
    const base = Math.min(w, h);
    const sf = (base * scale) / SH_H;
    const nCy = (SH_TOP + SH_BOT) / 2;
    const phase = (t + 3) * 0.15;
    const scan = phase - Math.floor(phase);
    const toNX = (px: number) => (px - cx) / sf + SH_CX;
    const toNY = (py: number) => (py - cy) / sf + nCy;
    const cellW = fontSize * 0.6;
    const cellH = fontSize;
    const cols = Math.ceil(w / cellW);
    const rows = Math.ceil(h / cellH);
    for (let row = 0; row < rows; row++) {
      const py = (row + 0.5) * cellH;
      const ny = toNY(py);
      for (let col = 0; col < cols; col++) {
        const px = (col + 0.5) * cellW;
        const nx = toNX(px);
        if (!inPoly(nx, ny, poly)) continue;
        const edge =
          !inPoly(toNX(px - cellW), ny, poly) ||
          !inPoly(toNX(px + cellW), ny, poly) ||
          !inPoly(nx, toNY(py - cellH), poly) ||
          !inPoly(nx, toNY(py + cellH), poly);
        const vy = (ny - SH_TOP) / SH_H;
        const glow = Math.max(0, 1 - Math.abs(vy - scan) / scanWidth);
        const v = edge ? 1 : Math.min(1, 0.28 + glow * 0.72);
        ctx.globalAlpha = 0.2 + v * 0.8;
        ctx.fillText(glyph(v), px, py);
      }
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- user chain ------------ */
const CHAIN = "Oo";
export function userChain(
  opts: { userSize?: number; orbitRadius?: number; chainSpacing?: number } = {},
): DrawFn {
  const userSize = opts.userSize ?? 0.26;
  const orbitRadius = opts.orbitRadius ?? 0.27;
  const chainSpacing = opts.chainSpacing ?? 0.9;
  const inUser = (px: number, py: number, ux: number, uy: number, s: number) => {
    const lx = px - ux;
    const ly = py - uy;
    const head = lx * lx + (ly + 0.4 * s) ** 2 <= (0.3 * s) ** 2;
    const shoulders = lx * lx + (ly - 0.78 * s) ** 2 <= (0.62 * s) ** 2 && ly <= 0.52 * s;
    return head || shoulders;
  };
  return (d) => {
    setup(d);
    const { ctx, t, w, h, fontSize } = d;
    const cx = w / 2;
    const cy = h / 2;
    const bs = Math.min(w, h);
    const s = userSize * bs;
    const R = orbitRadius * bs;
    const ax = cx + R * Math.cos(t);
    const ay = cy + R * Math.sin(t);
    const bx = cx - R * Math.cos(t);
    const by = cy - R * Math.sin(t);
    const cellW = fontSize * 0.6;
    const cellH = fontSize;
    // chain
    const dx = bx - ax;
    const dy = by - ay;
    const len = Math.hypot(dx, dy);
    const gap = fontSize * chainSpacing;
    const links = Math.max(1, Math.floor(len / gap));
    for (let k = 0; k <= links; k++) {
      const p = k / links;
      const x = ax + dx * p;
      const y = ay + dy * p;
      if (inUser(x, y, ax, ay, s) || inUser(x, y, bx, by, s)) continue;
      ctx.globalAlpha = 0.75;
      ctx.fillText(CHAIN[k % CHAIN.length], x, y);
    }
    const cols = Math.ceil(w / cellW);
    const rows = Math.ceil(h / cellH);
    for (let row = 0; row < rows; row++) {
      const py = (row + 0.5) * cellH;
      for (let col = 0; col < cols; col++) {
        const px = (col + 0.5) * cellW;
        const inA = inUser(px, py, ax, ay, s);
        const inB = inUser(px, py, bx, by, s);
        if (!inA && !inB) continue;
        const ex = inA ? ax : bx;
        const ey = inA ? ay : by;
        const edge =
          !inUser(px - cellW, py, ex, ey, s) ||
          !inUser(px + cellW, py, ex, ey, s) ||
          !inUser(px, py - cellH, ex, ey, s) ||
          !inUser(px, py + cellH, ex, ey, s);
        const v = edge ? 1 : 0.55;
        ctx.globalAlpha = 0.2 + v * 0.8;
        ctx.fillText(glyph(v), px, py);
      }
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- play (video) ---------- */
function inTri(px: number, py: number, a: number[], b: number[], c: number[]): boolean {
  const d1 = (px - b[0]) * (a[1] - b[1]) - (a[0] - b[0]) * (py - b[1]);
  const d2 = (px - c[0]) * (b[1] - c[1]) - (b[0] - c[0]) * (py - c[1]);
  const d3 = (px - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (py - a[1]);
  const neg = d1 < 0 || d2 < 0 || d3 < 0;
  const pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
}
// Jestify: a play button in a pulsing ring with a "render" band sweeping the
// triangle — a generated video coming together.
export function play(): DrawFn {
  return (d) => {
    setup(d);
    const { ctx, t, w, h, fontSize } = d;
    const cx = w / 2;
    const cy = h / 2;
    const base = Math.min(w, h);
    const R = base * 0.3 * (1 + 0.05 * Math.sin(t * 2));
    const tri = [
      [cx - R * 0.32, cy - R * 0.44],
      [cx - R * 0.32, cy + R * 0.44],
      [cx + R * 0.52, cy],
    ];
    const cellW = fontSize * 0.6;
    const cellH = fontSize;
    const cols = Math.ceil(w / cellW);
    const rows = Math.ceil(h / cellH);
    const scan = ((t * 0.22) % 1) * 2 - 1;
    for (let r = 0; r < rows; r++) {
      const py = (r + 0.5) * cellH;
      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * cellW;
        const dr = Math.hypot(px - cx, py - cy);
        const ring = Math.abs(dr - R) < cellH * 0.7;
        const it = inTri(px, py, tri[0], tri[1], tri[2]);
        if (!ring && !it) continue;
        let v: number;
        if (it) {
          const band = 1 - Math.min(1, Math.abs((py - cy) / R - scan) / 0.36);
          v = 0.42 + 0.55 * Math.max(0, band);
        } else {
          v = 0.5;
        }
        ctx.globalAlpha = 0.2 + v * 0.8;
        ctx.fillText(glyph(v), px, py);
      }
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- radar (detection) ----- */
// Infra detection: a sweeping radar beam over concentric rings, lighting blips.
export function radar(): DrawFn {
  const blips = [
    [0.32, 1.1],
    [0.7, 2.7],
    [0.5, 4.2],
    [0.85, 5.4],
    [0.45, 0.3],
  ];
  return (d) => {
    setup(d);
    const { ctx, t, w, h, fontSize } = d;
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.42;
    const cellW = fontSize * 0.6;
    const cellH = fontSize;
    const cols = Math.ceil(w / cellW);
    const rows = Math.ceil(h / cellH);
    const beam = (t * 0.7) % (Math.PI * 2);
    for (let r = 0; r < rows; r++) {
      const py = (r + 0.5) * cellH;
      for (let c = 0; c < cols; c++) {
        const px = (c + 0.5) * cellW;
        const dx = px - cx;
        const dy = py - cy;
        const dr = Math.hypot(dx, dy);
        if (dr > R) continue;
        let diff = (beam - Math.atan2(dy, dx)) % (Math.PI * 2);
        if (diff < 0) diff += Math.PI * 2;
        const beamV = diff < 0.6 ? 1 - diff / 0.6 : 0;
        const ringV = (dr / R * 4) % 1 < 0.09 ? 0.32 : 0;
        const crossV = Math.abs(dx) < cellW * 0.5 || Math.abs(dy) < cellH * 0.5 ? 0.22 : 0;
        let v = Math.max(beamV, ringV, crossV);
        for (const [rf, ba] of blips) {
          const bx = cx + Math.cos(ba) * R * rf;
          const by = cy + Math.sin(ba) * R * rf;
          if (Math.hypot(px - bx, py - by) < cellH * 1.1) {
            let bd = (beam - ba) % (Math.PI * 2);
            if (bd < 0) bd += Math.PI * 2;
            v = Math.max(v, bd < 1.4 ? 1 - bd / 3 : 0.28);
          }
        }
        if (v < 0.05) continue;
        ctx.globalAlpha = 0.2 + v * 0.8;
        ctx.fillText(glyph(v), px, py);
      }
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- pulse (heartbeat) ------ */
function ecg(u: number): number {
  const g = (x: number, c: number, wd: number, amp: number) =>
    Math.exp(-((x - c) ** 2) / (2 * wd * wd)) * amp;
  return (
    g(u, 0.34, 0.02, 0.16) + // P
    g(u, 0.47, 0.006, -0.22) + // Q
    g(u, 0.5, 0.006, 1.0) + // R
    g(u, 0.53, 0.009, -0.34) + // S
    g(u, 0.66, 0.04, 0.2) // T
  );
}
// Elderly health monitoring: a scrolling ECG trace.
export function pulse(): DrawFn {
  return (d) => {
    setup(d);
    const { ctx, t, w, h, fontSize } = d;
    const cy = h / 2;
    const amp = Math.min(w, h) * 0.34;
    const cellW = fontSize * 0.6;
    const cellH = fontSize;
    const cols = Math.ceil(w / cellW);
    let prevRow = -1;
    for (let c = 0; c < cols; c++) {
      const px = (c + 0.5) * cellW;
      const u = ((c / cols) * 2 + t * 0.16) % 1;
      const y = cy - ecg(u) * amp;
      const row = Math.round(y / cellH);
      // connect to previous column so the trace reads as a continuous line
      const lo = prevRow < 0 ? row : Math.min(prevRow, row);
      const hi = prevRow < 0 ? row : Math.max(prevRow, row);
      for (let rr = lo; rr <= hi; rr++) {
        const spike = Math.min(1, 0.5 + Math.abs(ecg(u)) * 0.6);
        ctx.globalAlpha = 0.2 + spike * 0.8;
        ctx.fillText(glyph(spike), px, (rr + 0.5) * cellH);
      }
      prevRow = row;
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- helix (DNA) ----------- */
// Stanford comp-bio: a rotating DNA double helix with rungs.
export function helix(): DrawFn {
  return (d) => {
    setup(d);
    const { ctx, t, w, h } = d;
    const cx = w / 2;
    const cy = h / 2;
    const base = Math.min(w, h);
    const height = base * 0.82;
    const radius = base * 0.16;
    const N = 46;
    const pts: { x: number; y: number; z: number; rung?: boolean }[] = [];
    for (let i = 0; i <= N; i++) {
      const f = i / N;
      const yy = cy - height / 2 + f * height;
      const ph = f * Math.PI * 4 + t * 1.2;
      const x1 = cx + Math.cos(ph) * radius;
      const x2 = cx + Math.cos(ph + Math.PI) * radius;
      pts.push({ x: x1, y: yy, z: Math.sin(ph) });
      pts.push({ x: x2, y: yy, z: Math.sin(ph + Math.PI) });
      if (i % 3 === 0) {
        const steps = 5;
        for (let s = 1; s < steps; s++) {
          const tt = s / steps;
          pts.push({ x: x1 + (x2 - x1) * tt, y: yy, z: Math.sin(ph) * (1 - tt) + Math.sin(ph + Math.PI) * tt, rung: true });
        }
      }
    }
    pts.sort((a, b) => a.z - b.z);
    for (const p of pts) {
      const v = (p.z + 1) / 2;
      ctx.globalAlpha = p.rung ? 0.18 + v * 0.3 : 0.25 + v * 0.75;
      ctx.fillText(glyph(p.rung ? 0.4 : v), p.x, p.y);
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- network (retrieval) --- */
// RAG retrieval: a hub-and-spoke graph with pulses traveling the edges.
const NET_NODES = [
  [0.5, 0.5],
  [0.5, 0.16],
  [0.2, 0.42],
  [0.8, 0.4],
  [0.32, 0.82],
  [0.72, 0.8],
];
const NET_EDGES = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [1, 3],
  [2, 4],
  [3, 5],
];
export function network(): DrawFn {
  return (d) => {
    setup(d);
    const { ctx, t, w, h, fontSize } = d;
    const base = Math.min(w, h);
    const ox = (w - base) / 2;
    const oy = (h - base) / 2;
    const P = (n: number): [number, number] => [ox + NET_NODES[n][0] * base, oy + NET_NODES[n][1] * base];
    for (let e = 0; e < NET_EDGES.length; e++) {
      const [a, b] = NET_EDGES[e];
      const [ax, ay] = P(a);
      const [bx, by] = P(b);
      const len = Math.hypot(bx - ax, by - ay);
      const steps = Math.max(2, Math.floor(len / (fontSize * 0.7)));
      const pulseAt = (t * 0.4 + e * 0.13) % 1;
      for (let s = 0; s <= steps; s++) {
        const tt = s / steps;
        const near = 1 - Math.min(1, Math.abs(tt - pulseAt) / 0.16);
        const v = 0.28 + near * 0.6;
        ctx.globalAlpha = 0.14 + v * 0.6;
        ctx.fillText(glyph(v * 0.7), ax + (bx - ax) * tt, ay + (by - ay) * tt);
      }
    }
    for (let n = 0; n < NET_NODES.length; n++) {
      const [x, y] = P(n);
      const beat = 0.7 + 0.3 * Math.sin(t * 2 + n * 1.3);
      ctx.globalAlpha = 1;
      ctx.fillText(glyph(beat), x, y);
      ctx.fillText(glyph(beat), x + fontSize * 0.55, y);
    }
    ctx.globalAlpha = 1;
  };
}

/* -------------------------------------------------- registry -------------- */
// name → factory, so a server component can pick a shape by string (functions
// can't cross the server→client boundary) and the client resolves the DrawFn.
export const SHAPES = {
  sphere,
  cuboid,
  tetra,
  metaballs,
  shield,
  userChain,
  play,
  radar,
  pulse,
  helix,
  network,
} as const;
export type ShapeName = keyof typeof SHAPES;
