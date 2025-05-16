/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["JetBrains Mono"],
      },
      colors: {
        primary: {
          DEFAULT: "#2D3250",  // Deep navy blue
          light: "#424769",    // Lighter navy
          dark: "#1B1E30"      // Darker navy
        },
        secondary: {
          DEFAULT: "#676F9D",  // Muted purple-blue
          light: "#8891BC",    // Soft lavender
          dark: "#4A507A"      // Deep purple-blue
        },
        accent: {
          DEFAULT: "#F7C04A",  // Warm yellow
          hover: "#FFD166",    // Bright yellow
          light: "#FFE4A7",    // Light yellow
          dark: "#E5A83A"      // Deep yellow
        },
        neutral: {
          50: "#F8F9FA",
          100: "#E9ECEF",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#ADB5BD",
          500: "#6C757D",
          600: "#495057",
          700: "#343A40",
          800: "#212529",
          900: "#1A1E21"
        },
      },
    },
  },
  plugins: [],
}

