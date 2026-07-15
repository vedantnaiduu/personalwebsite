/**
 * ASCII engine core — framework-agnostic math + text rasterization.
 *
 * The whole aesthetic (aino.agency reference) is one idea: a monospace grid of
 * characters where each cell picks a glyph from a brightness ramp. Animate the
 * brightness field over time and you get the morphing intro, the hero field, and
 * the project-tile distortion — all from this one module.
 */

/** Character ramps, ordered LOW brightness (0 → space) to HIGH brightness (1 → dense). */
export const RAMPS = {
  // general field / hero — soft, aino-flavored
  soft: " ·.-:;=+*oiIzn#",
  // crisp reveal for text — reads letters cleanly
  text: " .·-:+=*iIkN@",
  // dense terminal look for tiles
  dense: " .:-=+*#%@ANO0",
} as const;

export type RampKey = keyof typeof RAMPS;

/** Map a 0..1 value to a glyph on the given ramp. Values are clamped. */
export function shadeToChar(v: number, ramp: string): string {
  if (v <= 0) return ramp[0];
  if (v >= 1) return ramp[ramp.length - 1];
  const i = (v * (ramp.length - 1)) | 0;
  return ramp[i];
}

/* ------------------------------------------------------------------ *
 * Deterministic value noise (no Math.random at import — seedable).    *
 * ------------------------------------------------------------------ */

function hash2(x: number, y: number, seed: number): number {
  let h = x * 374761393 + y * 668265263 + seed * 2246822519;
  h = (h ^ (h >>> 13)) * 1274126177;
  h = h ^ (h >>> 16);
  // 0..1
  return ((h >>> 0) % 100000) / 100000;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

/** 2D value noise in [0,1]. Continuous, cheap, good enough for a character field. */
export function noise2D(x: number, y: number, seed = 1): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const tl = hash2(xi, yi, seed);
  const tr = hash2(xi + 1, yi, seed);
  const bl = hash2(xi, yi + 1, seed);
  const br = hash2(xi + 1, yi + 1, seed);
  const u = smooth(xf);
  const v = smooth(yf);
  const top = tl + (tr - tl) * u;
  const bot = bl + (br - bl) * u;
  return top + (bot - top) * v;
}

/** Fractal (layered) noise — richer texture for the hero field. */
export function fbm(x: number, y: number, seed = 1, octaves = 3): number {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let o = 0; o < octaves; o++) {
    sum += amp * noise2D(x * freq, y * freq, seed + o * 17);
    norm += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return sum / norm;
}

/* ------------------------------------------------------------------ *
 * Text → brightness mask. Rasterizes a word to a cols×rows grid.      *
 * Client-only (needs canvas). Returns Float32Array length cols*rows.  *
 * ------------------------------------------------------------------ */

export type TextMask = {
  data: Float32Array;
  cols: number;
  rows: number;
};

let _canvas: HTMLCanvasElement | null = null;

/**
 * Render `text` into a cols×rows brightness grid (0..1 by pixel coverage).
 * `cellAspect` = displayCellWidth / displayLineHeight, used to pre-stretch the
 * glyphs so they read with correct proportions once shown in the monospace grid.
 * `heightFrac` sets glyph height (fraction of rows), `maxWidthFrac` caps width
 * (fraction of cols), and `yFrac` places the vertical center — so several lines
 * can be stacked by sampling into separate bands.
 */
export function sampleTextMask(
  text: string,
  cols: number,
  rows: number,
  opts: {
    fontWeight?: number | string;
    heightFrac?: number;
    maxWidthFrac?: number;
    yFrac?: number;
    cellAspect?: number;
    fontFamily?: string;
  } = {},
): TextMask {
  const data = new Float32Array(cols * rows);
  if (typeof document === "undefined") return { data, cols, rows };

  const {
    fontWeight = 700,
    heightFrac = 0.82,
    maxWidthFrac = 0.9,
    yFrac = 0.5,
    cellAspect = 0.86,
    fontFamily = "sans-serif",
  } = opts;

  if (!_canvas) _canvas = document.createElement("canvas");
  const canvas = _canvas;
  canvas.width = cols;
  canvas.height = rows;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { data, cols, rows };

  ctx.clearRect(0, 0, cols, rows);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Cells are non-square on screen; pre-stretch horizontally by 1/cellAspect.
  const stretch = 1 / cellAspect;
  let size = rows * heightFrac;
  ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  const m = ctx.measureText(text);
  const maxW = cols * maxWidthFrac;
  if (m.width * stretch > maxW) {
    size = size * (maxW / (m.width * stretch));
    ctx.font = `${fontWeight} ${size}px ${fontFamily}`;
  }

  ctx.save();
  ctx.translate(cols / 2, rows * yFrac);
  ctx.scale(stretch, 1);
  ctx.fillText(text, 0, 0);
  ctx.restore();

  const img = ctx.getImageData(0, 0, cols, rows).data;
  for (let i = 0; i < cols * rows; i++) {
    data[i] = (img[i * 4 + 3] / 255) * 1; // alpha coverage → brightness
  }
  return { data, cols, rows };
}

/** Clamp helper. */
export function clamp(v: number, lo = 0, hi = 1): number {
  return v < lo ? lo : v > hi ? hi : v;
}

/** Smoothstep in [edge0, edge1]. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
