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
import type { Project } from '@/types/project'
import { RouterLink } from 'vue-router'

const projects = projectsData as Project[]
</script>
