<template>
  <div class="studies-detail">
    <!-- Hero video section -->
    <div class="video-hero" v-if="video">
      <video autoplay muted loop playsinline class="fullscreen-video">
        <source :src="video" type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>

    <section class="studies-content">
      <h2 class="studies-title">{{ title }}</h2>
      <div class="studies-description">
        <p v-for="paragraph in description" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>

      <!-- Individual studies -->
      <div class="studies-grid">
        <div v-for="study in studies" :key="study.title" class="study-section">
          <h3 class="study-title">{{ study.title }}</h3>
          <p class="study-description">{{ study.description }}</p>

          <div class="study-images">
            <img
              v-for="image in study.images"
              :key="image.src"
              :src="getMediumImagePath(image.src)"
              :alt="image.alt"
              class="study-image"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Study } from '@/types/project'

interface Props {
  title: string
  description: string[]
  studies: Study[]
  video?: string
}

const props = defineProps<Props>()

// Convert image path to use medium-sized version
const getMediumImagePath = (originalPath: string): string => {
  // Split the path and insert 'med' before the filename
  // e.g., "/images/BA1/studies101.webp" -> "/images/BA1/med/studies101.webp"
  const pathParts = originalPath.split('/')
  const filename = pathParts.pop()
  return [...pathParts, 'med', filename].join('/')
}
</script>

<style scoped>
.studies-detail {
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

.studies-content {
  position: relative;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.studies-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.studies-description {
  margin-bottom: 3rem;
  text-align: center;
}

.studies-description p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.studies-grid {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.study-section {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 3rem;
}

.study-section:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.study-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.study-description {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #666;
}

.study-images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.study-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.3s ease;
}

.study-image:hover {
  transform: scale(1.02);
}

/* Responsive design */
@media (max-width: 768px) {
  .studies-content {
    padding: 1rem;
  }

  .studies-title {
    font-size: 2rem;
  }

  .study-title {
    font-size: 1.5rem;
  }

  .study-images {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .studies-grid {
    gap: 2rem;
  }

  .study-section {
    padding-bottom: 2rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .study-images {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1025px) {
  .study-images {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}
</style>
