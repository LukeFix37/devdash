/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: true, // Disable Tailwind's base styles
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}', 
    // add your actual source files here
  ],
  darkMode: 'class', // or 'media', but your CSS uses 'class'
  safelist: [
    'border-slate-200',
    'dark:border-slate-700',
    'bg-slate-100',
    'dark:bg-slate-800',
    'hover:bg-slate-200',
    'dark:hover:bg-slate-700',
    'text-slate-900',
    'dark:text-slate-100',
    'border-slate-200',
    'dark:border-slate-700',
    'hover:border-slate-300',
    'dark:hover:border-slate-600',
    'focus:ring-blue-500/50',
    'focus:ring-slate-500/50',
    // add more safelist items if needed, based on your CSS
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
