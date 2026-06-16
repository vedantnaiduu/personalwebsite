"use client";

import { Check, Copy, Github, Linkedin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { NowPlaying } from "@/components/ui/NowPlaying";
import { identity } from "@/lib/site-data";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  }

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: "easeOut" },
      };

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-5rem)] scroll-mt-28 items-center px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.div
        {...motionProps}
        className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end"
      >
        <div className="max-w-4xl">
          <p className="mb-4 inline-flex rounded-full border border-white/75 bg-white/48 px-3 py-1.5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em] text-aero-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
            UMass Amherst / Boston / Bay Area
          </p>
          <h1 className="chrome-text max-w-5xl text-6xl font-black leading-[0.9] tracking-normal sm:text-7xl md:text-8xl lg:text-9xl">
            Vedant Naidu
          </h1>
          <p className="mt-6 max-w-3xl text-2xl font-extrabold leading-tight text-aero-ink sm:text-3xl">
            {identity.positioning}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-aero-ink/76 sm:text-lg">
            I build production AI systems that get past the demo: agentic workflows, retrieval
            pipelines, and practical interfaces for people who need answers fast.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-aero-deep px-5 py-3 text-sm font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-aero-ink focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
              href={identity.resumePdf}
            >
              View résumé
            </Link>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-white/58 px-5 py-3 text-sm font-bold text-aero-deep transition hover:-translate-y-0.5 hover:bg-white/75 focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
              type="button"
              onClick={copyEmail}
            >
              {copied ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
              {copied ? "Copied!" : "Copy email"}
            </button>
            <Link
              aria-label="GitHub"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/50 text-aero-deep transition hover:bg-white/75 focus-visible:outline-aero-lime"
              href={identity.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github aria-hidden="true" size={18} />
            </Link>
            <Link
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/50 text-aero-deep transition hover:bg-white/75 focus-visible:outline-aero-lime"
              href={identity.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>

        <NowPlaying />
      </motion.div>
    </section>
  );
}
