<template>
  <div class="home">
    <!-- Hero Section with Carousel -->
    <section
      ref="heroSection"
      class="hero-carousel flex flex-col items-center justify-center min-h-screen overflow-hidden"
      :style="{ opacity: heroOpacity }"
    >
      <!-- First carousel row - left to right -->
      <div class="carousel-row mb-8">
        <div class="carousel-track animate-scroll-left">
          <img
            v-for="n in 8"
            :key="`row1-${n}`"
            src="/images/collages.webp"
            alt="Project collage"
            class="carousel-image"
          />
        </div>
      </div>

      <!-- Second carousel row - right to left -->
      <div class="carousel-row">
        <div class="carousel-track animate-scroll-right">
          <img
            v-for="n in 8"
            :key="`row2-${n}`"
            src="/images/collages.webp"
            alt="Project collage"
            class="carousel-image"
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
      <div class="portfolio-container">
        <div class="portfolio-grid">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            class="project-card"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <RouterLink :to="project.route" class="project-link">
              <div class="project-image-wrapper">
                <img :src="project.image" :alt="project.title" class="project-image" />
                <div class="project-overlay">
                  <span class="view-text">view</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
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

// Transform projects data from JSON to match the format needed for the view
const projects = computed(() => {
  return projectsData.map((project, index) => ({
    id: index + 1,
    title: project.title.toUpperCase(),
    route: `/portfolio/${project.slug}`,
    image: project.thumbnailImage,
    description: Array.isArray(project.description) ? project.description[0] : project.description,
  }))
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight

  // Start fading when we're 60% through the viewport height
  const fadeStart = viewportHeight * 0.6
  // Complete fade when we reach 90% of viewport height
  const fadeEnd = viewportHeight * 0.9

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
  const snapThreshold = viewportHeight * 0.3 // 30% of viewport height

  // Clear existing timer
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }

  // Set a timer to trigger snap after scrolling stops
  scrollTimer = setTimeout(() => {
    if (scrollY > snapThreshold && scrollY < viewportHeight) {
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

onMounted(() => {
  window.addEventListener('scroll', handleAllScrollEvents)
  handleScroll() // Initial calculation
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleAllScrollEvents)
  if (scrollTimer) {
    clearTimeout(scrollTimer)
  }
})
</script>

<style scoped>
/* Portfolio Section Styles */
.portfolio-section {
  min-height: 100vh;
  background: white;
  padding: 100px 0;
  margin-top: 100vh;
}

.portfolio-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 60px;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 200px 120px;
  align-items: start;
  padding: 120px 0;
}

.project-card {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
  transition: transform 0.4s ease;
}
/* TODO */
/* Creative scattered positioning */
.project-card:nth-child(1) {
  transform: translateX(0px) translateY(0px);
}

.project-card:nth-child(2) {
  transform: translateX(0px) translateY(0px);
}

.project-card:nth-child(3) {
  transform: translateX(0px) translateY(0px);
}

/* TODO */
/*
.project-card:nth-child(4) {
  transform: translateX(-90px) translateY(60px);
}

.project-card:nth-child(5) {
  transform: translateX(100px) translateY(-80px);
}

.project-card:nth-child(6) {
  transform: translateX(-50px) translateY(100px);
}

.project-card:nth-child(7) {
  transform: translateX(70px) translateY(-120px);
}

.project-card:nth-child(8) {
  transform: translateX(-80px) translateY(40px);
}

.project-card:nth-child(9) {
  transform: translateX(90px) translateY(-60px);
} */

.project-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.project-image-wrapper {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 24px;
  border-radius: 2px;
  max-width: 280px;
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

.project-card:hover .project-image {
  transform: scale(1.05);
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

.project-card:hover .project-overlay {
  opacity: 1;
}

.view-text {
  color: white;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-family: 'Helvetica Neue', sans-serif;
}

/* Animations */
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

/* Responsive - Mobile styles will be added later */
@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .portfolio-container {
    padding: 0 20px;
  }

  .portfolio-title {
    font-size: 2.5rem;
  }
}
</style>
