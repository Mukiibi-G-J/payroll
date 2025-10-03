/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Accupay brand colors - matching original design exactly
                's1': '#005151', // Dark teal (rgba(0, 81, 81, 1))
                's2': '#ffbf3f', // Accent yellow (rgba(255, 191, 63, 1))
                's3': '#e8a115', // Secondary yellow (rgba(232, 161, 21, 1))
                'mainTextColor': '#060b1e', // Dark text (rgba(6, 11, 30, 1))
                'bodyText': '#3b4a46', // Body text (rgba(59, 74, 70, 1))
                'strokeColor': '#e5e5e5', // Border color
                'p1': '#1a938a', // Primary accent (rgba(26, 147, 138, 1))
                'softBg': '#f7f7f7', // Soft background (rgba(247, 247, 247, 1))
                'softBg2': '#eafaf8', // Soft teal background (rgba(234, 250, 248, 1))
                'strokeColor2': '#e4e4e4', // Light stroke (rgba(228, 228, 228, 1))
                'white': '#ffffff', // Pure white
                'black': '#000000', // Pure black
            },
            fontFamily: {
                'outfit': ['Outfit', 'sans-serif'],
                'sans': ['Outfit', 'sans-serif'], // Set Outfit as default sans font
            },
            fontSize: {
                // Custom font sizes matching original design
                'display-2': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
                'display-3': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
                'display-4': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '700' }],
                'text-60px': ['60px', { lineHeight: '1' }],
                'text-base': ['1rem', { lineHeight: '1.5rem' }],
                'text-lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'text-sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'text-xl': ['1.25rem', { lineHeight: '1.75rem' }],
            },
            screens: {
                'md': '768px',
                'lg': '992px',
                'xl': '1200px',
            },
            spacing: {
                'stp-15': '60px', // Section top padding
                'sbp-15': '60px', // Section bottom padding
            }
        },
    },
    plugins: [],
}
