/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slowfade: {
          '0%': { opacity: 0.6 },
          '100%': { opacity: 1 }
        },
      },
      animation: {
        slowfade: 'slowfade 5s ease-in-out',
      },
      colors: {
        // Colores principales
        primary: {
          DEFAULT: '#2AB3C0',
          50: '#E7F6F8',
          100: '#C5E9ED',
          200: '#9DDBE2',
          300: '#75CDD6',
          400: '#4DBFCB',
          500: '#2AB3C0',
          600: '#228F9A',
          700: '#1A6B73',
          800: '#12474D',
          900: '#0A2326',
        },
        secondary: {
          DEFAULT: '#FF9D76',
          50: '#FFF0EA',
          100: '#FFE1D5',
          200: '#FFC3AC',
          300: '#FFA582',
          400: '#FF9D76',
          500: '#FF7F47',
          600: '#FF5E18',
          700: '#E84400',
          800: '#B53400',
          900: '#822500',
        },
        accent: {
          DEFAULT: '#7DDAA5',
          50: '#EEFAF3',
          100: '#DCF5E7',
          200: '#B9EBCF',
          300: '#97E1B7',
          400: '#7DDAA5',
          500: '#54CE88',
          600: '#34B96C',
          700: '#288C52',
          800: '#1C5E37',
          900: '#10301C',
        },
        // Neutros
        neutral: {
          50: '#FFFFFF',
          100: '#F8F8F8',
          200: '#E0E0E0',
          300: '#C8C8C8',
          400: '#888888',
          500: '#4A4A4A',
          600: '#3A3A3A',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
