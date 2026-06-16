import { identity } from "@/lib/site-data";

const links = [
  { label: "email", href: `mailto:${identity.email}` },
  { label: "github", href: identity.github },
  { label: "linkedin", href: identity.linkedin },
  { label: "résumé", href: identity.resumePdf },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-8">
      <div className="container-page flex flex-col gap-4 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 vedant naidu · built with next.js</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <a
              key={link.href}
              className="link-wipe transition-colors duration-200 ease-out-expo hover:text-text focus-visible:text-text"
              href={link.href}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : undefined}
            >
              {link.label}
              {link.href.startsWith("http") || link.href.endsWith(".pdf") ? " ↗" : null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
