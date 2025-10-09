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
    <section id="portfolio" ref="portfolioSection" class="portfolio-section min-h-screen bg-white">
      <div class="portfolio-container">
        <div class="portfolio-grid">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            class="project-showcase"
            :style="{ animationDelay: `${index * 200}ms` }"
          >
            <RouterLink :to="project.route" class="block project-image-container">
              <img
                :src="project.image"
                :alt="project.title"
                class="project-showcase-image no-radius"
              />
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
/* Grid layout for projects */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 60px 40px; /* row gap, column gap */
  padding: 60px 20px;
}

/* Make project images fit grid */
.project-showcase-image {
  height: 280px;
  width: 100%;
  object-fit: cover;
}

.project-showcase {
  display: flex;
  justify-content: center;
}

.project-image-container {
  width: 100%;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 60px;
    padding: 40px 20px;
  }

  .project-showcase-image {
    height: 240px;
  }
}
</style>
