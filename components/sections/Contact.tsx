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

// FormSubmit relays the message straight to the email — no backend or API key.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${identity.email}`;

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot filled → bot
    const name = String(data.get("name") || "");

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          reply_to: data.get("reply"),
          message: data.get("message"),
          _subject: `Portfolio message from ${name || "a visitor"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionShell id="contact" eyebrow="contact" title="Say hello">
      <div className="grid max-w-[46rem] gap-12">
        <p className="text-[clamp(1.3rem,2.2vw,1.8rem)] font-sans leading-[1.45] tracking-[-0.02em] text-ink">
          If you&apos;re building something in healthcare, AI, or anything meant to outlive its demo,
          I&apos;d love to hear about it. Drop me a note.
        </p>

        {/* message form → delivered to my inbox */}
        <form onSubmit={handleSubmit} className="border border-line p-6 sm:p-8">
          {/* honeypot (hidden from humans) */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="cf-name" label="Your name">
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Ada Lovelace"
                className="input-line"
              />
            </Field>
            <Field id="cf-reply" label="How to reach you back">
              <input
                id="cf-reply"
                name="reply"
                type="text"
                required
                placeholder="email or @handle"
                className="input-line"
              />
            </Field>
          </div>

          <div className="mt-6">
            <Field id="cf-msg" label="Message">
              <textarea
                id="cf-msg"
                name="message"
                required
                rows={4}
                placeholder="What are you building?"
                className="input-line resize-y"
              />
            </Field>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="bg-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-bg transition-opacity duration-200 ease-out-expo hover:opacity-80 focus-visible:opacity-80 disabled:opacity-45"
            >
              {status === "sending" ? "sending…" : status === "sent" ? "sent ✓" : "send message"}
            </button>

            {status === "sent" ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
                thanks, I&apos;ll get back to you.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                something broke.{" "}
                <button type="button" onClick={copyEmail} className="link-wipe">
                  email me directly
                </button>
              </p>
            ) : null}
          </div>
        </form>

        {/* quiet fallbacks */}
        <div className="grid gap-4 border-t border-line pt-6">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-text-faint">or reach me</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[0.72rem] uppercase tracking-[0.09em] text-text-muted">
            <button
              type="button"
              onClick={copyEmail}
              className="link-wipe transition-colors duration-200 ease-out-expo hover:text-ink focus-visible:text-ink motion-reduce:transition-none"
              aria-label={copied ? "Email copied" : `Copy ${identity.email}`}
            >
              {copied ? "copied" : identity.email}
            </button>

            {links.map((link) => (
              <Link
                key={link.href}
                className="link-wipe transition-colors duration-200 ease-out-expo hover:text-ink focus-visible:text-ink motion-reduce:transition-none"
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
      </div>
    </SectionShell>
  );
}

function Field({
  id,
  label,
  children,
}: {
  readonly id: string;
  readonly label: string;
  readonly children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="grid gap-2">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-text-muted">{label}</span>
      {children}
    </label>
  );
}
