# ImageModal Component

A reusable modal component for displaying images in an enlarged view with navigation capabilities.

## Usage

The `ImageModal` component is used across the portfolio to display images in a modal overlay with navigation between multiple images.

### Import

```typescript
import ImageModal, { type ModalImage } from '@/components/ImageModal.vue'
```

### Props

```typescript
interface Props {
  isOpen: boolean // Controls modal visibility
  images: ModalImage[] // Array of images to display
  initialIndex: number // Starting index for the modal
}

interface ModalImage {
  src: string // Small/thumbnail image source
  srcLarge: string // Large image source for modal view
  alt: string // Alt text for accessibility
  title: string // Display title
  category: string // Display category/subtitle
}
```

### Events

- `@close` - Emitted when the modal should be closed (Escape key, close button, or overlay click)
- `@navigate` - Emitted when navigating between images, passes the new index

### Example Implementation

```vue
<template>
  <div>
    <!-- Gallery/Images Grid -->
    <div class="image-grid">
      <img
        v-for="(image, index) in images"
        :key="image.src"
        :src="getMediumImagePath(image.src)"
        :alt="image.alt"
        @click="openModal(index)"
      />
    </div>

    <!-- Modal -->
    <ImageModal
      :isOpen="modalOpen"
      :images="modalImages"
      :initialIndex="currentModalIndex"
      @close="closeModal"
      @navigate="onModalNavigate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ImageModal, { type ModalImage } from '@/components/ImageModal.vue'

const modalOpen = ref(false)
const currentModalIndex = ref(0)

// Transform your images to ModalImage format
const modalImages = computed<ModalImage[]>(() => {
  return yourImages.map((image, index) => ({
    src: getMediumImagePath(image.src),
    srcLarge: getLargeImagePath(image.src),
    alt: image.alt,
    title: `Image ${index + 1}`, // or extract from filename
    category: 'Your Category',
  }))
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

// Helper functions to transform image paths
const getMediumImagePath = (originalPath: string): string => {
  const pathParts = originalPath.split('/')
  const filename = pathParts.pop()
  return [...pathParts, 'med', filename].join('/')
}

const getLargeImagePath = (originalPath: string): string => {
  const pathParts = originalPath.split('/')
  const filename = pathParts.pop()
  return [...pathParts, 'lg', filename].join('/')
}
</script>
```

## Features

- **Keyboard Navigation**: Arrow keys to navigate, Escape to close
- **Loading State**: Shows spinner while images are loading
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Proper ARIA labels and keyboard support
- **Click Outside to Close**: Click on overlay to close modal
- **Navigation Buttons**: Previous/Next buttons with disabled states at boundaries

## Where It's Used

- ✅ `GalleryView.vue` - Gallery page with shuffled images
- ✅ `ProjectDetail.vue` - Project detail pages (main images, sketchbook, and collages)
- ✅ `StudiesDetail.vue` - Studies detail pages (study images, sketchbook, and collages)

## Notes

- The modal automatically handles body scroll locking
- Images fade in smoothly with loading states
- Navigation is disabled at array boundaries
- The component is fully typed with TypeScript
