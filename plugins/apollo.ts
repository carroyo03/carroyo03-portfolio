export default defineNuxtPlugin((nuxtApp) => {
    const githubToken = useRuntimeConfig().githubToken;
    nuxtApp.hook('apollo:auth', ({ client, token }) => {

        token.value = githubToken;
    })
})
