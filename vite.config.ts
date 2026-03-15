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
		// Improve build performance and reduce bundle size
		rollupOptions: {
			output: {
				manualChunks: {
					'vue-vendor': ['vue', 'vue-router'],
				},
			},
		},
	},
}))
