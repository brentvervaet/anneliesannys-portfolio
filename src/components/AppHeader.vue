<template>
  <header :class="{ 'over-video': hasHeroVideo }">
    <div class="header-content">
      <!-- Left side: Title -->
      <div class="left-section">
        <h1 class="page-title">
          <RouterLink to="/">ANNELIES ANNYS</RouterLink>
        </h1>
      </div>

      <!-- Right side: Navigation -->
      <div class="right-section">
        <nav>
          <ul>
            <li>
              <RouterLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">
                home
              </RouterLink>
            </li>
            <li>
              <div @click="scrollToPortfolio" class="nav-link">portfolio</div>
            </li>
            <li>
              <RouterLink
                to="/about"
                class="nav-link"
                :class="{ active: $route.path === '/about' }"
              >
                about
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

// Inject the hasHeroVideo property, defaulting to false
const hasHeroVideo = inject('hasHeroVideo', ref(false))

const route = useRoute()
const router = useRouter()
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
  padding: 25px 40px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: transparent;
}

header.over-video .page-title {
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
  color: white;
}

header.over-video .nav-link {
  /* text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); */
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.left-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.right-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 35px;
}

/* Navigation Styles */
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 35px;
  align-items: center;
}

/* Responsive Design */
@media (max-width: 1200px) {
  header {
    padding: 20px 30px;
  }

  .header-content {
    gap: 40px;
  }

  .page-title {
    font-size: 3rem;
  }

  .search-container {
    width: 280px;
  }

  nav ul {
    gap: 25px;
  }
}

@media (max-width: 900px) {
  header {
    padding: 15px 20px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 25px;
  }

  .left-section {
    justify-content: center;
  }
  .right-section {
    justify-content: center;
  }

  .page-title {
    font-size: 2.5rem;
    text-align: center;
  }

  .right-section {
    flex-direction: column;
    gap: 20px;
  }

  .search-container {
    width: 100%;
    max-width: 350px;
  }

  nav ul {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  header {
    padding: 15px;
  }

  .page-title {
    font-size: 2rem;
  }

  .search-input {
    padding: 10px 15px;
    font-size: 14px;
  }

  nav ul {
    gap: 15px;
  }
}
</style>
