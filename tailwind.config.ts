import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				navy: {
					DEFAULT: '#0A0F1C',
					50: '#F0F1F4',
					100: '#E1E3E9',
					200: '#C3C7D3',
					300: '#A5ABBD',
					400: '#878FA7',
					500: '#697391',
					600: '#4B577B',
					700: '#2D3B65',
					800: '#0F1F4F',
					900: '#0A0F1C',
				},
				techpurple: '#7B61FF',
				elecblue: '#00B4D8',
				neon: {
					purple: '#B14EFF',
					blue: '#0DCCFF',
					green: '#00FFA3',
					pink: '#FF5EDF',
				},
			},
			fontFamily: {
				sans: ['Inter var', 'sans-serif'],
				sora: ['Sora', 'sans-serif'],
				ibm: ['IBM Plex Sans', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'float-bg': {
					'0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
					'25%': { transform: 'translate(20px, -20px) rotate(2deg) scale(1.02)' },
					'50%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
					'75%': { transform: 'translate(-20px, 20px) rotate(-2deg) scale(0.98)' },
				},
				'float-bg-reverse': {
					'0%, 100%': { transform: 'translate(0, 0) rotate(45deg) scale(1)' },
					'25%': { transform: 'translate(-20px, 20px) rotate(43deg) scale(0.98)' },
					'50%': { transform: 'translate(0, 0) rotate(45deg) scale(1)' },
					'75%': { transform: 'translate(20px, -20px) rotate(47deg) scale(1.02)' },
				},
				'float-bg-slow': {
					'0%, 100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
					'25%': { transform: 'translate(10px, -10px) rotate(1deg) scale(1.01)' },
					'50%': { transform: 'translate(0, 0) rotate(0deg) scale(1)' },
					'75%': { transform: 'translate(-10px, 10px) rotate(-1deg) scale(0.99)' },
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1', filter: 'brightness(1)' },
					'50%': { opacity: '0.8', filter: 'brightness(1.2)' },
				},
				'gradient-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'100%': { backgroundPosition: '100% 50%' },
				},
				'shimmer': {
					'0%': { backgroundPosition: '-500px 0' },
					'100%': { backgroundPosition: '500px 0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				float: 'float 6s ease-in-out infinite',
				'float-bg': 'float-bg 20s ease-in-out infinite',
				'float-bg-reverse': 'float-bg-reverse 25s ease-in-out infinite',
				'float-bg-slow': 'float-bg-slow 30s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'gradient-flow': 'gradient-flow 8s linear infinite alternate',
				'shimmer': 'shimmer 2s linear infinite',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'grid-pattern': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z'/%3E%3C/g%3E%3C/svg%3E\")",
			},
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
