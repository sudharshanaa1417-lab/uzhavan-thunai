/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1B5E20',
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#2E7D32',
          600: '#1B5E20',
          700: '#154A19',
          800: '#0F3612',
          900: '#0A250D',
        },
        leaf: {
          DEFAULT: '#4CAF50',
          light: '#81C784',
          dark: '#388E3C',
        },
        sage: {
          DEFAULT: '#A5C8A0',
          light: '#C8DFB9',
          dark: '#7D9E78',
        },
        soil: {
          DEFAULT: '#6D4C41',
          light: '#8D6E63',
          dark: '#4E342E',
        },
        harvest: {
          DEFAULT: '#F2B544',
          light: '#FFD54F',
          dark: '#F57C00',
        },
        cream: {
          DEFAULT: '#FAF6EC',
          paper: '#F4EEDA',
          dark: '#EDE5CB',
        },
        night: {
          DEFAULT: '#121A13',
          card: '#1A251B',
          border: '#283A2A',
          text: '#E5EFE4'
        }
      },
      fontFamily: {
        tamil: ['Noto Sans Tamil', 'sans-serif'],
        sans: ['Noto Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'organic': '1.25rem',
        'pill': '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(27, 94, 32, 0.08)',
        'elevated': '0 8px 30px -4px rgba(27, 94, 32, 0.14)',
        'golden': '0 4px 20px -2px rgba(242, 181, 68, 0.3)',
      }
    },
  },
  plugins: [],
};
