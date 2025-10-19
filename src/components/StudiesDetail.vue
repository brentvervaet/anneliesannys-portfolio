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
      <!-- Individual studies -->
      <div class="studies-grid">
        <div v-for="study in studies" :key="study.title" class="study-section">
          <h2 class="project-title">{{ study.title }}</h2>
          <p v-if="date" class="project-date">{{ date }}</p>
          <img
            v-if="study.images[1]"
            class="project-headImage"
            :src="getMediumImagePath(study.images[1].src)"
            :alt="study.images[1].alt"
          />
          <div class="project-description">
            <p>{{ study.description }}</p>
          </div>

          <div class="study-images">
            <img
              v-for="image in study.images"
              :key="image.src"
              :src="getMediumImagePath(image.src)"
              :alt="image.alt"
              class="study-image"
            />
          </div>

          <!-- <div
            v-if="credits && typeof credits === 'object' && Object.keys(credits).length > 0"
            class="credits-section"
          >
            <div class="credits-grid">
              <div v-for="(value, key) in credits" :key="key" class="credit-item">
                <span class="credit-label">{{ key }}:</span>
                <span class="credit-value">
                  <template v-if="Array.isArray(value)">
                    {{ sortAlphabetically(value).join(', ') }}
                  </template>
                  <template v-else>
                    {{ value }}
                  </template>
                </span>
              </div>
            </div>
          </div> -->

          <div>Sketch book images coming soon</div>

          <!-- Collages Grid -->
          <div v-if="study.collages && study.collages.length > 0" class="collages-section">
            <div class="collages-grid">
              <img
                v-for="collage in study.collages"
                :key="collage.src"
                :src="getMediumImagePath(collage.src)"
                :alt="collage.alt"
                class="collage-image"
              />
            </div>
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
  date?: string
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
  /* TODO:aanpassen voor safari etc*/
  height: 100svh;
  width: 100%;
  overflow: hidden;
}

.fullscreen-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.studies-content {
  position: relative;
  padding: 2rem;
  max-width: 1400px;
}

.project-title {
  font-size: 2rem;
  font-weight: 200;
  text-align: center;
}

.project-date {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #999;
  text-align: center;
  font-weight: 300;
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

.project-description {
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  margin: 1.5rem auto;
}

.study-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.study-image {
  width: 250px;
  height: auto;
  object-fit: cover;
}

/* ===== COLLAGES SECTION ===== */
.collages-section {
  margin: 1.5rem 0;
}

.collages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

/* TODO: geen aspectratio 1? */
.collage-image {
  aspect-ratio: 1;
  object-fit: contain;
}

/* ===== MEDIA QUERIES ===== */
@media (max-width: 1024px) {
}

@media (max-width: 768px) {
}

@media (max-width: 480px) {
}
</style>
