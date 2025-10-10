<template>
  <div class="project-detail">
    <!-- Hero video section -->
    <div class="video-hero" v-if="video">
      <video autoplay muted loop playsinline class="fullscreen-video">
        <source :src="video" :type="videoType" />
        Your browser does not support the video tag.
      </video>
    </div>

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
import { computed } from 'vue'

interface ProjectImage {
  src: string
  alt: string
}

interface Props {
  title: string
  description: string[]
  images: ProjectImage[]
  video?: string
}

const props = defineProps<Props>()

// Compute the appropriate MIME type based on the video file extension
const videoType = computed(() => {
  if (!props.video) return ''

  const extension = props.video.split('.').pop()?.toLowerCase()

  switch (extension) {
    case 'webm':
      return 'video/webm'
    case 'mp4':
      return 'video/mp4'
    case 'ogg':
      return 'video/ogg'
    default:
      return 'video/mp4' // Default fallback
  }
})
</script>

<style scoped>
.project-detail {
  position: relative;
  width: 100%;
}

.video-hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  margin-top: -140px; /* Compensate for the main element's padding-top */
}

.fullscreen-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1; /* Ensure video is behind the header */
}

.project-content {
  position: relative;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.project-description {
  margin-bottom: 2rem;
}

.project-description p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.image-grid img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
