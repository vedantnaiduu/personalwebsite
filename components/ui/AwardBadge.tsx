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
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-accent-weak px-3 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.1em] text-accent",
        className,
      )}
    >
      <Trophy aria-hidden="true" size={13} />
      {children}
    </span>
  );
}
