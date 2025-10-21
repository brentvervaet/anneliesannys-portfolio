<template>
  <!-- Preload LCP image -->
  <link rel="preload" as="image" href="/images/collages.webp" fetchpriority="high" />
  <div class="home">
    <!-- Hero Section with Carousel -->
    <section
      ref="heroSection"
      class="hero-carousel overflow-hidden"
      :style="{
        opacity: heroOpacity,
        transform: `translateY(${(1 - heroOpacity) * -50}px)`,
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
      }"
    >
      <!-- First carousel row - left to right -->
      <div class="carousel-row">
        <div class="carousel-track animate-scroll-left">
          <img
            v-for="n in 8"
            :key="`row1-${n}`"
            :src="carouselImage"
            alt="Project collage"
            class="carousel-image"
            fetchpriority="high"
          />
        </div>
      </div>

      <!-- Second carousel row - right to left -->
      <div class="carousel-row">
        <div class="carousel-track animate-scroll-right">
          <img
            v-for="n in 8"
            :key="`row2-${n}`"
            :src="carouselImage"
            alt="Project collage"
            class="carousel-image"
            fetchpriority="high"
          />
        </div>
      </div>

      <!-- Scroll indicator arrow -->
      <div class="scroll-indicator" @click="scrollToPortfolio">
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
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" ref="portfolioSection" class="portfolio-section">
      <!-- <div class="portfolio-container"> -->
      <div class="portfolio-grid">
        <template v-for="(project, index) in projects" :key="project.id">
          <!-- Empty cell for zigzag pattern (even rows in 2-column layout) -->
          <div v-if="index % 2 === 1" class="project-spacer"></div>

          <div class="project-card" :style="{ animationDelay: `${index * 150}ms` }">
            <RouterLink :to="project.route" class="project-link">
              <div class="project-image-wrapper">
                <img :src="project.image" :alt="project.title" class="project-image" />
                <div class="project-overlay">
                  <span class="view-text">view</span>
                </div>
              </div>
              <p class="project-title">{{ project.title }}</p>
            </RouterLink>
          </div>

          <!-- Empty cell for zigzag pattern (odd rows in 2-column layout) -->
          <div v-if="index % 2 === 0" class="project-spacer"></div>
        </template>
      </div>
      <!-- </div> -->
    </section>
  </div>
</template>

<script setup lang="ts">
import projectsData from '@/data/projects.json'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const heroSection = ref<HTMLElement>()
const portfolioSection = ref<HTMLElement>()
const heroOpacity = ref(1)
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)

// Computed property for responsive carousel image
const carouselImage = computed(() => {
  return windowWidth.value < 768 ? '/images/collagesSm.webp' : '/images/collages.webp'
})

// Helper functions to get responsive image paths
const getMediumImage = (imagePath: string): string => {
  const parts = imagePath.split('/')
  const fileName = parts.pop()
  return [...parts, 'med', fileName].join('/')
}

const getSmallImage = (imagePath: string): string => {
  const parts = imagePath.split('/')
  const fileName = parts.pop()
  return [...parts, 'sm', fileName].join('/')
}

// Get responsive image based on window width
const getResponsiveImage = (imagePath: string): string => {
  if (windowWidth.value < 768) {
    return getSmallImage(imagePath)
  }
  return getMediumImage(imagePath)
}

// Transform projects data from JSON to match the format needed for the view
const projects = computed(() => {
  return projectsData.map((project, index) => ({
    id: index + 1,
    title: project.title.toUpperCase(),
    route: `/${project.slug}`,
    image: getResponsiveImage(project.thumbnailImage),
    description: Array.isArray(project.description) ? project.description[0] : project.description,
  }))
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight

  // Start fading when we're 70% through the hero section
  const fadeStart = viewportHeight * 0.7
  // Complete fade when we reach the end of hero section
  const fadeEnd = viewportHeight

  if (scrollY <= fadeStart) {
    heroOpacity.value = 1
  } else if (scrollY >= fadeEnd) {
    heroOpacity.value = 0
  } else {
    const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart)
    // Use easing function for smoother transition
    const easeOutQuart = 1 - Math.pow(1 - progress, 4)
    heroOpacity.value = 1 - easeOutQuart
  }
}

