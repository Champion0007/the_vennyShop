/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        lavender: '#b89cff',
        blush: '#ffb8d2',
        orchid: '#8b5cf6',
        ink: '#15111f',
        mist: '#f8f4ff',
      },
      boxShadow: {
        glow: '0 24px 70px rgba(184, 156, 255, 0.38)',
        card: '0 24px 65px rgba(28, 17, 50, 0.12)',
      },
      backgroundImage: {
        'venny-radial': 'radial-gradient(circle at top left, rgba(255,184,210,.55), transparent 34%), radial-gradient(circle at bottom right, rgba(184,156,255,.6), transparent 32%)',
      },
    },
  },
  plugins: [],
};
