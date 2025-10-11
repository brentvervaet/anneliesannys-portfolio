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
        <!-- Desktop Navigation -->
        <nav class="desktop-nav">
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
                to="/gallery"
                class="nav-link"
                :class="{ active: $route.path === '/gallery' }"
              >
                gallery
              </RouterLink>
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

        <!-- Mobile Hamburger Menu -->
        <button
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :class="{ 'menu-open': isMobileMenuOpen }"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Overlay -->
    <div class="mobile-nav-overlay" :class="{ active: isMobileMenuOpen }" @click="closeMobileMenu">
      <nav class="mobile-nav" @click.stop>
        <ul>
          <li>
            <RouterLink
              to="/"
              class="nav-link"
              :class="{ active: $route.path === '/' }"
              @click="closeMobileMenu"
            >
              home
            </RouterLink>
          </li>
          <li>
            <div @click="handleMobilePortfolioClick" class="nav-link">portfolio</div>
          </li>
          <li>
            <RouterLink
              to="/gallery"
              class="nav-link"
              :class="{ active: $route.path === '/gallery' }"
              @click="closeMobileMenu"
            >
              gallery
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/about"
              class="nav-link"
              :class="{ active: $route.path === '/about' }"
              @click="closeMobileMenu"
            >
              about
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

// Inject the hasHeroVideo property, defaulting to false
const hasHeroVideo = inject('hasHeroVideo', ref(false))

const route = useRoute()
// const router = useRouter()
const isPortfolioVisible = ref(false)
const isMobileMenuOpen = ref(false)

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

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleMobilePortfolioClick = () => {
  closeMobileMenu()
  scrollToPortfolio(new Event('click'))
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

  // Close mobile menu on escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMobileMenu()
    }
  }
  window.addEventListener('keydown', handleEscape)

  // Cleanup function will remove this listener
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkPortfolioVisibility)
})

// Watch for route changes to close mobile menu
watch(route, () => {
  closeMobileMenu()
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
  color: white;
}

header.over-video .nav-link {
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

/* Component styles */
.nav-link {
  color: black;
  text-decoration: none;
  font-weight: 500;
  font-size: 17px;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  padding: 8px 0;
}

.nav-link:hover {
  color: rgba(255, 182, 193);
  transform: translateY(-3px);
}

.nav-link.active {
  font-weight: 600;
  color: rgba(255, 182, 193);
}

/* Mobile Menu Toggle Button */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background-color: #000;
  transition: all 0.3s ease;
  transform-origin: center;
}

header.over-video .hamburger-line {
  background-color: white;
}

/* Hamburger animation when menu is open */
.mobile-menu-toggle.menu-open .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.menu-open .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.menu-open .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 200px;
}

.mobile-nav ul {
  flex-direction: column;
  gap: 25px;
  text-align: center;
}

.mobile-nav .nav-link {
  font-size: 18px;
  color: #000;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.mobile-nav .nav-link:hover {
  transform: translateY(0);
  color: rgba(255, 182, 193);
}

.mobile-nav .nav-link.active {
  font-weight: 600;
  color: rgba(255, 182, 193);
}

/* Responsive Styles */
@media (max-width: 950px) {
  header {
    padding: 20px 25px;
  }

  .header-content {
    gap: 20px;
  }

  .page-title {
    font-size: 2rem;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .mobile-nav-overlay {
    display: block;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