// Smooth scroll to portfolio section
const scrollToPortfolio = () => {
  const portfolioElement = portfolioSection.value
  if (portfolioElement) {
    portfolioElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

// Auto-scroll snap functionality
let isScrolling = false
let scrollTimer: number | null = null

const handleScrollSnap = () => {
  if (isScrolling) return

  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight
  const snapThreshold = viewportHeight * 0.4 // 40% of viewport height

  // Clear existing timer
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  // Set a timer to trigger snap after scrolling stops
  scrollTimer = setTimeout(() => {
    if (scrollY > snapThreshold && scrollY < viewportHeight * 0.8) {
      isScrolling = true
      scrollToPortfolio()
      setTimeout(() => {
        isScrolling = false
      }, 1000) // Reset after animation completes
    }
  }, 150) // Wait 150ms after scroll stops
}

// Combined scroll handler
const handleAllScrollEvents = () => {
  handleScroll()
  handleScrollSnap()
}

// Handle window resize
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('scroll', handleAllScrollEvents)
  window.addEventListener('resize', handleResize)
  handleScroll() // Initial calculation
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleAllScrollEvents)
  window.removeEventListener('resize', handleResize)
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
})
</script>

<style scoped>
/* ===== HOME PAGE STYLES ===== */
.home {
  position: relative;
}

/* ===== HERO SECTION STYLES ===== */
.hero-carousel {
  height: 100svh;
  background: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ===== CAROUSEL STYLES ===== */
.carousel-row {
  width: 100vw;
}

.carousel-row:first-child {
  margin-bottom: 1rem;
}

.carousel-track {
  display: flex;
  width: fit-content;
}

.carousel-image {
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
  min-width: 300px;
}

.animate-scroll-left {
  animation: scroll-left 90s linear infinite;
}

.animate-scroll-right {
  animation: scroll-right 75s linear infinite;
}

/* ===== PORTFOLIO SECTION STYLES ===== */
.portfolio-section {
  min-height: 100lvh;
  padding: 3rem;
  position: relative;
  z-index: 2;
  border-top: 1px solid black;
  align-content: center;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5rem 2rem;
}

/* ===== PROJECT CARD STYLES ===== */
.project-card {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  transition: transform 0.4s ease;
}

.project-image-wrapper {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  max-width: 300px;
  margin: 0 auto;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    transform 0.6s ease,
    filter 0.3s ease;
}

.project-title {
  font-size: 0.7rem;
  margin-top: 0.5rem;
  font-weight: 300;
  text-align: center;
}

.project-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.view-text {
  color: white;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

/* ===== MEDIA QUERIES ===== */

@media (min-width: 320px) {
  .hero-carousel {
    margin-bottom: 10rem;
  }
}

/* tablet */
@media (min-width: 768px) {
  .carousel-image {
    height: 300px;
    /* min-width: 350px; */
  }

  .portfolio-section {
    padding: 4rem;
  }

  .portfolio-grid {
    gap: 24rem 3rem;
  }

  .project-image-wrapper {
    max-width: 400px;
  }

  .project-title {
    font-size: 1rem;
    margin-top: 1rem;
  }
}

/* desktop */
@media (min-width: 1024px) {
  .carousel-image {
    height: 250px;
    min-width: 400px;
  }

  .carousel-row:first-child {
    margin-bottom: 1.5rem;
  }

  .portfolio-grid {
    gap: 4rem 4rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .project-image-wrapper {
    /* size images */
    max-width: 400px;
  }

  .project-title {
    font-size: 1rem;
    margin-top: 1rem;
  }

  /* only hover effect on desktop */
  .project-card:hover .project-image {
    transform: scale(1.05);
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }
}

/* ===== KEYFRAMES/ANIMATIONS ===== */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(0);
  }
}

/* TODO */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
