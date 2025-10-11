// Composable for dynamic image loading
import { ref } from 'vue'

export interface GalleryImage {
  src: string
  alt: string
  title: string
  category: string
}

export function useImageLoader() {
  const images = ref<GalleryImage[]>([])
  const loading = ref(false)

  // Function to dynamically discover images in folders
  const loadImagesFromFolder = async (folderPath: string, category: string) => {
    try {
      // This would require a backend API or build-time generation
      // For now, we'll use the existing projects.json approach
      console.log(`Would load images from ${folderPath} for ${category}`)
    } catch (error) {
      console.error('Failed to load images:', error)
    }
  }

  return {
    images,
    loading,
    loadImagesFromFolder,
  }
}
