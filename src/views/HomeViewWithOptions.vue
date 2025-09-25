<template>
  <div
    class="home flex flex-col items-center justify-center min-h-[calc(100vh-140px)] gap-8 overflow-hidden"
  >
    <!-- Option 1: Simple Tailwind Carousel (currently active) -->
    <!-- First carousel row - left to right -->
    <div class="carousel-row">
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

    <!-- Option 2: Advanced Component-Based Carousel (commented out) -->
    <!--
    <CarouselComponent
      :images="carouselImages"
      :speed="60"
      direction="left"
      :pause-on-hover="true"
      :show-controls="false"
      :show-dots="false"
    />

    <CarouselComponent
      :images="carouselImages"
      :speed="45"
      direction="right"
      :pause-on-hover="true"
      :show-controls="false"
      :show-dots="false"
    />
    -->
  </div>
</template>

<script setup lang="ts">
// Uncomment these imports if you want to use the component version
// import CarouselComponent, { type CarouselImage } from '@/components/CarouselComponent.vue'

// Sample data for component version
// const carouselImages: CarouselImage[] = [
//   { src: '/images/collages.png', alt: 'Project collage 1' },
//   { src: '/images/collages.png', alt: 'Project collage 2' },
//   { src: '/images/collages.png', alt: 'Project collage 3' },
//   { src: '/images/collages.png', alt: 'Project collage 4' }
// ]
</script>
