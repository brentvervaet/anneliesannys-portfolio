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
  images?: ProjectImage[]
  studies?: Study[]
  thumbnailImage: string
  video?: string
  date?: string
  details?: Record<string, string>[]
}
