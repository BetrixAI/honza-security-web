/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Redesign Brand Colors podle UI-REDESIGN SPECIFIKACE
        brand: {
          light: '#42A5FF',
          mid: '#2E8BFF',
          dark: '#1C6CFD',
          DEFAULT: '#2E8BFF',
        },
        accent: {
          pink: '#FF5CEE',
          cyan: '#3CE6E6',
          DEFAULT: '#1C2940',
        },
        bg: {
          page: '#0B0E13',
          card: '#141A23',
          'card-alt': '#1B222C'
        },
        txt: {
          primary: '#FFFFFF',
          muted: '#9CA4B3',
          secondary: '#9CA4B3' // legacy compatibility
        },
        border: {
          subtle: '#2A3240'
        },
        success: '#3CCB7F',
        warning: '#EAC54F',
        danger: '#FF6B6B',
        
        // Legacy barvy pro zpětnou kompatibilitu
        'dark-bg': '#0a0a0a',
        'dark-card': '#111111',
        'dark-surface': '#1a1a1a',
        'dark-border': '#2a2a2a',
        
        // Security barvy - modré
        'security-blue': {
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
        
        // Security barvy - tmavě modré
        'security-dark-blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
        
        // Glow effects
        'glow-blue': '#3b82f6',
        'glow-blue-alt': '#60a5fa',
      },
      
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'tilt': 'tilt 10s infinite linear',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '75%': { transform: 'rotate(-1deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      
      boxShadow: {
        'card': '0 4px 16px rgba(0, 0, 0, 0.35)',
        'emboss': '0 0 4px #000',
        'glow-brand': '0 0 12px #42A5FF88',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.5)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      },
      
      backgroundImage: {
        'gradient-brand': 'linear-gradient(90deg, var(--brand-dark) 0%, var(--brand-light) 100%)',
        'gradient-progress': 'linear-gradient(90deg, var(--accent-cyan), var(--brand-light))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
} 