import { Chip } from "@/components/ui/Chip";
import { skillGroups } from "@/lib/site-data";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-28 py-8" aria-labelledby="skills-title">
      <div className="glass grid gap-6 px-5 py-8 sm:px-8 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-aero-deep/72">
            04 / toolkit
          </p>
          <h2 id="skills-title" className="mt-3 text-3xl font-black tracking-normal text-aero-ink sm:text-4xl">
            Skills
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.label}
              className="rounded-lg border border-white/70 bg-white/40 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]"
            >
              <h3 className="font-mono text-xs font-black uppercase tracking-[0.14em] text-aero-deep">
                {group.label}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
