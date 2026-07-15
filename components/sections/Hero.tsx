"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { experience, identity } from "@/lib/site-data";

const currentRole = experience[0];

const heroLinks = [
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "Résumé ↗", href: identity.resumePdf },
] as const;

const retrievalHits = [
  { source: "105 CMR 590.000", score: "0.94", label: "food code citation" },
  { source: "105 CMR 410.000", score: "0.88", label: "housing standard" },
  { source: "DPH inspection memo", score: "0.82", label: "local workflow" },
] as const;

export function Hero() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  }

  return (
    <section
      id="hero"
      className="relative isolate min-h-[calc(100svh-4rem)] scroll-mt-24 py-16 sm:py-24 lg:py-32"
    >
      <div className="container-page grid min-h-[calc(100svh-12rem)] gap-12 lg:grid-cols-[minmax(0,0.98fr)_minmax(22rem,0.62fr)] lg:items-end lg:gap-16">
        <div className="max-w-[58rem]">
          <MaskText
            className="text-[clamp(2.9rem,9.4vw,7.4rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-text"
            lineClassName="block"
            lines={[
              "I build AI systems that",
              <>
                <span className="font-accent font-normal italic tracking-[-0.03em] text-accent">
                  actually
                </span>{" "}
                ship.
              </>,
            ]}
          />

          <Reveal className="mt-7 max-w-copy text-base leading-7 text-text-muted sm:mt-8 sm:text-lg sm:leading-8">
            {identity.positioning} From a chatbot used by 351 Massachusetts health departments to
            hackathon-winning voice agents.
          </Reveal>

          <Reveal className="mt-10 grid max-w-3xl gap-4 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-muted sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-x-8">
            <span className="text-text-faint">Now</span>
            <span>
              {currentRole.role} · {currentRole.organization}
            </span>

            <span className="text-text-faint">Based</span>
            <span>Amherst / Boston</span>

            <span className="text-text-faint">Links</span>
            <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {heroLinks.map((link) => (
                <a
                  key={link.href}
                  className="link-wipe transition-colors duration-200 ease-out-expo hover:text-text focus-visible:text-text"
                  href={link.href}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                >
                  {link.label}
                </a>
              ))}
              <button
                className="link-wipe inline-flex items-center gap-2 uppercase transition-colors duration-200 ease-out-expo hover:text-text focus-visible:text-text"
                type="button"
                onClick={copyEmail}
              >
                {copied ? <Check aria-hidden="true" size={13} /> : <Copy aria-hidden="true" size={13} />}
                {copied ? "Copied" : "Email"}
              </button>
            </span>
          </Reveal>
        </div>

        <Reveal as="aside" className="lg:translate-y-8" delay={0.24}>
          <SystemReadout />
        </Reveal>
      </div>
    </section>
  );
}

function SystemReadout() {
  return (
    <div className="w-full rounded-visual bg-surface p-4 font-mono text-[0.72rem] leading-6 text-text-muted ring-1 ring-line sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="uppercase tracking-[0.1em] text-text-faint">ma-health-rag.trace</p>
          <p className="mt-1 text-text">regulatory answer pipeline</p>
        </div>
        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
      </div>

      <div className="space-y-5">
        <TraceBlock label="user.query">
          <span className="text-text">&ldquo;Can a local inspector cite this food-code clause?&rdquo;</span>
        </TraceBlock>

        <TraceBlock label="retrieve.hybrid">
          <div className="space-y-2">
            {retrievalHits.map((hit) => (
              <div key={hit.source} className="grid grid-cols-[1fr_auto] gap-3 border-b border-line pb-2 last:border-0 last:pb-0">
                <span className="min-w-0 truncate text-text">{hit.source}</span>
                <span className="text-text-faint">{hit.score}</span>
                <span className="col-span-2 text-text-faint">{hit.label}</span>
              </div>
            ))}
          </div>
        </TraceBlock>

        <TraceBlock label="answer.cited">
          <p>
            Return the clause, jurisdiction note, and inline citation before a recommendation.
            Citation confidence <span className="text-accent">94%</span>; no uncited claims.
          </p>
        </TraceBlock>

        <div className="flex flex-wrap gap-2 pt-1 text-[0.68rem] uppercase tracking-[0.08em]">
          <ReadoutTag>precision 94%</ReadoutTag>
          <ReadoutTag>&lt;30s lookup</ReadoutTag>
          <ReadoutTag>351 depts</ReadoutTag>
        </div>
      </div>
    </div>
  );
}

function TraceBlock({
  label,
  children,
}: {
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 uppercase tracking-[0.1em] text-text-faint">{label}</p>
      <div className="bg-surface-2 px-3 py-3 text-text-muted">{children}</div>
    </div>
  );
}

function ReadoutTag({ children }: { readonly children: React.ReactNode }) {
  return <span className="bg-accent-weak px-2 py-1 text-accent">{children}</span>;
}
