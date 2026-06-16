import { SectionShell } from "@/components/sections/SectionShell";
import { skillGroups } from "@/lib/site-data";

export function Skills() {
  return (
    <SectionShell id="skills" eyebrow="› skills" title="Skills">
      <div className="border-b border-line">
        {skillGroups.map((group) => (
          <article
            key={group.label}
            className="grid gap-4 border-t border-line py-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-8"
          >
            <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.09em] text-text-faint">
              {group.label}
            </h3>
            <p className="text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
              {group.skills.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
