/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            colors: {
                dark: '#050507',
                card: '#0f1115',
                'card-hover': '#181a20',
                'border-subtle': 'rgba(255, 255, 255, 0.08)',
                'border-active': 'rgba(255, 255, 255, 0.15)',
            }
        },
    },
    plugins: [],
}
