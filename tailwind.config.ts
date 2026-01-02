import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                luxury: {
                    black: '#070707',
                    white: '#F5F5F5',
                    gold: '#C6A45A',
                    'gold-light': '#B89449',
                    'text-muted': '#B8B8B8',
                    'warm-gray': {
                        50: '#FAFAF9',
                        100: '#F5F5F4',
                        200: '#E7E5E4',
                        300: '#D6D3D1',
                        400: '#A8A29E',
                        500: '#78716C',
                        600: '#57534E',
                        700: '#44403C',
                        800: '#292524',
                        900: '#1C1917',
                    },
                },
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
                sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'display': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
                'h1': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
                'h2': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
                'h3': ['2.25rem', { lineHeight: '1.2' }],
                'h4': ['1.875rem', { lineHeight: '1.25' }],
                'h5': ['1.5rem', { lineHeight: '1.3' }],
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
            },
        },
    },
    plugins: [],
}
export default config
