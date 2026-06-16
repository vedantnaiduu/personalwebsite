import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export const dynamic = "force-dynamic";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token ?? "",
    }),
    // Token endpoint must never be cached.
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  return (await res.json()) as { access_token: string };
}

type SpotifyArtist = {
  readonly name: string;
};

type SpotifyTrack = {
  readonly name: string;
  readonly artists?: readonly SpotifyArtist[];
  readonly album?: {
    readonly name?: string;
    readonly images?: readonly { readonly url?: string }[];
  };
  readonly external_urls?: {
    readonly spotify?: string;
  };
};

type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
};

function mapTrack(item: SpotifyTrack, isPlaying: boolean): Track {
  return {
    isPlaying,
    title: item.name,
    artist: (item.artists ?? []).map((artist) => artist.name).join(", "),
    album: item.album?.name ?? "",
    albumImageUrl: item.album?.images?.[0]?.url ?? null,
    songUrl: item.external_urls?.spotify ?? "",
  };
}

export async function GET() {
  if (!client_id || !client_secret || !refresh_token) {
    return cached(NextResponse.json({ isPlaying: false, configured: false }));
  }

  try {
    const { access_token } = await getAccessToken();
    const auth = { Authorization: `Bearer ${access_token}` };

    // 1) Currently playing
    const nowRes = await fetch(NOW_PLAYING, { headers: auth, cache: "no-store" });

    if (nowRes.status === 200) {
      const data = await nowRes.json();
      // currently-playing can return a non-track context (ads/podcasts) -> item null
      if (data?.item && data.currently_playing_type === "track") {
        return cached(NextResponse.json(mapTrack(data.item, !!data.is_playing)));
      }
    }
    // 204 No Content (or non-track) => nothing playing; fall through to recent.

    // 2) Recently played fallback
    const recentRes = await fetch(RECENTLY_PLAYED, { headers: auth, cache: "no-store" });
    if (recentRes.status === 200) {
      const data = await recentRes.json();
      const item = data?.items?.[0]?.track;
      if (item) return cached(NextResponse.json(mapTrack(item, false)));
    }

    // 3) Final fallback: nothing to show
    return cached(NextResponse.json({ isPlaying: false } satisfies Partial<Track>));
  } catch {
    return cached(
      NextResponse.json(
        { isPlaying: false, error: "spotify_unavailable" },
        { status: 200 }, // keep the widget graceful even on failure
      ),
    );
  }
}

function cached(res: NextResponse) {
  // Edge/CDN cache + SWR so we don't hammer Spotify on every visitor.
  res.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=60");
  return res;
}
