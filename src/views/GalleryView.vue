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
          :class="{ 'animate-item': index }"
          :style="{ animationDelay: `${index * 20}ms` }"
          @click="openModal(index)"
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
      <ImageModal
        :isOpen="modalOpen"
        :images="allImages"
        :initialIndex="currentModalIndex"
        @close="closeModal"
        @navigate="onModalNavigate"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import ImageModal, { type ModalImage } from '@/components/ImageModal.vue'
import projectsData from '@/data/projects.json'
import { computed, ref } from 'vue'

const modalOpen = ref(false)
const currentModalIndex = ref(0)

// Seeded random function for consistent shuffle
const seededRandom = (seed: number) => {
  let x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

// Fisher-Yates shuffle with seed for consistent random order
const shuffleArray = <T,>(array: T[], seed: number): T[] => {
  const shuffled = [...array]
  let currentIndex = shuffled.length

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(seededRandom(seed + currentIndex) * currentIndex)
    currentIndex--

    // Swap elements
    const temp = shuffled[currentIndex]!
    shuffled[currentIndex] = shuffled[randomIndex]!
    shuffled[randomIndex] = temp
  }

  return shuffled
}

// Generate gallery images from projects data
const allImages = computed<ModalImage[]>(() => {
  const images: ModalImage[] = []

  projectsData.forEach((project) => {
    // Handle projects with images
    if (project.images) {
      project.images.forEach((image, index) => {
        // Extract number from filename for title, or use index + 1
        const filename = image.src.split('/').pop() || ''
        const titleMatch = filename.match(/(\d+)/)
        const title = titleMatch?.[1]?.padStart(2, '0') || String(index + 1).padStart(2, '0')

        // Convert the image path to use small images for gallery, large for modal
        // Original: /images/BA3/lbm01.webp -> Small: /images/BA3/sm/lbm01.webp, Large: /images/BA3/lg/lbm01.webp
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
          projectSlug: project.slug,
        })
      })
    }

    //TODO: Handle projects with collages
    // if (project.collages) {
    //   project.collages.forEach((image, index) => {
    //     // Extract number from filename for title, or use index + 1
    //     const filename = image.src.split('/').pop() || ''
    //     const titleMatch = filename.match(/(\d+)/)
    //     const title = titleMatch?.[1]?.padStart(2, '0') || String(index + 1).padStart(2, '0')

    //     // Convert the image path to use small images for gallery, large for modal
    //     // Original: /images/BA3/collages/lbm01.webp -> Small: /images/BA3/collages/sm/lbm01.webp, Large: /images/BA3/collages/lg/lbm01.webp
    //     const pathParts = image.src.split('/')
    //     const filename_only = pathParts[pathParts.length - 1]
    //     const basePath = pathParts.slice(0, -1).join('/')

    //     const smallSrc = `${basePath}/sm/${filename_only}`
    //     const largeSrc = `${basePath}/lg/${filename_only}`

    //     images.push({
    //       src: smallSrc,
    //       srcLarge: largeSrc,
    //       alt: image.alt,
    //       title,
    //       category: project.title,
    //     })
    //   })
    // }

    // Handle projects with studies
    if (project.studies) {
      project.studies.forEach((study) => {
        // Study images
        if (study.images) {
          study.images.forEach((image, index) => {
            // Extract number from filename for title, or use index + 1
            const filename = image.src.split('/').pop() || ''
            const titleMatch = filename.match(/(\d+)/)
            const title = titleMatch?.[1]?.padStart(2, '0') || String(index + 1).padStart(2, '0')

            // Convert the image path to use small images for gallery, large for modal
            // Original: /images/BA1/Dress/dress01.webp -> Small: /images/BA1/Dress/sm/dress01.webp, Large: /images/BA1/Dress/lg/dress01.webp
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
              category: study.title, // Use study title as category
              projectSlug: project.slug,
            })
          })
        }

        //TODO: Study collages
        // if (study.collages) {
        //   study.collages.forEach((image, index) => {
        //     // Extract number from filename for title, or use index + 1
        //     const filename = image.src.split('/').pop() || ''
        //     const titleMatch = filename.match(/(\d+)/)
        //     const title = titleMatch?.[1]?.padStart(2, '0') || String(index + 1).padStart(2, '0')

        //     // Convert the image path to use small images for gallery, large for modal
        //     // Original: /images/BA1/Dress/collages/dress01.webp -> Small: /images/BA1/Dress/collages/sm/dress01.webp, Large: /images/BA1/Dress/collages/lg/dress01.webp
        //     const pathParts = image.src.split('/')
        //     const filename_only = pathParts[pathParts.length - 1]
        //     const basePath = pathParts.slice(0, -1).join('/')

        //     const smallSrc = `${basePath}/sm/${filename_only}`
        //     const largeSrc = `${basePath}/lg/${filename_only}`

        //     images.push({
        //       src: smallSrc,
        //       srcLarge: largeSrc,
        //       alt: image.alt,
        //       title,
        //       category: study.title, // Use study title as category
        //     })
        //   })
        // }
      })
    }
  })

  // Shuffle the images with a fixed seed for consistent random order
  return shuffleArray(images, 69)
})

const openModal = (index: number) => {
  currentModalIndex.value = index
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const onModalNavigate = (index: number) => {
  currentModalIndex.value = index
}
</script>

<style scoped>
.gallery-content {
  padding: 1.5rem;
  padding-top: 3rem;
}

.gallery-header {
  text-align: center;
  padding: 2rem;
}

.gallery-header h1 {
  font-size: 2rem;
  font-weight: 300;
  color: #333;
}

.gallery-header p {
  font-size: 1rem;
  color: #666;
  font-weight: 300;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0px;
  margin-bottom: 80px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
}

.gallery-item.animate-item {
  animation: fadeInUp 0.3s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

/* ===== ANIMATIONS ===== */

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

/* ===== MEDIA QUERIES ===== */
/* tablet */
@media (min-width: 768px) {
  .gallery-header {
    text-align: center;
    padding: 3rem;
  }

  .gallery-header h1 {
    font-size: 2.5rem;
  }

  .gallery-header p {
    font-size: 1.2rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
/* desktop */
@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(10, 1fr);
  }

  .gallery-item:hover .gallery-image {
    transform: scale(1.05);
  }
  .gallery-item:hover .gallery-overlay {
    opacity: 1;
  }
}
</style>
