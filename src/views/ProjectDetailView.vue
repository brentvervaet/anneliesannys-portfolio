<template>
  <div v-if="project">
    <!-- Show ProjectDetail component for all projects -->
    <ProjectDetail
      v-if="project.images"
      :title="project.title"
      :description="project.description"
      :images="project.images"
      :video="project.video"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectDetail from '@/components/ProjectDetail.vue'
import projectsData from '@/data/projects.json'
import type { Project } from '@/types/project'
import { computed, provide } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const project = computed(() => {
  return (projectsData as Project[]).find((p) => p.slug === slug.value)
})

// Provide a boolean indicating whether the current project has a video
provide(
  'hasHeroVideo',
  computed(() => !!project.value?.video),
)
</script>

<style scoped>
/* No styles needed for this component */
</style>
