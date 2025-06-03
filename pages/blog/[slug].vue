
<script setup>
const blogSlug = useRoute().params.slug
const blogQueryPath = `/blog/${blogSlug}`

const { data: post } = await useAsyncData(`blog-${blogSlug}`, () =>
    queryCollection('blog').path(blogQueryPath).first()
)

</script>

<template>
  <article class="prose mt-10 mb-10 dark:prose-invert">
    <ContentRenderer :value="post"/>
  </article>
</template>