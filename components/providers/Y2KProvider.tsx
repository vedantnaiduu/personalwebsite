"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Y2KContextValue = {
  readonly y2k: boolean;
  readonly setY2K: (enabled: boolean) => void;
  readonly toggleY2K: () => void;
};

const Y2K_STORAGE_KEY = "vedant:y2k";
const KONAMI_SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
] as const;

const Y2KContext = createContext<Y2KContextValue | null>(null);

export function Y2KProvider({ children }: { readonly children: ReactNode }) {
  const [y2k, setY2KState] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setY2KState(window.localStorage.getItem(Y2K_STORAGE_KEY) === "on");
    } catch {
      setY2KState(false);
    }

    setHydrated(true);
  }, []);

  const setY2K = useCallback((enabled: boolean) => {
    setY2KState(enabled);
  }, []);

  const toggleY2K = useCallback(() => {
    setY2KState((current) => !current);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (y2k) {
      root.dataset.y2k = "on";
    } else {
      delete root.dataset.y2k;
    }

    try {
      window.localStorage.setItem(Y2K_STORAGE_KEY, y2k ? "on" : "off");
    } catch {
      // Storage can be unavailable in private or locked-down browser contexts.
    }
  }, [y2k]);

  useKonami(toggleY2K);

  const value = useMemo(
    () => ({
      y2k,
      setY2K,
      toggleY2K,
    }),
    [setY2K, toggleY2K, y2k],
  );

  return (
    <Y2KContext.Provider value={value}>
      {children}
      <Y2KModeEffects active={hydrated} enabled={y2k} />
    </Y2KContext.Provider>
  );
}

export function useY2K() {
  const context = useContext(Y2KContext);

  if (!context) {
    throw new Error("useY2K must be used within Y2KProvider");
  }

  return context;
}

export function useKonami(onMatch: () => void) {
  const onMatchRef = useRef(onMatch);
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    onMatchRef.current = onMatch;
  }, [onMatch]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      bufferRef.current = [...bufferRef.current, key].slice(
        -KONAMI_SEQUENCE.length,
      );

      const matched = KONAMI_SEQUENCE.every(
        (sequenceKey, index) => bufferRef.current[index] === sequenceKey,
      );

      if (matched) {
        bufferRef.current = [];
        onMatchRef.current();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleChange() {
      setReduced(mediaQuery.matches);
    }

    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

type Sparkle = {
  readonly id: number;
  readonly x: number;
  readonly y: number;
};

function Y2KModeEffects({
  active,
  enabled,
}: {
  readonly active: boolean;
  readonly enabled: boolean;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [flourish, setFlourish] = useState<"on" | "off" | null>(null);
  const [sparkles, setSparkles] = useState<readonly Sparkle[]>([]);
  const previousEnabledRef = useRef(enabled);
  const hasMountedRef = useRef(false);
  const sparkleIdRef = useRef(0);

  useEffect(() => {
    if (!active) {
      previousEnabledRef.current = enabled;
      return;
    }

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      previousEnabledRef.current = enabled;
      return;
    }

    if (previousEnabledRef.current === enabled) {
      return;
    }

    previousEnabledRef.current = enabled;
    setFlourish(enabled ? "on" : "off");

    const timeout = window.setTimeout(() => setFlourish(null), reducedMotion ? 1200 : 900);
    return () => window.clearTimeout(timeout);
  }, [active, enabled, reducedMotion]);

  useEffect(() => {
    if (!enabled || reducedMotion) {
      setSparkles([]);
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      const id = sparkleIdRef.current + 1;
      sparkleIdRef.current = id;
      setSparkles((current) => [...current.slice(-13), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => {
        setSparkles((current) => current.filter((sparkle) => sparkle.id !== id));
      }, 650);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [enabled, reducedMotion]);

  return (
    <>
      {flourish ? (
        <div
          aria-live="polite"
          className="pointer-events-none fixed left-1/2 top-24 z-[90] -translate-x-1/2 rounded-full border border-white/80 bg-white/72 px-4 py-2 font-mono text-xs font-black uppercase tracking-[0.16em] text-aero-deep shadow-glow backdrop-blur-md y2k-flourish"
        >
          Y2K mode {flourish}
        </div>
      ) : null}
      {enabled && !reducedMotion
        ? sparkles.map((sparkle) => (
            <span
              key={sparkle.id}
              aria-hidden="true"
              className="y2k-cursor-sparkle"
              style={
                {
                  "--sparkle-x": `${sparkle.x}px`,
                  "--sparkle-y": `${sparkle.y}px`,
                } as CSSProperties
              }
            />
          ))
        : null}
    </>
  );
}
