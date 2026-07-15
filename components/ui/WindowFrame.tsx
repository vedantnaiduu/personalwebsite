import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type WindowFrameProps = {
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
  readonly bodyClassName?: string;
};

export function WindowFrame({ title, children, className, bodyClassName }: WindowFrameProps) {
  return (
    <article className={cn("bg-surface", className)}>
      <div className="flex min-h-9 items-center gap-3 border-b border-line bg-surface-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
        <span className="inline-flex items-center gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="h-2 w-2 rounded-full bg-text-faint" />
          <span className="h-2 w-2 rounded-full bg-text-muted" />
        </span>
        <span className="truncate font-mono">{title}</span>
      </div>
      <div className={cn("px-5 py-5 text-text sm:px-6", bodyClassName)}>{children}</div>
    </article>
  );
}
