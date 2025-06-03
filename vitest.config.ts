import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path' // Import resolve

// Helper function to resolve aliases, similar to what Nuxt does
const r = (p: string) => resolve(__dirname, p)

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom', // Using happy-dom for lighter browser environment
    // setupFiles: ['./test/setup.ts'], // Optional: if we need global test setup
    alias: { // Replicating Nuxt's alias for composables and utils
      '#app': r('./node_modules/nuxt/dist/app'),
      '#imports': r('./.nuxt/imports.d.ts'), // Important for auto-imports like useAsyncData
      '#build': r('./.nuxt'),
      // Add other Nuxt aliases if needed by the code under test
      // For example, if the composable uses other auto-imported utils or composables:
      // '~/composables': r('./composables'),
      // '~/utils': r('./utils'),
    }
  },
})
