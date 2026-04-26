// tailwind.config.js
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    './components/**/*.{js,jsx}'
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			primary: ['var(--font-primary)', 'sans-serif'],
  			heading: ['var(--font-heading)', 'sans-serif'],
  			display: ['var(--font-display)', 'sans-serif'],
  		},
  		colors: {
  			// Shadcn UI Colors (HSL format)
  			border: 'hsl(var(--border))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Custom Color System (using CSS variables)
  			brand: {
  				primary: 'var(--color-primary)',
  				50: 'var(--color-primary-50)',
  				100: 'var(--color-primary-100)',
  				200: 'var(--color-primary-200)',
  				300: 'var(--color-primary-300)',
  				400: 'var(--color-primary-400)',
  				500: 'var(--color-primary-500)',
  				600: 'var(--color-primary-600)',
  				700: 'var(--color-primary-700)',
  				800: 'var(--color-primary-800)',
  				900: 'var(--color-primary-900)',
  			},
  			bg: {
  				primary: 'var(--color-bg-primary)',
  				secondary: 'var(--color-bg-secondary)',
  				tertiary: 'var(--color-bg-tertiary)',
  				card: 'var(--color-bg-card)',
  				surface: 'var(--color-bg-surface)',
  				elevated: 'var(--color-bg-elevated)',
  			},
  			text: {
  				primary: 'var(--color-text-primary)',
  				secondary: 'var(--color-text-secondary)',
  				tertiary: 'var(--color-text-tertiary)',
  				muted: 'var(--color-text-muted)',
  				disabled: 'var(--color-text-disabled)',
  			},
  			borderCustom: {
  				primary: 'var(--color-border-primary)',
  				secondary: 'var(--color-border-secondary)',
  				tertiary: 'var(--color-border-tertiary)',
  				light: 'var(--color-border-light)',
  				medium: 'var(--color-border-medium)',
  				strong: 'var(--color-border-strong)',
  			},
  		},
  		boxShadow: {
  			glow: '0 0 20px rgba(99, 102, 241, 0.6), 0 0 40px rgba(99,102,241,0.3)',
  			'glow-red': 'var(--shadow-glow-red)',
  			'glow-white': 'var(--shadow-glow-white)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		transitionDuration: {
  			fast: 'var(--transition-fast)',
  			base: 'var(--transition-base)',
  			slow: 'var(--transition-slow)',
  			slower: 'var(--transition-slower)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}
