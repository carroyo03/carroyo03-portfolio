<script setup lang="ts">
const blogSlug = useRoute().params.slug
const blogQueryPath = `/blog/${blogSlug}`
const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('blog').order('date', 'DESC').limit(3).all()
})
</script>

<template>
  <h1 class="text-3xl my-8 font-bold">Blog Posts</h1>
  <p class="mb-4">I like to write about various topics, including technology, programming, and personal experiences. Here are some of
    my latest posts:</p>
  <div class="grid md:grid-cols-3 pt-8 gap-10">
    <Post :posts="posts"/>
  </div>
</template>