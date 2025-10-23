<template>
	<div class="project-detail">
		<!-- Hero video section -->
		<div class="video-hero" v-if="video">
			<video
				ref="videoElement"
				autoplay
				:muted="isMuted"
				loop
				playsinline
				class="fullscreen-video"
				:poster="posterImage"
			>
				<source :src="video" type="video/webm" />
				Your browser does not support the video tag.
			</video>

			<!-- Mute button -->
			<button
				@click="toggleMute"
				class="mute-button"
				:aria-label="isMuted ? 'Unmute video' : 'Mute video'"
			>
				<!-- Mute icon (when video is muted) -->
				<svg
					v-if="isMuted"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.5 12C16.5 10.23 15.48 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12ZM19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12ZM4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.53C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z"
						fill="currentColor"
					/>
				</svg>

				<!-- Unmute icon (when video has sound) -->
				<svg
					v-else
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>

		<section ref="projectContent" class="project-content">
			<div class="project-head">
				<h2 class="project-title">{{ title }}</h2>
				<p v-if="date" class="project-date">{{ date }}</p>
				<img
					v-if="images[1]"
					class="project-headImage clickable-image"
					:src="getMediumImagePath(images[1].src)"
					:alt="images[1].alt"
					@click="openModal(1)"
				/>
				<div class="project-description">
					<p v-for="paragraph in description" :key="paragraph">
						{{ paragraph }}
					</p>
				</div>
			</div>

			<div class="image-grid">
				<img
					v-for="(image, index) in bottomImageGrid"
					:key="image.src"
					:src="getMediumImagePath(image.src)"
					:alt="image.alt"
					@click="openModal(index + 2)"
					class="clickable-image"
				/>
			</div>

			<!-- Credits Section -->
			<div
				v-if="credits && typeof credits === 'object' && Object.keys(credits).length > 0"
				class="credits-section"
			>
				<div class="credits-grid">
					<div v-for="(value, key) in credits" :key="key" class="credit-item">
						<span class="credit-label">{{ key }}:</span>
						<span class="credit-value">
							<template v-if="Array.isArray(value)">
								{{ sortAlphabetically(value).join(', ') }}
							</template>
							<template v-else>
								{{ value }}
							</template>
						</span>
					</div>
				</div>
			</div>

			<!-- Sketchbook Section -->
			<div v-if="sketchbook && sketchbook.length > 0" class="sketchbook-section">
				<div class="sketchbook-grid">
					<img
						v-for="(sketch, index) in sketchbook"
						:key="sketch.src"
						:src="getMediumImagePath(sketch.src)"
						:alt="sketch.alt"
						class="sketchbook-image clickable-image"
						@click="openSketchbookModal(index)"
					/>
				</div>
			</div>

			<!-- Collages Grid -->
			<div v-if="collages && collages.length > 0" class="collages-section">
				<div class="collages-grid">
					<img
						v-for="(collage, index) in collages"
						:key="collage.src"
						:src="getSmallImagePath(collage.src)"
						:alt="collage.alt"
						class="collage-image clickable-image"
						@click="openCollageModal(index)"
					/>
				</div>
			</div>
		</section>

		<!-- Image Modal -->
		<ImageModal
			:isOpen="modalOpen"
			:images="currentModalImages"
			:initialIndex="currentModalIndex"
			@close="closeModal"
			@navigate="onModalNavigate"
		/>
	</div>
</template>

<script setup lang="ts">
import ImageModal, { type ModalImage } from '@/components/ImageModal.vue'
import type { Project, ProjectImage } from '@/types/project'
import { computed, ref } from 'vue'

interface Props {
	title: Project['title']
	description: Project['description']
	images: ProjectImage[]
	video?: Project['video']
	posterImage?: string
	date?: Project['date']
	collages?: Project['collages']
	sketchbook?: Project['sketchbook']
	credits?: Project['credits']
}

const props = defineProps<Props>()

// Reactive data for mute functionality
const isMuted = ref(true) // Start music by default
const videoElement = ref<HTMLVideoElement | null>(null)
const projectContent = ref<HTMLElement | null>(null)

// Modal state
const modalOpen = ref(false)
const currentModalIndex = ref(0)
const currentModalImages = ref<ModalImage[]>([])

// Computed property to limit images to first 2-end
const bottomImageGrid = computed(() => props.images.slice(2, props.images.length))

