"use client";

import { useEffect, useRef } from "react";

import { shadeToChar } from "@/lib/ascii/core";

export type FrameCtx = {
  cols: number;
  rows: number;
  /** seconds since the renderer started */
  t: number;
  /** center cell coords */
  cx: number;
  cy: number;
  /** pointer in cell coords; inside=false when the cursor is outside the element */
  px: number;
  py: number;
  inside: boolean;
};

/** Per-cell brightness function, 0..1. */
export type ShadeFn = (x: number, y: number, f: FrameCtx) => number;

export type UseAsciiOpts = {
  /** character advance width in px (must match CSS) */
  cell?: number;
  /** line height in px (must match CSS) */
  line?: number;
  ramp?: string;
  /** frames per second cap; ascii reads well slightly under 60 */
  fps?: number;
  /** stop the loop (renders nothing further) */
  paused?: boolean;
  /** honor prefers-reduced-motion by rendering a single frame at t=reducedT */
  reducedMotion?: boolean;
  reducedT?: number;
  /** fixed grid — skip measurement (used when the caller controls size) */
  fixedCols?: number;
  fixedRows?: number;
};

/**
 * Attach to a <pre class="ascii"> element. Measures the element, computes the
 * character grid, and writes textContent each frame from `shade`. Pauses when
 * offscreen or the tab is hidden. Pointer position (in cell coords) is tracked
 * on a ref so `shade` can read it with zero React re-renders.
 */
export function useAscii(
  ref: React.RefObject<HTMLElement>,
  shade: ShadeFn,
  opts: UseAsciiOpts = {},
) {
  const shadeRef = useRef(shade);
  shadeRef.current = shade;

  const optsRef = useRef(opts);
  optsRef.current = opts;

  // pointer stored in px relative to element; converted to cells per frame
  const pointer = useRef({ x: -9999, y: -9999, inside: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const cell = opts.cell ?? 8.6;
    const line = opts.line ?? 10;
    const ramp = opts.ramp ?? " .:-=+*#";
    const fps = opts.fps ?? 30;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cols = optsRef.current.fixedCols ?? 0;
    let rows = optsRef.current.fixedRows ?? 0;
    let raf = 0;
    let start = 0;
    let last = 0;
    let visible = true;
    let stopped = false;
    const frameInterval = 1000 / fps;
    // reusable buffers, resized on measure
    let rowBuf: string[] = [];

    const measure = () => {
      if (optsRef.current.fixedCols && optsRef.current.fixedRows) {
        cols = optsRef.current.fixedCols;
        rows = optsRef.current.fixedRows;
      } else {
        const r = el.getBoundingClientRect();
        cols = Math.max(1, Math.floor(r.width / cell));
        rows = Math.max(1, Math.floor(r.height / line));
      }
      rowBuf = new Array(rows);
    };

    const renderFrame = (t: number) => {
      const shadeFn = shadeRef.current;
      const cx = (cols - 1) / 2;
      const cy = (rows - 1) / 2;
      const pxCell = pointer.current.x / cell;
      const pyCell = pointer.current.y / line;
      const f: FrameCtx = {
        cols,
        rows,
        t,
        cx,
        cy,
        px: pxCell,
        py: pyCell,
        inside: pointer.current.inside,
      };
      for (let y = 0; y < rows; y++) {
        let rowStr = "";
        for (let x = 0; x < cols; x++) {
          rowStr += shadeToChar(shadeFn(x, y, f), ramp);
        }
        rowBuf[y] = rowStr;
      }
      el.textContent = rowBuf.join("\n");
    };

    const loop = (now: number) => {
      if (stopped) return;
      raf = requestAnimationFrame(loop);
      if (optsRef.current.paused || !visible) return;
      if (now - last < frameInterval) return;
      last = now;
      if (!start) start = now;
      renderFrame((now - start) / 1000);
    };

    measure();

    if (prefersReduced && optsRef.current.reducedMotion !== false) {
      // single static frame
      renderFrame(optsRef.current.reducedT ?? 0);
      return () => {};
    }

    // pause when offscreen
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    io.observe(el);

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    const onVis = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = e.clientX - r.left;
      pointer.current.y = e.clientY - r.top;
      pointer.current.inside = true;
    };
    const onLeave = () => {
      pointer.current.inside = false;
      pointer.current.x = -9999;
      pointer.current.y = -9999;
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, opts.cell, opts.line, opts.ramp, opts.fps]);

  return pointer;
}
