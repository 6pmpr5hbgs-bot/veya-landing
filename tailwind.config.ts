import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#8B5CF6",
          "purple-light": "#A78BFA",
          "purple-dim": "#6D28D9",
          blue: "#60A5FA",
          "blue-dim": "#3B82F6",
        },
        surface: {
          DEFAULT: "#0D0D12",
          1: "#111118",
          2: "#16161F",
          3: "#1C1C28",
          4: "#222232",
          border: "rgba(255,255,255,0.07)",
          "border-strong": "rgba(255,255,255,0.12)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4.5s ease-in-out infinite 0.5s",
        "float-fast": "float 3.5s ease-in-out infinite 1s",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "scan-line": "scanLine 2s linear infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(139,92,246,0.25), transparent)",
        "card-shine": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)",
      },
      boxShadow: {
        "glow-purple": "0 0 40px rgba(139,92,246,0.3)",
        "glow-purple-sm": "0 0 20px rgba(139,92,246,0.2)",
        "card": "0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset",
        "card-hover": "0 16px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset",
      },
    },
  },
  plugins: [],
};

export default config;
