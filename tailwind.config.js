/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EA580C",
          hover: "#C2410C",
          light: "#FFF7ED",
          50: "#FFF7ED",
          100: "#FFEDD5",
          500: "#F97316",
          600: "#EA580C",
          700: "#C2410C",
        },
        app: {
          bg: "#F7F5F2",
          panel: "#FFFFFF",
          text: "#1F2937",
          muted: "#5A6B78",
          border: "#E5E7EB",
        },
        status: {
          pending: "#F59E0B",
          active: "#15A66A",
          rejected: "#E53935",
          unsubmitted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
