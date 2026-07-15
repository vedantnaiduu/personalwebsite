import { SectionShell } from "@/components/sections/SectionShell";
import { about } from "@/lib/site-data";

export function About() {
  const opening = about.voice[0].replace("I like building", "I build");

  return (
    <SectionShell id="about" eyebrow="› about" title="About">
      <div className="max-w-[60ch] text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.45] tracking-[-0.02em] text-text-muted">
        <p>
          {opening} Right now I am deep in{" "}
          <span className="font-accent italic text-accent">agentic</span> systems, RAG, and AI
          that helps people move faster at work without making them babysit the software.
        </p>
        <p className="mt-7">
          Off the laptop, I am usually playing pickleball, finding the next house set or festival,
          and keeping Suits in the rotation.
        </p>
      </div>
    </SectionShell>
  );
}
