import type { Config } from "tailwindcss";

const GOLDEN_RATIO = 1.618;

// Golden ratio spacing scale
const goldenSpacing = (n: number) => `${8 * Math.pow(GOLDEN_RATIO, n)}px`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#000000",
          deep: "#001133",
        },
        accent: {
          blue: "#0055FF",
          "blue-intense": "#002FA7",
        },
        text: {
          primary: "#ffffff",
          secondary: "#888888",
        },
      },
      spacing: {
        phi: goldenSpacing(0),
        "phi-2": goldenSpacing(1),
        "phi-3": goldenSpacing(2),
        "phi-4": goldenSpacing(3),
        "phi-5": goldenSpacing(4),
      },
      fontSize: {
        "phi-base": "16px",
        "phi-1": "25.888px", // 16 * 1.618
        "phi-2": "41.888px", // 25.888 * 1.618
        "phi-3": "67.776px", // 41.888 * 1.618
        "phi-4": "109.664px", // 67.776 * 1.618
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "geometric-pulse": "geometricPulse 3s ease-in-out infinite",
        "background-gradient":
          "background-gradient var(--background-gradient-speed, 15s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        geometricPulse: {
          "0%, 100%": { opacity: "0.1" },
          "50%": { opacity: "0.3" },
        },
        "background-gradient": {
          "0%, 100%": {
            transform: "translate(0, 0)",
            animationDelay: "var(--background-gradient-delay, 0s)",
          },
          "20%": {
            transform:
              "translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)))",
          },
          "40%": {
            transform:
              "translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)))",
          },
          "60%": {
            transform:
              "translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)))",
          },
          "80%": {
            transform:
              "translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)))",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

