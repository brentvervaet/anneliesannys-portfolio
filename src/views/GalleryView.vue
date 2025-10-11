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
          <img :src="currentModalImage?.src" :alt="currentModalImage?.alt" class="modal-image" />
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
import { onMounted, onUnmounted, ref } from 'vue'

interface GalleryImage {
  src: string
  alt: string
  title: string
  category: string
}

const modalOpen = ref(false)
const currentModalIndex = ref(0)
const currentModalImage = ref<GalleryImage | null>(null)

// Gallery images data
const allImages = ref<GalleryImage[]>([
  // BA3 Images
  { src: '/images/BA3/lbm01.webp', alt: 'LBM 01', title: '01', category: 'Lost before morning' },
  { src: '/images/BA3/lbm02.webp', alt: 'LBM 02', title: '02', category: 'Lost before morning' },
  { src: '/images/BA3/lbm03.webp', alt: 'LBM 03', title: '03', category: 'Lost before morning' },
  { src: '/images/BA3/lbm04.webp', alt: 'LBM 04', title: '04', category: 'Lost before morning' },
  { src: '/images/BA3/lbm05.webp', alt: 'LBM 05', title: '05', category: 'Lost before morning' },
  { src: '/images/BA3/lbm06.webp', alt: 'LBM 06', title: '06', category: 'Lost before morning' },
  { src: '/images/BA3/lbm07.webp', alt: 'LBM 07', title: '07', category: 'Lost before morning' },
  { src: '/images/BA3/lbm08.webp', alt: 'LBM 08', title: '08', category: 'Lost before morning' },
  { src: '/images/BA3/lbm09.webp', alt: 'LBM 09', title: '09', category: 'Lost before morning' },
  { src: '/images/BA3/lbm10.webp', alt: 'LBM 10', title: '10', category: 'Lost before morning' },
  { src: '/images/BA3/lbm11.webp', alt: 'LBM 11', title: '11', category: 'Lost before morning' },
  { src: '/images/BA3/lbm12.webp', alt: 'LBM 12', title: '12', category: 'Lost before morning' },
  { src: '/images/BA3/lbm13.webp', alt: 'LBM 13', title: '13', category: 'Lost before morning' },
  { src: '/images/BA3/lbm14.webp', alt: 'LBM 14', title: '14', category: 'Lost before morning' },
  { src: '/images/BA3/lbm15.webp', alt: 'LBM 15', title: '15', category: 'Lost before morning' },
  { src: '/images/BA3/lbm16.webp', alt: 'LBM 16', title: '16', category: 'Lost before morning' },
  { src: '/images/BA3/lbm17.webp', alt: 'LBM 17', title: '17', category: 'Lost before morning' },

  // BA2 Images
  {
    src: '/images/BA2/smsit01.webp',
    alt: 'SMSIT 01',
    title: '01',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit02.webp',
    alt: 'SMSIT 02',
    title: '02',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit03.webp',
    alt: 'SMSIT 03',
    title: '03',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit04.webp',
    alt: 'SMSIT 04',
    title: '04',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit05.webp',
    alt: 'SMSIT 05',
    title: '05',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit06.webp',
    alt: 'SMSIT 06',
    title: '06',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit07.webp',
    alt: 'SMSIT 07',
    title: '07',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit08.webp',
    alt: 'SMSIT 08',
    title: '08',
    category: 'Split myself in two',
  },
  {
    src: '/images/BA2/smsit09.webp',
    alt: 'SMSIT 09',
    title: '09',
    category: 'Split myself in two',
  },

  // BA1 Studies
  {
    src: '/images/BA1/studies101.webp',
    alt: 'Study 101',
    title: '01',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies102.webp',
    alt: 'Study 102',
    title: '02',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies103.webp',
    alt: 'Study 103',
    title: '03',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies104.webp',
    alt: 'Study 104',
    title: '04',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies105.webp',
    alt: 'Study 105',
    title: '05',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies106.webp',
    alt: 'Study 106',
    title: '06',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies107.webp',
    alt: 'Study 107',
    title: '07',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies108.webp',
    alt: 'Study 108',
    title: '08',
    category: 'Study of the dress',
  },
  {
    src: '/images/BA1/studies109.webp',
    alt: 'Study 109',
    title: '09',
    category: 'Study of the dress',
  },
  { src: '/images/BA1/studies201.webp', alt: 'Study 201', title: '01', category: 'Jeans study' },
  { src: '/images/BA1/studies202.webp', alt: 'Study 202', title: '02', category: 'Jeans study' },
  { src: '/images/BA1/studies203.webp', alt: 'Study 203', title: '03', category: 'Jeans study' },

  { src: '/images/BA1/studies301.webp', alt: 'Study 301', title: '01', category: 'Paper study' },
  { src: '/images/BA1/studies302.webp', alt: 'Study 302', title: '02', category: 'Paper study' },
])

const openModal = (image: GalleryImage, index: number) => {
  currentModalImage.value = image
  currentModalIndex.value = index
  modalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  modalOpen.value = false
  currentModalImage.value = null
  document.body.style.overflow = 'auto'
}

const navigateModal = (direction: number) => {
  const newIndex = currentModalIndex.value + direction
  if (newIndex >= 0 && newIndex < allImages.value.length) {
    currentModalIndex.value = newIndex
    const image = allImages.value[newIndex]
    if (image) {
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
  padding-top: 20px;
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
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
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0px;
  }
}

@media (max-width: 900px) {
  .gallery {
    padding-top: 70px;
  }

  .gallery-content {
    padding: 0 20px;
  }

  .gallery-header h1 {
    font-size: 2.5rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
  .gallery-header h1 {
    font-size: 2rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
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
