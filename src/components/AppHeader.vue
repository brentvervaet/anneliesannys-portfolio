<template>
  <header>
    <div class="header-content">
      <h1 class="page-title">Annelies Annys</h1>
      <nav>
        <ul>
          <li>
            <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">
              home
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/portfolio"
              class="nav-link"
              :class="{ active: $route.path === '/portfolio' }"
            >
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
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 50px;
}

.page-title {
  margin: 0;
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.02em;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-flex;
  gap: 40px;
}
</style>
