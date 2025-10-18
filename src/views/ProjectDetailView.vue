<template>
  <div v-if="project">
    <!-- Show StudiesDetail component for projects with studies -->
    <StudiesDetail
      v-if="project.studies"
      :title="project.title"
      :description="project.description"
      :studies="project.studies"
      :video="project.video"
    />
    <!-- Show ProjectDetail component for projects with images -->
    <ProjectDetail
      v-else-if="project.images"
      :title="project.title"
      :description="project.description"
      :images="project.images"
      :video="project.video"
      :date="project.date"
      :collages="project.collages"
      :credits="project.credits"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectDetail from '@/components/ProjectDetail.vue'
import StudiesDetail from '@/components/StudiesDetail.vue'
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
