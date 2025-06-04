
<script setup lang="ts">
const props = defineProps(['data'])
</script>

<template>
  <ProjectCard
      v-for="project in props.data?.nodes"
      :key="project.id"
      :project="project"
  />
</template>