import { SectionShell } from "@/components/sections/SectionShell";
import { identity, venture } from "@/lib/site-data";

export function Ventures() {
  return (
    <SectionShell id="ventures" eyebrow="current venture" title="Ventures">
      <article className="border-y border-line py-8 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-none text-ink">
            {venture.name}
          </p>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-accent">
            Pilot stage · 3 contractors
          </p>
        </div>

        <p className="mt-4 max-w-[36rem] font-sans text-[clamp(1.15rem,2.5vw,1.55rem)] leading-[1.45] tracking-[-0.015em] text-ink">
          {venture.tagline}
        </p>

        <p className="mt-7 max-w-[62ch] text-base leading-[1.75] text-text-muted">
          {venture.overview}
        </p>

        <div className="mt-9 grid border-y border-line sm:grid-cols-2">
          {venture.focusAreas.map((focus, index) => (
            <div
              key={focus.label}
              className={`py-6 ${
                index === 0
                  ? "border-b border-line sm:border-b-0 sm:border-r sm:pr-7"
                  : "sm:pl-7"
              }`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
                0{index + 1} / current focus
              </p>
              <h3 className="mt-3 font-sans text-lg font-medium tracking-[-0.01em] text-ink">
                {focus.label}
              </h3>
              <p className="mt-3 text-[0.95rem] leading-[1.7] text-text-muted">
                {focus.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <p className="max-w-[55ch] text-[0.95rem] leading-[1.7] text-text-muted">
            {venture.pilot}
          </p>
          <a
            className="link-wipe w-fit font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink transition-colors duration-200 ease-out-expo hover:text-accent focus-visible:text-accent"
            href={`mailto:${identity.email}?subject=Multi-Hat`}
          >
            Talk jobsite docs ↗
          </a>
        </div>
      </article>
    </SectionShell>
  );
}
