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
    </section>

    <!-- Portfolio Section -->
    <section id="portfolio" ref="portfolioSection" class="portfolio-section min-h-screen bg-white">
      <div class="portfolio-container">
        <h2 class="portfolio-title">Portfolio</h2>
        <div class="portfolio-grid">
          <div
            v-for="(project, index) in projects"
            :key="project.id"
            class="portfolio-item-card"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <RouterLink :to="project.route" class="portfolio-link">
              <div class="portfolio-image-container">
                <img :src="project.image" :alt="project.title" class="portfolio-image" />
              </div>
              <h3 class="portfolio-item-title">{{ project.title }}</h3>
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
  },
  {
    id: 2,
    title: 'SPLIT MYSELF IN TWO',
    route: '/portfolio/split-myself-in-two',
    image: '/images/Project01/collectie-samen.jpg',
  },
  {
    id: 3,
    title: 'STUDIE VAN DE JURK',
    route: '/portfolio/studie-van-de-jurk',
    image: '/images/Project02/studie-van-de-jurk-6.jpg',
  },
  {
    id: 4,
    title: 'JEANS',
    route: '/portfolio/jeans',
    image: 'https://placehold.co/500x400',
  },
  {
    id: 5,
    title: 'STUDIES',
    route: '/portfolio/studies',
    image: 'https://placehold.co/500x400',
  },
  {
    id: 6,
    title: 'PAPERSTUDIE',
    route: '/portfolio/papierstudie',
    image: 'https://placehold.co/500x400',
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial calculation
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
