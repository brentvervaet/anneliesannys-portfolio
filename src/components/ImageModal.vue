<template>
  <!-- Modal for enlarged view -->
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="closeModal">&times;</button>
      <div class="modal-navigation">
        <button class="nav-btn prev-btn" @click="navigatePrevious" :disabled="currentIndex === 0">
          &#8249;
        </button>
        <button
          class="nav-btn next-btn"
          @click="navigateNext"
          :disabled="currentIndex === images.length - 1"
        >
          &#8250;
        </button>
      </div>
      <div class="modal-image-container">
        <div v-if="imageLoading" class="modal-loading">
          <div class="loading-spinner"></div>
        </div>
        <img
          :src="currentImage?.srcLarge"
          :alt="currentImage?.alt"
          class="modal-image"
          @load="onImageLoad"
          :class="{ loading: imageLoading }"
        />
      </div>
      <div class="modal-info">
        <h3>{{ currentImage?.title }}</h3>
        <p v-if="currentImage?.projectSlug" class="modal-category-link" @click="navigateToProject">
          {{ currentImage?.category }}
        </p>
        <p v-else class="modal-category">{{ currentImage?.category }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export interface ModalImage {
  src: string
  srcLarge: string
  alt: string
  title: string
  category: string
  projectSlug?: string // Optional: slug to navigate to project
}

interface Props {
  isOpen: boolean
  images: ModalImage[]
  initialIndex: number
}

interface Emits {
  (e: 'close'): void
  (e: 'navigate', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

const imageLoading = ref(false)
const currentIndex = ref(props.initialIndex)

const currentImage = computed(() => props.images[currentIndex.value])

// Navigate to project when category is clicked
const navigateToProject = () => {
  if (currentImage.value?.projectSlug) {
    router.push(`/${currentImage.value.projectSlug}`)
  }
}

// Watch for changes in isOpen and initialIndex
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      imageLoading.value = true
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  },
)

watch(
  () => props.initialIndex,
  (newVal) => {
    currentIndex.value = newVal
    imageLoading.value = true
  },
)

const closeModal = () => {
  emit('close')
}

const onImageLoad = () => {
  imageLoading.value = false
}

const navigatePrevious = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    imageLoading.value = true
    emit('navigate', currentIndex.value)
  }
}

const navigateNext = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
    imageLoading.value = true
    emit('navigate', currentIndex.value)
  }
}

// Handle keyboard navigation
const handleKeyPress = (event: KeyboardEvent) => {
  if (!props.isOpen) return

  if (event.key === 'Escape') {
    closeModal()
  } else if (event.key === 'ArrowLeft') {
    navigatePrevious()
  } else if (event.key === 'ArrowRight') {
    navigateNext()
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

.modal-category-link {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.modal-category-link:hover {
  opacity: 1;
  text-decoration: underline;
}

.modal-category {
  cursor: default;
}

/* ===== MEDIA QUERIES ===== */
@media (max-width: 768px) {
  .modal-close {
    top: -40px;
    font-size: 1.5rem;
  }

  .modal-navigation {
    left: -30px;
    right: -30px;
  }
}
</style>
