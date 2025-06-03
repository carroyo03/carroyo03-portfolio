<script setup lang="ts">
const props = defineProps(['posts'])
</script>

<template>
  <div v-for="post in props.posts" :key="post.slug"
        class="bg-white rounded-lg shadow-lg overflow-hidden hover:opacity-75">
    <NuxtLink :to="post.path">
      <img :src="post.cover" alt="Post Cover" class="w-full h-48 object-cover">
    </NuxtLink>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-2 dark:text-black">{{ post.title }}</h2>
      <p class="text-gray-700 mb-4">{{ post.description }}</p>
      <NuxtLink :to="post.path"
                class="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded float-right
      mb-8">
        Read more
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>