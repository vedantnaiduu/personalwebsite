import { about } from "@/lib/site-data";
import { WindowFrame } from "@/components/ui/WindowFrame";

export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-8" aria-labelledby="about-title">
      <div className="grid gap-6 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-aero-deep/72">
            03 / readme
          </p>
          <h2 id="about-title" className="mt-3 text-3xl font-black tracking-normal text-aero-ink sm:text-4xl">
            About
          </h2>
        </div>

        <WindowFrame title="about_me.txt" bodyClassName="space-y-4">
          {about.voice.map((line) => (
            <p key={line} className="max-w-3xl text-base font-semibold leading-8 text-aero-ink/80 sm:text-lg">
              {line}
            </p>
          ))}
        </WindowFrame>
      </div>
    </section>
  );
}
