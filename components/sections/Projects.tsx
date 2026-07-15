import { AsciiImage } from "@/components/ascii/AsciiImage";
import { AsciiShape } from "@/components/ascii/AsciiShape";
import { SectionShell } from "@/components/sections/SectionShell";
import type { ShapeName } from "@/lib/ascii/shapes";
import { projects } from "@/lib/site-data";

const metricPattern = /(\b\d[\d,]*(?:\.\d+)?%?\+?\b)/g;

function MetricNumbers({ text }: { readonly text: string }) {
  return (
    <>
      {text.split(metricPattern).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={`${part}-${index}`} className="font-medium text-ink">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

// each project gets an ASCII animation that reflects what it does
const shapeFor: Record<string, { shape: ShapeName; opts?: Record<string, number> }> = {
  "voice-maintenance-agent": { shape: "userChain", opts: { userSize: 0.24, orbitRadius: 0.26 } },
  "real-time-social-discovery-agent": { shape: "metaballs", opts: { ballRadius: 0.15, separation: 0.22 } },
  "elderly-health-monitoring-agent": { shape: "pulse" }, // heartbeat monitor
  jestify: { shape: "play" }, // character explainer videos
  "autonomous-infrastructure-detection": { shape: "radar" }, // drone detection sweep
};

// on hover, the tile resolves from the animation into the real project mark (as ASCII)
const imageFor: Record<string, { src: string; invert?: boolean }> = {
  "voice-maintenance-agent": { src: "/images/projects/resi.png", invert: true },
  "real-time-social-discovery-agent": { src: "/images/projects/retrocare.png", invert: true }, // Social Oracle
  "elderly-health-monitoring-agent": { src: "/images/projects/medium-1.png", invert: true }, // RetroCare
  "autonomous-infrastructure-detection": { src: "/images/projects/kavi.jpg", invert: false },
};

export function Projects() {
  return (
    <SectionShell id="work" eyebrow="selected work" title="Selected Work">
      <div className="space-y-20 md:space-y-28">
        {projects.map((project, i) => {
          const viz = shapeFor[project.id] ?? { shape: "sphere" as ShapeName };
          const img = imageFor[project.id];
          return (
            <a
              key={project.id}
              className="group block"
              href={project.githubUrl}
              rel="noreferrer"
              target="_blank"
              aria-label={`${project.title} on GitHub`}
            >
              {/* animation by default; resolves to the real project mark (ASCII) on hover */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-bg">
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ease-out-expo ${img ? "group-hover:opacity-0" : ""}`}
                >
                  <AsciiShape shape={viz.shape} opts={viz.opts} className="text-ink" fontSize={11} speed={0.85} />
                </div>
                {img ? (
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out-expo group-hover:opacity-100">
                    <AsciiImage src={img.src} invert={img.invert} className="text-ink" fontSize={7} />
                  </div>
                ) : null}
              </div>

              {/* title row */}
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="flex items-baseline gap-3 font-display text-[clamp(1.15rem,2.2vw,1.6rem)] font-normal leading-none tracking-[-0.01em] text-ink">
                  <span
                    aria-hidden="true"
                    className="mt-[0.15em] h-[0.5em] w-[0.5em] shrink-0 self-center bg-accent transition-transform duration-200 ease-out-expo group-hover:scale-125"
                  />
                  <span>{project.title}</span>
                  <span
                    aria-hidden="true"
                    className="translate-x-[-0.3rem] text-base leading-none text-text-muted opacity-0 transition duration-200 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-ink motion-reduce:transition-none"
                  >
                    ↗
                  </span>
                </h3>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* outcome */}
              <p className="mt-3 max-w-[58ch] font-sans text-[0.98rem] leading-7 text-text-muted">
                <MetricNumbers text={project.outcome} />
              </p>

              {/* stack + award */}
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-text-faint">
                <span>{project.stack.join(" · ")}</span>
                {project.award ? <span className="text-accent">{project.award}</span> : null}
              </div>
            </a>
          );
        })}
      </div>
    </SectionShell>
  );
}
