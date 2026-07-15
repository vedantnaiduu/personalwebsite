"use client";

import { useEffect, useRef } from "react";

import { SHAPES, type DrawFn, type ShapeName } from "@/lib/ascii/shapes";

/**
 * Shared ASCII canvas engine (ported from the Framer AsciiSphere boilerplate).
 * Handles DPR sizing, the rAF loop, reduced-motion (single static frame), and
 * pausing when offscreen. The visual is either a `draw` function (client callers)
 * or a serializable `shape` name + `opts` (so server components can select one,
 * since functions can't cross the server→client boundary). Color follows the
 * element's computed `color` (Tailwind text-* controls it).
 */

type AsciiShapeProps = {
  draw?: DrawFn;
  shape?: ShapeName;
  opts?: Record<string, number>;
  fontSize?: number;
  speed?: number;
  color?: string;
  className?: string;
};

export function AsciiShape({
  draw,
  shape,
  opts,
  fontSize = 12,
  speed = 1,
  color,
  className,
}: AsciiShapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawFn: DrawFn =
    draw ??
    (shape ? (SHAPES[shape] as (o?: Record<string, number>) => DrawFn)(opts) : SHAPES.sphere());
  const drawRef = useRef(drawFn);
  drawRef.current = drawFn;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const col = color || getComputedStyle(canvas).color || "#141210";
    let time = 0;
    let raf = 0;
    let stopped = false;
    let visible = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      drawRef.current({ ctx, t: time, w: rect.width, h: rect.height, color: col, fontSize });
    };

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loop = () => {
      if (stopped) return;
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      render();
      time += 0.02 * speed;
    };

    resize();

    const ro = new ResizeObserver(() => {
      resize();
      if (prefersReduced) render();
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (prefersReduced) render();
    else raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, fontSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
