import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Golden ratio utility functions
 */
export const GOLDEN_RATIO = 1.618033988749895;

/**
 * Calculate golden ratio spacing
 */
export function goldenSpacing(multiplier: number): number {
  return 8 * Math.pow(GOLDEN_RATIO, multiplier);
}

/**
 * Calculate golden ratio font size
 */
export function goldenFontSize(base: number, level: number): number {
  return base * Math.pow(GOLDEN_RATIO, level);
}

/**
 * Calculate component width using golden ratio
 */
export function goldenWidth(totalWidth: number, isMain: boolean = true): number {
  if (isMain) {
    return totalWidth / GOLDEN_RATIO;
  }
  return totalWidth - (totalWidth / GOLDEN_RATIO);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Prefix a path with the base path for production
 */
export function prefixPath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/personalwebsite' : '';
  if (path.startsWith('/') && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  return path;
}

