<template>
  <div class="carousel-component">
    <!-- Continuous scrolling carousel with pause on hover -->
    <div class="carousel-wrapper" @mouseenter="pauseAnimation" @mouseleave="resumeAnimation">
      <div
        ref="track"
        class="carousel-track-enhanced"
        :class="{
          paused: isPaused,
          'scroll-left': direction === 'left',
          'scroll-right': direction === 'right',
        }"
      >
        <img
          v-for="(image, index) in duplicatedImages"
          :key="`img-${index}`"
          :src="image.src"
          :alt="image.alt"
          class="carousel-slide"
          @click="() => onImageClick?.(image, index)"
        />
      </div>
    </div>

    <!-- Optional navigation dots -->
    <div v-if="showDots" class="carousel-dots">
      <button
        v-for="(_, index) in originalImages"
        :key="`dot-${index}`"
        class="carousel-dot"
        :class="{ active: index === currentSlide }"
        @click="goToSlide(index)"
        :aria-label="`Go to slide ${index + 1}`"
      />
    </div>

    <!-- Optional controls -->
    <div v-if="showControls" class="carousel-controls">
      <button class="carousel-control prev" @click="previousSlide" :aria-label="'Previous slide'">
        &#8249;
      </button>
      <button class="carousel-control next" @click="nextSlide" :aria-label="'Next slide'">
        &#8250;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, type PropType } from 'vue'

export interface CarouselImage {
  src: string
  alt: string
  id?: string | number
}

const props = defineProps({
  images: {
    type: Array as PropType<CarouselImage[]>,
    required: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 4000,
  },
  showDots: {
    type: Boolean,
    default: false,
  },
  showControls: {
    type: Boolean,
    default: false,
  },
  pauseOnHover: {
    type: Boolean,
    default: true,
  },
  infinite: {
    type: Boolean,
    default: true,
  },
  speed: {
    type: Number,
    default: 60, // Animation duration in seconds
  },
  direction: {
    type: String as PropType<'left' | 'right'>,
    default: 'left',
  },
  onImageClick: {
    type: Function as PropType<(image: CarouselImage, index: number) => void>,
    required: false,
  },
})

const currentSlide = ref(0)
const isPaused = ref(false)
const track = ref<HTMLElement>()
const originalImages = computed(() => props.images)

// Create duplicated images for seamless infinite scroll
const duplicatedImages = computed(() => {
  if (props.infinite) {
    return [...originalImages.value, ...originalImages.value, ...originalImages.value]
  }
  return originalImages.value
})

let autoplayInterval: ReturnType<typeof setInterval> | null = null

const startAutoplay = () => {
  if (props.autoplay && !autoplayInterval) {
    autoplayInterval = setInterval(() => {
      if (!isPaused.value) {
        nextSlide()
      }
    }, props.interval)
  }
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

const pauseAnimation = () => {
  if (props.pauseOnHover) {
    isPaused.value = true
  }
}

const resumeAnimation = () => {
  if (props.pauseOnHover) {
    isPaused.value = false
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % originalImages.value.length
}

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? originalImages.value.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.carousel-component {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  width: 100vw;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.carousel-track-enhanced {
  display: flex;
  width: fit-content;
  animation-duration: v-bind(speed + 's');
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.carousel-track-enhanced.scroll-left {
  animation-name: scroll-left;
}

.carousel-track-enhanced.scroll-right {
  animation-name: scroll-right;
}

.carousel-track-enhanced.paused {
  animation-play-state: paused;
}

.carousel-slide {
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin-right: 2rem;
  border-radius: 8px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.carousel-slide:hover {
  transform: scale(1.05);
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.carousel-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.carousel-dot.active,
.carousel-dot:hover {
  background-color: var(--color-pink-custom, #fa96dc);
}

.carousel-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
}

.carousel-control {
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  pointer-events: auto;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-control:hover {
  background: rgba(255, 255, 255, 0.95);
}

@media (max-width: 768px) {
  .carousel-slide {
    width: 250px;
    height: 170px;
    margin-right: 1rem;
  }
}

@media (max-width: 480px) {
  .carousel-slide {
    width: 200px;
    height: 140px;
  }
}
</style>
