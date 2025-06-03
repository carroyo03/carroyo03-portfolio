
<script setup lang="ts">
const props = defineProps(['project'])

const icons = [
  {name: 'heroicons:star', size: '1.1rem', class: 'text-indigo-700 pt-1', text: 'stargazers', label:'Stars'},
  {name: 'bi:git', size: '1.1rem', class: 'text-indigo-700', text: 'forks', label: 'Forks'},
  {name: 'heroicons:eye', size: '1.1rem', class: 'text-indigo-700', text: 'watchers', label: 'Watchers'}
]
</script>

<template>
  <div class="p-8 border-4 my-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
    <a :href="project.url" target="_blank">
      <h2 class="text-2xl text-indigo-800 font-semibold mb-2 hover:underline dark:text-indigo-400">
        {{ project.name }}
      </h2>
    </a>
    <p>{{ project.description }}</p>
    <div class="mt-4">
      <span v-for="icon in icons" :key="icon.name" class="inline-flex items-center gap-1 mr-4">
        <Icon
            :name="icon.name"
            :size="icon.size"
            :class="icon.class"
        />{{ project[icon.text].totalCount }}
      </span>
    </div>
  </div>
</template>