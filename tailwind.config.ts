import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          2: "var(--surface-2)",
        },
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--muted)",
          faint: "var(--faint)",
        },
        line: "var(--line)",
        accent: {
          DEFAULT: "var(--accent)",
          weak: "var(--accent-weak)",
        },
      },
      spacing: {
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        10: "var(--space-10)",
        11: "var(--space-11)",
      },
      maxWidth: {
        page: "1240px",
        copy: "66ch",
      },
      borderRadius: {
        DEFAULT: "0",
        visual: "10px",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        accent: ["var(--font-accent)"],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
