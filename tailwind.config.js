/** @type {import('tailwindcss').Config} */

import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f8f4ff",
          100: "#f0e8ff",
          200: "#e0d0ff",
          300: "#c9abff",
          400: "#ae7dff",
          500: "#7c3aed",
          600: "#7428d8",
          700: "#5f1eb9",
          800: "#4d1a96",
          900: "#3f1379",
        },

        cyan: {
          400: "#06b6d4",
          500: "#06b6d4",
          600: "#0891b2",
        },

        slate: {
          800: "#1e293b",
          850: "#0f172a",
          900: "#0f172a",
        },

        amber: {
          400: "#f59e0b",
          500: "#f59e0b",
        },

        success: "#10b981",
        error: "#ef4444",
        warning: "#f97316",
      },

      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",

        "gradient-glow":
          "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.1) 100%)",

        "gradient-neon":
          "linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #f59e0b 100%)",
      },

      boxShadow: {
        "glow-purple":
          "0 0 20px rgba(124,58,237,0.3)",

        "glow-cyan":
          "0 0 20px rgba(6,182,212,0.3)",

        "glow-lg":
          "0 20px 60px rgba(124,58,237,0.2)",
      },

      keyframes: {
        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },

          "100%": {
            backgroundPosition: "1000px 0",
          },
        },

        glow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(124,58,237,0)",
          },

          "50%": {
            boxShadow:
              "0 0 40px rgba(124,58,237,0.5)",
          },
        },

        pulse: {
          "0%, 100%": {
            opacity: "1",
          },

          "50%": {
            opacity: "0.5",
          },
        },

        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },

          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        shimmer: "shimmer 2s infinite",
        glow: "glow 2s infinite",
        pulse: "pulse 2s infinite",
        slideUp: "slideUp 0.5s ease-out",
      },

      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],

        mono: [
          "JetBrains Mono",
          "monospace",
        ],
      },
    },
  },

  plugins: [
    forms,
    typography,

    function ({ addUtilities }) {
      const glassUtilities = {
        ".glass": {
          background:
            "rgba(255,255,255,0.08)",

          backdropFilter: "blur(20px)",

          border:
            "1px solid rgba(255,255,255,0.1)",

          borderRadius: "20px",
        },

        ".glass-lg": {
          background:
            "rgba(15,23,42,0.5)",

          backdropFilter: "blur(30px)",

          border:
            "1px solid rgba(255,255,255,0.08)",

          borderRadius: "28px",
        },
      };

      addUtilities(glassUtilities);
    },
  ],
};