"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AsciiShape } from "@/components/ascii/AsciiShape";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { sphere } from "@/lib/ascii/shapes";
import { identity } from "@/lib/site-data";

const heroLinks = [
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "Résumé ↗", href: identity.resumePdf },
] as const;

const heroSphere = sphere({ angleStep: 0.14, radiusScale: 0.4 });

export function Hero() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  }

  return (
    <section
      id="hero"
      className="flex min-h-[calc(100dvh-4rem)] scroll-mt-24 flex-col items-center justify-center py-[clamp(3rem,8vw,6rem)] text-center"
    >
      <div className="container-page flex flex-col items-center">
        {/* signature ascii sphere */}
        <Reveal className="mb-10 h-40 w-40 sm:h-48 sm:w-48">
          <AsciiShape draw={heroSphere} className="text-ink" fontSize={12} speed={0.8} />
        </Reveal>

        <p className="label-mono mb-6 text-text-faint">cs + bio · umass amherst · amherst / boston</p>

        <MaskText
          className="font-display text-[clamp(2.4rem,7vw,5rem)] font-normal leading-[1.02] tracking-[-0.01em] text-ink"
          lineClassName="block"
          lines={[
            "I build things",
            <>
              that <span className="text-accent">outlive the demo</span>.
            </>,
          ]}
        />

        <Reveal className="mt-7 max-w-[52ch] font-sans text-base leading-7 text-text-muted sm:text-lg">
          Lately that means AI in the hands of the people running Massachusetts public health. I care
          more about whether it holds up than how it demos.
        </Reveal>

        <Reveal
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted"
          delay={0.12}
        >
          {heroLinks.map((link) => (
            <a
              key={link.href}
              className="link-wipe transition-colors duration-200 ease-out-expo hover:text-ink focus-visible:text-ink"
              href={link.href}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") ? "_blank" : undefined}
            >
              {link.label}
            </a>
          ))}
          <button
            className="link-wipe inline-flex items-center gap-2 uppercase transition-colors duration-200 ease-out-expo hover:text-ink focus-visible:text-ink"
            type="button"
            onClick={copyEmail}
          >
            {copied ? <Check aria-hidden="true" size={12} /> : <Copy aria-hidden="true" size={12} />}
            {copied ? "Copied" : "Email"}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
