<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'

// Create a ref for the hasHeroVideo state
const hasHeroVideo = ref(false)

// Provide the hasHeroVideo value so AppHeader can inject it
provide('hasHeroVideo', hasHeroVideo)

// Update hasHeroVideo based on route changes
const route = useRoute()
watch(
  () => route.path,
  (path) => {
    // Set hasHeroVideo to true only if the path starts with /portfolio/
    hasHeroVideo.value = path.startsWith('/portfolio/')
  },
  { immediate: true },
)
</script>

<template>
  <div id="app">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
#app {
  margin: 0;
  overflow-x: hidden;
  padding: 0;
  background-color: #fff;
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: none;
}

main {
  flex: 1;
  text-align: left;
  padding: 140px 0 0 0;
  background: #fff;
}
</style>
