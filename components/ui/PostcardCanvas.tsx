"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const CANVAS_WIDTH = 320;
const CANVAS_HEIGHT = 200;
const MAX_DATA_URL_LENGTH = 200_000;
const CANVAS_FILL = "#141417";
const PEN_COLORS = [
  { label: "off-white", value: "#ECECEE" },
  { label: "ember", value: "#FF5D3B" },
  { label: "muted gray", value: "#8A8A93" },
  { label: "faint gray", value: "#55555C" },
] as const;

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

  context.fillStyle = CANVAS_FILL;
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

    reducedContext.fillStyle = CANVAS_FILL;
    reducedContext.fillRect(0, 0, reduced.width, reduced.height);
    reducedContext.drawImage(source, 0, 0, reduced.width, reduced.height);
    source = reduced;
    dataUrl = source.toDataURL("image/png");
  }

  return dataUrl.length <= MAX_DATA_URL_LENGTH ? dataUrl : null;
}

export function PostcardCanvas({ onDrawingChange, className, disabled = false }: PostcardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [penColor, setPenColor] = useState<(typeof PEN_COLORS)[number]["value"]>(PEN_COLORS[0].value);
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
              key={color.value}
              type="button"
              aria-label={`Use ${color.label} pen`}
              aria-pressed={penColor === color.value}
              disabled={disabled}
              onClick={() => setPenColor(color.value)}
              className={cn(
                "h-6 w-6 border border-line transition duration-200 ease-out-expo disabled:cursor-not-allowed disabled:opacity-45 motion-reduce:transition-none",
                penColor === color.value && "border-accent ring-1 ring-accent ring-offset-2 ring-offset-bg",
              )}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </fieldset>
        <button
          type="button"
          onClick={clearCanvas}
          disabled={disabled || !hasInk}
          className="link-wipe font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint transition-colors duration-200 ease-out-expo hover:text-text focus-visible:text-text disabled:cursor-not-allowed disabled:text-text-faint disabled:opacity-45 motion-reduce:transition-none"
        >
          clear
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        aria-label="Draw a postcard doodle"
        role="img"
        className={cn(
          "aspect-[8/5] w-full max-w-[320px] touch-none border border-line bg-surface",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-crosshair",
        )}
        onPointerDown={startDrawing}
        onPointerMove={continueDrawing}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
        onPointerLeave={stopDrawing}
      />
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint">
        png doodle · 200kb max
      </p>
    </div>
  );
}
