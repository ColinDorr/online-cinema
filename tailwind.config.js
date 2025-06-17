/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'cinema-bg': '#1f1f1f',
        'cinema-text': '#fbf9f9',
        
        'transparent-white-75': "rgba(255, 255, 255, 0.75)",
        'transparent-black-90': "rgba(31, 31, 31, 0.90)",
        'transparent-black-60': "rgba(31, 31, 31, 0.60)"
      }
    }
  },
  plugins: []
}