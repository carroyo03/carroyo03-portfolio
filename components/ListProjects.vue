
<script setup lang="ts">
const props = defineProps(['data'])
</script>

<template>
  <ProjectCard
      v-for="project in props.data?.viewer.repositories.nodes"
      :key="project.id"
      :project="project"
  />
</template>