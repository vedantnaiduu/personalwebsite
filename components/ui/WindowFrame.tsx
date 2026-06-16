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
    <article className={cn("window-chrome", className)}>
      <div className="window-titlebar">
        <span className="window-controls" aria-hidden="true">
          <span className="window-dot window-dot-close" />
          <span className="window-dot window-dot-min" />
          <span className="window-dot window-dot-max" />
        </span>
        <span className="truncate font-mono">{title}</span>
      </div>
      <div className={cn("px-5 py-5 text-aero-ink sm:px-6", bodyClassName)}>{children}</div>
    </article>
  );
}
