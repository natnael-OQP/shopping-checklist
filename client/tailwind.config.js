/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                popi: ['Poppins'],
            },
            colors: {
                color1: '#F7F6FC',
                color2: '#8892b0',
                color3: '#656DF0',
            },
        },
    },
    plugins: [],
}
