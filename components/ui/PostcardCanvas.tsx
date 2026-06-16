"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 200;
const MAX_DATA_URL_LENGTH = 200_000;
const PEN_COLORS = ["#0050a0", "#38abe4", "#9fe11d"] as const;

type PostcardCanvasProps = {
  readonly onDrawingChange?: (drawing: string | null) => void;
  readonly className?: string;
  readonly disabled?: boolean;
};

type Point = {
  readonly x: number;
  readonly y: number;
};

function getCanvasPoint(canvas: HTMLCanvasElement, event: PointerEvent | React.PointerEvent<HTMLCanvasElement>): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
    y: ((event.clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
  };
}

function primeCanvas(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return;

  context.fillStyle = "#f8fdff";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 3.5;
}

function exportCompactPng(canvas: HTMLCanvasElement) {
  let source = canvas;
  let scale = 1;
  let dataUrl = source.toDataURL("image/png");

  while (dataUrl.length > MAX_DATA_URL_LENGTH && scale > 0.45) {
    scale -= 0.15;
    const reduced = document.createElement("canvas");
    reduced.width = Math.round(CANVAS_WIDTH * scale);
    reduced.height = Math.round(CANVAS_HEIGHT * scale);
    const reducedContext = reduced.getContext("2d");
    if (!reducedContext) break;

    reducedContext.fillStyle = "#f8fdff";
    reducedContext.fillRect(0, 0, reduced.width, reduced.height);
    reducedContext.drawImage(source, 0, 0, reduced.width, reduced.height);
    source = reduced;
    dataUrl = source.toDataURL("image/png");
  }

  return dataUrl.length <= MAX_DATA_URL_LENGTH ? dataUrl : null;
}

export function PostcardCanvas({ onDrawingChange, className, disabled = false }: PostcardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [penColor, setPenColor] = useState<(typeof PEN_COLORS)[number]>(PEN_COLORS[0]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasInk, setHasInk] = useState(false);

  const emitDrawing = useCallback(
    (nextHasInk: boolean) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      onDrawingChange?.(nextHasInk ? exportCompactPng(canvas) : null);
    },
    [onDrawingChange],
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    primeCanvas(canvas);
    setHasInk(false);
    onDrawingChange?.(null);
  }, [onDrawingChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    primeCanvas(canvas);
  }, []);

  const startDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;

    const canvas = event.currentTarget;
    const context = canvas.getContext("2d");
    if (!context) return;

    event.preventDefault();
    canvas.setPointerCapture(event.pointerId);
    const point = getCanvasPoint(canvas, event);
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.strokeStyle = penColor;
    setIsDrawing(true);
  };

  const continueDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;

    const canvas = event.currentTarget;
    const context = canvas.getContext("2d");
    if (!context) return;

    event.preventDefault();
    const point = getCanvasPoint(canvas, event);
    context.lineTo(point.x, point.y);
    context.stroke();
    setHasInk(true);
  };

  const stopDrawing = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = event.currentTarget;
    const context = canvas.getContext("2d");
    context?.closePath();
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    setIsDrawing(false);
    emitDrawing(hasInk);
  };

  useEffect(() => {
    if (!isDrawing && hasInk) {
      emitDrawing(true);
    }
  }, [emitDrawing, hasInk, isDrawing]);

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <fieldset className="flex items-center gap-2" aria-label="Postcard pen color">
          <legend className="sr-only">Postcard pen color</legend>
          {PEN_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Use ${color} pen`}
              aria-pressed={penColor === color}
              disabled={disabled}
              onClick={() => setPenColor(color)}
              className={cn(
                "h-8 w-8 rounded-full border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition disabled:cursor-not-allowed disabled:opacity-50",
                penColor === color && "ring-2 ring-aero-deep ring-offset-2 ring-offset-white/70",
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </fieldset>
        <button
          type="button"
          onClick={clearCanvas}
          disabled={disabled || !hasInk}
          className="inline-flex items-center gap-2 rounded-md border border-white/75 bg-white/58 px-3 py-2 font-mono text-xs font-black uppercase tracking-[0.12em] text-aero-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition hover:bg-white/75 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        aria-label="Draw a postcard doodle"
        role="img"
        className={cn(
          "aspect-[8/5] w-full max-w-[320px] touch-none rounded-lg border border-white/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_14px_30px_rgba(0,80,160,0.12)]",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-crosshair",
        )}
        onPointerDown={startDrawing}
        onPointerMove={continueDrawing}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
        onPointerLeave={stopDrawing}
      />
      <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-aero-ink/55">
        Tiny PNG doodle, capped at 200KB
      </p>
    </div>
  );
}
