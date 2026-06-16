"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

import { ease } from "@/lib/motion";

function shouldDisableLenis() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function LenisProvider({ children }: { readonly children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    function updateEnabled() {
      setEnabled(!shouldDisableLenis());
    }

    updateEnabled();
    reducedMotionQuery.addEventListener("change", updateEnabled);
    coarsePointerQuery.addEventListener("change", updateEnabled);

    return () => {
      reducedMotionQuery.removeEventListener("change", updateEnabled);
      coarsePointerQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: ease.expoOut,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
