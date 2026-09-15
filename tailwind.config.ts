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
        body: ["var(--font-cormorant)", "Georgia", "serif"],
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
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
