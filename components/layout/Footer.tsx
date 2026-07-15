import { identity, socialLinks } from "@/lib/site-data";

const emailLink = socialLinks.find((link) => link.label === "Email")!;
const githubLink = socialLinks.find((link) => link.label === "GitHub")!;
const linkedinLink = socialLinks.find((link) => link.label === "LinkedIn")!;
const resumeLink = socialLinks.find((link) => link.label === "Resume")!;

const links = [
  { label: "email", href: emailLink.href },
  { label: "github", href: githubLink.href },
  { label: "linkedin", href: linkedinLink.href },
  { label: "résumé", href: resumeLink.href },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-10">
      <div className="container-page flex flex-col gap-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-sans leading-relaxed tracking-[-0.01em] text-ink">
            Open to a conversation about agentic systems, RAG, or the next thing worth shipping.
          </p>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted"
          >
            {links.map((link) => (
              <a
                key={link.href}
                className="link-wipe transition-colors duration-200 ease-out-expo hover:text-ink focus-visible:text-ink motion-reduce:transition-none"
                href={link.href}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
              >
                {link.label}
                {link.href.startsWith("http") || link.href.endsWith(".pdf") ? " ↗" : null}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {identity.name.toLowerCase()} · built in next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
