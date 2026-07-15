"use client";

import { useEffect, useRef } from "react";

/**
 * Image → ASCII (ported from the Framer AsciiImage). Loads a photo/logo and
 * re-draws it as monospace glyphs: the frame is divided into a character grid,
 * each cell's brightness mapped to a glyph on a light→dark ramp. Static (renders
 * on load + resize). Color follows the element's computed `color`. `invert` maps
 * bright pixels to dense glyphs (use for light marks on a dark background).
 */

type AsciiImageProps = {
  src: string;
  fontSize?: number;
  ramp?: string;
  contrast?: number;
  invert?: boolean;
  className?: string;
};

export function AsciiImage({
  src,
  fontSize = 9,
  ramp = " .:-=+*#%@",
  contrast = 1.15,
  invert = false,
  className,
}: AsciiImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const buf = document.createElement("canvas");
    const bctx = buf.getContext("2d", { willReadFrequently: true });
    const chars = ramp.length > 1 ? ramp : " .:-=+*#%@";
    const col = getComputedStyle(canvas).color || "#141210";
    const imgRef: { img: HTMLImageElement | null; ready: boolean } = { img: null, ready: false };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      ctx.font = `${fontSize}px monospace`;
      const cellW = ctx.measureText("0").width || fontSize * 0.6;
      const cellH = Math.round(fontSize * 1.05);
      const cols = Math.max(1, Math.floor(rect.width / cellW));
      const rows = Math.max(1, Math.floor(rect.height / cellH));

      const img = imgRef.img;
      if (!img || !imgRef.ready || !bctx) return;

      // object-fit: cover
      const frameAR = rect.width / rect.height;
      const imgAR = img.width / img.height;
      let sw = img.width;
      let sh = img.height;
      let sx = 0;
      let sy = 0;
      if (imgAR > frameAR) {
        sw = img.height * frameAR;
        sx = (img.width - sw) / 2;
      } else {
        sh = img.width / frameAR;
        sy = (img.height - sh) / 2;
      }

      buf.width = cols;
      buf.height = rows;
      let data: Uint8ClampedArray;
      try {
        bctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
        data = bctx.getImageData(0, 0, cols, rows).data;
      } catch {
        return;
      }

      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = col;
      const maxIdx = chars.length - 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          let lum = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;
          lum = (lum - 0.5) * contrast + 0.5;
          lum = Math.max(0, Math.min(1, lum));
          const dark = invert ? lum : 1 - lum;
          const ch = chars[Math.round(dark * maxIdx)];
          if (ch === " ") continue;
          ctx.fillText(ch, x * cellW, y * cellH);
        }
      }
    };

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      imgRef.img = image;
      imgRef.ready = true;
      render();
    };
    image.src = src;
    imgRef.img = image;

    render();
    const ro = new ResizeObserver(render);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [src, fontSize, ramp, contrast, invert]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
