import Image from "next/image";

import { about, identity } from "@/lib/site-data";

const links = [
  { label: "GitHub", href: identity.github },
  { label: "LinkedIn", href: identity.linkedin },
  { label: "Résumé ↗", href: identity.resumePdf },
  { label: "Email", href: `mailto:${identity.email}` },
] as const;

// the bio, minus the greeting (which becomes the headline)
const bio = about.voice.map((p, i) => (i === 0 ? p.replace(/^Hi, I'm Vedant\.\s*/, "") : p));

export function About() {
  return (
    <section
      id="about"
      className="flex min-h-[calc(100dvh-4rem)] scroll-mt-24 items-center py-[clamp(4rem,9vw,7rem)]"
    >
      <div className="container-page grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-16">
        <div className="order-2 md:order-1">
          <p className="label-mono mb-5 text-text-faint">cs + bio · umass amherst · amherst / boston</p>

          <h1 className="font-display text-[clamp(2.2rem,6vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.01em] text-ink">
            Hi, I&apos;m Vedant.
          </h1>

          <div className="mt-6 max-w-[54ch] space-y-4 font-sans text-base leading-[1.7] text-ink sm:text-lg">
            {bio.map((paragraph, i) => (
              <p key={paragraph} className={i === 0 ? "text-ink" : "text-text-muted"}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-muted">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="link-wipe transition-colors duration-200 ease-out-expo hover:text-ink focus-visible:text-ink"
                  href={link.href}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ascii portrait — black glyphs on white */}
        <figure className="order-1 md:order-2">
          <div className="w-[min(62vw,260px)]">
            <Image
              src="/images/game7.gif"
              alt="Animated ASCII portrait of Vedant Naidu"
              width={722}
              height={888}
              unoptimized
              priority
              className="h-auto w-full select-none"
            />
          </div>
          <figcaption className="label-mono mt-4 text-text-faint">vedant.gif</figcaption>
        </figure>
      </div>
    </section>
  );
}
