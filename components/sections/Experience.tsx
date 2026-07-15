import { AsciiShape } from "@/components/ascii/AsciiShape";
import { SectionShell } from "@/components/sections/SectionShell";
import type { ShapeName } from "@/lib/ascii/shapes";
import { experience } from "@/lib/site-data";

// a relevant animation per role: retrieval graph for the RAG work, a DNA helix
// for the computational-biology research
const roleShapes: ShapeName[] = ["network", "helix"];

const metricPattern = /(\b\d[\d,]*(?:\.\d+)?%?\+?\b)/g;

function MetricNumbers({ text }: { readonly text: string }) {
  return (
    <>
      {text.split(metricPattern).map((part, index) =>
        index % 2 === 1 ? (
          <span key={`${part}-${index}`} className="font-medium text-ink">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Experience() {
  return (
    <SectionShell id="experience" eyebrow="experience" title="Experience">
      <div>
        {experience.map((role, index) => (
          <article
            key={`${role.role}-${role.organization}`}
            className={`grid gap-8 md:grid-cols-[minmax(0,1fr)_150px] md:items-start ${
              index === 0 ? "pb-14" : "border-t border-line pt-14"
            }`}
          >
            <div>
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.09em] text-text-faint">
                <span>{role.dates}</span>
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
                <span className="text-text-muted">{role.organization}</span>
                <span className="mx-2" aria-hidden="true">
                  /
                </span>
                <span>{role.location}</span>
              </div>

              <h3 className="mt-3 font-sans text-[1.1rem] font-medium leading-[1.2] tracking-[-0.01em] text-ink sm:text-[1.25rem]">
                {role.role}
              </h3>

              <ul className="mt-5 grid max-w-[60ch] gap-3">
                {role.bullets.map((bullet) => (
                  <li key={bullet} className="text-[0.95rem] leading-[1.65] text-text-muted sm:text-base">
                    <MetricNumbers text={bullet} />
                  </li>
                ))}
              </ul>
            </div>

            {/* relevant ascii animation */}
            <div
              aria-hidden="true"
              className="hidden aspect-square w-full self-start md:block"
            >
              <AsciiShape
                shape={roleShapes[index] ?? "sphere"}
                className="text-ink"
                fontSize={9}
                speed={0.8}
              />
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
