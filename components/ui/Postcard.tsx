import { WindowFrame } from "@/components/ui/WindowFrame";
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

export function Postcard({ entry, className }: PostcardProps) {
  return (
    <WindowFrame title="postcard.png" className={cn("h-full", className)} bodyClassName="p-3">
      <div className="grid h-full gap-3">
        <div className="relative aspect-[8/5] overflow-hidden rounded-lg border border-white/80 bg-[#f8fdff] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]">
          {entry.drawing && /^data:image\/(png|jpeg|webp);base64,/i.test(entry.drawing) ? (
            // Only render inline image data URLs — never an attacker-controlled external URL.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entry.drawing} alt={`Doodle by ${entry.name}`} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center diagonal-hatching text-aero-deep/55">
              <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1 font-mono text-[0.66rem] font-black uppercase tracking-[0.14em]">
                blank card
              </span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/55 to-transparent" />
        </div>

        <div className="grid gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 truncate text-base font-black tracking-normal text-aero-ink">{entry.name}</h3>
            <time
              dateTime={entry.created_at}
              className="shrink-0 pt-1 font-mono text-[0.64rem] font-bold uppercase tracking-[0.12em] text-aero-deep/65"
            >
              {formatRelativeDate(entry.created_at)}
            </time>
          </div>
          <p className="text-sm font-semibold leading-6 text-aero-ink/76">{entry.message}</p>
        </div>
      </div>
    </WindowFrame>
  );
}
