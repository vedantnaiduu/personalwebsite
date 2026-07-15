"use client";

import { useRef } from "react";

import { useAscii } from "@/components/ascii/useAscii";
import type { FrameCtx } from "@/components/ascii/useAscii";
import { RAMPS, fbm, smoothstep } from "@/lib/ascii/core";

/**
 * A slowly morphing ASCII metaball field (aino.agency homepage reference).
 * Used as an ambient hero backdrop. Density is biased to one side via `fade`
 * so overlaid text stays legible, and it brightens under the cursor (feedback).
 */

type AsciiFieldProps = {
  className?: string;
  /** where the field fades to empty, keeping that side clear for text */
  fade?: "left" | "right" | "none";
  /** overall brightness multiplier */
  intensity?: number;
};

// moving metaball centers (normalized 0..1), animated by time
function metaballs(nx: number, ny: number, t: number): number {
  const centers = [
    [0.62 + 0.18 * Math.sin(t * 0.21), 0.5 + 0.24 * Math.cos(t * 0.17), 0.22],
    [0.78 + 0.14 * Math.cos(t * 0.27), 0.42 + 0.2 * Math.sin(t * 0.23), 0.17],
    [0.52 + 0.2 * Math.sin(t * 0.15 + 1.5), 0.66 + 0.16 * Math.cos(t * 0.19), 0.15],
  ];
  let v = 0;
  for (const [cx, cy, r] of centers) {
    const d = Math.hypot(nx - cx, (ny - cy) * 1.35);
    v += smoothstep(r, 0, d); // 1 at center, 0 past radius
  }
  return v;
}

export function AsciiField({ className, fade = "left", intensity = 1 }: AsciiFieldProps) {
  const ref = useRef<HTMLPreElement>(null);

  const shade = (x: number, y: number, f: FrameCtx): number => {
    const t = f.t;
    const nx = x / f.cols;
    const ny = y / f.rows;

    let v = metaballs(nx, ny, t) * 0.7;
    v += fbm(x * 0.06 + t * 0.14, y * 0.1 - t * 0.09, 9, 3) * 0.4;

    // cursor bloom
    if (f.inside) {
      const d = Math.hypot((x - f.px) / 14, (y - f.py) / 9);
      v += smoothstep(1, 0, d) * 0.6;
    }

    // side fade to keep the text column clear
    if (fade === "left") v *= smoothstep(0.32, 0.66, nx);
    else if (fade === "right") v *= smoothstep(0.68, 0.34, nx);

    // vignette so edges dissolve
    v *= smoothstep(0.02, 0.16, ny) * smoothstep(0.02, 0.16, 1 - ny);

    return v * intensity;
  };

  useAscii(ref, shade, {
    cell: 7.2,
    line: 13.5,
    ramp: RAMPS.soft,
    fps: 24,
    reducedMotion: true,
  });

  return (
    <pre
      ref={ref}
      aria-hidden="true"
      className={`ascii pointer-events-none m-0 h-full w-full select-none text-text-faint ${className ?? ""}`}
    />
  );
}
