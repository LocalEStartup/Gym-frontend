/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // ✅ scans all React files
  ],
  theme: {
    extend: {
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeInDown: {
          "0%": { transform: "translateY(-40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOutRight: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.3s ease-out",
        fadeInDown: "fadeInDown 0.6s ease-out",
        fadeIn: "fadeIn 0.3s ease-out",
        slideInRight: "slideInRight 0.3s ease-out",
        slideOutRight: "slideOutRight 0.3s ease-in",
      },
      backgroundImage: {
        // Custom gradient for your UI
        'custom-gradient': 'linear-gradient(120deg, #06122f, #0d1b3e 80%, #fed600 100%)',
      },
      colors: {
        brand: {
          yellow: "#fed600",
          dark1: "#06122f",
          dark2: "#0d1b3e",
          cusprimary:"#033966",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(254, 214, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
