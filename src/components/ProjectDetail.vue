<template>
  <div class="project-detail">
    <!-- Hero video section -->
    <div class="video-hero" v-if="video">
      <div class="scroll-indicator" @click="scrollToContent">
        <div class="scroll-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
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
        <div class="project-description">
          <p v-for="paragraph in description" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="image-grid">
        <img
          v-for="image in limitedImages"
          :key="image.src"
          :src="getMediumImagePath(image.src)"
          :alt="image.alt"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface ProjectImage {
  src: string
  alt: string
}

interface Props {
  title: string
  description: string[]
  images: ProjectImage[]
  video?: string
  date?: string
}

const props = defineProps<Props>()

// Reactive data for mute functionality
const isMuted = ref(false) // Start music by default
const videoElement = ref<HTMLVideoElement | null>(null)
const projectContent = ref<HTMLElement | null>(null)

// Computed property to limit images to first 5
const limitedImages = computed(() => props.images.slice(0, 6))

// Convert image path to use medium-sized version
const getMediumImagePath = (originalPath: string): string => {
  // Split the path and insert 'med' before the filename
  // e.g., "/images/BA3/lbm01.webp" -> "/images/BA3/med/lbm01.webp"
  const pathParts = originalPath.split('/')
  const filename = pathParts.pop()
  return [...pathParts, 'med', filename].join('/')
}

// Toggle mute state
const toggleMute = (): void => {
  isMuted.value = !isMuted.value
  if (videoElement.value) {
    videoElement.value.muted = isMuted.value
  }
}

// Smooth scroll to project content section
const scrollToContent = (): void => {
  if (projectContent.value) {
    projectContent.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
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
  margin: 0 auto;
}

.project-head {
  height: 100lvh;
}

.project-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
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

.project-description {
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #666;
  /* margin-bottom: 1rem; */
}

.project-description p {
  font-size: 1.2rem;
  /* margin-bottom: 1rem; */
  /* font-weight: 400; */
  /* line-height: 1.6; */
  /* text-align: justify; */
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.image-grid img {
  width: 250px;
  height: auto;
  object-fit: cover;
}
</style>
