<template>
	<div class="studies-detail">
		<!-- Hero video section -->
		<div v-if="video" class="video-hero">
			<video :poster="posterImage" autoplay class="fullscreen-video" loop muted playsinline>
				<source :src="video" type="video/webm" />
				Your browser does not support the video tag.
			</video>
		</div>

		<section class="studies-content">
			<!-- Individual studies -->
			<div class="studies-grid">
				<div v-for="study in studies" :key="study.title" class="study-section">
					<h2 class="project-title">{{ study.title }}</h2>
					<p v-if="date" class="project-date">{{ date }}</p>

					<!-- Head image (different logic per study) -->
					<img
						v-if="getHeadImage(study)"
						:alt="getHeadImage(study).alt"
						:src="getMediumImagePath(getHeadImage(study).src)"
						class="project-headImage clickable-image"
						@click="openStudyHeadImageModal(study)"
					/>

					<div class="project-description">
						<p>{{ study.description }}</p>
					</div>

					<!-- Image grid (if applicable for this study) -->
					<div v-if="shouldShowImageGrid(study)" class="study-images">
						<img
							v-for="(image, imageIndex) in getGridImages(study)"
							:key="image.src"
							:alt="image.alt"
							:src="getMediumImagePath(image.src)"
							class="study-image clickable-image"
							@click="openStudyImageModal(study, imageIndex)"
						/>
					</div>

					<!-- Single image when grid is not shown -->
					<div v-else-if="study.images[1]" class="single-image-container">
						<img
							:alt="study.images[1].alt"
							:src="getMediumImagePath(study.images[1].src)"
							class="single-image clickable-image"
							@click="openStudyImageModal(study, 1)"
						/>
					</div>

					<!-- Sketchbook Section -->
					<div
						v-if="study.sketchbook && study.sketchbook.length > 0"
						class="sketchbook-section"
					>
						<div class="sketchbook-grid">
							<img
								v-for="(sketch, sketchIndex) in study.sketchbook"
								:key="sketch.src"
								:alt="sketch.alt"
								:src="getMediumImagePath(sketch.src)"
								class="sketchbook-image clickable-image"
								@click="openStudySketchbookModal(study, sketchIndex)"
							/>
						</div>
					</div>

					<!-- Collages Grid -->
					<div
						v-if="study.collages && study.collages.length > 0"
						class="collages-section"
					>
						<div class="collages-grid">
							<img
								v-for="(collage, collageIndex) in study.collages"
								:key="collage.src"
								:alt="collage.alt"
								:src="getSmallImagePath(collage.src)"
								class="collage-image clickable-image"
								@click="openStudyCollageModal(study, collageIndex)"
							/>
						</div>
					</div>
				</div>
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
		</section>

		<!-- Image Modal -->
		<ImageModal
			:images="currentModalImages"
			:initialIndex="currentModalIndex"
			:isOpen="modalOpen"
			@close="closeModal"
			@navigate="onModalNavigate"
		/>
	</div>
</template>

<script lang="ts" setup>
import ImageModal, { type ModalImage } from '@/components/ImageModal.vue'
import type { Project } from '@/types/project'
import { ref } from 'vue'

interface Props {
	title: Project['title']
	description: Project['description']
	studies: Project['studies']
	date?: Project['date']
	video?: Project['video']
	posterImage?: string
	credits?: Project['credits']
}

const props = defineProps<Props>()

// Modal state
const modalOpen = ref(false)
const currentModalIndex = ref(0)
const currentModalImages = ref<ModalImage[]>([])

