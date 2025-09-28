<template>
  <header>
    <div class="header-content">
      <!-- TODO: make name and routes fit -->
      <!-- Left side: Title -->
      <div class="left-section">
        <h1 class="page-title">Annelies Annys</h1>
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
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

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
  backdrop-filter: blur(20px);
  /* box-sizing: border-box; */
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

.page-title {
  margin: 0;
  font-size: 3.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.4);
  letter-spacing: 0.02em;
  white-space: nowrap;
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

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  font-size: 17px;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  padding: 8px 0;
}

.nav-link:hover {
  color: #34495e;
  transform: translateY(-3px);
}

.nav-link.active {
  color: #2c3e50;
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, rgba(255, 182, 193, 0.8), rgba(255, 192, 203, 0.6));
  border-radius: 2px;
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
