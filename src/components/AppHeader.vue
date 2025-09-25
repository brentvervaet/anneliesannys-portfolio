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
              :class="{ active: $route.path === '/portfolio' || isPortfolioVisible }"
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
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isPortfolioVisible = ref(false)

const scrollToPortfolio = (e: Event) => {
  e.preventDefault()

  // If not on home page, navigate to home first
  if (route.path !== '/') {
    window.location.href = '/#portfolio'
    return
  }

  // Smooth scroll to portfolio section
  const portfolioSection = document.querySelector('.portfolio-section')
  if (portfolioSection) {
    portfolioSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const checkPortfolioVisibility = () => {
  if (route.path !== '/') {
    isPortfolioVisible.value = false
    return
  }

  const portfolioSection = document.querySelector('.portfolio-section')
  if (!portfolioSection) return

  const rect = portfolioSection.getBoundingClientRect()
  const isVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > 0
  isPortfolioVisible.value = isVisible
}

onMounted(() => {
  window.addEventListener('scroll', checkPortfolioVisibility)
  checkPortfolioVisibility() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkPortfolioVisibility)
})
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
