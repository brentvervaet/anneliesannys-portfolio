export interface ProjectImage {
  src: string
  alt: string
}

export interface Project {
  slug: string
  title: string
  description: string[]
  images: ProjectImage[]
  thumbnailImage: string
}
