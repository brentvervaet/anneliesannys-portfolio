<template>
  <header>
    <nav>
      <ul>
        <li>
          <RouterLink to="/" :class="{ active: $route.path === '/' }">home</RouterLink>
        </li>
        <li>
          <RouterLink to="/portfolio" :class="{ active: $route.path === '/portfolio' }">
            portfolio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/about" :class="{ active: $route.path === '/about' }">about</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
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
  background: rgba(255, 255, 255, 0.2);
  background: transparent;
  backdrop-filter: blur(2px);
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
}

nav ul {
  list-style: none;
  margin: 20px 50px 0px 0px;
  padding: 0;
  display: inline-flex;
  gap: 40px;
}

nav ul li a {
  text-decoration: none;
  color: #000;
  font-family: 'Advent Pro', sans-serif;
  font-size: 28px;
  font-style: normal;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 1px;
}

nav ul li a:hover {
  color: rgb(250, 150, 220);
}

nav ul li a.active {
  color: rgb(250, 150, 220);
  font-weight: bold;
  text-decoration: underline;
}
</style>
