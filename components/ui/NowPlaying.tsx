"use client";

import { ExternalLink, Music2 } from "lucide-react";
import useSWR from "swr";

import { cn } from "@/lib/utils";
import { identity } from "@/lib/site-data";

type NowPlayingData = {
  readonly isPlaying: boolean;
  readonly title?: string;
  readonly artist?: string;
  readonly album?: string;
  readonly albumImageUrl?: string | null;
  readonly songUrl?: string;
  readonly configured?: boolean;
  readonly error?: string;
};

async function fetcher(url: string): Promise<NowPlayingData> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load now playing");
  }

  return (await response.json()) as NowPlayingData;
}

export function NowPlaying() {
  const { data, error, isLoading } = useSWR<NowPlayingData>("/api/now-playing", fetcher, {
    refreshInterval: 30000,
    revalidateOnFocus: false,
  });

  const hasTrack = Boolean(data?.title && data?.artist && data?.songUrl);
  const showFallback = error || data?.configured === false || (!isLoading && !hasTrack);
  const href = hasTrack ? data?.songUrl ?? identity.spotify : identity.spotify;
  const statusLabel = data?.isPlaying ? "playing" : "last played";
  const marqueeText = hasTrack ? `♪ ${data?.title} — ${data?.artist}` : "music offline — house mix loading...";

  return (
    <aside className="window-chrome max-w-sm justify-self-start lg:justify-self-end" aria-label="Spotify status">
      <div className="window-titlebar">
        <span className="window-controls" aria-hidden="true">
          <span className="window-dot window-dot-close" />
          <span className="window-dot window-dot-min" />
          <span className="window-dot window-dot-max" />
        </span>
        <span className="truncate font-mono">now_playing.exe</span>
      </div>
      <a
        className="group grid grid-cols-[4rem_minmax(0,1fr)] items-center gap-3 px-4 py-4 text-aero-ink transition hover:bg-white/20 focus-visible:outline-aero-lime"
        href={href}
        rel="noreferrer"
        target="_blank"
      >
        <span className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-glass border border-white/70 bg-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]">
          {hasTrack && data?.albumImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={data.album ? `${data.album} album art` : ""}
              className="h-full w-full object-cover"
              height={64}
              src={data.albumImageUrl}
              width={64}
            />
          ) : (
            <Music2 aria-hidden="true" className="text-aero-deep/70" size={26} />
          )}
        </span>

        <span className="min-w-0">
          <span className="mb-2 flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2 py-1 font-mono text-[0.62rem] font-bold uppercase tracking-[0.1em]",
                data?.isPlaying
                  ? "border-aero-green/70 bg-aero-green/20 text-aero-deep"
                  : "border-white/70 bg-white/48 text-aero-ink/62",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  data?.isPlaying ? "bg-aero-green shadow-[0_0_14px_rgba(159,225,29,0.9)]" : "bg-aero-ink/28",
                )}
                aria-hidden="true"
              />
              {data?.isPlaying ? "▶" : "⏸"} {statusLabel}
            </span>
            <ExternalLink
              aria-hidden="true"
              className="shrink-0 text-aero-deep/56 transition group-hover:text-aero-deep"
              size={14}
            />
          </span>

          <span className="block overflow-hidden font-mono text-sm font-bold text-aero-ink">
            <span className={cn("now-playing-marquee inline-block whitespace-nowrap", showFallback && "text-aero-ink/72")}>
              {isLoading ? "connecting..." : marqueeText}
            </span>
          </span>
        </span>
      </a>
    </aside>
  );
}
