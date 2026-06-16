import { MetricText } from "@/components/ui/MetricText";
import { experience } from "@/lib/site-data";

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 py-8" aria-labelledby="experience-title">
      <div className="glass grid gap-6 px-5 py-8 sm:px-8 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-aero-deep/72">
            02 / proof
          </p>
          <h2 id="experience-title" className="mt-3 text-3xl font-black tracking-normal text-aero-ink sm:text-4xl">
            Experience
          </h2>
        </div>

        <div className="relative grid gap-5 before:absolute before:left-3 before:top-2 before:hidden before:h-[calc(100%-1rem)] before:w-px before:bg-aero-deep/18 sm:before:block">
          {experience.map((role) => (
            <article key={`${role.role}-${role.organization}`} className="relative sm:pl-10">
              <span
                className="absolute left-[0.44rem] top-2 hidden h-3 w-3 rounded-full border border-white bg-aero-blue shadow-[0_0_18px_rgba(56,171,228,0.44)] sm:block"
                aria-hidden="true"
              />
              <div className="rounded-lg border border-white/70 bg-white/44 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.76)]">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-lg font-black leading-tight text-aero-ink">{role.role}</h3>
                    <p className="mt-1 font-bold text-aero-deep">{role.organization}</p>
                    <p className="mt-1 text-sm font-semibold text-aero-ink/68">{role.location}</p>
                  </div>
                  <p className="shrink-0 rounded-full border border-white/75 bg-white/52 px-3 py-1.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-aero-deep">
                    {role.dates}
                  </p>
                </div>
                <ul className="mt-4 grid gap-3">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-7 text-aero-ink/78">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aero-green" aria-hidden="true" />
                      <span>
                        <MetricText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
