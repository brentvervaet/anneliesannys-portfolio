import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
	plugins: [
		vue(),
		// Only include Vue DevTools in development
		...(mode === 'development' ? [vueDevTools()] : []),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		// Report compressed size
		reportCompressedSize: true,
		// Warn on chunks larger than 500kb
		chunkSizeWarningLimit: 500,
		rollupOptions: {
			output: {
				// Manual chunking strategy
				manualChunks: (id) => {
					// Split vue-router into separate chunk
					if (id.includes('vue-router')) {
						return 'vue-router'
					}
					// Split project data
					if (id.includes('projects.json')) {
						return 'project-data'
					}
				},
			},
		},
	},
}))
