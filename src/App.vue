<script lang="ts" setup>
import projectsData from '@/data/projects.json'
import type { Project } from '@/types/project'
import { provide, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'

// Create a ref for the hasHeroVideo state
const hasHeroVideo = ref(false)

// Provide the hasHeroVideo value so AppHeader can inject it
provide('hasHeroVideo', hasHeroVideo)

// Update hasHeroVideo based on route changes
const route = useRoute()
watch(
	() => route.path,
	(path) => {
		// Remove leading slash for comparison
		const slug = path.startsWith('/') ? path.slice(1) : path
		// Set hasHeroVideo to true if the current path matches any project slug
		const projects = projectsData as Project[]
		const currentProject = projects.find((p) => p.slug === slug)
		hasHeroVideo.value = !!currentProject?.video
	},
	{ immediate: true },
)
</script>

<template>
	<div id="app">
		<AppHeader />
		<main>
			<RouterView />
		</main>
		<AppFooter />
	</div>
</template>

<style scoped>
#app {
	margin: 0;
	overflow-x: hidden;
	padding: 0;
	background-color: #fff;
	color: #333;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	max-width: none;
}

main {
	flex: 1;
	background: #fff;
}
</style>
