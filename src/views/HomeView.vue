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
            src="/images/collages.png"
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
            src="/images/collages.png"
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
        <div class="portfolio-single-column">
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
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

const heroSection = ref<HTMLElement>()
const portfolioSection = ref<HTMLElement>()
const heroOpacity = ref(1)

const projects = [
  {
    id: 1,
    title: 'LOST BEFORE MORNING',
    route: '/portfolio/lost-before-morning',
    image: 'https://placehold.co/500x400',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  },
  {
    id: 2,
    title: 'SPLIT MYSELF IN TWO',
    route: '/portfolio/split-myself-in-two',
    image: '/images/Project01/collectie-samen.jpg',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  },
  {
    id: 3,
    title: 'STUDIE VAN DE JURK',
    route: '/portfolio/studie-van-de-jurk',
    image: '/images/Project02/studie-van-de-jurk-6.jpg',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  },
  {
    id: 4,
    title: 'JEANS',
    route: '/portfolio/jeans',
    image: 'https://placehold.co/500x400',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit.',
  },
  {
    id: 5,
    title: 'STUDIES',
    route: '/portfolio/studies',
    image: 'https://placehold.co/500x400',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et.',
  },
  {
    id: 6,
    title: 'PAPERSTUDIE',
    route: '/portfolio/papierstudie',
    image: 'https://placehold.co/500x400',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint.',
  },
]

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
/* Remove border radius from images in this view */
.no-radius {
  border-radius: 0 !important;
}

/* Make project images smaller */
.project-showcase-image {
  height: 260px; /* was 350px */
  max-width: 420px; /* constrain width a bit */
  margin: 0 auto; /* center inside container */
}

/* Increase spacing between images */
.portfolio-single-column {
  display: flex;
  flex-direction: column;
  gap: 120px; /* increased vertical spacing */
}

/* Ensure each showcase has no extra internal spacing now that content removed */
.project-showcase {
  justify-content: center;
}

@media (max-width: 768px) {
  .project-showcase-image {
    height: 220px;
    max-width: 100%;
  }
  .portfolio-single-column {
    gap: 80px;
  }
}
</style>
