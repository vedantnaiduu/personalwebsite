import { SectionShell } from "@/components/sections/SectionShell";
import { projects } from "@/lib/site-data";

const metricPattern = /(\b\d[\d,]*(?:\.\d+)?%?\+?\b)/g;

function MetricNumbers({ text }: { readonly text: string }) {
  return (
    <>
      {text.split(metricPattern).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={`${part}-${index}`} className="font-semibold text-text">
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Projects() {
  return (
    <SectionShell id="work" eyebrow="› selected work" title="Selected Work">
      <div className="group/list border-b border-line">
        {projects.map((project) => (
          <a
            key={project.id}
            className="group/work relative grid gap-5 border-t border-line py-8 text-text-muted transition-[opacity,color] duration-200 ease-out-expo hover:!opacity-100 hover:text-text focus-visible:!opacity-100 focus-visible:text-text md:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.58fr)] md:gap-10 md:py-10 group-hover/list:opacity-45"
            href={project.githubUrl}
            rel="noreferrer"
            target="_blank"
            aria-label={`${project.title} on GitHub`}
          >
            <span
              className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-expo group-hover/work:scale-x-100 group-focus-visible/work:scale-x-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
            <span className="min-w-0">
              <span className="flex items-start gap-4">
                <span className="text-[clamp(1.75rem,3vw,2.55rem)] font-medium leading-[1.04] tracking-[-0.035em] text-text transition-colors duration-200 ease-out-expo group-hover/work:text-text group-focus-visible/work:text-text">
                  {project.title}
                </span>
                <span
                  className="mt-2 inline-block translate-x-[-0.5rem] text-xl leading-none text-accent opacity-0 transition duration-200 ease-out-expo group-hover/work:translate-x-0 group-hover/work:opacity-100 group-focus-visible/work:translate-x-0 group-focus-visible/work:opacity-100 motion-reduce:transition-none"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </span>
              <span className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-text-faint">
                <span>{project.stack.join(" · ")}</span>
                {project.award ? <span className="text-accent">{project.award}</span> : null}
              </span>
            </span>

            <span className="max-w-[46rem] self-center text-base leading-7 text-text-muted transition-colors duration-200 ease-out-expo group-hover/work:text-text group-focus-visible/work:text-text sm:text-lg sm:leading-8">
              <MetricNumbers text={project.outcome} />
            </span>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
