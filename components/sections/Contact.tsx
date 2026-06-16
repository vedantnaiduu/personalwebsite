"use client";

import Link from "next/link";
import { useState } from "react";

import { SectionShell } from "@/components/sections/SectionShell";
import { identity } from "@/lib/site-data";

const links = [
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "Résumé", href: identity.resumePdf },
] as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  }

  return (
    <SectionShell id="contact" eyebrow="› contact" title="Say hello">
      <div className="grid max-w-[46rem] gap-8">
        <p className="text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.45] tracking-[-0.02em] text-text-muted">
          If you are building AI systems that need to make it past the demo table, I would like to
          hear about it.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 font-mono text-[0.72rem] uppercase tracking-[0.09em] text-text-muted">
          <button
            type="button"
            onClick={copyEmail}
            className="link-wipe transition-colors duration-200 ease-out-expo hover:text-text focus-visible:text-text motion-reduce:transition-none"
            aria-label={copied ? "Email copied" : `Copy ${identity.email}`}
          >
            {copied ? "copied" : identity.email}
          </button>

          {links.map((link) => (
            <Link
              key={link.href}
              className="link-wipe transition-colors duration-200 ease-out-expo hover:text-text focus-visible:text-text motion-reduce:transition-none"
              href={link.href}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
            >
              {link.label}
              {link.href.startsWith("http") || link.href.endsWith(".pdf") ? " ↗" : null}
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
