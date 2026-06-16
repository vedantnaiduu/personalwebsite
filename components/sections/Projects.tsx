import { ExternalLink, Github } from "lucide-react";

import { AwardBadge } from "@/components/ui/AwardBadge";
import { Chip } from "@/components/ui/Chip";
import { MetricText } from "@/components/ui/MetricText";
import { WindowFrame } from "@/components/ui/WindowFrame";
import { projects } from "@/lib/site-data";

function toWindowTitle(title: string) {
  return title.toLowerCase().replaceAll(" ", "_");
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-28 py-8" aria-labelledby="projects-title">
      <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-aero-deep/72">
            01 / selected work
          </p>
          <h2 id="projects-title" className="mt-3 text-3xl font-black tracking-normal text-aero-ink sm:text-4xl">
            Selected Projects
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <WindowFrame
              key={project.id}
              title={toWindowTitle(project.title)}
              className="flex min-h-full flex-col"
              bodyClassName="flex flex-1 flex-col gap-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="max-w-md text-xl font-black leading-tight text-aero-ink">{project.title}</h3>
                {project.award ? <AwardBadge>{project.award}</AwardBadge> : null}
              </div>

              <p className="text-sm font-semibold leading-7 text-aero-ink/82">
                <span className="font-mono text-[0.68rem] font-black uppercase tracking-[0.14em] text-aero-deep">
                  Outcome:{" "}
                </span>
                <MetricText text={project.outcome} />
              </p>

              {project.underTheHood ? (
                <details className="group rounded-lg border border-white/70 bg-white/38 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  <summary className="flex cursor-pointer list-none items-center gap-2 font-mono text-[0.72rem] font-black uppercase tracking-[0.12em] text-aero-deep focus-visible:outline-aero-lime [&::-webkit-details-marker]:hidden">
                    <span
                      className="inline-block transition-transform duration-150 group-open:rotate-90 motion-reduce:transition-none"
                      aria-hidden="true"
                    >
                      ▸
                    </span>
                    under the hood
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-aero-ink/78">
                    <MetricText text={project.underTheHood} />
                  </p>
                </details>
              ) : null}

              <div className="mt-auto flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-aero-deep px-4 py-2.5 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-aero-ink focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
                  href={project.githubUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Github aria-hidden="true" size={16} />
                  GitHub
                </a>
                {"demoUrl" in project && typeof project.demoUrl === "string" ? (
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-white/56 px-4 py-2.5 text-sm font-black text-aero-deep transition hover:-translate-y-0.5 hover:bg-white/75 focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
                    href={project.demoUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink aria-hidden="true" size={16} />
                    Demo
                  </a>
                ) : null}
              </div>
            </WindowFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