// Convert image path to use medium-sized version
const getMediumImagePath = (originalPath: string): string => {
	// Split the path and insert 'med' before the filename
	// e.g., "/images/BA3/lbm01.webp" -> "/images/BA3/med/lbm01.webp"
	const pathParts = originalPath.split('/')
	const filename = pathParts.pop()
	return [...pathParts, 'med', filename].join('/')
}

const getSmallImagePath = (originalPath: string): string => {
	const pathParts = originalPath.split('/')
	const filename = pathParts.pop()
	return [...pathParts, 'sm', filename].join('/')
}

// Sort array alphabetically (case-insensitive)
const sortAlphabetically = (arr: string[]): string[] => {
	return [...arr].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

// Toggle mute state
const toggleMute = (): void => {
	isMuted.value = !isMuted.value
	if (videoElement.value) {
		videoElement.value.muted = isMuted.value
	}
}

// Helper function to get large image path
const getLargeImagePath = (originalPath: string): string => {
	const pathParts = originalPath.split('/')
	const filename = pathParts.pop()
	return [...pathParts, 'lg', filename].join('/')
}

// Helper function to extract number from filename
const extractImageNumber = (src: string): string => {
	const filename = src.split('/').pop() || ''
	const match = filename.match(/(\d+)/)
	return match?.[1]?.padStart(2, '0') || '01'
}

// Transform all images to ModalImage format
const allModalImages = computed<ModalImage[]>(() => {
	return props.images.map((image) => ({
		src: getMediumImagePath(image.src),
		srcLarge: getLargeImagePath(image.src),
		alt: image.alt,
		title: extractImageNumber(image.src),
		category: props.title,
	}))
})

// Transform sketchbook images to ModalImage format
const sketchbookModalImages = computed<ModalImage[]>(() => {
	if (!props.sketchbook) return []
	return props.sketchbook.map((image) => ({
		src: getMediumImagePath(image.src),
		srcLarge: getLargeImagePath(image.src),
		alt: image.alt,
		title: extractImageNumber(image.src),
		category: `${props.title} - Sketchbook`,
	}))
})

// Transform collage images to ModalImage format
const collageModalImages = computed<ModalImage[]>(() => {
	if (!props.collages) return []
	return props.collages.map((image) => ({
		src: getMediumImagePath(image.src),
		srcLarge: getLargeImagePath(image.src),
		alt: image.alt,
		title: extractImageNumber(image.src),
		category: `${props.title} - Collages`,
	}))
})

// Open modal for main images
const openModal = (index: number) => {
	currentModalImages.value = allModalImages.value
	currentModalIndex.value = index
	modalOpen.value = true
}

// Open modal for sketchbook images
const openSketchbookModal = (index: number) => {
	currentModalImages.value = sketchbookModalImages.value
	currentModalIndex.value = index
	modalOpen.value = true
}

// Open modal for collage images
const openCollageModal = (index: number) => {
	currentModalImages.value = collageModalImages.value
	currentModalIndex.value = index
	modalOpen.value = true
}

const closeModal = () => {
	modalOpen.value = false
}

const onModalNavigate = (index: number) => {
	currentModalIndex.value = index
}
</script>

<style scoped>
.project-detail {
	position: relative;
	width: 100%;
}

/* ===== VIDEO ===== */
.video-hero {
	position: relative;
	/* TODO:aanpassen voor safari etc*/
	height: 100svh;
	min-height: 500px;
	width: 100%;
	overflow: hidden;
}

.fullscreen-video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: 1; /* Ensure video is behind the header */
	background-color: #000; /* Fallback background */
}

/* ===== MUTE BUTTON ===== */
.mute-button {
	position: absolute;
	bottom: 2rem;
	right: 2rem;
	z-index: 10;
	background: transparent;
	border: none;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	color: white;
	transition: all 0.3s ease;
	backdrop-filter: blur(5px);
}

/* ===== PROJECT CONTENT ===== */
.project-content {
	position: relative;
	padding: 2rem;
	max-width: 1400px;
	margin: 0 auto;
}

.project-title {
	font-size: 2rem;
	font-weight: 200;
	text-align: center;
}

.project-date {
	font-size: 1rem;
	margin-bottom: 1.5rem;
	color: #999;
	text-align: center;
	font-weight: 300;
}

