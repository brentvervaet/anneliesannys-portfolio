export interface ProjectImage {
  src: string
  alt: string
}

export interface Study {
  title: string
  description: string
  images: ProjectImage[]
}

export interface Project {
  slug: string
  title: string
  description: string[]
  models?: string[]
  images?: ProjectImage[]
  studies?: Study[]
  thumbnailImage: string
  video?: string
  date?: string
  year?: string // Academic year (e.g., "BA1", "BA2", "BA3", "MA1", etc.)
  details?: Record<string, string>[]
}
