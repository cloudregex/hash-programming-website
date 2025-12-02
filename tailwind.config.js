/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,njk,js}",
        "./src/_includes/**/*.{html,njk,js}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
