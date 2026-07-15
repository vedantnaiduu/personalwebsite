"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

export type GuestbookEntry = {
  readonly id: string;
  readonly created_at: string;
  readonly name: string;
  readonly message: string;
  readonly drawing: string | null;
};

type PostcardProps = {
  readonly entry: GuestbookEntry;
  readonly className?: string;
};

const INLINE_IMAGE_DATA_URL = /^data:image\/(png|jpeg|webp|svg\+xml)(?:;[^,]*)?,/i;

function formatAbsoluteDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "recent";

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

function formatRelativeDate(value: string) {
  const then = new Date(value).getTime();
  if (Number.isNaN(then)) return "recently";

  const seconds = Math.max(1, Math.round((Date.now() - then) / 1000));
  if (seconds < 60) return "just now";

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

function useClientDateLabel(value: string) {
  const absolute = useMemo(() => formatAbsoluteDate(value), [value]);
  const [label, setLabel] = useState(absolute);

  useEffect(() => {
    function updateLabel() {
      setLabel(formatRelativeDate(value));
    }

    updateLabel();
    const timer = window.setInterval(updateLabel, 60_000);
    return () => window.clearInterval(timer);
  }, [value]);

  return label;
}

export function Postcard({ entry, className }: PostcardProps) {
  const dateLabel = useClientDateLabel(entry.created_at);
  const absoluteDate = formatAbsoluteDate(entry.created_at);

  return (
    <article className={cn("grid h-full gap-3 border border-line bg-surface p-3", className)}>
      <div className="relative aspect-[8/5] overflow-hidden border border-line bg-bg">
        {entry.drawing && INLINE_IMAGE_DATA_URL.test(entry.drawing) ? (
            // Only render inline image data URLs — never an attacker-controlled external URL.
            // eslint-disable-next-line @next/next/no-img-element
          <img src={entry.drawing} alt={`Doodle by ${entry.name}`} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-surface-2 text-text-faint">
            <span className="font-mono text-[0.64rem] uppercase tracking-[0.09em]">blank mark</span>
          </div>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate text-sm font-medium tracking-[-0.01em] text-text">{entry.name}</h3>
          <time
            dateTime={entry.created_at}
            title={absoluteDate}
            className="shrink-0 pt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.09em] text-text-faint"
            suppressHydrationWarning
          >
            {dateLabel}
          </time>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-text-muted">{entry.message}</p>
      </div>
    </article>
  );
}
