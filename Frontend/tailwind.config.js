/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      textDecorationColor: {
        blue: 'blue',
      },
      textDecorationLine: {
        strikethrough: 'line-through',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.strikethrough-blue': {
          'text-decoration-line': 'line-through',
          'text-decoration-color': 'blue',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

