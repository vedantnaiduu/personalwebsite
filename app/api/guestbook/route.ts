import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const MAX_NAME = 40;
const MAX_MESSAGE = 500;
const MAX_DRAWING = 200_000;
// Drawings must be inline PNG/JPEG/WEBP data URLs — never an external/attacker-controlled URL
// (otherwise every wall viewer would load it: tracking-pixel / SSRF / arbitrary-image vector).
const DRAWING_DATA_URL = /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=\s]+$/;
const FALLBACK_COOLDOWN_MS = 20_000;
const fallbackHits = new Map<string, number>();

type UpstashRatelimitModule = {
  readonly Ratelimit: {
    new (config: { redis: unknown; limiter: unknown }): {
      limit(key: string): Promise<{ success: boolean }>;
    };
    slidingWindow(tokens: number, window: string): unknown;
  };
};

type UpstashRedisModule = {
  readonly Redis: {
    fromEnv(): unknown;
  };
};

type GuestbookEntry = {
  readonly id: string;
  readonly created_at: string;
  readonly name: string;
  readonly message: string;
  readonly drawing: string | null;
};

type GuestbookBody = {
  readonly name?: unknown;
  readonly message?: unknown;
  readonly drawing?: unknown;
  readonly website?: unknown;
};

function getIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
}

function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function createGuestbookClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

async function checkRateLimit(ip: string) {
  const upstashConfigured = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

  if (upstashConfigured) {
    try {
      const ratelimitSpecifier = "@upstash/ratelimit";
      const redisSpecifier = "@upstash/redis";
      const [{ Ratelimit }, { Redis }] = await Promise.all([
        import(/* webpackIgnore: true */ ratelimitSpecifier) as Promise<UpstashRatelimitModule>,
        import(/* webpackIgnore: true */ redisSpecifier) as Promise<UpstashRedisModule>,
      ]);
      const ratelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(3, "60 s"),
      });
      const { success } = await ratelimit.limit(`guestbook:${ip}`);
      return success;
    } catch {
      // Optional dependency or remote limiter unavailable; keep the route usable with local throttling.
    }
  }

  const now = Date.now();
  const lastHit = fallbackHits.get(ip) ?? 0;
  if (now - lastHit < FALLBACK_COOLDOWN_MS) {
    return false;
  }
  fallbackHits.set(ip, now);

  if (fallbackHits.size > 500) {
    const cutoff = now - 60 * 60 * 1000;
    for (const [key, timestamp] of Array.from(fallbackHits.entries())) {
      if (timestamp < cutoff) fallbackHits.delete(key);
    }
  }

  return true;
}

function textField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseBody(body: GuestbookBody) {
  const name = textField(body.name);
  const message = textField(body.message);
  const drawing = typeof body.drawing === "string" && body.drawing.length > 0 ? body.drawing : null;
  const website = textField(body.website);

  if (website) {
    return { ok: false as const, error: "spam" };
  }

  if (!name || !message || name.length > MAX_NAME || message.length > MAX_MESSAGE) {
    return { ok: false as const, error: "invalid" };
  }

  if (drawing && drawing.length > MAX_DRAWING) {
    return { ok: false as const, error: "drawing_too_large" };
  }

  if (drawing && !DRAWING_DATA_URL.test(drawing)) {
    return { ok: false as const, error: "invalid_drawing" };
  }

  return { ok: true as const, value: { name, message, drawing } };
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ configured: false, entries: [] }, { status: 503 });
  }

  const supabase = createGuestbookClient();
  if (!supabase) {
    return NextResponse.json({ configured: false, entries: [] }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("guestbook")
    .select("id, created_at, name, message, drawing")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: "db", entries: [] }, { status: 500 });
  }

  return NextResponse.json({ configured: true, entries: (data ?? []) as GuestbookEntry[] });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ configured: false, error: "supabase_unconfigured" }, { status: 503 });
  }

  const ip = getIp(request);
  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: GuestbookBody;
  try {
    body = (await request.json()) as GuestbookBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.error === "spam" ? 200 : 400 });
  }

  const supabase = createGuestbookClient();
  if (!supabase) {
    return NextResponse.json({ configured: false, error: "supabase_unconfigured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("guestbook")
    .insert(parsed.value)
    .select("id, created_at, name, message, drawing")
    .single();

  if (error) {
    return NextResponse.json({ error: "db" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, entry: data as GuestbookEntry });
}
