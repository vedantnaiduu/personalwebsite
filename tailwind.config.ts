import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aero: {
          sky: "var(--aero-sky)",
          blue: "var(--aero-blue)",
          deep: "var(--aero-deep)",
          ink: "var(--aero-ink)",
          green: "var(--aero-green)",
          lime: "var(--aero-lime)",
        },
        glass: {
          white: "var(--glass-white)",
          border: "var(--glass-border)",
        },
        y2k: {
          magenta: "var(--y2k-magenta)",
          acid: "var(--y2k-acid)",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          dark: "var(--aero-ink)",
          deep: "var(--aero-deep)",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          blue: "var(--aero-blue)",
          "blue-intense": "var(--aero-deep)",
        },
        text: {
          primary: "var(--aero-ink)",
          secondary: "rgba(6, 42, 74, 0.72)",
        },
      },
      borderRadius: {
        glass: "10px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "aero-float": "aeroFloat 14s ease-in-out infinite",
        "chrome-shine": "chromeShine 5s ease-in-out infinite",
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
        aeroFloat: {
          "0%, 100%": {
            transform: "translate3d(0, 0, 0) scale(1)",
          },
          "50%": {
            transform: "translate3d(0, -12px, 0) scale(1.02)",
          },
        },
        chromeShine: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
      },
      boxShadow: {
        glass:
          "0 24px 70px rgba(0, 80, 160, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.7), inset 0 -18px 36px rgba(105, 207, 255, 0.12)",
        glow: "0 0 32px rgba(105, 207, 255, 0.32)",
      },
    },
  },
  plugins: [],
};
export default config;
