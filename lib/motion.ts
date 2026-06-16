export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  expoOut: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
};

export const duration = {
  fast: 0.18,
  base: 0.45,
  slow: 0.6,
};
