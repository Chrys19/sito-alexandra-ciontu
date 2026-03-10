/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
        extend: {
                fontFamily: {
                        sans: ["Roboto Flex", "sans-serif"],
                        script: ["Meie Script", "cursive"],
                        body: ["Roboto Flex", "sans-serif"]
                },
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
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
                                DEFAULT: '#58355E',
                                foreground: '#FFFFFF',
                                50: '#F4EFF5',
                                100: '#E8DEEB',
                                200: '#D1BDD6',
                                300: '#BA9CC2',
                                400: '#A37BAD',
                                500: '#8C5A99',
                                600: '#754880',
                                700: '#58355E',
                                800: '#422847',
                                900: '#2C1B30'
                        },
                        secondary: {
                                DEFAULT: '#C4D6B0',
                                foreground: '#2D1B30',
                                50: '#F9FCF7',
                                100: '#F2F6F0',
                                200: '#E6EDE3',
                                300: '#D9E3D5',
                                400: '#CCD9C8',
                                500: '#C4D6B0',
                                600: '#A3B88F',
                                700: '#82996E',
                                800: '#617A4D',
                                900: '#405233'
                        },
                        muted: {
                                DEFAULT: '#F2F6F0',
                                foreground: '#58355E'
                        },
                        accent: {
                                DEFAULT: '#C4D6B0',
                                foreground: '#58355E'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: '#E6EDE3',
                        input: '#E6EDE3',
                        ring: '#58355E',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                boxShadow: {
                        'soft': '0 10px 40px -10px rgba(88, 53, 94, 0.08)',
                        'hover': '0 20px 50px -12px rgba(88, 53, 94, 0.15)',
                },
                keyframes: {
                        'accordion-down': {
                                from: {
                                        height: '0'
                                },
                                to: {
                                        height: 'var(--radix-accordion-content-height)'
                                }
                        },
                        'accordion-up': {
                                from: {
                                        height: 'var(--radix-accordion-content-height)'
                                },
                                to: {
                                        height: '0'
                                }
                        },
                        'fade-in-up': {
                                '0%': {
                                        opacity: '0',
                                        transform: 'translateY(20px)'
                                },
                                '100%': {
                                        opacity: '1',
                                        transform: 'translateY(0)'
                                }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out',
                        'fade-in-up': 'fade-in-up 0.6s ease-out forwards'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};
