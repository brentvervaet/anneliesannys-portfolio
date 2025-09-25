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
  title: 'Studie van de jurk',
  description: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, eu consectetur nisl nisi euismod nisi.',
    'Morbi facilisis, sapien non commodo cursus, erat erat dictum urna, nec dictum erat erat nec urna. Etiam euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi.'
  ],
  images: [
    { src: '/images/Project02/studie-van-de-jurk-2.jpg', alt: 'studie-van-de-jurk 01' },
    { src: '/images/Project02/studie-van-de-jurk-4.jpg', alt: 'studie-van-de-jurk 02' },
    { src: '/images/Project02/studie-van-de-jurk-8.jpg', alt: 'studie-van-de-jurk 03' },
    { src: '/images/Project02/studie-van-de-jurk-6.jpg', alt: 'studie-van-de-jurk 04' }
  ]
}
</script>
