<template>
  <div class="project-detail">
    <section class="project-content">
      <h2 class="project-title">{{ title }}</h2>
      <div class="project-description">
        <p v-for="paragraph in description" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
      <div class="image-grid">
        <img v-for="image in images" :key="image.src" :src="image.src" :alt="image.alt" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface ProjectImage {
  src: string
  alt: string
}

interface Props {
  title: string
  description: string[]
  images: ProjectImage[]
}

defineProps<Props>()
</script>
