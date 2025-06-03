<script setup lang="ts">
const links = [
  {name: 'GitHub', href: 'https://github.com/carroyo03', icon: 'grommet-icons:github'},
  {name: 'LinkedIn', href: 'https://www.linkedin.com/in/carlosarroyolorenzo', icon: 'grommet-icons:linkedin'},
  {name: 'Substack', href: 'https://substack.com/@carlosarroyo399912', icon: 'bi bi-substack'},
]
</script>

<template>
  <footer class="bg-gray-800 mt-auto">
    <section class="mx-auto max-w-7xl px-2 sm:px-4 lg:py-6 text-gray-300 flex flex-row">
      <p class="flex-1">&copy; 2025 Carlos G. Arroyo Lorenzo. All rights reserved.</p>
      <div class="flex flex-row justify-center gap-4 mb-4 mt-2">
        <a v-for="link in links" :key="link.name" :href="link.href">
          <Icon v-if="link.icon.startsWith('grommet-icons:')"
                :name="link.icon"
                size="1.5rem"
                class="text-gray-400 hover:text-white transition-colors duration-300" />
          <BootstrapIcon v-else
            :name="link.icon"
            size="1.5rem"
            class="text-gray-400 hover:text-white transition-colors duration-300" />

        </a>
      </div>
    </section>
  </footer>
</template>