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
import { useHead } from '@unhead/vue'
import ProjectDetail from '@/components/ProjectDetail.vue'
import StudiesDetail from '@/components/StudiesDetail.vue'
import projectsData from '@/data/projects.json'
import type { Project } from '@/types/project'
import { computed, provide, watchEffect } from 'vue'
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

// Dynamic meta tags
watchEffect(() => {
	if (project.value) {
		const description = Array.isArray(project.value.description)
			? project.value.description[0]
			: project.value.description || 'Fashion design project by Annelies Annys'

		const imageUrl = project.value.thumbnailImage || project.value.images?.[0]?.src || '/og-image.jpg'
		const fullImageUrl = `https://anneliesannys.com${imageUrl}`

		useHead({
			title: `${project.value.title} - Annelies Annys`,
			meta: [
				{ name: 'description', content: description },
				{ name: 'keywords', content: `Annelies Annys, ${project.value.title}, fashion design, portfolio` },
				// Open Graph
				{ property: 'og:title', content: `${project.value.title} - Annelies Annys` },
				{ property: 'og:description', content: description },
				{ property: 'og:type', content: 'article' },
				{ property: 'og:url', content: `https://anneliesannys.com/portfolio/${slug.value}` },
				{ property: 'og:image', content: fullImageUrl },
				{ property: 'og:image:width', content: '1200' },
				{ property: 'og:image:height', content: '630' },
				{ property: 'og:image:alt', content: project.value.title },
				// Twitter
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: `${project.value.title} - Annelies Annys` },
				{ name: 'twitter:description', content: description },
				{ name: 'twitter:image', content: fullImageUrl },
			],
			link: [
				{ rel: 'canonical', href: `https://anneliesannys.com/portfolio/${slug.value}` },
			],
			script: [
				{
					type: 'application/ld+json',
					innerHTML: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'CreativeWork',
						name: project.value.title,
						description: description,
						dateCreated: project.value.date,
						creator: {
							'@type': 'Person',
							name: 'Annelies Annys',
							url: 'https://anneliesannys.com',
						},
						image: fullImageUrl,
						url: `https://anneliesannys.com/portfolio/${slug.value}`,
					}),
				},
			],
		})
	}
})
</script>

<style scoped>
/* No styles needed for this component */
</style>
