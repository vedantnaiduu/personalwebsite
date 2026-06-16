import { Trophy } from "lucide-react";

import { cn } from "@/lib/utils";

type AwardBadgeProps = {
  readonly children: string;
  readonly className?: string;
};

export function AwardBadge({ children, className }: AwardBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-aero-lime/70 bg-aero-lime/38 px-3 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-aero-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_10px_28px_rgba(159,225,29,0.18)]",
        className,
      )}
    >
      <Trophy aria-hidden="true" size={13} />
      {children}
    </span>
  );
}
