<template>
  <div class="project-detail">
    <!-- Hero video section -->
    <div class="video-hero" v-if="video">
      <video ref="videoElement" autoplay :muted="isMuted" loop playsinline class="fullscreen-video">
        <source :src="video" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <!-- Mute button -->
      <button
        @click="toggleMute"
        class="mute-button"
        :aria-label="isMuted ? 'Unmute video' : 'Mute video'"
      >
        <!-- Mute icon (when video is muted) -->
        <svg
          v-if="isMuted"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z"
            fill="currentColor"
          />
        </svg>

        <!-- Unmute icon (when video has sound) -->
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>

    <section ref="projectContent" class="project-content">
      <div class="project-head">
        <h2 class="project-title">{{ title }}</h2>
        <p v-if="date" class="project-date">{{ date }}</p>
        <!-- TODO: -->
        <img
          v-if="images[0]"
          class="project-headImage"
          :src="getMediumImagePath(images[0].src)"
          :alt="images[0].alt"
        />
        <div class="project-description">
          <p v-for="paragraph in description" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="image-grid">
        <img
          v-for="image in bottomImageGrid"
          :key="image.src"
          :src="getMediumImagePath(image.src)"
          :alt="image.alt"
        />
      </div>

      <!-- Credits Section -->
      <div
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
      </div>

      <div>Schetsbook images coming soon</div>

      <!-- Collages Grid -->
      <div v-if="collages && collages.length > 0" class="collages-section">
        <div class="collages-grid">
          <img
            v-for="collage in collages"
            :key="collage.src"
            :src="getMediumImagePath(collage.src)"
            :alt="collage.alt"
            class="collage-image"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { ProjectImage } from '@/types/project'
import { computed, ref } from 'vue'

interface Props {
  title: string
  description: string[]
  images: ProjectImage[]
  video?: string
  date?: string
  collages?: ProjectImage[]
  credits?: string | Record<string, string | string[]>
}

const props = defineProps<Props>()

// Reactive data for mute functionality
const isMuted = ref(true) // Start music by default
const videoElement = ref<HTMLVideoElement | null>(null)
const projectContent = ref<HTMLElement | null>(null)

// Computed property to limit images to first 5
const bottomImageGrid = computed(() => props.images.slice(1, 7))

// Convert image path to use medium-sized version
const getMediumImagePath = (originalPath: string): string => {
  // Split the path and insert 'med' before the filename
  // e.g., "/images/BA3/lbm01.webp" -> "/images/BA3/med/lbm01.webp"
  const pathParts = originalPath.split('/')
  const filename = pathParts.pop()
  return [...pathParts, 'med', filename].join('/')
}

// Sort array alphabetically (case-insensitive)
const sortAlphabetically = (arr: string[]): string[] => {
  return [...arr].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

// Toggle mute state
const toggleMute = (): void => {
  isMuted.value = !isMuted.value
  if (videoElement.value) {
    videoElement.value.muted = isMuted.value
  }
}
</script>

<style scoped>
.project-detail {
  position: relative;
  width: 100%;
}

/* ===== VIDEO ===== */
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
  z-index: 1; /* Ensure video is behind the header */
}

/* ===== MUTE BUTTON ===== */
.mute-button {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
  background: transparent;
  border: none;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.mute-button:hover {
  background: rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

/* ===== PROJECT CONTENT ===== */
.project-content {
  position: relative;
  padding: 2rem;
  max-width: 1400px;
}

.project-head {
  min-height: 100lvh;
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

.project-head img {
  display: block;
  margin: 1.5rem auto;
}

.project-description {
  text-align: center;
  font-size: 1rem;
  font-weight: 300;
  margin: 1.5rem auto;
}

.project-description p {
  font-size: 1.2rem;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;
}

.image-grid img {
  width: 250px;
  height: auto;
  object-fit: cover;
}

/* ===== CREDITS SECTION ===== */
.credits-section {
  margin: 1.5rem 0;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.05);
}

.credits-title {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  text-align: center;
}

.credits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.credit-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credit-label {
  font-weight: 500;
  font-size: 0.9rem;
  color: #666;
  text-transform: capitalize;
}

.credit-value {
  font-weight: 300;
  font-size: 1rem;
  color: #333;
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
