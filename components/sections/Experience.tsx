import { SectionShell } from "@/components/sections/SectionShell";
import { experience } from "@/lib/site-data";

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

export function Experience() {
  return (
    <SectionShell id="experience" eyebrow="› experience" title="Experience">
      <div className="border-b border-line">
        {experience.map((role) => (
          <article
            key={`${role.role}-${role.organization}`}
            className="grid gap-5 border-t border-line py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10 md:py-10"
          >
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.09em] text-text-faint">
              <p>{role.dates}</p>
              <p className="mt-3 max-w-[13rem] text-text-muted">{role.organization}</p>
              <p className="mt-2">{role.location}</p>
            </div>

            <div>
              <h3 className="text-[clamp(1.45rem,2.6vw,2.35rem)] font-medium leading-[1.05] tracking-[-0.03em] text-text">
                {role.role}
              </h3>
              <ul className="mt-6 grid gap-4">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="grid grid-cols-[0.55rem_minmax(0,1fr)] gap-4 text-base leading-7 text-text-muted sm:text-lg sm:leading-8"
                  >
                    <span className="mt-[0.78em] h-px bg-line" aria-hidden="true" />
                    <span>
                      <MetricNumbers text={bullet} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
