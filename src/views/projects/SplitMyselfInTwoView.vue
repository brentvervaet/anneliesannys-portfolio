<template>
  <ProjectDetail
    :title="projectData.title"
    :description="projectData.description"
    :images="projectData.images"
  />
</template>

<script setup lang="ts">
import ProjectDetail from '@/components/ProjectDetail.vue';

const projectData = {
  title: 'Split myself in two',
  description: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.',
    'Morbi facilisis, sapien non commodo cursus, erat erat dictum urna, nec dictum erat erat nec urna. Etiam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi.'
  ],
  images: [
    { src: '/images/Project01/lookbook-03.jpg', alt: 'lookbook01' },
    { src: '/images/Project01/lookbook-06.jpg', alt: 'lookbook02' },
    { src: '/images/Project01/lookbook-11.jpg', alt: 'lookbook03' },
    { src: '/images/Project01/lookbook-12.jpg', alt: 'lookbook04' },
    { src: '/images/Project01/collectie-samen.jpg', alt: 'lookbook05' }
  ]
}
</script>
