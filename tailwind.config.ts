import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
        './content/**/*.{md}',
    ],
    theme: {
        extend: {},
    },
    //plugins: [require('@tailwindcss/typography')],
}
