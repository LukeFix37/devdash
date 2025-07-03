/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Enhanced color palette with more variations and interactive states
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
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.25)',
          medium: 'rgba(255, 255, 255, 0.35)',
          strong: 'rgba(255, 255, 255, 0.45)',
          dark: 'rgba(17, 25, 40, 0.45)',
          'dark-medium': 'rgba(17, 25, 40, 0.6)',
          'dark-strong': 'rgba(17, 25, 40, 0.8)',
          border: 'rgba(255, 255, 255, 0.18)',
          'border-dark': 'rgba(255, 255, 255, 0.125)',
        },
        status: {
          online: '#10b981',
          busy: '#f59e0b',
          offline: '#ef4444',
          away: '#8b5cf6',
        }
      },
      
      // Enhanced spacing scale with fluid values
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '128': '32rem',
        '144': '36rem',
        // Fluid spacing using clamp
        'fluid-1': 'clamp(0.5rem, 2vw, 1rem)',
        'fluid-2': 'clamp(1rem, 3vw, 2rem)',
        'fluid-3': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-4': 'clamp(2rem, 5vw, 4rem)',
      },
      
      // Enhanced font sizes with fluid typography
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'fluid-sm': 'clamp(0.875rem, 2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 3vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 7vw, 3rem)',
      },
      
      // Enhanced animations with more variety
      animation: {
        // Basic animations
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'scale-in-bounce': 'scaleInBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        
        // Interactive animations
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        
        // Background animations
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        
        // Loading animations
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-delay': 'bounce 1s infinite 0.5s',
        
        // Status animations
        'pulse-status': 'pulseStatus 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        
        // Advanced animations
        'morph': 'morph 4s ease-in-out infinite',
        'typing': 'typing 2s steps(20) infinite',
        'slide-marquee': 'slideMarquee 20s linear infinite',
      },
      
      // Enhanced keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleInBounce: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-3deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(-5px) rotate(-1deg)' },
        },
        skeleton: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseStatus: {
          '0%': { boxShadow: '0 0 0 0 currentColor' },
          '70%': { boxShadow: '0 0 0 8px transparent' },
          '100%': { boxShadow: '0 0 0 0 transparent' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        slideMarquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      
      // Enhanced blur effects
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
        '4xl': '128px',
      },
      
      // Enhanced shadows with colored and interactive variants
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
        'hover': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'hover-lg': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
        'active': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'colored-blue': '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
        'colored-purple': '0 10px 25px -5px rgba(147, 51, 234, 0.3)',
        'colored-green': '0 10px 25px -5px rgba(16, 185, 129, 0.3)',
        'colored-red': '0 10px 25px -5px rgba(239, 68, 68, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 20px rgba(147, 51, 234, 0.4)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.4)',
        'focus-ring': '0 0 0 3px rgba(59, 130, 246, 0.3)',
        'focus-ring-offset': '0 0 0 2px rgba(255, 255, 255, 1)',
      },
      
      // Enhanced border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        'fluid': 'clamp(0.5rem, 2vw, 1.5rem)',
      },
      
      // Enhanced gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(45deg, var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        'skeleton-gradient': 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        'skeleton-gradient-dark': 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)',
      },
      
      // Enhanced transitions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'smooth-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'elastic': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        'back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      
      // Enhanced durations
      transitionDuration: {
        '0': '0ms',
        '50': '50ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
      
      // Enhanced grid templates
      gridTemplateColumns: {
        'sidebar': '320px 1fr',
        'sidebar-md': '280px 1fr',
        'sidebar-sm': '240px 1fr',
        'sidebar-collapsed': '80px 1fr',
        'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-fit-350': 'repeat(auto-fit, minmax(350px, 1fr))',
        'fluid-2': 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
        'fluid-3': 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
        'responsive-cards': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
      
      // Enhanced breakpoints
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        // Custom breakpoints for specific use cases
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
        'wide': {'min': '1920px'},
      },
      
      // Container queries support
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
      
      // Enhanced z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'toast': '1000',
        'modal': '2000',
        'tooltip': '3000',
      },
      
      // Enhanced opacity scale
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '65': '0.65',
        '85': '0.85',
      },
      
      // Enhanced scale transforms
      scale: {
        '101': '1.01',
        '102': '1.02',
        '103': '1.03',
        '98': '0.98',
        '97': '0.97',
      },
      
      // Enhanced rotation
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '15': '15deg',
        '30': '30deg',
        '60': '60deg',
        '270': '270deg',
      },
    },
  },
  plugins: [
    // Custom plugin for enhanced utilities
    function({ addUtilities, addComponents, addBase, theme, e, prefix, config }) {
      
      // Base improvements
      addBase({
        // Better font rendering
        'html': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'text-rendering': 'optimizeLegibility',
        },
        
        // Improved focus styles
        '*:focus': {
          outline: 'none',
        },
        
        // Better touch targets on mobile
        '@media (hover: none) and (pointer: coarse)': {
          'button, [role="button"], input[type="submit"], input[type="button"]': {
            minHeight: '48px',
            minWidth: '48px',
          },
        },
      });
      
      // Glass morphism utilities
      addUtilities({
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
        '.glass-subtle': {
          backdropFilter: 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
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
        '.interactive-scale': {
          transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.02)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
        },
        '.interactive-lift': {
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.hover-lg'),
          },
        },
        '.interactive-glow': {
          transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: theme('boxShadow.glow-blue'),
          },
        },
        
        // Focus utilities
        '.focus-ring': {
          '&:focus-visible': {
            outline: '2px solid transparent',
            outlineOffset: '2px',
            boxShadow: `${theme('boxShadow.focus-ring-offset')}, ${theme('boxShadow.focus-ring')}`,
          },
        },
        '.focus-ring-inset': {
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `inset ${theme('boxShadow.focus-ring')}`,
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
        '.scrollbar-none': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        
        // Gradient text
        '.gradient-text': {
          background: `linear-gradient(135deg, ${theme('colors.primary.600')}, ${theme('colors.accent.600')})`,
          '-webkit-background-clip': 'text',
          backgroundClip: 'text',
          color: 'transparent',
        },
        '.gradient-text-animated': {
          background: `linear-gradient(45deg, ${theme('colors.primary.600')}, ${theme('colors.accent.600')}, ${theme('colors.primary.600')})`,
          backgroundSize: '200% 200%',
          '-webkit-background-clip': 'text',
          backgroundClip: 'text',
          color: 'transparent',
          animation: 'gradientShift 3s ease-in-out infinite',
        },
        
        // Loading states
        '.skeleton': {
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton 1.5s ease-in-out infinite',
          borderRadius: theme('borderRadius.md'),
        },
        '.skeleton-dark': {
          background: 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)',
          backgroundSize: '200% 100%',
          animation: 'skeleton 1.5s ease-in-out infinite',
        },
        
        // Performance optimizations
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          willChange: 'transform',
        },
        
        // State utilities
        '.state-loading': {
          pointerEvents: 'none',
          opacity: '0.6',
          cursor: 'not-allowed',
        },
        '.state-error': {
          borderColor: theme('colors.red.500'),
          backgroundColor: 'rgba(239, 68, 68, 0.05)',
        },
        '.state-success': {
          borderColor: theme('colors.green.500'),
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
        },
        '.state-warning': {
          borderColor: theme('colors.yellow.500'),
          backgroundColor: 'rgba(245, 158, 11, 0.05)',
        },
        
        // Responsive text utilities
        '.text-responsive': {
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
        },
        '.text-responsive-lg': {
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
        },
        '.text-responsive-xl': {
          fontSize: 'clamp(1.25rem, 4vw, 2rem)',
        },
        
        // Container query utilities
        '.container-xs': {
          containerType: 'inline-size',
        },
        '.container-normal': {
          containerType: 'normal',
        },
      });
      
      // Enhanced component styles
      addComponents({
        // Modern card component
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.glass'),
          border: `1px solid ${theme('colors.gray.200')}`,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme('boxShadow.hover-lg'),
          },
        },
        
        // Modern button variants
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${theme('spacing.3')} ${theme('spacing.6')}`,
          borderRadius: theme('borderRadius.lg'),
          fontWeight: theme('fontWeight.medium'),
          fontSize: theme('fontSize.sm'),
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          cursor: 'pointer',
          border: 'none',
          minHeight: '44px',
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },
        '.btn-primary': {
          background: `linear-gradient(135deg, ${theme('colors.primary.500')}, ${theme('colors.primary.600')})`,
          color: theme('colors.white'),
          boxShadow: theme('boxShadow.colored-blue'),
          '&:hover:not(:disabled)': {
            transform: 'translateY(-2px) scale(1.02)',
            boxShadow: theme('boxShadow.hover-lg'),
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.secondary.100'),
          color: theme('colors.secondary.700'),
          border: `1px solid ${theme('colors.secondary.200')}`,
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.secondary.200'),
            transform: 'translateY(-1px)',
          },
        },
        '.btn-ghost': {
          backgroundColor: 'transparent',
          color: theme('colors.secondary.600'),
          '&:hover:not(:disabled)': {
            backgroundColor: theme('colors.secondary.100'),
            color: theme('colors.secondary.700'),
          },
        },
        
        // Modern input component
        '.input': {
          width: '100%',
          padding: theme('spacing.3'),
          borderRadius: theme('borderRadius.lg'),
          border: `1px solid ${theme('colors.secondary.300')}`,
          backgroundColor: theme('colors.white'),
          fontSize: theme('fontSize.sm'),
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '44px',
          '&:focus': {
            outline: 'none',
            borderColor: theme('colors.primary.500'),
            boxShadow: theme('boxShadow.focus-ring'),
            transform: 'scale(1.01)',
          },
          '&::placeholder': {
            color: theme('colors.secondary.400'),
          },
        },
        
        // Widget container
        '.widget': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: theme('borderRadius.xl'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.glass'),
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme('boxShadow.hover'),
          },
        },
        
        // Status indicators
        '.status-indicator': {
          width: '0.5rem',
          height: '0.5rem',
          borderRadius: '50%',
          animation: 'pulseStatus 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        '.status-online': {
          backgroundColor: theme('colors.status.online'),
        },
        '.status-busy': {
          backgroundColor: theme('colors.status.busy'),
        },
        '.status-offline': {
          backgroundColor: theme('colors.status.offline'),
        },
        '.status-away': {
          backgroundColor: theme('colors.status.away'),
        },
      });
    },
    
    // Container queries plugin (if available)
    require('@tailwindcss/container-queries'),
    
    // Custom responsive design plugin
    function({ addUtilities, theme }) {
      const breakpoints = theme('screens');
      
      // Add fluid utilities
      addUtilities({
        '.fluid-padding': {
          padding: 'clamp(1rem, 4vw, 2rem)',
        },
        '.fluid-margin': {
          margin: 'clamp(1rem, 4vw, 2rem)',
        },
        '.fluid-gap': {
          gap: 'clamp(1rem, 3vw, 2rem)',
        },
        '.fluid-text': {
          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
          lineHeight: 'clamp(1.5rem, 3.5vw, 1.75rem)',
        },
      });
    },
  ],
};