/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(-20px)', opacity: '0' },
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-100%)', opacity: '0' },
        },
        slideRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out forwards',
        slideUp: 'slideUp 0.4s ease-in forwards',
        slide: 'slide 5s linear infinite',
        slideLeft: 'slideLeft 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        slideRight: 'slideRight 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      colors: {
        primary: '#1E7F4F',
        lightBg: '#F4F7F5',
        mutedText: '#6B7280',
        cardBorder: '#E6ECE8',
      },
      boxShadow: {
        card: '0 20px 40px rgba(0,0,0,0.05)',
      },
    },
  },

  plugins: [
    //  Hide scrollbar globally
    function ({ addBase }) {
      addBase({
        '::-webkit-scrollbar': {
          display: 'none',
        },
        '*': {
          scrollbarWidth: 'none', // Firefox
        },
      });
    },

    // to SHOW scrollbar 
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-show': {
          scrollbarWidth: 'auto', // Firefox
        },
        '.scrollbar-show::-webkit-scrollbar': {
          display: 'block',
          width: '6px',
        },
        '.scrollbar-show::-webkit-scrollbar-thumb': {
          backgroundColor: '#cbd5e1',
          borderRadius: '9999px',
        },
        '.scrollbar-show::-webkit-scrollbar-track': {
          background: 'transparent',
        },
      });
    },
  ],
};







// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         slideDown: {
//           '0%': { transform: 'translateY(-20px)', opacity: '0' },
//           '100%': { transform: 'translateY(0)', opacity: '1' },
//         },
//         slideUp: {
//           '0%': { transform: 'translateY(0)', opacity: '1' },
//           '100%': { transform: 'translateY(-20px)', opacity: '0' },
//         },
//         slide: {
//           '0%': { transform: 'translateX(0)' },
//           '100%': { transform: 'translateX(-50%)' },
//         },
//         slideLeft: {
//           '0%': { transform: 'translateX(0)', opacity: '1' },
//           '100%': { transform: 'translateX(-100%)', opacity: '0' },
//         },
//         slideRight: {
//           '0%': { transform: 'translateX(100%)', opacity: '0' },
//           '100%': { transform: 'translateX(0)', opacity: '1' },
//         },
//       },
//       animation: {
//         slideDown: 'slideDown 0.5s ease-out forwards',
//         slideUp: 'slideUp 0.4s ease-in forwards',
//         slide: 'slide 5s linear infinite',
//         slideLeft: 'slideLeft 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
//         slideRight: 'slideRight 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
//       },
//       colors: {
//         primary: '#1E7F4F',
//         lightBg: '#F4F7F5',
//         mutedText: '#6B7280',
//         cardBorder: '#E6ECE8',
//       },
//       boxShadow: {
//         card: '0 20px 40px rgba(0,0,0,0.05)',
//       },
//     },
//   },
//   plugins: [],
// };
