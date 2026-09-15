import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#0A0B09",
        emerald: {
          DEFAULT: "#0B3A2A",
          light: "#0E4A34",
        },
        gold: {
          DEFAULT: "#C9A24B",
          bright: "#E7C874",
          deep: "#9A7B2E",
        },
        cream: "#F4E9CE",
        rose: "#FBF7EF",
      },
      fontFamily: {
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        body: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(231, 200, 116, 0.28)",
        "glow-lg": "0 0 40px rgba(231, 200, 116, 0.35)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        // Gentle vertical bob + opacity pulse for the intro chevron.
        bob: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(7px)", opacity: "1" },
        },
        // Very faint candle flicker for a single gold accent.
        flicker: {
          "0%, 100%": { opacity: "1", textShadow: "0 0 18px rgba(231,200,116,0.35)" },
          "45%": { opacity: "0.94", textShadow: "0 0 10px rgba(231,200,116,0.22)" },
          "70%": { opacity: "1", textShadow: "0 0 22px rgba(231,200,116,0.42)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
        bob: "bob 1.8s ease-in-out infinite",
        flicker: "flicker 4.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
