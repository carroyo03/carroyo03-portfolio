
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
const { data: projects } = await useGitHubProjects(3)
</script>

<template>
  <section>
    <h1 class ="text-5xl font-bold mt-20">Hi, I am Carlos G. Arroyo Lorenzo</h1>
    <p class="text-xl mt-5">I am a Computer Scientist, passionate about AI, Software Development and Cloud</p>
  </section>
  <section class = "flex flex-col md:flex-row">
    <div class="md:w-4/5">
      <h2 class="text-3xl font-bold mt-10">About me</h2>
      <p class="text-xl mt-5">Computer Scientist from CUNEF, passionate about AI, DevOps and Big Data, with a focus on building scalable, impactful solutions. As a Software DataOps Engineering Intern at KPMG Tax & Legal Technology for 10 months, I developed real-world tools, including pension simulation web apps with Python (Reflex), cloud automation via Azure Functions, and data pipelines using Blue Prism and Alteryx—enhancing efficiency for banking and tax clients.</p>
      <p class="text-xl mt-5">My portfolio showcases projects like <strong>AnomalyDetect</strong>, an AIOps service for anomaly detection using PyTorch, Flask, Docker, and PySpark on Databricks, reflecting my expertise in AI-driven IT operations and Cloud deployments.</p>
      <p class="text-xl mt-5">Proficient in Python, Java, C++, SQL, Docker, and PySpark (learning right now), I thrive on creative problem-solving, as seen in past works like an A* pathfinding algorithm and a C++ Spotify recommender.</p>
      <p class="text-xl mt-5">A four-year elected class representative, I bring strong leadership and teamwork skills, honed through Agile practices at KPMG. Currently advancing my Cloud expertise with the AWS Developer Associate course, I'm always eager to learn and innovate. Beyond tech, I enjoy singing, chess, reading, and traveling.</p>
    </div>
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
    <div class="grid md:grid-cols-3 pt-8 gap-10">
      <ListProjects :data="projects" />
    </div>
  </section>
</template>