<template>
	<div class="image-wrapper">
		<img
			v-if="!hasError"
			:alt="alt"
			:class="imageClass"
			:loading="loading"
			:src="src"
			@error="handleError"
			@load="handleLoad"
		/>
		<div v-else class="image-error">
			<svg
				fill="none"
				height="48"
				viewBox="0 0 24 24"
				width="48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
					fill="currentColor"
					opacity="0.3"
				/>
			</svg>
			<p>Image unavailable</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
	src: string
	alt: string
	imageClass?: string
	loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
	imageClass: '',
	loading: 'lazy',
})

const emit = defineEmits<{
	(e: 'load'): void
	(e: 'error'): void
}>()

const hasError = ref(false)

const handleError = () => {
	hasError.value = true
	console.warn(`Failed to load image: ${props.src}`)
	emit('error')
}

const handleLoad = () => {
	emit('load')
}
</script>

<style scoped>
.image-wrapper {
	position: relative;
	width: 100%;
	height: 100%;
}

.image-error {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	color: #999;
	min-height: 200px;
}

.image-error svg {
	margin-bottom: 0.5rem;
}

.image-error p {
	font-size: 0.85rem;
	font-weight: 300;
}
</style>
