<template>
  <header>
    <div class="header-content">
      <!-- Left side: Title -->
      <div class="left-section">
        <h1 class="page-title">Annelies Annys</h1>
      </div>

      <!-- Center: Search bar -->
      <div class="center-section">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="search-input"
            @input="handleSearch"
            @focus="showSearchResults = true"
            @blur="hideSearchResults"
          />
          <div v-if="showSearchResults && searchQuery" class="search-results">
            <div
              v-for="project in filteredProjects"
              :key="project.slug"
              class="search-result-item"
              @mousedown="navigateToProject(project.slug)"
            >
              <img :src="project.thumbnailImage" :alt="project.title" class="search-thumb" />
              <span>{{ project.title }}</span>
            </div>
            <div v-if="filteredProjects.length === 0" class="search-no-results">
              Geen projecten gevonden
            </div>
          </div>
        </div>
      </div>

      <!-- Right side: Navigation and Social Icons -->
      <div class="right-section">
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

        <!-- Social Icons -->
        <div class="social-icons">
          <a href="mailto:annelies@example.com" class="social-icon" aria-label="Email">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
          </a>
          <a
            href="https://linkedin.com/in/anneliesannys"
            target="_blank"
            class="social-icon"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
              />
            </svg>
          </a>
          <a
            href="https://instagram.com/anneliesannys"
            target="_blank"
            class="social-icon"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import projectsData from '@/data/projects.json'
import type { Project } from '@/types/project'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isPortfolioVisible = ref(false)

// Search functionality
const searchQuery = ref('')
const showSearchResults = ref(false)
const projects = projectsData as Project[]

const filteredProjects = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  return projects.filter(
    (project) =>
      project.title.toLowerCase().includes(query) ||
      project.description.some((desc) => desc.toLowerCase().includes(query)),
  )
})

const handleSearch = () => {
  showSearchResults.value = searchQuery.value.length > 0
}

const hideSearchResults = () => {
  setTimeout(() => {
    showSearchResults.value = false
  }, 150) // Small delay to allow click on results
}

const navigateToProject = (slug: string) => {
  router.push(`/portfolio/${slug}`)
  searchQuery.value = ''
  showSearchResults.value = false
}

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
  box-sizing: border-box;
}

.header-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.left-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.center-section {
  display: flex;
  justify-content: center;
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

/* Search Styles */
.search-container {
  position: relative;
  width: 320px;
}

.search-input {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid rgba(44, 62, 80, 0.15);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(15px);
  color: #2c3e50;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 182, 193, 0.1);
}

.search-input::placeholder {
  color: rgba(44, 62, 80, 0.5);
  font-style: italic;
}

.search-input:focus {
  border-color: rgba(255, 182, 193, 0.4);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 6px 25px rgba(255, 182, 193, 0.2);
  transform: translateY(-1px);
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(25px);
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  max-height: 320px;
  overflow-y: auto;
  z-index: 1001;
  margin-top: 8px;
  border: 1px solid rgba(255, 192, 203, 0.2);
}

.search-result-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #2c3e50;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 192, 203, 0.1);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover {
  background-color: rgba(255, 192, 203, 0.1);
  transform: translateX(3px);
}

.search-thumb {
  width: 45px;
  height: 35px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-no-results {
  padding: 20px;
  text-align: center;
  color: #7f8c8d;
  font-style: italic;
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
  padding: 8px 0;
}

.nav-link:hover {
  color: #34495e;
  transform: translateY(-1px);
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

/* Social Icons */
.social-icons {
  display: flex;
  gap: 18px;
  align-items: center;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: #2c3e50;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  border-radius: 50%;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 192, 203, 0.3);
  box-shadow: 0 4px 12px rgba(255, 182, 193, 0.15);
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(255, 182, 193, 0.3);
  color: #34495e;
}

/* Responsive Design */
@media (max-width: 1200px) {
  header {
    padding: 20px 30px;
  }

  .header-content {
    gap: 30px;
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

  .social-icons {
    gap: 15px;
  }
}

@media (max-width: 900px) {
  header {
    padding: 15px 20px;
  }

  .header-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 20px;
    text-align: center;
  }

  .left-section,
  .center-section,
  .right-section {
    justify-content: center;
  }

  .page-title {
    font-size: 2.5rem;
    order: 1;
  }

  .center-section {
    order: 2;
  }

  .right-section {
    order: 3;
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

  .social-icons {
    gap: 12px;
  }

  .social-icon {
    width: 38px;
    height: 38px;
  }
}
</style>
