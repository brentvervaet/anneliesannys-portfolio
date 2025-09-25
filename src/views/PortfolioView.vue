<template>
  <div class="portfolio">
    <section>
      <h1>Annelies Annys</h1>
    </section>

    <section class="portfolio-gallery">
      <div class="portfolio-item">
        <RouterLink to="/portfolio/lost-before-morning">
          <img class="portfolio-img" src="https://placehold.co/500x400" alt="Project 1" />
        </RouterLink>
        <RouterLink class="portfolio-label" to="/portfolio/lost-before-morning">
          LOST BEFORE MORNING
        </RouterLink>
      </div>

      <div class="portfolio-item">
        <RouterLink to="/portfolio/split-myself-in-two">
          <img class="portfolio-img" src="/images/Project01/collectie-samen.jpg" alt="Project 2" />
        </RouterLink>
        <RouterLink class="portfolio-label" to="/portfolio/split-myself-in-two">
          SPLIT MYSELF IN TWO
        </RouterLink>
      </div>

      <div class="portfolio-item">
        <RouterLink to="/portfolio/studie-van-de-jurk">
          <img class="portfolio-img" src="/images/Project02/studie-van-de-jurk-6.jpg" alt="Project 3" />
        </RouterLink>
        <RouterLink class="portfolio-label" to="/portfolio/studie-van-de-jurk">
          STUDIE VAN DE JURK
        </RouterLink>
      </div>

      <div class="portfolio-item">
        <RouterLink to="/portfolio/jeans">
          <img class="portfolio-img" src="https://placehold.co/500x400" alt="Project 4" />
        </RouterLink>
        <RouterLink class="portfolio-label" to="/portfolio/jeans">JEANS</RouterLink>
      </div>

      <div class="portfolio-item">
        <RouterLink to="/portfolio/studies">
          <img class="portfolio-img" src="https://placehold.co/500x400" alt="Project 5" />
        </RouterLink>
        <RouterLink class="portfolio-label" to="/portfolio/studies">STUDIES</RouterLink>
      </div>

      <div class="portfolio-item">
        <RouterLink to="/portfolio/papierstudie">
          <img class="portfolio-img" src="https://placehold.co/500x400" alt="Project 6" />
        </RouterLink>
        <RouterLink class="portfolio-label" to="/portfolio/papierstudie">PAPERSTUDIE</RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.portfolio-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: min(75px, 6vw);
  padding: 60px 54px 0 54px;
  max-width: 1200px;
  margin: 0 auto;
}

.portfolio-img {
  width: 100%;
  height: auto;
  background: #d9d9d9;
  border-radius: 10px;
  object-fit: cover;
  display: block;
}

.portfolio-label {
  color: black;
  font-size: 32px;
  font-family: 'Advent Pro', sans-serif;
  font-weight: 200;
  letter-spacing: 0.48px;
  text-decoration: none;
  margin: 0;
  display: block;
  text-align: center;
}

.portfolio-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Responsive: 1 column on small screens */
@media (max-width: 1200px) {
  .portfolio-gallery {
    grid-template-columns: 1fr;
    padding: 20px 8px;
    gap: 20px;
  }
}
</style>
