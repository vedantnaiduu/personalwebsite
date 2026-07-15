"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { duration, ease } from "@/lib/motion";

type RevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly as?: "div" | "section" | "aside";
};

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ delay, duration: duration.base, ease: ease.out }}
    >
      {children}
    </Component>
  );
}
