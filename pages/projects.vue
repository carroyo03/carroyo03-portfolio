
<script setup lang="ts">
const { data } = await useGitHubProjects(8)
</script>

<template>
  <div class="projects">
    <h1 class="text-3xl my-8">Projects</h1>
    <p class="text-lg mb-8">Here are some of my projects on GitHub</p>
    <section class="grid grid-cols-2 gap-10">
      <ProjectCard
          v-for="project in data?.viewer.repositories.nodes"
          :key="project.id"
          :project="project"
      />
    </section>
  </div>
</template>