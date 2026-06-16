import Link from "next/link";

import { WindowFrame } from "@/components/ui/WindowFrame";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <WindowFrame title="404_not_found.sys" bodyClassName="space-y-5">
        <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-aero-deep/72">
          route missing
        </p>
        <h1 className="text-4xl font-black tracking-normal text-aero-ink sm:text-5xl">
          This page drifted off the grid.
        </h1>
        <p className="max-w-xl text-base font-semibold leading-7 text-aero-ink/76">
          The portfolio is a single-page system. Head back home and use the nav or command palette
          to jump anywhere.
        </p>
        <Link
          className="inline-flex rounded-full bg-aero-deep px-5 py-3 text-sm font-black text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-aero-ink focus-visible:outline-aero-lime motion-reduce:hover:translate-y-0"
          href="/"
        >
          Return home
        </Link>
      </WindowFrame>
    </div>
  );
}
