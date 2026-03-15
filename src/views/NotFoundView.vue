<template>
	<div class="not-found">
		<div class="not-found-content">
			<h1>404</h1>
			<h2>Page Not Found</h2>
			<p>The page you're looking for doesn't exist or has been moved.</p>
			<RouterLink class="back-home-link" to="/">← Back to Home</RouterLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
// No script needed for this simple component
</script>

<style scoped>
.not-found {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 70vh;
	padding: 2rem;
}

.not-found-content {
	text-align: center;
	max-width: 500px;
}

.not-found h1 {
	font-size: 6rem;
	font-weight: bold;
	color: #e5e7eb;
	margin: 0;
	line-height: 1;
}

.not-found h2 {
	font-size: 2rem;
	margin: 1rem 0;
	color: #374151;
}

.not-found p {
	font-size: 1.1rem;
	margin-bottom: 2rem;
	color: #6b7280;
	line-height: 1.6;
}

.back-home-link {
	display: inline-block;
	padding: 0.75rem 1.5rem;
	background-color: #111827;
	color: white;
	text-decoration: none;
	border-radius: 0.375rem;
	font-weight: 500;
	transition: background-color 0.2s;
}

.back-home-link:hover {
	background-color: #1f2937;
}
</style>
