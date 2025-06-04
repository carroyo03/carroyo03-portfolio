
<script setup lang="ts">
const blogSlug = useRoute().params.slug
const blogQueryPath = `/blog/${blogSlug}`
const { data: posts } = await useAsyncData('posts', () => {
  return queryCollection('blog').order('date', 'DESC').limit(3).all()
})

// Query para obtener solo los 3 últimos proyectos
const query = gql `
{
  viewer {
    repositories(first: 3, orderBy: {field: CREATED_AT, direction: DESC}) {
      totalCount
      nodes {
        id
        name
        createdAt
        description
        url
        forks {
          totalCount
        }
        watchers {
          totalCount
        }
        stargazers {
          totalCount
        }
      }
    }
  }
}`
const { data: projects, error, pending } = await useGitHubProjects(3)
</script>

<template>
  <section>
    <h1 class ="text-5xl font-bold mt-20">Hi, I am Carlos G. Arroyo Lorenzo</h1>
    <p class="text-xl mt-5">I am a Computer Scientist, passionate about AI, Software Development and Cloud</p>
  </section>
  <section class = "flex flex-col md:flex-row">
    <section class="my-8">
      <h2 class="text-2xl font-bold mb-4">About Me</h2>
      <div class="text-gray-300">
        <p><strong>Experience:</strong> Software DataOps Engineering Intern at KPMG Tax & Legal Technology (10 months), building pension simulation web apps (Reflex), cloud automation (Azure Functions), and data pipelines (Blue Prism, Alteryx).</p>
        <p><strong>Key Projects:</strong> <a href="https://github.com/carroyo03/AnomalyDetect" class="text-blue-400 underline">AnomalyDetect</a> (AIOps with PyTorch, Flask, Docker, PySpark, Databricks), A* pathfinding (Python), Spotify recommender (C++).</p>
        <p><strong>Leadership:</strong> Elected class representative for 4 years, honed Agile skills at KPMG.</p>
        <p><strong>Learning:</strong> Pursuing AWS Developer Associate and Master in Big Data, Data Science and AI.</p>
        <p><strong>Hobbies:</strong> Singing, chess, reading, traveling.</p>
      </div>
    </section>
    <div class="w-1/2 md:max-w-sm p-8 mx-auto">
      <img src="/assets/images/carlos.jpg" alt="Carlos G. Arroyo Lorenzo" class="rounded-lg shadow-xl/30"/>
    </div>

  </section>
  <section>
    <h2 class="text-3xl font-bold mt-8">Latest Blog Posts</h2>
    <div class="grid md:grid-cols-3 pt-8 gap-10">
      <Post :posts="posts"/>
    </div>
  </section>
  <section>
    <h2 class="text-3xl font-bold mt-8">Latest Projects</h2>
    <div v-if="pending" class="text-lg mt-5">
      Loading projects...
    </div>
    <div v-else-if="error" class="text-red-500">
      Error loading projects: {{ error.message }}
    </div>
    <div v-else class="grid md:grid-cols-3 pt-8 gap-10">
      <ListProjects :data="projects" />
    </div>
  </section>
</template>