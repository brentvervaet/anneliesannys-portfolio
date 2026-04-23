<template>
	<div v-if="error" class="error-boundary">
		<div class="error-content">
			<h2>⚠️ Something went wrong</h2>
			<p v-if="showDetails">{{ error.message }}</p>
			<button class="retry-button" @click="resetError">Try Again</button>
		</div>
	</div>
	<slot v-else></slot>
</template>

<script lang="ts" setup>
import { onErrorCaptured, ref } from 'vue'

interface Props {
	showDetails?: boolean
}

withDefaults(defineProps<Props>(), {
	showDetails: false,
})

const error = ref<Error | null>(null)

// Capture errors from child components
onErrorCaptured((err: Error) => {
	error.value = err
	console.error('Error boundary caught:', err)
	// Return false to prevent error from propagating
	return false
})

const resetError = () => {
	error.value = null
}
</script>

<style scoped>
.error-boundary {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 400px;
	padding: 2rem;
}

.error-content {
	text-align: center;
	max-width: 500px;
}

.error-content h2 {
	font-size: 1.5rem;
	font-weight: 300;
	margin-bottom: 1rem;
	color: #333;
}

.error-content p {
	font-size: 0.9rem;
	color: #666;
	margin-bottom: 1.5rem;
	font-family: monospace;
}

.retry-button {
	background: #333;
	color: white;
	border: none;
	padding: 0.75rem 1.5rem;
	font-size: 0.9rem;
	cursor: pointer;
	transition: all 0.2s ease;
	border-radius: 4px;
}

.retry-button:hover {
	background: #555;
	transform: translateY(-2px);
}

.retry-button:active {
	transform: translateY(0);
}
</style>
