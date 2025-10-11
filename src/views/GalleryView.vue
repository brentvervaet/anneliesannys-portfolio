<template>
  <div class="gallery">
    <section class="gallery-content">
      <div class="gallery-header">
        <h1>Gallery</h1>
        <p>Collections & studies</p>
      </div>

      <!-- Gallery Grid -->
      <div class="gallery-grid">
        <div
          v-for="(image, index) in allImages"
          :key="image.src"
          class="gallery-item"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="openModal(image, index)"
        >
          <img :src="image.src" :alt="image.alt" class="gallery-image" loading="lazy" />
          <div class="gallery-overlay">
            <div class="overlay-content">
              <h3>{{ image.title }}</h3>
              <p>{{ image.category }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for enlarged view -->
      <div v-if="modalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">&times;</button>
          <div class="modal-navigation">
            <button
              class="nav-btn prev-btn"
              @click="navigateModal(-1)"
              :disabled="currentModalIndex === 0"
            >
              &#8249;
            </button>
            <button
              class="nav-btn next-btn"
              @click="navigateModal(1)"
              :disabled="currentModalIndex === allImages.length - 1"
            >
              &#8250;
            </button>
          </div>
          <div class="modal-image-container">
            <div v-if="modalImageLoading" class="modal-loading">
              <div class="loading-spinner"></div>
            </div>
            <img 
              :src="currentModalImage?.srcLarge" 
              :alt="currentModalImage?.alt" 
              class="modal-image" 
              @load="onModalImageLoad"
              :class="{ 'loading': modalImageLoading }"
            />
          </div>
          <div class="modal-info">
            <h3>{{ currentModalImage?.title }}</h3>
            <p>{{ currentModalImage?.category }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import projectsData from '@/data/projects.json'
import { computed, onMounted, onUnmounted, ref } from 'vue'

interface GalleryImage {
  src: string
  srcLarge: string
  alt: string
  title: string
  category: string
}

const modalOpen = ref(false)
const currentModalIndex = ref(0)
const currentModalImage = ref<GalleryImage | null>(null)
const modalImageLoading = ref(false)

// Generate gallery images from projects data
const allImages = computed<GalleryImage[]>(() => {
  const images: GalleryImage[] = []

  projectsData.forEach((project) => {
    project.images.forEach((image, index) => {
      // Extract number from filename for title, or use index + 1
      const filename = image.src.split('/').pop() || ''
      const titleMatch = filename.match(/(\d+)/)
      const title = titleMatch?.[1]?.padStart(2, '0') || String(index + 1).padStart(2, '0')

      // Convert the image path to use small images for gallery, large for modal
      // Original: /images/BA1/studies101.webp -> Small: /images/BA1/sm/studies101.webp, Large: /images/BA1/lg/studies101.webp
      const pathParts = image.src.split('/')
      const filename_only = pathParts[pathParts.length - 1]
      const basePath = pathParts.slice(0, -1).join('/')
      
      const smallSrc = `${basePath}/sm/${filename_only}`
      const largeSrc = `${basePath}/lg/${filename_only}`

      images.push({
        src: smallSrc,
        srcLarge: largeSrc,
        alt: image.alt,
        title,
        category: project.title,
      })
    })
  })

  return images
})

const openModal = (image: GalleryImage, index: number) => {
  currentModalImage.value = image
  currentModalIndex.value = index
  modalOpen.value = true
  modalImageLoading.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  modalOpen.value = false
  currentModalImage.value = null
  modalImageLoading.value = false
  document.body.style.overflow = 'auto'
}

const onModalImageLoad = () => {
  modalImageLoading.value = false
}

const navigateModal = (direction: number) => {
  const newIndex = currentModalIndex.value + direction
  if (newIndex >= 0 && newIndex < allImages.value.length) {
    currentModalIndex.value = newIndex
    const image = allImages.value[newIndex]
    if (image) {
      modalImageLoading.value = true
      currentModalImage.value = image
    }
  }
}

// Handle keyboard navigation
const handleKeyPress = (event: KeyboardEvent) => {
  if (!modalOpen.value) return

  if (event.key === 'Escape') {
    closeModal()
  } else if (event.key === 'ArrowLeft') {
    navigateModal(-1)
  } else if (event.key === 'ArrowRight') {
    navigateModal(1)
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyPress)
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.gallery {
  min-height: 100vh;
  background: white;
}

.gallery-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-header h1 {
  font-size: 3.5rem;
  font-weight: 300;
  margin-bottom: 20px;
  color: #333;
}

.gallery-header p {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  /* TODO: mabye gap */
  gap: 0px;
  margin-bottom: 80px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-item:hover .gallery-image {
  transform: scale(1.05);
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content h3 {
  font-size: 1.2rem;
  margin-bottom: 8px;
  font-weight: 300;
}

.overlay-content p {
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  cursor: pointer;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: auto;
}

.modal-close {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2001;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-navigation {
  position: absolute;
  top: 50%;
  left: -60px;
  right: -60px;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 2001;
}

.nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.3s ease;
  border-radius: 50%;
}

.nav-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.4);
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.modal-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.modal-image.loading {
  opacity: 0;
}

.modal-loading {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.modal-info {
  text-align: center;
  color: white;
  margin-top: 20px;
}

.modal-info h3 {
  font-size: 1.5rem;
  margin-bottom: 8px;
  font-weight: 300;
}

.modal-info p {
  font-size: 1rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .gallery-content {
    padding: 0 30px;
  }

  .gallery-grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 0px;
  }
}

@media (max-width: 900px) {
  .gallery-content {
    padding: 0 20px;
  }

  .gallery-header h1 {
    font-size: 2.5rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0px;
  }

  .modal-navigation {
    left: -40px;
    right: -40px;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .gallery {
    padding-top: 0px;
  }

  .gallery-header h1 {
    font-size: 2rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 0px;
  }

  .modal-navigation {
    left: -30px;
    right: -30px;
  }

  .modal-close {
    top: -40px;
    font-size: 1.5rem;
  }
}
</style>