// Convert image path to use medium-sized version
const getMediumImagePath = (originalPath: string): string => {
	// Split the path and insert 'med' before the filename
	// e.g., "/images/BA1/studies101.webp" -> "/images/BA1/med/studies101.webp"
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

// Get the head image based on study title
const getHeadImage = (study: any) => {
	if (study.title === 'Study of the Dress') {
		// Use image[1] for Dress
		return study.images[1]
	} else if (study.title === 'Paper Study') {
		// Use image[0] for Paper
		return study.images[0]
	} else if (study.title === 'Recycled Denim') {
		// Use image[0] for Jeans
		return study.images[0]
	}
	return null
}

// Determine if image grid should be shown
const shouldShowImageGrid = (study: any) => {
	// If study has 2 or fewer images, don't show grid
	return !(study.images && study.images.length <= 2)
}

// Get the images to display in the grid
const getGridImages = (study: any) => {
	if (study.title === 'Study of the Dress') {
		// Use images[2]-end for Dress
		return study.images.slice(2)
	} else if (study.title === 'Paper Study') {
		// Use images[1]-end for Paper
		return study.images.slice(1)
	}
	return study.images
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

// Open modal for study head image
const openStudyHeadImageModal = (study: any) => {
	const images = study.images || []
	currentModalImages.value = images.map((image: any) => ({
		src: getMediumImagePath(image.src),
		srcLarge: getLargeImagePath(image.src),
		alt: image.alt,
		title: extractImageNumber(image.src),
		category: study.title,
	}))

	// Determine which image index to show based on study title
	let headImageIndex = 0
	if (study.title === 'Study of the Dress') {
		headImageIndex = 1 // image[1] for Dress
	} else if (study.title === 'Paper Study') {
		headImageIndex = 0 // image[0] for Paper
	} else if (study.title === 'Recycled Denim') {
		headImageIndex = 0 // image[0] for Jeans
	}

	currentModalIndex.value = headImageIndex
	modalOpen.value = true
}

// Open modal for study images
const openStudyImageModal = (study: any, imageIndex: number) => {
	const images = study.images || []
	currentModalImages.value = images.map((image: any) => ({
		src: getMediumImagePath(image.src),
		srcLarge: getLargeImagePath(image.src),
		alt: image.alt,
		title: extractImageNumber(image.src),
		category: study.title,
	}))

	// Adjust index based on which images are shown in the grid
	let actualIndex = imageIndex
	if (study.title === 'Study of the Dress') {
		actualIndex = imageIndex + 2
	} else if (study.title === 'Paper Study') {
		actualIndex = imageIndex + 1
	}

	currentModalIndex.value = actualIndex
	modalOpen.value = true
}

// Open modal for study sketchbook images
const openStudySketchbookModal = (study: any, sketchIndex: number) => {
	const sketchbook = study.sketchbook || []
	currentModalImages.value = sketchbook.map((image: any) => ({
		src: getMediumImagePath(image.src),
		srcLarge: getLargeImagePath(image.src),
		alt: image.alt,
		title: extractImageNumber(image.src),
		category: `${study.title} - Sketchbook`,
	}))
	currentModalIndex.value = sketchIndex
	modalOpen.value = true
}

// Open modal for study collage images
const openStudyCollageModal = (study: any, collageIndex: number) => {
	const collages = study.collages || []
	currentModalImages.value = collages.map((image: any) => ({
		src: getMediumImagePath(image.src),
		srcLarge: getLargeImagePath(image.src),
		alt: image.alt,
		title: extractImageNumber(image.src),
		category: `${study.title} - Collages`,
	}))
	currentModalIndex.value = collageIndex
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
.studies-detail {
	position: relative;
	width: 100%;
}

.video-hero {
	position: relative;
	/* TODO:aanpassen voor safari etc*/
	height: 100svh;
	min-height: 500px; /* Prevent collapse during load */
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
	z-index: 1;
	background-color: #000; /* Fallback background */
}

.studies-content {
	position: relative;
	padding: 2rem;
	max-width: 1400px;
	margin: 0 auto;
}

.studies-grid {
	display: flex;
	flex-direction: column;
	gap: 2rem;
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

.project-headImage {
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
	min-height: 80px; /* Reserve space for text */
}

.study-section {
	border-bottom: 1px solid #e5e5e5;
	padding-bottom: 3rem;
	margin: 0 auto;
	min-height: 400px; /* Reserve space for each study section */
}

.study-section:last-child {
	border-bottom: none;
	padding-bottom: 0;
}

.study-images {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	margin: 6rem auto;
	min-height: 200px; /* Reserve space for grid */
}

.study-image {
	width: 250px;
	height: auto;
	object-fit: cover;
	aspect-ratio: 3/4; /* Prevent shift as images load */
}

.single-image-container {
	display: flex;
	justify-content: center;
	min-height: 300px; /* Reserve space */
}

.single-image {
	width: auto;
	max-width: 100%;
	height: auto;
	object-fit: cover;
	aspect-ratio: 3/4; /* Prevent shift */
}

.clickable-image {
	cursor: pointer;
	transition:
		transform 0.2s ease,
		opacity 0.2s ease;
}

/* ===== SKETCHBOOK SECTION ===== */

.sketchbook-section {
	margin: 6rem 0;
	min-height: 200px; /* Reserve space */
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
	min-height: 200px; /* Reserve space */
}

.collages-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
}

/* TODO: geen aspectratio 1? */
.collage-image {
	aspect-ratio: 1;
	object-fit: contain;
	width: 100%; /* Ensure consistent sizing */
	height: auto;
}

/* ===== CREDITS SECTION ===== */
.credits-section {
	margin: 6rem 0 0 0;
	padding: 2rem;
	background: rgba(0, 0, 0, 0.05);
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

/* ===== MEDIA QUERIES ===== */

/* tablet */
@media (min-width: 768px) {
	.studies-content {
		padding: 3rem 4rem;
	}

	.project-title {
		font-size: 3rem;
	}

	.project-date {
		font-size: 1.1rem;
		margin-bottom: 2rem;
	}

	.project-headImage {
		max-width: 600px;
		margin: 3.5rem auto;
	}

	.project-description {
		font-size: 1.1rem;
		max-width: 700px;
		margin: 7rem auto;
	}

	.studies-grid {
		gap: 4rem;
	}

	.study-section {
		padding-bottom: 4rem;
	}

	.study-images {
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
		margin: 7rem auto;
	}

	.study-image {
		width: 100%;
		max-width: 400px;
	}

	.single-image {
		max-width: 600px;
	}

	.credits-section {
		padding: 2.5rem;
		margin: 7rem 0 0 0;
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

	.sketchbook-section {
		margin: 7rem 0;
	}

	.sketchbook-grid {
		grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
		gap: 1.5rem;
	}

	.collages-grid {
		grid-template-columns: repeat(8, 1fr);
	}
}

/* desktop */
@media (min-width: 1024px) {
	.studies-content {
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

	.project-headImage {
		margin: 4rem auto;
	}

	.project-description {
		font-size: 1.2rem;
		line-height: 1.8;
		max-width: 800px;
		margin: 8rem auto;
	}

	.studies-grid {
		gap: 5rem;
	}

	.study-section {
		padding-bottom: 5rem;
	}

	.study-images {
		gap: 2rem;
		margin: 8rem auto;
		justify-items: center;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
	}

	.study-image {
		width: 100%;
		max-width: 450px;
	}

	.credits-section {
		margin: 8rem 0 0 0;
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
		margin: 8rem 0;
	}

	.sketchbook-grid {
		gap: 2rem;
	}

	/* hovers */
	.clickable-image:hover {
		transform: scale(1.02);
		opacity: 0.9;
	}
}
</style>
