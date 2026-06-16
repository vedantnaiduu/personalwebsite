"use client";

import { Check, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { WindowFrame } from "@/components/ui/WindowFrame";
import { identity } from "@/lib/site-data";

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
    <section id="contact" className="scroll-mt-28 py-8" aria-labelledby="contact-title">
      <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-aero-deep/72">
            06 / contact
          </p>
          <h2 id="contact-title" className="mt-3 text-3xl font-black tracking-normal text-aero-ink sm:text-4xl">
            Contact
          </h2>
        </div>

        <WindowFrame title="contact.sys" bodyClassName="grid gap-5">
          <div className="max-w-2xl">
            <p className="text-lg font-black leading-tight text-aero-ink">
              Want to talk AI systems, applied research, or a project that needs to ship?
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-aero-ink/76">
              Email is the fastest path. Résumé, GitHub, and LinkedIn are one click away.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-glass bg-aero-deep px-4 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-aero-ink focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
              type="button"
              onClick={copyEmail}
            >
              {copied ? <Check aria-hidden="true" size={17} /> : <Copy aria-hidden="true" size={17} />}
              {copied ? "Copied" : "Copy email"}
            </button>
            <Link
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-glass border border-white/80 bg-white/58 px-4 py-3 text-sm font-black text-aero-deep transition hover:-translate-y-0.5 hover:bg-white/75 focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
              href={identity.resumePdf}
              target="_blank"
            >
              <FileText aria-hidden="true" size={17} />
              Résumé
            </Link>
            <Link
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-glass border border-white/80 bg-white/58 px-4 py-3 text-sm font-black text-aero-deep transition hover:-translate-y-0.5 hover:bg-white/75 focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
              href={identity.github}
              rel="noreferrer"
              target="_blank"
            >
              <Github aria-hidden="true" size={17} />
              GitHub
            </Link>
            <Link
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-glass border border-white/80 bg-white/58 px-4 py-3 text-sm font-black text-aero-deep transition hover:-translate-y-0.5 hover:bg-white/75 focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
              href={identity.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              <Linkedin aria-hidden="true" size={17} />
              LinkedIn
            </Link>
          </div>

          <a
            className="inline-flex w-fit items-center gap-2 rounded-full px-1 text-sm font-bold text-aero-deep underline decoration-aero-blue/45 decoration-2 underline-offset-4 transition hover:text-aero-ink focus-visible:outline-aero-lime"
            href={`mailto:${identity.email}`}
          >
            <Mail aria-hidden="true" size={16} />
            {identity.email}
          </a>
        </WindowFrame>
      </div>
    </section>
  );
}
