import Link from "next/link";

import { identity } from "@/lib/site-data";

const navItems = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "résumé ↗", href: identity.resumePdf },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <nav
        aria-label="Primary navigation"
        className="container-page flex min-h-16 items-center justify-between gap-6 py-4"
      >
        <Link
          className="link-wipe shrink-0 font-sans font-medium leading-none tracking-[-0.01em] text-ink"
          href="#about"
        >
          vedant naidu
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="link-wipe transition-colors duration-200 ease-out-expo hover:text-ink focus-visible:text-ink motion-reduce:transition-none"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
