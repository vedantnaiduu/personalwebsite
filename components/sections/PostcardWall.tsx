"use client";

import { useEffect, useMemo, useState } from "react";
import { SendHorizontal } from "lucide-react";

import { PostcardCanvas } from "@/components/ui/PostcardCanvas";
import { Postcard, type GuestbookEntry } from "@/components/ui/Postcard";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { getSupabase } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const LOCAL_COOLDOWN_MS = 20_000;
const COOLDOWN_KEY = "guestbook:last-posted-at";

const sampleDoodles = [
  "data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20200'%3E%3Crect%20width='320'%20height='200'%20fill='%23f8fdff'/%3E%3Cpath%20d='M42%20118c38-66%2080%2063%20119-3%2034-58%2071-15%20114-47'%20fill='none'%20stroke='%230050a0'%20stroke-width='8'%20stroke-linecap='round'/%3E%3Ccircle%20cx='249'%20cy='68'%20r='14'%20fill='%239fe11d'/%3E%3C/svg%3E",
  "data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20200'%3E%3Crect%20width='320'%20height='200'%20fill='%23f8fdff'/%3E%3Cpath%20d='M48%2050l46%2042-41%2048%2086-6%2047%2037%2029-87%2060-31'%20fill='none'%20stroke='%2338abe4'%20stroke-width='7'%20stroke-linecap='round'%20stroke-linejoin='round'/%3E%3C/svg%3E",
  "data:image/svg+xml;utf8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20200'%3E%3Crect%20width='320'%20height='200'%20fill='%23f8fdff'/%3E%3Cpath%20d='M67%20124c25-28%2052-31%2079-9s55%2020%2084-13%2044-47%2057-39'%20fill='none'%20stroke='%239fe11d'%20stroke-width='9'%20stroke-linecap='round'/%3E%3Cpath%20d='M72%2064h62M184%20145h73'%20stroke='%230050a0'%20stroke-width='6'%20stroke-linecap='round'/%3E%3C/svg%3E",
] as const;

const sampleEntries: GuestbookEntry[] = [
  {
    id: "sample-1",
    created_at: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
    name: "Future visitor",
    message: "Leaving a little aqua squiggle here until the live wall is wired up.",
    drawing: sampleDoodles[0],
  },
  {
    id: "sample-2",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    name: "Hackathon friend",
    message: "This portfolio already feels like a desktop you want to click around.",
    drawing: sampleDoodles[1],
  },
  {
    id: "sample-3",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    name: "Supabase preview",
    message: "Connect the env vars and these samples turn into real postcards.",
    drawing: sampleDoodles[2],
  },
];

type SubmitState = "idle" | "submitting" | "sent" | "error";

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

    const client = supabase;
    let active = true;

    async function loadEntries() {
      setConfigured(true);
      setLoading(true);
      try {
        const { data, error } = await client
          .from("guestbook")
          .select("id, created_at, name, message, drawing")
          .order("created_at", { ascending: false })
          .limit(100);

        if (active && !error && data) {
          setEntries(data as GuestbookEntry[]);
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

      const result = (await response.json()) as {
        readonly ok?: boolean;
        readonly configured?: boolean;
        readonly error?: string;
        readonly entry?: GuestbookEntry;
      };

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
      setFeedback("Postcard posted.");
    } catch {
      setSubmitState("error");
      setFeedback("Could not post right now. Try again in a bit.");
    }
  }

  return (
    <section id="guestbook" className="scroll-mt-28 py-8" aria-labelledby="guestbook-title">
      <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-aero-deep/72">
            05 / postcard wall
          </p>
          <h2 id="guestbook-title" className="mt-3 text-3xl font-black tracking-normal text-aero-ink sm:text-4xl">
            Guestbook
          </h2>
        </div>

        <WindowFrame title="guestbook.exe" bodyClassName="p-0">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            <form
              onSubmit={handleSubmit}
              className="grid gap-4 border-b border-white/65 bg-white/30 px-5 py-5 sm:px-6 lg:border-b-0 lg:border-r"
            >
              <PostcardCanvas
                key={canvasKey}
                onDrawingChange={setDrawing}
                disabled={!configured || submitState === "submitting"}
              />

              <div className="grid gap-2">
                <label htmlFor="guestbook-name" className="font-mono text-xs font-black uppercase tracking-[0.14em] text-aero-deep">
                  Name
                </label>
                <input
                  id="guestbook-name"
                  name="name"
                  maxLength={40}
                  value={name}
                  disabled={!configured || submitState === "submitting"}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-md border border-white/80 bg-white/68 px-3 py-2 text-sm font-semibold text-aero-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] disabled:cursor-not-allowed disabled:opacity-60"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="guestbook-message" className="font-mono text-xs font-black uppercase tracking-[0.14em] text-aero-deep">
                  Message
                </label>
                <textarea
                  id="guestbook-message"
                  name="message"
                  maxLength={500}
                  rows={5}
                  value={message}
                  disabled={!configured || submitState === "submitting"}
                  onChange={(event) => setMessage(event.target.value)}
                  className="resize-none rounded-md border border-white/80 bg-white/68 px-3 py-2 text-sm font-semibold leading-6 text-aero-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] disabled:cursor-not-allowed disabled:opacity-60"
                  required
                />
                <p className="text-right font-mono text-[0.68rem] font-semibold text-aero-ink/55">{message.length}/500</p>
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
                <p className="rounded-lg border border-white/75 bg-white/45 px-3 py-2 text-sm font-semibold text-aero-ink/70">
                  Guestbook goes live once Supabase is connected.
                </p>
              ) : null}

              <span title={disabledReason} className="grid">
                <button
                  type="submit"
                  disabled={submitDisabled}
                  title={disabledReason}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-md border border-white/80 bg-aero-deep px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_14px_28px_rgba(0,80,160,0.22),inset_0_1px_0_rgba(255,255,255,0.34)] transition hover:bg-aero-blue disabled:cursor-not-allowed disabled:bg-aero-ink/35 disabled:text-white/75",
                    submitState === "sent" && "bg-aero-green text-aero-ink",
                  )}
                >
                  <SendHorizontal aria-hidden="true" className="h-4 w-4" />
                  {submitState === "submitting" ? "Sending" : "Post postcard"}
                </button>
              </span>
              {feedback ? (
                <p className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] text-aero-deep" aria-live="polite">
                  {feedback}
                </p>
              ) : null}
            </form>

            <div className="grid gap-4 px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-xs font-black uppercase tracking-[0.14em] text-aero-deep">
                  {configured ? "recent postcards" : "sample postcards"}
                </p>
                <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-aero-ink/55">
                  newest first
                </p>
              </div>

              {loading ? (
                <p className="rounded-lg border border-white/75 bg-white/45 px-4 py-3 text-sm font-semibold text-aero-ink/70">
                  Loading postcards...
                </p>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {entries.map((entry) => (
                  <Postcard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          </div>
        </WindowFrame>
      </div>
    </section>
  );
}
