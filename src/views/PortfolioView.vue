<template>
  <div class="portfolio">
    <section class="portfolio-gallery">
      <div v-for="project in projects" :key="project.slug" class="portfolio-item">
        <RouterLink :to="`/portfolio/${project.slug}`">
          <img class="portfolio-img" :src="project.thumbnailImage" :alt="project.title" />
        </RouterLink>
        <RouterLink class="portfolio-label" :to="`/portfolio/${project.slug}`">
          {{ project.title.toUpperCase() }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import projectsData from '@/data/projects.json'
import { RouterLink } from 'vue-router'

interface ProjectImage {
  src: string
  alt: string
}

interface Project {
  slug: string
  title: string
  description: string[]
  images: ProjectImage[]
  thumbnailImage: string
}

const projects = projectsData as Project[]
</script>
