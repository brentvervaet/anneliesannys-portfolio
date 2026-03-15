<template>
	<div v-if="project">
		<!-- Show StudiesDetail component for projects with studies -->
		<StudiesDetail
			v-if="project.studies"
			:credits="project.credits"
			:date="project.date"
			:description="project.description"
			:posterImage="project.videoLoadingPoster"
			:studies="project.studies"
			:title="project.title"
			:video="project.video"
		/>
		<!-- Show ProjectDetail component for projects with images -->
		<ProjectDetail
			v-else-if="project.images"
			:collages="project.collages"
			:credits="project.credits"
			:date="project.date"
			:description="project.description"
			:images="project.images"
			:posterImage="project.videoLoadingPoster"
			:sketchbook="project.sketchbook"
			:title="project.title"
			:video="project.video"
		/>
	</div>
</template>

<script lang="ts" setup>
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
