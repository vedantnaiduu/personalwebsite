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
  // normalize any leading marker glyphs so every section reads as a plain word
  const label = eyebrow.replace(/^[\s/›»>-]+/, "");

  return (
    <section
      id={id}
      className={className ?? "scroll-mt-24 py-[clamp(5rem,9vw,8rem)]"}
      aria-labelledby={titleId}
    >
      <div className="container-page">
        <Reveal className="text-left">
          <p className="label-mono text-text-faint">{label}</p>
          <h2
            id={titleId}
            className="mt-3 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-normal leading-[1.1] tracking-[-0.01em] text-ink"
          >
            {title}
          </h2>
          <div className="mt-10">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
