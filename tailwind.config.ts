
import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#08BD80",
          50: "#E5F8F3",
          100: "#CCF1E7",
          200: "#99E3CF",
          300: "#66D5B7",
          400: "#33C79F",
          500: "#08BD80",
          600: "#069E6B",
          700: "#057F56",
          800: "#046042",
          900: "#02402D",
          950: "#012419"
        },
        secondary: {
          DEFAULT: "#3C4852",
          50: "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#3C4852",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#0D1625",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "#ea384c",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F7F8F9",
          foreground: "#6E7A83",
        },
        accent: {
          DEFAULT: "#F0F4F7",
          foreground: "#3C4852",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        dropdown: "0 3px 10px rgba(0, 0, 0, 0.12)",
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
