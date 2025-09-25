<template>
  <div class="portfolio">
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
          <img
            class="portfolio-img"
            src="/images/Project02/studie-van-de-jurk-6.jpg"
            alt="Project 3"
          />
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
import { RouterLink } from 'vue-router'
</script>
