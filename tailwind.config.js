/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        foreground: '#ffffff22',
        border: '#404040',
        darklight: '#666666',
        border: '#3e3b45',
        copylight: '#d9d9d9',
        copy: '#fbfbfb'
      }
    }
  },
  plugins: []
};
