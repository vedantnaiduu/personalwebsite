"use client";

import { useEffect, useState } from "react";

import { useY2K } from "@/components/providers/Y2KProvider";
import { identity } from "@/lib/site-data";

const HIT_COUNTER_KEY = "vedant:hit-counter";
const badgeLabels = ["NEXT.JS", "AQUA", "RAG", "AGENTS", "Y2K OK"] as const;

function formatCounter(value: number) {
  return value.toString().padStart(6, "0").split("");
}

export function Footer() {
  const { y2k } = useY2K();
  const [hitCount, setHitCount] = useState(42069);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(HIT_COUNTER_KEY);
      const next = stored ? Number.parseInt(stored, 10) + 1 : 42069 + Math.floor(Date.now() / 86400000);
      const safeNext = Number.isFinite(next) ? next : 42069;
      window.localStorage.setItem(HIT_COUNTER_KEY, String(safeNext));
      setHitCount(safeNext);
    } catch {
      setHitCount(42069);
    }
  }, []);

  return (
    <footer className="relative z-10 px-4 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {y2k ? (
          <div className="mb-4 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <div
              aria-label={`Visitor counter ${hitCount}`}
              className="inline-flex w-fit items-center gap-1 rounded-glass border border-white/80 bg-aero-ink px-2 py-2 shadow-glow"
            >
              {formatCounter(hitCount).map((digit, index) => (
                <span
                  key={`${digit}-${index}`}
                  className="inline-flex h-8 w-6 items-center justify-center rounded border border-white/20 bg-black font-mono text-lg font-black text-aero-lime shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
                >
                  {digit}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {badgeLabels.map((label) => (
                <span
                  key={label}
                  className="inline-flex h-[31px] w-[88px] items-center justify-center border border-aero-ink bg-white text-center font-mono text-[0.62rem] font-black uppercase leading-none text-aero-deep shadow-[inset_0_0_0_2px_rgba(105,207,255,0.35)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="glass flex flex-col gap-3 px-5 py-5 text-sm text-aero-ink/76 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-aero-deep">
            © {new Date().getFullYear()} Vedant Naidu
          </p>
          <div className="flex flex-wrap gap-3 font-bold">
            <a className="hover:text-aero-deep focus-visible:outline-aero-lime" href={`mailto:${identity.email}`}>
              Email
            </a>
            <a className="hover:text-aero-deep focus-visible:outline-aero-lime" href={identity.github} rel="noreferrer" target="_blank">
              GitHub
            </a>
            <a className="hover:text-aero-deep focus-visible:outline-aero-lime" href={identity.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
            <a className="hover:text-aero-deep focus-visible:outline-aero-lime" href={identity.resumePdf} target="_blank">
              Résumé
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
