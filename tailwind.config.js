/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        'primary-dark': '#1d4ed8',
        dark: '#0f172a',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans','DM Sans','system-ui','sans-serif'],
        serif: ['Playfair Display','Georgia','serif'],
      },
    },
  },
  plugins: [],
}
