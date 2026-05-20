// Tailwind CSS Configuration - Nexulon AI
// Premium dark theme with vibrant accent colors

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        primary: {
          50: '#f8f4ff',
          100: '#f0e8ff',
          200: '#e0d0ff',
          300: '#c9abff',
          400: '#ae7dff',
          500: '#7c3aed', // Main brand purple
          600: '#7428d8',
          700: '#5f1eb9',
          800: '#4d1a96',
          900: '#3f1379',
        },
        // Secondary Colors
        cyan: {
          400: '#06b6d4',
          500: '#06b6d4',
          600: '#0891b2',
        },
        // Neutral/Dark
        slate: {
          800: '#1e293b',
          850: '#0f172a', // Ultra dark bg
          900: '#0f172a',
        },
        // Accent
        amber: {
          400: '#f59e0b',
          500: '#f59e0b',
        },
        // Semantic
        success: '#10b981',
        error: '#ef4444',
        warning: '#f97316',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
        'gradient-glow': 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
        'gradient-neon': 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #f59e0b 100%)',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'glow-lg': '0 20px 60px rgba(124, 58, 237, 0.2)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(124, 58, 237, 0)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.5)',
          },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        glow: 'glow 2s infinite',
        pulse: 'pulse 2s infinite',
        slideUp: 'slideUp 0.5s ease-out',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['28px', { lineHeight: '36px' }],
        '4xl': ['32px', { lineHeight: '40px' }],
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
      borderRadius: {
        sm: '6px',
        base: '8px',
        lg: '12px',
        xl: '16px',
      },
      backdropFilter: {
        none: 'none',
        sm: 'blur(4px)',
        md: 'blur(12px)',
        lg: 'blur(20px)',
      },
      opacity: {
        glass: '0.7',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    // Glass morphism plugin
    function ({ addUtilities }) {
      const glassUtilities = {
        '.glass': {
          '@apply bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl': {},
        },
        '.glass-sm': {
          '@apply bg-slate-900/40 backdrop-blur-sm border border-slate-700/50': {},
        },
        '.glass-lg': {
          '@apply bg-slate-900/50 backdrop-blur-xl border border-slate-700/30 shadow-lg': {},
        },
      };
      addUtilities(glassUtilities);
    },
  ],
};
