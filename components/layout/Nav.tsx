import Link from "next/link";

import { identity } from "@/lib/site-data";

const navItems = [
  { label: "work", href: "#work" },
  { label: "about", href: "#about" },
  { label: "guestbook", href: "#guestbook" },
  { label: "résumé ↗", href: identity.resumePdf },
] as const;

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <nav
        aria-label="Primary navigation"
        className="container-page flex min-h-16 items-center justify-between gap-4 py-4"
      >
        <Link
          className="link-wipe shrink-0 font-medium leading-none tracking-[-0.01em] text-text"
          href="#hero"
        >
          vedant naidu
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-text-muted">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="link-wipe transition-colors duration-200 ease-out-expo hover:text-text focus-visible:text-text"
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
