<template>
  <div
    class="home flex flex-col items-center justify-center min-h-[calc(100vh-140px)] overflow-hidden"
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
  </div>
</template>

<script setup lang="ts"></script>
