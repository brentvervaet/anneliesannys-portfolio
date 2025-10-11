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
    <!-- Show regular ProjectDetail component for projects with images -->
    <ProjectDetail
      v-else-if="project.images"
      :title="project.title"
      :description="project.description"
      :images="project.images"
      :video="project.video"
    />
  </div>
  <div v-else class="project-not-found">
    <h1>Project niet gevonden</h1>
    <p>Het project dat je zoekt bestaat niet.</p>
    <RouterLink to="/portfolio" class="back-link">← Terug naar portfolio</RouterLink>
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
.project-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
}

.project-not-found h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.project-not-found p {
  margin-bottom: 2rem;
  color: #666;
}

.back-link {
  color: #333;
  text-decoration: underline;
}

.back-link:hover {
  color: #000;
}
</style>