.project-head img {
	display: block;
	margin: 3rem auto;
	width: 100%;
	height: auto;
	aspect-ratio: 3/4; /* Reserve space to prevent shift */
	object-fit: contain;
}

.project-description {
	text-align: center;
	font-size: 1rem;
	font-weight: 300;
	margin: 6rem auto;
	min-height: 100px; /* Reserve space for text */
}

.image-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	margin: 6rem auto;
	min-height: 200px;
}

.image-grid img {
	width: 250px;
	height: auto;
	object-fit: cover;
	aspect-ratio: 3/4;
}

.clickable-image {
	cursor: pointer;
	transition:
		transform 0.2s ease,
		opacity 0.2s ease;
}

/* ===== CREDITS SECTION ===== */
.credits-section {
	margin: 6rem auto;
	padding: 2rem;
	background: rgba(0, 0, 0, 0.02);
	min-height: 150px; /* Reserve space */
}

.credits-grid {
	display: grid;
	gap: 1rem;
	max-width: 900px;
	margin: 0 auto;
	text-align: center;
}

.credit-item {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

.credit-label {
	font-weight: 500;
	font-size: 0.9rem;
	color: #666;
}

.credit-value {
	font-weight: 300;
	font-size: 1rem;
	color: #333;
}

/* ===== SKETCHBOOK SECTION ===== */
.sketchbook-section {
	margin: 6rem 0;
	min-height: 100px;
}

.sketchbook-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 1rem;
	width: 100%;
}

.sketchbook-image {
	width: 100%;
	height: auto;
	object-fit: cover;
	aspect-ratio: 3/2;
}

/* ===== COLLAGES SECTION ===== */

.collages-section {
	min-height: 100px;
}

.collages-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

/* TODO: geen aspectratio 1? */
.collage-image {
	aspect-ratio: 1;
	object-fit: contain;
	/* width: 100%; Ensure consistent sizing */
	height: auto;
}

/* ===== MEDIA QUERIES ===== */

/* tablet */
@media (min-width: 768px) {
	.project-content {
		padding: 3rem 4rem;
	}

	.project-title {
		font-size: 3rem;
	}

	.project-date {
		font-size: 1.1rem;
		margin-bottom: 2rem;
	}

	.project-head img {
		margin: 3.5rem auto;
		max-height: 750px;
	}

	.project-description {
		font-size: 1.1rem;
		max-width: 700px;
		margin: 7rem auto;
	}

	.image-grid {
		grid-template-columns: repeat(5, 1fr);
		gap: 1rem;
		margin: 7rem auto;
	}

	.image-grid img {
		width: 100%;
		max-width: 400px;
	}

	.credits-section {
		padding: 2.5rem;
		margin: 7rem auto;
	}

	.credits-grid {
		gap: 1.5rem;
	}

	.credit-label {
		font-size: 1rem;
	}

	.credit-value {
		font-size: 1.1rem;
	}

	.sketchbook-grid {
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
		gap: 1.5rem;
		margin: 7rem auto;
	}

	.collages-grid {
		grid-template-columns: repeat(8, 1fr);
	}
}

/* desktop */
@media (min-width: 1024px) {
	.project-content {
		padding: 4rem 6rem;
	}

	.project-title {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.project-date {
		font-size: 1.2rem;
		margin-bottom: 2.5rem;
	}

	.project-head img {
		margin: 4rem auto;
		max-height: 500px;
	}

	.project-description {
		font-size: 1.2rem;
		line-height: 1.8;
		margin: 8rem auto;
		max-width: 800px;
		margin: 8rem auto;
	}

	.image-grid {
		gap: 2rem;
		margin: 8rem auto;
		justify-items: center;
	}

	.image-grid img {
		width: 100%;
		max-width: 450px;
	}

	.credits-section {
		margin: 8rem auto;
		padding: 3rem;
	}

	.credits-grid {
		gap: 2rem;
		max-width: 1000px;
	}

	.credit-label {
		font-size: 1.1rem;
	}

	.credit-value {
		font-size: 1.2rem;
	}

	.sketchbook-section {
		margin: 8rem auto;
	}

	.sketchbook-grid {
		gap: 2rem;
	}

	/* hovers */
	.clickable-image:hover {
		transform: scale(1.02);
		opacity: 0.9;
	}

	.mute-button:hover {
		background: rgba(0, 0, 0, 0.3);
		transform: scale(1.1);
	}
}
</style>
