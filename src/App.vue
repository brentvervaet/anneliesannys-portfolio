<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <div id="app">
    <AppHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Helvetica Neue', sans-serif;
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
