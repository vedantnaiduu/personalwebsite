"use client";

import { useEffect, useMemo, useState } from "react";

import { SectionShell } from "@/components/sections/SectionShell";
import { Postcard, type GuestbookEntry } from "@/components/ui/Postcard";
import { PostcardCanvas } from "@/components/ui/PostcardCanvas";
import { getSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const LOCAL_COOLDOWN_MS = 20_000;
const COOLDOWN_KEY = "guestbook:last-posted-at";

const sampleDoodles = [
  "data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20200'%3E%3Crect%20width='320'%20height='200'%20fill='%23141417'/%3E%3Cpath%20d='M45%20126c33-58%2070%2054%20113-4%2030-40%2067-32%20117-76'%20fill='none'%20stroke='%23ECECEE'%20stroke-width='6'%20stroke-linecap='round'/%3E%3Ccircle%20cx='245'%20cy='61'%20r='9'%20fill='%23FF5D3B'/%3E%3C/svg%3E",
  "data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20200'%3E%3Crect%20width='320'%20height='200'%20fill='%23141417'/%3E%3Cpath%20d='M54%2054l45%2038-42%2042%2082-7%2046%2034%2029-77%2057-25'%20fill='none'%20stroke='%238A8A93'%20stroke-width='6'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3Cpath%20d='M74%20152h86'%20stroke='%23FF5D3B'%20stroke-width='4'%20stroke-linecap='round'/%3E%3C/svg%3E",
  "data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20200'%3E%3Crect%20width='320'%20height='200'%20fill='%23141417'/%3E%3Cpath%20d='M65%20121c25-27%2054-30%2082-8s56%2018%2085-12%2045-43%2056-34'%20fill='none'%20stroke='%23ECECEE'%20stroke-width='6'%20stroke-linecap='round'/%3E%3Cpath%20d='M76%2068h58M187%20148h70'%20stroke='%2355555C'%20stroke-width='5'%20stroke-linecap='round'/%3E%3C/svg%3E",
] as const;

const sampleEntries: GuestbookEntry[] = [
  {
    id: "sample-1",
    created_at: "2026-06-16T14:18:00.000Z",
    name: "Future visitor",
    message: "A quiet mark while the live wall waits for Supabase.",
    drawing: sampleDoodles[0],
  },
  {
    id: "sample-2",
    created_at: "2026-06-16T12:04:00.000Z",
    name: "Hackathon friend",
    message: "Dark mode guestbook feels much closer to the rest of the page.",
    drawing: sampleDoodles[1],
  },
  {
    id: "sample-3",
    created_at: "2026-06-15T19:42:00.000Z",
    name: "Supabase preview",
    message: "Connect the env vars and these samples become real marks.",
    drawing: sampleDoodles[2],
  },
];

type SubmitState = "idle" | "submitting" | "sent" | "error";

type GuestbookResponse = {
  readonly configured?: boolean;
  readonly entries?: GuestbookEntry[];
  readonly error?: string;
};

type GuestbookPostResponse = {
  readonly ok?: boolean;
  readonly configured?: boolean;
  readonly error?: string;
  readonly entry?: GuestbookEntry;
};

function getLocalCooldownRemaining() {
  if (typeof window === "undefined") return 0;
  const lastPosted = Number(window.localStorage.getItem(COOLDOWN_KEY) ?? 0);
  return Math.max(0, LOCAL_COOLDOWN_MS - (Date.now() - lastPosted));
}

export function PostcardWall() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(sampleEntries);
  const [configured, setConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [drawing, setDrawing] = useState<string | null>(null);
  const [canvasKey, setCanvasKey] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setConfigured(false);
      setEntries(sampleEntries);
      setLoading(false);
      return;
    }

    let active = true;

    async function loadEntries() {
      setConfigured(true);
      setLoading(true);

      try {
        const response = await fetch("/api/guestbook", { cache: "no-store" });
        const result = (await response.json()) as GuestbookResponse;

        if (!active) return;

        if (!response.ok || result.configured === false) {
          setConfigured(false);
          setEntries(sampleEntries);
          return;
        }

        setEntries(result.entries ?? []);
      } catch {
        if (active) {
          setEntries(sampleEntries);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadEntries();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setCooldownRemaining(getLocalCooldownRemaining());
    const timer = window.setInterval(() => {
      setCooldownRemaining(getLocalCooldownRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const submitDisabled = useMemo(
    () =>
      !configured ||
      submitState === "submitting" ||
      cooldownRemaining > 0 ||
      name.trim().length === 0 ||
      message.trim().length === 0,
    [configured, cooldownRemaining, message, name, submitState],
  );

  const disabledReason = !configured
    ? "guestbook goes live once Supabase is connected"
    : cooldownRemaining > 0
      ? `cooldown active for ${Math.ceil(cooldownRemaining / 1000)}s`
      : undefined;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitDisabled) return;

    setSubmitState("submitting");
    setFeedback("");

    const optimisticEntry: GuestbookEntry = {
      id: `optimistic-${crypto.randomUUID()}`,
      created_at: new Date().toISOString(),
      name: name.trim(),
      message: message.trim(),
      drawing,
    };

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: optimisticEntry.name,
          message: optimisticEntry.message,
          drawing,
          website,
        }),
      });

      const result = (await response.json()) as GuestbookPostResponse;

      if (!response.ok || !result.ok || !result.entry) {
        if (result.configured === false) {
          setConfigured(false);
          setEntries(sampleEntries);
        }
        throw new Error(result.error ?? "submit_failed");
      }

      window.localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      setCooldownRemaining(LOCAL_COOLDOWN_MS);
      setEntries((current) => [result.entry ?? optimisticEntry, ...current].slice(0, 100));
      setName("");
      setMessage("");
      setWebsite("");
      setDrawing(null);
      setCanvasKey((current) => current + 1);
      setSubmitState("sent");
      setFeedback("mark posted");
    } catch {
      setSubmitState("error");
      setFeedback("could not post right now");
    }
  }

  return (
    <SectionShell id="guestbook" eyebrow="› guestbook" title="Leave a mark">
      <div className="grid gap-8">
        <p className="max-w-[54ch] text-lg leading-8 text-text-muted">
          A small doodle wall for notes from people who pass through.
        </p>

        <div className="grid gap-8 lg:grid-cols-[minmax(17rem,22rem)_minmax(0,1fr)] lg:gap-10">
          <form onSubmit={handleSubmit} className="grid content-start gap-5 border border-line bg-surface p-4 sm:p-5">
            <PostcardCanvas
              key={canvasKey}
              onDrawingChange={setDrawing}
              disabled={!configured || submitState === "submitting"}
            />

            <div className="grid gap-2">
              <label htmlFor="guestbook-name" className="font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint">
                name
              </label>
              <input
                id="guestbook-name"
                name="name"
                maxLength={40}
                value={name}
                disabled={!configured || submitState === "submitting"}
                onChange={(event) => setName(event.target.value)}
                className="border border-line bg-transparent px-3 py-2.5 text-sm text-text placeholder:text-text-faint transition-colors duration-200 ease-out-expo focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
                autoComplete="name"
                required
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="guestbook-message" className="font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint">
                message
              </label>
              <textarea
                id="guestbook-message"
                name="message"
                maxLength={500}
                rows={5}
                value={message}
                disabled={!configured || submitState === "submitting"}
                onChange={(event) => setMessage(event.target.value)}
                className="resize-none border border-line bg-transparent px-3 py-2.5 text-sm leading-6 text-text placeholder:text-text-faint transition-colors duration-200 ease-out-expo focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
                required
              />
              <p className="text-right font-mono text-[0.64rem] uppercase tracking-[0.09em] text-text-faint">{message.length}/500</p>
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="guestbook-website">Website</label>
              <input
                id="guestbook-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            {!configured ? (
              <p className="border border-line bg-bg px-3 py-2 text-sm leading-6 text-text-muted">
                Guestbook goes live once Supabase is connected. Sample marks are shown for now.
              </p>
            ) : null}

            <span title={disabledReason} className="grid">
              <button
                type="submit"
                disabled={submitDisabled}
                title={disabledReason}
                className={cn(
                  "inline-flex items-center justify-center border border-line px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-muted transition-colors duration-200 ease-out-expo hover:border-accent hover:text-text focus-visible:border-accent disabled:cursor-not-allowed disabled:border-line disabled:text-text-faint disabled:opacity-50 motion-reduce:transition-none",
                  submitState === "sent" && "border-accent text-text",
                )}
              >
                {submitState === "submitting" ? "posting" : "post mark"}
              </button>
            </span>

            {feedback ? (
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint" aria-live="polite">
                {feedback}
              </p>
            ) : null}
          </form>

          <div className="grid content-start gap-4">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint">
                {configured ? "recent marks" : "sample marks"}
              </p>
              <p className="font-mono text-[0.64rem] uppercase tracking-[0.09em] text-text-faint">
                newest first
              </p>
            </div>

            {loading ? (
              <p className="border border-line bg-surface px-4 py-3 text-sm text-text-muted">Loading marks...</p>
            ) : null}

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => (
                <Postcard key={entry.id} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
