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
  title: 'Studies',
  description: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.',
    'Collection of various fashion studies and experimental works.'
  ],
  images: [
    { src: 'https://placehold.co/500x600/f0f0f0/333333?text=Coming+Soon', alt: 'Studies 01' },
    { src: 'https://placehold.co/500x600/f0f0f0/333333?text=Coming+Soon', alt: 'Studies 02' }
  ]
}
</script>
