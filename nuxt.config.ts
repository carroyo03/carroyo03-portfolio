
import tailwindTypography from '@tailwindcss/typography'
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'nuxt-bootstrap-icons',
    '@nuxt/content',
    '@nuxtjs/mdc',
      '@nuxt/ui',
      '@nuxtjs/apollo'
  ],
  runtimeConfig:{
    githubToken: process.env.GH_TOKEN,
    public: {
      // githubToken: process.env.GH_TOKEN // This line is removed
    }
  },
  tailwindcss: {
    config: {
      plugins: [tailwindTypography],
    },
  },
  css: ["@/assets/css/tailwind.css"],
  apollo: {
    clients: {
      default: {
        tokenName: 'github-token',
        httpEndpoint: 'https://api.github.com/graphql',
      }
    },
  }
})
