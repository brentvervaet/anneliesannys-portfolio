<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">
            home
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/portfolio" class="nav-link" :class="{ active: $route.path === '/portfolio' }">
            portfolio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">
            about
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  text-align: right;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
  backdrop-filter: blur(2px);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

nav ul {
  list-style: none;
  margin: 20px 50px 0 0;
  padding: 0;
  display: inline-flex;
  gap: 40px;
}
</style>
