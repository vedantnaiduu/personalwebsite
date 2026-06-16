"use client";

import { Command, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { openCommandPalette } from "@/components/layout/CommandPalette";
import { useY2K } from "@/components/providers/Y2KProvider";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Guestbook", href: "#guestbook" },
  { label: "Contact", href: "#contact" },
] as const;

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionIds = ["hero", ...navItems.map((item) => item.href.slice(1))];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.12, 0.24, 0.4],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

export function Nav() {
  const activeSection = useActiveSection();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { toggleY2K, y2k } = useY2K();

  useEffect(() => {
    if (!drawerOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  const navLinks = navItems.map((item) => {
    const sectionId = item.href.slice(1);
    const active = activeSection === sectionId;

    return (
      <Link
        key={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "rounded-full px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-aero-ink/68 transition hover:bg-white/45 hover:text-aero-deep focus-visible:outline-aero-lime",
          active && "bg-white/68 text-aero-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]",
        )}
        href={item.href}
        onClick={() => setDrawerOpen(false)}
      >
        {item.label}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Primary navigation"
        className="glass mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-3 sm:px-4"
      >
        <Link
          className="group flex min-w-0 items-center gap-3 rounded-full px-2 py-2 focus-visible:outline-aero-lime"
          href="#hero"
          onClick={() => setDrawerOpen(false)}
        >
          <span className="chrome-text text-xl font-black leading-none">VN</span>
          <span className="hidden text-xs font-black uppercase tracking-[0.18em] text-aero-deep sm:inline">
            vedant naidu
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">{navLinks}</div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Open command palette"
            className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/42 px-2.5 py-1 font-mono text-[0.68rem] font-bold text-aero-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] transition hover:bg-white/62 focus-visible:outline-aero-lime sm:inline-flex"
            type="button"
            onClick={openCommandPalette}
          >
            <Command aria-hidden="true" size={13} />
            K
          </button>
          <button
            aria-pressed={y2k}
            className={cn(
              "rounded-full border border-white/75 px-3 py-2 font-mono text-[0.68rem] font-bold uppercase text-aero-deep transition hover:bg-white/58 focus-visible:outline-aero-lime",
              y2k && "bg-aero-lime/70 shadow-glow",
            )}
            type="button"
            onClick={toggleY2K}
          >
            Y2K
          </button>
          <button
            aria-expanded={drawerOpen}
            aria-controls="mobile-nav"
            aria-label={drawerOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/75 bg-white/42 text-aero-deep transition hover:bg-white/60 focus-visible:outline-aero-lime lg:hidden"
            type="button"
            onClick={() => setDrawerOpen((open) => !open)}
          >
            {drawerOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        className={cn(
          "glass mx-auto mt-2 max-w-6xl overflow-hidden px-3 py-3 transition lg:hidden",
          drawerOpen ? "block" : "hidden",
        )}
      >
        <div className="grid gap-1 sm:grid-cols-2">{navLinks}</div>
      </div>
    </header>
  );
}
