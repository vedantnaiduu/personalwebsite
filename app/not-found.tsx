import Link from "next/link";

import { WindowFrame } from "@/components/ui/WindowFrame";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <WindowFrame title="404_not_found.sys" bodyClassName="space-y-5">
        <p className="font-mono text-xs font-black uppercase tracking-[0.16em] text-text-muted">
          route missing
        </p>
        <h1 className="text-4xl font-black tracking-normal text-text sm:text-5xl">
          This page drifted off the grid.
        </h1>
        <p className="max-w-xl text-base font-semibold leading-7 text-text-muted">
          The portfolio is a single-page system. Head back home and use the nav to jump anywhere.
        </p>
        <Link
          className="inline-flex border border-line px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.09em] text-text-muted transition-colors duration-200 ease-out-expo hover:border-accent hover:text-text focus-visible:border-accent motion-reduce:transition-none"
          href="/"
        >
          Return home
        </Link>
      </WindowFrame>
    </div>
  );
}
