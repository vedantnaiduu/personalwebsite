"use client";

import { useEffect, useRef } from "react";

import { GLYPHS } from "@/lib/ascii/shapes";

/**
 * Renders `text` as ASCII glyph art (ported from the Framer AsciiText): the
 * string is rasterized to an offscreen buffer, sampled on a monospace grid, and
 * painted with the shared glyph ramp. A diagonal shimmer keeps it alive, and an
 * optional left-to-right `assemble` wipe builds it in on mount. Color follows the
 * element's computed `color`. Static single frame under reduced motion.
 */

type AsciiTextProps = {
  text: string;
  fontSize?: number;
  speed?: number;
  weight?: number;
  /** seconds for the build-in wipe; 0 disables it */
  assemble?: number;
  className?: string;
};

export function AsciiText({
  text,
  fontSize = 14,
  speed = 1,
  weight = 800,
  assemble = 1.1,
  className,
}: AsciiTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || typeof document === "undefined") return;

    const off = document.createElement("canvas");
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    const col = getComputedStyle(canvas).color || "#141210";
    let time = 0;
    let raf = 0;
    let stopped = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      ctx.clearRect(0, 0, rect.width, rect.height);

      // rasterize the text, fit to the frame
      off.width = w;
      off.height = h;
      octx.clearRect(0, 0, w, h);
      octx.fillStyle = "#000";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      let fs = h * 0.66;
      octx.font = `${weight} ${fs}px sans-serif`;
      const measured = octx.measureText(text).width || 1;
      const maxW = w * 0.9;
      if (measured > maxW) {
        fs = fs * (maxW / measured);
        octx.font = `${weight} ${fs}px sans-serif`;
      }
      octx.fillText(text, w / 2, h / 2);
      const data = octx.getImageData(0, 0, w, h).data;

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = col;

      const cellW = fontSize * 0.6;
      const cellH = fontSize;
      const cols = Math.ceil(rect.width / cellW);
      const rows = Math.ceil(rect.height / cellH);
      const wipe = assemble > 0 ? Math.min(1, time / assemble) : 1;

      for (let row = 0; row < rows; row++) {
        const py = (row + 0.5) * cellH;
        const sy = Math.min(h - 1, Math.max(0, Math.floor(py)));
        for (let col2 = 0; col2 < cols; col2++) {
          const px = (col2 + 0.5) * cellW;
          const sx = Math.min(w - 1, Math.max(0, Math.floor(px)));
          if (data[(sy * w + sx) * 4 + 3] < 40) continue;
          // build-in: reveal left→right with a soft edge
          if (assemble > 0) {
            const cellWipe = col2 / cols;
            if (cellWipe > wipe) continue;
          }
          const wave = 0.5 + 0.5 * Math.sin((col2 + row) * 0.35 - time * 2);
          const v = Math.min(1, 0.55 + wave * 0.45);
          ctx.globalAlpha = 0.2 + v * 0.8;
          ctx.fillText(GLYPHS[Math.floor(v * (GLYPHS.length - 1))], px, py);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      if (stopped) return;
      render();
      time += 0.02 * speed;
      raf = requestAnimationFrame(loop);
    };

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (prefersReduced) {
        time = assemble + 1;
        render();
      }
    });
    ro.observe(canvas);

    if (prefersReduced) {
      time = assemble + 1;
      render();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [text, fontSize, speed, weight, assemble]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={text}
      role="img"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
