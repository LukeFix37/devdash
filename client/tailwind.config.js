/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom color palette for DevDash
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.25)',
          dark: 'rgba(17, 25, 40, 0.45)',
          border: 'rgba(255, 255, 255, 0.18)',
          'border-dark': 'rgba(255, 255, 255, 0.125)',
        }
      },
      
      // Enhanced spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom font sizes
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      
      // Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // Custom blur effects
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      },
      
      // Custom shadows
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'active': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Custom gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      },
      
      // Custom transitions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      // Custom grid templates
      gridTemplateColumns: {
        'sidebar': '280px 1fr',
        'sidebar-sm': '240px 1fr',
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      
      // Custom breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
    },
  },
  plugins: [
    // Custom plugin for utilities
    function({ addUtilities, addComponents, theme }) {
      addUtilities({
        // Glass morphism utilities
        '.glass': {
          background: 'var(--glass-bg, rgba(255, 255, 255, 0.25))',
          border: '1px solid var(--glass-border, rgba(255, 255, 255, 0.18))',
          boxShadow: 'var(--glass-shadow, 0 8px 32px 0 rgba(31, 38, 135, 0.37))',
          backdropFilter: 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
        },
        '.glass-strong': {
          backdropFilter: 'blur(40px)',
          '-webkit-backdrop-filter': 'blur(40px)',
        },
        
        // Interactive utilities
        '.interactive': {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.hover'),
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: theme('boxShadow.active'),
          },
        },
        
        // Focus utilities
        '.focus-ring': {
          '&:focus': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: `0 0 0 3px ${theme('colors.primary.500')}40`,
          },
        },
        
        // Scrollbar utilities
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: `${theme('colors.slate.400')} transparent`,
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.slate.400'),
            borderRadius: '6px',
            '&:hover': {
              backgroundColor: theme('colors.slate.500'),
            },
          },
        },
        
        // Gradient text
        '.gradient-text': {
          background: `linear-gradient(135deg, ${theme('colors.primary.600')}, ${theme('colors.indigo.600')})`,
          '-webkit-background-clip': 'text',
          backgroundClip: 'text',
          color: 'transparent',
        },
      });
      
      addComponents({
        // Header component styles
        '.header-modern': {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: theme('spacing.4'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '@apply shadow-lg': {},
        },
        
        // Modern input styles
        '.input-modern': {
          width: '100%',
          padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.lg'),
          border: `1px solid ${theme('colors.slate.200')}`,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          fontSize: theme('fontSize.sm'),
          transition: 'all 0.2s ease',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.500'),
            boxShadow: `0 0 0 3px ${theme('colors.primary.500')}20`,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          },
          '&::placeholder': {
            color: theme('colors.slate.400'),
          },
        },
        
        // Modern button styles
        '.btn-modern': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          borderRadius: theme('borderRadius.lg'),
          background: `linear-gradient(135deg, ${theme('colors.primary.500')}, ${theme('colors.indigo.600')})`,
          color: theme('colors.white'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: theme('boxShadow.md'),
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: theme('boxShadow.lg'),
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
            transform: 'none',
          },
        },
        
        // Widget component styles
        '.widget-container': {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.glass'),
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.hover'),
          },
        },
        
        // Dark mode toggle
        '.dark-mode-toggle': {
          padding: theme('spacing.3'),
          borderRadius: theme('borderRadius.xl'),
          background: theme('colors.slate.100'),
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: theme('colors.slate.200'),
            transform: 'scale(1.05)',
          },
        },
      });
    }
  ],
};