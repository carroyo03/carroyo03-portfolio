import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
    // `content` ya suele ser manejado por el módulo de Nuxt por defecto
    // para escanear tus componentes de Vue y archivos de Nuxt.
    // Sin embargo, si tu Markdown está fuera de las rutas estándar,
    // es posible que necesites añadirlo aquí.
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.{vue,js,ts}',
        './pages/**/*.{vue,js,ts}',
        './composables/**/*.{vue,js,ts}',
        './plugins/**/*.{js,ts}',
        './App.{vue,js,ts}',
        './app.{vue,js,ts}',
        './Error.{vue,js,ts}',
        './error.{vue,js,ts}',
        './content/**/*.md', // <-- MUY IMPORTANTE si el contenido de Markdown no está en una ruta predeterminada de Nuxt
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}