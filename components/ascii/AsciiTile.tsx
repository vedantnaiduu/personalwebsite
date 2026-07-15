"use client";

import { useRef } from "react";

import { useAscii } from "@/components/ascii/useAscii";
import type { FrameCtx } from "@/components/ascii/useAscii";
import { RAMPS, fbm, smoothstep } from "@/lib/ascii/core";

/**
 * A per-project ASCII panel. Idle: a slow drifting field, seeded per project so
 * each reads differently. On hover it distorts and ripples toward the cursor
 * (the aino.agency /work tile effect). Self-contained: it tracks its own pointer.
 */

type AsciiTileProps = {
  seed: number;
  className?: string;
  /** glyph size in px; cell width tracks 0.6em */
  size?: number;
};

export function AsciiTile({ seed, className, size = 9 }: AsciiTileProps) {
  const ref = useRef<HTMLPreElement>(null);
  const cell = size * 0.6;
  const line = size * 1.5;

  const shade = (x: number, y: number, f: FrameCtx): number => {
    const t = f.t;
    // slow drifting base field, unique per project via seed
    let v =
      fbm(x * 0.09 + seed * 7.3 + t * 0.18, y * 0.13 - t * 0.12, seed + 3, 3) * 0.55;

    // a slow blob crossing the tile
    const bx = 0.5 + 0.4 * Math.sin(t * 0.3 + seed);
    const by = 0.5 + 0.35 * Math.cos(t * 0.24 + seed * 1.7);
    const d0 = Math.hypot(x / f.cols - bx, (y / f.rows - by) * 1.3);
    v += smoothstep(0.32, 0, d0) * 0.4;

    // cursor distortion: brighten + concentric ripple near the pointer
    if (f.inside) {
      const d = Math.hypot((x - f.px) / (f.cols * 0.32), (y - f.py) / (f.rows * 0.32));
      const g = smoothstep(1.1, 0, d);
      v += g * 0.85;
      v += Math.sin(d * 7 - t * 9) * 0.18 * g;
    }

    return v;
  };

  useAscii(ref, shade, {
    cell,
    line,
    ramp: RAMPS.dense,
    fps: 24,
    reducedMotion: true,
  });

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={`ascii m-0 h-full w-full select-none overflow-hidden text-text-faint ${className ?? ""}`}
      style={{ fontSize: `${size}px`, lineHeight: `${line}px` }}
    />
  );
}
