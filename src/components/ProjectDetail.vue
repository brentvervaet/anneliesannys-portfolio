<template>
  <div class="project-detail">
    <h1>Annelies Annys</h1>
    <div class="hero-section"></div>
    <section class="project-content">
      <h2 class="project-title">{{ title }}</h2>
      <div class="project-description">
        <p v-for="paragraph in description" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
      <div class="image-grid">
        <img
          v-for="image in images"
          :key="image.src"
          :src="image.src"
          :alt="image.alt"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface ProjectImage {
  src: string
  alt: string
}

interface Props {
  title: string
  description: string[]
  images: ProjectImage[]
}

defineProps<Props>()
</script>

<style scoped>
.hero-section {
  height: 200px;
  background: #f5f5f5;
  margin: 0 50px;
  margin-bottom: 40px;
}

.project-content {
  padding: 0 50px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-title {
  font-family: 'Advent Pro', sans-serif;
  font-size: 48px;
  font-weight: 200;
  margin-bottom: 30px;
  text-align: center;
}

.project-description {
  margin-bottom: 50px;
}

.project-description p {
  font-family: 'Advent Pro', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.image-grid img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .project-content {
    padding: 0 20px;
  }

  .hero-section {
    margin: 0 20px 20px;
    height: 150px;
  }

  .project-title {
    font-size: 36px;
  }

  .project-description p {
    font-size: 20px;
  }

  .image-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
