"use client";

import {
  Check,
  FileText,
  Github,
  Linkedin,
  Mail,
  Music2,
  Navigation,
  Search,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

import { useY2K } from "@/components/providers/Y2KProvider";
import { identity } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const OPEN_COMMAND_PALETTE_EVENT = "vedant:open-command-palette";

type Command = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly keywords: readonly string[];
  readonly icon: LucideIcon;
  readonly run: () => void | Promise<void>;
};

const sectionCommands = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "guestbook", label: "Guestbook" },
  { id: "contact", label: "Contact" },
] as const;

function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}

export function CommandPalette() {
  const { toggleY2K, y2k } = useY2K();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const closePalette = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  }, []);

  const jumpToSection = useCallback(
    (id: string) => {
      closePalette();
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    },
    [closePalette],
  );

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      closePalette();
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  }, [closePalette]);

  const openUrl = useCallback(
    (url: string) => {
      closePalette();
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [closePalette],
  );

  const commands = useMemo<readonly Command[]>(
    () => [
      ...sectionCommands.map((section) => ({
        id: `section-${section.id}`,
        title: `Jump to ${section.label}`,
        subtitle: `#${section.id}`,
        keywords: [section.id, section.label, "section", "jump", "navigate"],
        icon: Navigation,
        run: () => jumpToSection(section.id),
      })),
      {
        id: "copy-email",
        title: copied ? "Email copied" : "Copy email",
        subtitle: identity.email,
        keywords: ["email", "mail", "copy", "contact"],
        icon: copied ? Check : Mail,
        run: copyEmail,
      },
      {
        id: "open-resume",
        title: "Open résumé",
        subtitle: identity.resumePdf,
        keywords: ["resume", "résumé", "cv", "pdf"],
        icon: FileText,
        run: () => openUrl(identity.resumePdf),
      },
      {
        id: "open-github",
        title: "Open GitHub",
        subtitle: identity.github.replace("https://", ""),
        keywords: ["github", "code", "social"],
        icon: Github,
        run: () => openUrl(identity.github),
      },
      {
        id: "open-linkedin",
        title: "Open LinkedIn",
        subtitle: identity.linkedin.replace("https://", ""),
        keywords: ["linkedin", "social", "work"],
        icon: Linkedin,
        run: () => openUrl(identity.linkedin),
      },
      {
        id: "open-spotify",
        title: "Open Spotify",
        subtitle: identity.spotify.replace("https://", ""),
        keywords: ["spotify", "music", "now playing"],
        icon: Music2,
        run: () => openUrl(identity.spotify),
      },
      {
        id: "toggle-y2k",
        title: y2k ? "Turn Y2K mode off" : "Toggle Y2K mode",
        subtitle: y2k ? "Return to clean Aqua Terminal" : "Enable scanlines, chrome, and sparkle trail",
        keywords: ["y2k", "retro", "konami", "theme", "mode"],
        icon: Sparkles,
        run: () => {
          toggleY2K();
          closePalette();
        },
      },
    ],
    [closePalette, copied, copyEmail, jumpToSection, openUrl, toggleY2K, y2k],
  );

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return commands;
    }

    return commands.filter((command) => {
      const haystack = [command.title, command.subtitle, ...command.keywords].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (selectedIndex > filteredCommands.length - 1) {
      setSelectedIndex(Math.max(filteredCommands.length - 1, 0));
    }
  }, [filteredCommands.length, selectedIndex]);

  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          closePalette();
        } else {
          setOpen(true);
        }
      }

      if (event.key === "Escape" && open) {
        closePalette();
      }
    }

    function handleOpenEvent() {
      setOpen(true);
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, handleOpenEvent);
    };
  }, [closePalette, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const runSelectedCommand = useCallback(() => {
    const command = filteredCommands[selectedIndex];
    void command?.run();
  }, [filteredCommands, selectedIndex]);

  const handleDialogKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (!focusable?.length) {
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }

      if (event.key === "Escape") {
        event.preventDefault();
        closePalette();
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % Math.max(filteredCommands.length, 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => (current - 1 + Math.max(filteredCommands.length, 1)) % Math.max(filteredCommands.length, 1));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        runSelectedCommand();
      }
    },
    [closePalette, filteredCommands.length, runSelectedCommand],
  );

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby="command-palette-title"
      aria-modal="true"
      className="fixed inset-0 z-[80] flex items-start justify-center bg-aero-ink/28 px-3 pt-20 backdrop-blur-sm sm:pt-28"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePalette();
        }
      }}
    >
      <div
        ref={dialogRef}
        className="window-chrome w-full max-w-2xl overflow-hidden"
        onKeyDown={handleDialogKeyDown}
      >
        <div className="window-titlebar">
          <span className="window-controls" aria-hidden="true">
            <span className="window-dot window-dot-close" />
            <span className="window-dot window-dot-min" />
            <span className="window-dot window-dot-max" />
          </span>
          <h2 id="command-palette-title" className="truncate font-mono text-xs">
            command_palette.exe
          </h2>
          <button
            aria-label="Close command palette"
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full text-aero-deep transition hover:bg-white/55 focus-visible:outline-aero-lime"
            type="button"
            onClick={closePalette}
          >
            <X aria-hidden="true" size={16} />
          </button>
        </div>

        <div className="border-b border-white/70 bg-white/45 px-4 py-3">
          <div className="flex items-center gap-3 rounded-glass border border-white/75 bg-white/68 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
            <Search aria-hidden="true" className="shrink-0 text-aero-deep/64" size={18} />
            <input
              ref={inputRef}
              aria-activedescendant={filteredCommands[selectedIndex]?.id}
              aria-controls="command-palette-results"
              aria-label="Search commands"
              className="min-w-0 flex-1 bg-transparent text-base font-bold text-aero-ink outline-none placeholder:text-aero-ink/48"
              placeholder="Jump to a section or run an action..."
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <kbd className="hidden rounded border border-aero-deep/18 bg-white/72 px-2 py-1 font-mono text-[0.62rem] font-black uppercase text-aero-deep/72 sm:block">
              Esc
            </kbd>
          </div>
        </div>

        <div id="command-palette-results" className="max-h-[24rem] overflow-y-auto p-2" role="listbox">
          {filteredCommands.length ? (
            filteredCommands.map((command, index) => {
              const Icon = command.icon;
              const selected = index === selectedIndex;

              return (
                <button
                  key={command.id}
                  id={command.id}
                  aria-selected={selected}
                  className={cn(
                    "grid w-full grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-3 rounded-glass px-3 py-3 text-left transition focus-visible:outline-aero-lime",
                    selected ? "bg-aero-deep text-white shadow-glow" : "text-aero-ink hover:bg-white/56",
                  )}
                  role="option"
                  type="button"
                  onClick={() => void command.run()}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-full border",
                      selected ? "border-white/36 bg-white/18" : "border-white/75 bg-white/55 text-aero-deep",
                    )}
                  >
                    <Icon aria-hidden="true" size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-black">{command.title}</span>
                    <span className={cn("block truncate font-mono text-xs", selected ? "text-white/76" : "text-aero-ink/58")}>
                      {command.subtitle}
                    </span>
                  </span>
                </button>
              );
            })
          ) : (
            <p className="px-4 py-8 text-center font-mono text-sm font-bold uppercase tracking-[0.12em] text-aero-ink/58">
              No matching commands
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export { openCommandPalette };
