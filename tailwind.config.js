/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        olympus: {
          bg: '#080B14',
          surface: '#0D1220',
          card: '#111827',
          border: '#1E2D45',
          gold: '#C9A84C',
          'gold-light': '#F0C96A',
          'gold-dim': '#8A6F30',
          amber: '#E8893A',
          blue: '#3B82F6',
          'blue-dim': '#1D3F6E',
          cyan: '#22D3EE',
          green: '#10B981',
          red: '#EF4444',
          muted: '#64748B',
          text: '#E2E8F0',
          'text-dim': '#94A3B8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #F0C96A 50%, #C9A84C 100%)',
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(201,168,76,0.05) 0%, rgba(59,130,246,0.05) 100%)',
        'glow-gold': 'radial-gradient(circle at center, rgba(201,168,76,0.3) 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,76,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201,168,76,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold': '0 0 30px rgba(201,168,76,0.2)',
        'gold-lg': '0 0 60px rgba(201,168,76,0.3)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
