
<script setup lang="ts">
const { data, error, pending } = await useGitHubProjects(8)
</script>

<template>
  <div class="projects">
    <h1 class="text-3xl my-8">Projects</h1>
    <p class="text-lg mb-8">Here are some of my projects on GitHub</p>
    <div v-if="pending" class="text-lg mt-5">
      Loading projects...
    </div>
    <div v-else-if="error" class="text-red-500">
      Error loading projects: {{ error.message }}
    </div>
    <section v-else class="grid grid-cols-2 gap-10">
      <ProjectCard
          v-for="project in data?.nodes"
          :key="project.id"
          :project="project"
      />
    </section>
  </div>
</template>