<template>
  <div class="portfolio-overview">
    <h1 class="page-title">Portfolio</h1>
    <section class="portfolio-gallery">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="portfolio-item"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <RouterLink :to="project.route" class="portfolio-item-link">
          <div class="portfolio-img-container">
            <img :src="project.image" :alt="project.title" class="portfolio-img" />
            <div class="portfolio-overlay">
              <span class="view-project">View Project</span>
            </div>
          </div>
          <h3 class="portfolio-label">{{ project.title }}</h3>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const projects = [
  {
    id: 1,
    title: 'LOST BEFORE MORNING',
    route: '/portfolio/lost-before-morning',
    image: 'https://placehold.co/500x400',
  },
  {
    id: 2,
    title: 'SPLIT MYSELF IN TWO',
    route: '/portfolio/split-myself-in-two',
    image: '/images/Project01/collectie-samen.jpg',
  },
  {
    id: 3,
    title: 'STUDIE VAN DE JURK',
    route: '/portfolio/studie-van-de-jurk',
    image: '/images/Project02/studie-van-de-jurk-6.jpg',
  },
  {
    id: 4,
    title: 'JEANS',
    route: '/portfolio/jeans',
    image: 'https://placehold.co/500x400',
  },
  {
    id: 5,
    title: 'STUDIES',
    route: '/portfolio/studies',
    image: 'https://placehold.co/500x400',
  },
  {
    id: 6,
    title: 'PAPERSTUDIE',
    route: '/portfolio/papierstudie',
    image: 'https://placehold.co/500x400',
  },
]
</script>
