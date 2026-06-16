import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChipProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Chip({ children, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/75 bg-white/56 px-2.5 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.08em] text-aero-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
