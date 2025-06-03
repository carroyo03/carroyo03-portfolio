<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: 'Callout'
  },
  description: {
    type: String,
    default: 'This is a callout component.'
  }
})
</script>

<template>
  <UAlert
      color="neutral"
      variant="solid"
      :title="props.title"
      :description="props.description"
      icon="i-lucide-info"
  />
</template>
