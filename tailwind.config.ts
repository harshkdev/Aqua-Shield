import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        ocean: {
          50: "#EAF9FF",
          100: "#C5EDFF",
          200: "#8DD8F8",
          300: "#4BBCE8",
          400: "#1A9FD4",
          500: "#0B4F8C",
          600: "#063561",
          700: "#042647",
          800: "#0A1628",
          900: "#060E1A",
        },
        aqua: {
          50: "#E6FCFD",
          100: "#B3F5F9",
          200: "#66EBF3",
          300: "#33E8F5",
          400: "#00C2D1",
          500: "#009FAB",
          600: "#007A83",
          700: "#005C63",
        },
        sky: {
          50: "#F8FCFF",
          100: "#EAF9FF",
          200: "#D5F0FF",
        },
        emerald: {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
        },
        alert: {
          red: "#F97066",
          orange: "#FB923C",
          yellow: "#FBBF24",
        },
        // Keep old brand colors for backward compatibility
        brand: {
          purple: "#A855F7",
          magenta: "#D946EF",
          cyan: "#22D3EE",
          blue: "#3B82F6",
        },
        dark: {
          base: "#0A1628",
          card: "#0F2035",
          border: "#1A2D45",
          muted: "#94B3CC",
        },
      },
      backgroundImage: {
        "ocean-gradient":
          "linear-gradient(135deg, #0B4F8C 0%, #00C2D1 100%)",
        "ocean-gradient-r":
          "linear-gradient(to right, #0B4F8C, #00C2D1)",
        "ocean-gradient-hero":
          "radial-gradient(ellipse at top left, rgba(0,194,209,0.12) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(11,79,140,0.08) 0%, transparent 50%)",
        "glass-card":
          "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
        "glow-ocean":
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(11,79,140,0.2) 0%, transparent 70%)",
        "glow-aqua":
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,194,209,0.15) 0%, transparent 70%)",
        "mesh-gradient":
          "radial-gradient(ellipse at 20% 50%, rgba(0,194,209,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(11,79,140,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(0,194,209,0.05) 0%, transparent 50%)",
        // Keep old gradients for backward compatibility
        "brand-gradient":
          "linear-gradient(135deg, #A855F7 0%, #D946EF 35%, #22D3EE 70%, #3B82F6 100%)",
        "brand-gradient-r":
          "linear-gradient(to right, #A855F7, #D946EF, #22D3EE, #3B82F6)",
        "brand-gradient-hero":
          "radial-gradient(ellipse at top left, rgba(168,85,247,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(34,211,238,0.10) 0%, transparent 50%)",
      },
      boxShadow: {
        "glow-ocean": "0 0 40px rgba(11,79,140,0.3)",
        "glow-aqua": "0 0 40px rgba(0,194,209,0.25)",
        "glow-brand-aqua": "0 0 60px rgba(0,194,209,0.2), 0 0 100px rgba(11,79,140,0.1)",
        "card-aqua": "0 4px 24px rgba(11,79,140,0.08)",
        "card-aqua-hover": "0 12px 48px rgba(0,194,209,0.15), 0 4px 24px rgba(11,79,140,0.08)",
        "glass": "0 8px 32px rgba(0,0,0,0.06)",
        "glass-strong": "0 16px 64px rgba(0,0,0,0.1)",
        // Keep old shadows for backward compat
        "glow-purple": "0 0 40px rgba(168,85,247,0.3)",
        "glow-cyan": "0 0 40px rgba(34,211,238,0.2)",
        "glow-brand": "0 0 60px rgba(168,85,247,0.2), 0 0 100px rgba(34,211,238,0.1)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(168,85,247,0.2), 0 4px 24px rgba(0,0,0,0.4)",
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "float-medium": "float-medium 5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        wave: "wave 8s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite",
        "glow-border": "glow-border 3s ease-in-out infinite",
        caustic: "caustic 8s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        "fade-in": "fade-in 0.4s ease forwards",
        "scale-in": "scale-in 0.3s ease forwards",
        bubble: "bubble-rise 12s ease-in infinite",
        marquee: "marquee 25s linear infinite",
        "marquee-reverse": "marquee 25s linear infinite reverse",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(-4px) rotate(-1deg)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "25%": { transform: "translateY(-6px) translateX(3px)" },
          "75%": { transform: "translateY(3px) translateX(-3px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        wave: {
          "0%": { transform: "translateX(0) scaleY(1)" },
          "50%": { transform: "translateX(-25%) scaleY(0.55)" },
          "100%": { transform: "translateX(-50%) scaleY(1)" },
        },
        "glow-border": {
          "0%, 100%": { borderColor: "rgba(0, 194, 209, 0.2)" },
          "50%": { borderColor: "rgba(0, 194, 209, 0.5)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        caustic: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1) rotate(0deg)" },
          "25%": { opacity: "0.5", transform: "scale(1.1) rotate(5deg)" },
          "50%": { opacity: "0.3", transform: "scale(0.95) rotate(-3deg)" },
          "75%": { opacity: "0.6", transform: "scale(1.05) rotate(2deg)" },
        },
        "bubble-rise": {
          "0%": { transform: "translateY(0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-40vh) scale(1.1)", opacity: "0.4" },
          "100%": { transform: "translateY(-80vh) scale(0.8)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
