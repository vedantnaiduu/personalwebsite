"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { ease } from "@/lib/motion";

type MaskTextProps = {
  readonly lines: readonly ReactNode[];
  readonly className?: string;
  readonly lineClassName?: string;
  readonly delay?: number;
};

export function MaskText({ lines, className, lineClassName, delay = 0.08 }: MaskTextProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.h1
      className={className}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className={lineClassName}
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: {
                  duration: 0.76,
                  ease: ease.outQuart,
                },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
