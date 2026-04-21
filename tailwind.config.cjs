/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#050608",
        graphite: "#0d1117",
        ink: "#151b23",
        smoke: "#aca79c",
        ivory: "#f4efe6",
        gold: "#b8a27a",
        bronze: "#725a44",
        ember: "#d6c09b",
        midnight: "#121b27",
        mist: "#d7d0c5",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        luxe: "0 30px 80px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 1px rgba(184, 148, 90, 0.18), 0 18px 50px rgba(184, 148, 90, 0.12)",
        theater: "0 40px 120px rgba(0, 0, 0, 0.62), 0 0 0 1px rgba(255, 255, 255, 0.04)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(184,162,122,0.22), transparent 34%), radial-gradient(circle at 76% 18%, rgba(79,102,132,0.16), transparent 28%), linear-gradient(180deg, #050608 0%, #0a1018 44%, #050608 100%)",
        "mesh-luxury":
          "radial-gradient(circle at 20% 18%, rgba(184,162,122,0.11), transparent 22%), radial-gradient(circle at 80% 18%, rgba(111,132,162,0.08), transparent 18%), radial-gradient(circle at 50% 75%, rgba(114,90,68,0.18), transparent 24%)",
        "luminous-panel":
          "linear-gradient(145deg, rgba(184,162,122,0.16), rgba(255,255,255,0.03) 34%, rgba(12,18,28,0.24) 62%, rgba(86,106,132,0.1))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shine: {
          "0%": { transform: "translateX(-130%)" },
          "100%": { transform: "translateX(130%)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(0, -24px, 0) scale(1.08)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shine: "shine 8s linear infinite",
        drift: "drift 16s ease-in-out infinite",
        "pulse-glow": "pulse-glow 9s ease-in-out infinite",
      },
      maxWidth: {
        "8xl": "92rem",
      },
    },
  },
  plugins: [],
};
