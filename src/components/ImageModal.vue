<template>
	<!-- Modal for enlarged view -->
	<div v-if="isOpen" class="modal-overlay">
		<div class="modal-content">
			<!-- Close Button - Fixed Position -->
			<button class="modal-close" @click="closeModal">&times;</button>

			<!-- Image Container -->
			<div class="modal-image-container">
				<div v-if="imageLoading" class="modal-loading">
					<div class="loading-spinner"></div>
				</div>
				<img
					:src="currentImage?.srcLarge"
					:alt="currentImage?.alt"
					class="modal-image"
					@load="onImageLoad"
					:class="{ loading: imageLoading }"
					:width="naturalSize?.w"
					:height="naturalSize?.h"
					:style="aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined"
				/>
			</div>

			<!-- Image Info - Fixed Below Image -->
			<div class="modal-info modal-info-bottom">
				<h3>{{ currentImage?.title }}</h3>
				<p
					v-if="currentImage?.projectSlug"
					class="modal-category-link"
					@click="navigateToProject"
				>
					{{ currentImage?.category }}
				</p>
				<p v-else class="modal-category">{{ currentImage?.category }}</p>
			</div>

			<!-- Navigation - Fixed at Bottom -->
			<div class="modal-navigation modal-navigation-bottom">
				<button
					class="nav-btn"
					@click.stop="navigatePrevious"
					:disabled="currentIndex === 0"
					aria-label="Previous image"
				>
					<svg
						class="nav-icon"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M15 6l-6 6 6 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<span class="image-counter">{{ currentIndex + 1 }} / {{ images.length }}</span>
				<button
					class="nav-btn"
					@click.stop="navigateNext"
					:disabled="currentIndex === images.length - 1"
					aria-label="Next image"
				>
					<svg
						class="nav-icon"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M9 6l6 6-6 6"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export interface ModalImage {
	src: string
	srcLarge: string
	alt: string
	title: string
	category: string
	projectSlug?: string
}

interface Props {
	isOpen: boolean
	images: ModalImage[]
	initialIndex: number
}

interface Emits {
	(e: 'close'): void
	(e: 'navigate', index: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const router = useRouter()

const imageLoading = ref(false)
const currentIndex = ref(props.initialIndex)
const scrollPosition = ref(0)

const currentImage = computed(() => props.images[currentIndex.value])

// Keep and communicate the intrinsic aspect ratio to the browser to avoid stretching
const naturalSize = ref<{ w: number; h: number } | null>(null)
const aspectRatio = computed(() => {
	if (!naturalSize.value) return null
	const { w, h } = naturalSize.value
	return h ? w / h : null
})

const navigateToProject = () => {
	if (currentImage.value?.projectSlug) {
		router.push(`/${currentImage.value.projectSlug}`)
	}
}

// Lock scroll when modal is open
watch(
	() => props.isOpen,
	(isOpen) => {
		if (isOpen) {
			// Save current scroll position
			scrollPosition.value = window.scrollY
			// Lock body scroll without jumping
			document.body.style.overflow = 'hidden'
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollPosition.value}px`
			document.body.style.width = '100%'
		} else {
			// Restore scroll
			document.body.style.overflow = ''
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			// Restore scroll position without jump
			window.scrollTo(0, scrollPosition.value)
		}
	},
)

watch(
	() => props.initialIndex,
	(newVal) => {
		currentIndex.value = newVal
		imageLoading.value = true
	},
)

// When the current image changes, preload to obtain natural dimensions (aspect ratio)
watch(
	() => currentImage.value?.srcLarge,
	(src) => {
		naturalSize.value = null
		if (!src) return
		const img = new Image()
		img.src = src
		if (img.complete) {
			naturalSize.value = { w: img.naturalWidth, h: img.naturalHeight }
		} else {
			img.onload = () => {
				naturalSize.value = { w: img.naturalWidth, h: img.naturalHeight }
			}
		}
	},
	{ immediate: true },
)

const closeModal = () => emit('close')
const onImageLoad = () => (imageLoading.value = false)
const navigatePrevious = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--
		imageLoading.value = true
		emit('navigate', currentIndex.value)
	}
}
const navigateNext = () => {
	if (currentIndex.value < props.images.length - 1) {
		currentIndex.value++
		imageLoading.value = true
		emit('navigate', currentIndex.value)
	}
}

// Keyboard navigation
const handleKeyPress = (event: KeyboardEvent) => {
	if (!props.isOpen) return
	if (event.key === 'Escape') closeModal()
	else if (event.key === 'ArrowLeft') navigatePrevious()
	else if (event.key === 'ArrowRight') navigateNext()
}

onMounted(() => document.addEventListener('keydown', handleKeyPress))
onUnmounted(() => {
	document.removeEventListener('keydown', handleKeyPress)
	// Clean up body styles
	document.body.style.overflow = ''
	document.body.style.position = ''
	document.body.style.top = ''
	document.body.style.width = ''
})
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.9);
	backdrop-filter: blur(10px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 9999;
	overflow: hidden;
}

.modal-content {
	position: relative;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
	overflow: hidden;
}

.modal-close {
	position: fixed;
	top: 12px;
	right: 12px;
	background: none;
	border: none;
	color: white;
	font-size: 1.8rem;
	cursor: pointer;
	z-index: 10002;
	width: 36px;
	height: 36px;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: transform 0.2s ease;
}

.modal-close:hover {
	transform: scale(1.1);
}

.modal-image-container {
	position: absolute;
	top: 20px; /* Space from top */
	bottom: 140px; /* Space for title + navigation at bottom */
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	padding: 0 2rem;
}

@media (max-width: 768px) {
	.modal-image-container {
		bottom: 160px; /* More space on mobile for text wrapping */
	}
}

.modal-image {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
	object-fit: contain;
	transition: opacity 0.3s ease;
}

.modal-image.loading {
	opacity: 0;
}

.modal-loading {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.loading-spinner {
	width: 36px;
	height: 36px;
	border: 3px solid rgba(255, 255, 255, 0.3);
	border-top-color: white;
	border-radius: 50%;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

.modal-info {
	text-align: center;
	color: white;
}

.modal-info-bottom {
	position: fixed;
	bottom: 70px; /* Above navigation */
	left: 50%;
	transform: translateX(-50%);
	z-index: 10001;
	width: 100%;
	max-width: 600px;
	padding: 0 1rem;
}

.modal-info h3 {
	font-size: 1.3rem;
	margin-bottom: 6px;
	font-weight: 300;
}

.modal-info p {
	font-size: 0.95rem;
	opacity: 0.8;
	text-transform: uppercase;
	letter-spacing: 1px;
	margin: 0;
}

.modal-category-link {
	cursor: pointer;
	transition: opacity 0.2s ease;
}
.modal-category-link:hover {
	opacity: 1;
	text-decoration: underline;
}

.modal-navigation {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 12px;
}

.modal-navigation-bottom {
	position: fixed;
	bottom: 20px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 10001;
}

/* Bottom nav buttons */
.nav-btn {
	color: white;
	padding: 0.5rem;
	cursor: pointer;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}
.nav-btn:hover:not(:disabled) {
	color: rgba(255, 182, 193);
}
.nav-btn:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}

.image-counter {
	color: white;
	font-size: 0.85rem;
	opacity: 0.8;
}

/* SVG icon sizing */
.nav-icon {
	width: 24px;
	height: 24px;
}

/* Keyboard focus style */
.nav-btn:focus-visible {
	outline: 2px solid rgba(255, 255, 255, 0.8);
	outline-offset: 2px;
}
</style>
