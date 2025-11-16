import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f59e0b',
          600: '#f97316',
          700: '#ea580c',
          800: '#c2410c',
          900: '#9a3412',
        },
        slate: colors.slate,
        rose: colors.rose,
      }
    }
  },
  plugins: [],
}
