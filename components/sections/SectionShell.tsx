import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/Reveal";

type SectionShellProps = {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
  readonly className?: string;
};

export function SectionShell({ id, eyebrow, title, children, className }: SectionShellProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      className={className ?? "scroll-mt-24 py-[clamp(6rem,11vw,10rem)]"}
      aria-labelledby={titleId}
    >
      <div className="container-page">
        <Reveal className="grid gap-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12 lg:gap-20">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.09em] text-text-faint">
              {eyebrow}
            </p>
            <h2
              id={titleId}
              className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-text"
            >
              {title}
            </h2>
          </div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
