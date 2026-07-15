"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { AsciiText } from "@/components/ascii/AsciiText";

/**
 * Intro loader — the name rendered as ASCII glyph art (AsciiText) on a white
 * field, building in left-to-right, holding, then fading to reveal the site.
 * Plays once per session; click / key / scroll fast-forwards it; skipped under
 * prefers-reduced-motion.
 */

const NAME = "vedant";
const HOLD_UNTIL = 2.7; // seconds before fade
const DONE_AT = 3.4;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function IntroLoader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  const startedRef = useRef(false);

  useIsoLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("vn:intro") === "1";
    if (prefersReduced || seen) {
      document.documentElement.dataset.intro = "done";
      setGone(true);
      return;
    }

    document.documentElement.dataset.intro = "playing";
    document.body.style.overflow = "hidden";

    const fadeT = window.setTimeout(() => setFading(true), HOLD_UNTIL * 1000);
    const doneT = window.setTimeout(finish, DONE_AT * 1000);

    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      sessionStorage.setItem("vn:intro", "1");
      window.clearTimeout(fadeT);
      window.clearTimeout(doneT);
      window.removeEventListener("pointerdown", onSkip);
      window.removeEventListener("keydown", onSkip);
      window.removeEventListener("wheel", onSkip);
      document.body.style.overflow = "";
      document.documentElement.dataset.intro = "done";
      setGone(true);
    }
    function onSkip() {
      setFading(true);
      window.setTimeout(finish, 450);
    }
    window.addEventListener("pointerdown", onSkip, { once: true });
    window.addEventListener("keydown", onSkip, { once: true });
    window.addEventListener("wheel", onSkip, { once: true, passive: true });

    return () => {
      window.clearTimeout(fadeT);
      window.clearTimeout(doneT);
      window.removeEventListener("pointerdown", onSkip);
      window.removeEventListener("keydown", onSkip);
      window.removeEventListener("wheel", onSkip);
      document.body.style.overflow = "";
    };
  }, []);

  startedRef.current = true;

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-bg transition-opacity duration-[600ms] ease-out-expo"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="h-[26vh] max-h-[220px] min-h-[120px] w-[86%] max-w-[1000px] text-ink">
        <AsciiText text={NAME} fontSize={13} weight={800} assemble={1.1} />
      </div>
      <span className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.34em] text-text-faint">
        naidu
      </span>
    </div>
  );
}
