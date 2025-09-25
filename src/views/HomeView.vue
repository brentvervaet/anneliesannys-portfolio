<template>
  <div class="home">
    <h1>Annelies Annys</h1>

    <div class="slideshow">
      <div class="slideshow-container">
        <img src="/images/collages.png" alt="Project collage" class="main-image" />
        <img src="/images/collages.png" alt="Project 1" class="main-image" />
        <img src="/images/collages.png" alt="Project collage" class="main-image" />
        <img src="/images/collages.png" alt="Project 1" class="main-image" />
      </div>

      <div class="slideshow-container2">
        <img src="/images/collages.png" alt="Project collage" class="main-image2" />
        <img src="/images/collages.png" alt="Project 1" class="main-image2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.slideshow {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
}

.slideshow-container {
  display: flex;
  overflow: hidden;
  animation: scroll1 120s linear infinite;
  width: 400%;
}

.slideshow-container2 {
  overflow: hidden;
  display: flex;
  animation: scroll2 100s linear infinite reverse;
  width: 400%;
}

.main-image,
.main-image2 {
  flex-shrink: 0;
  width: 100%;
  height: auto;
  display: block;
}

@keyframes scroll1 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scroll2 {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
