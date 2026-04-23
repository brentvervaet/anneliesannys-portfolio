import './assets/tailwind.css'

import { createUnhead } from 'unhead'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { initWebVitals } from './utils/webVitals'

const app = createApp(App)
// @ts-ignore - createUnhead accepts optional config
const head = createUnhead()

// Provide unhead instance for useHead composable
app.provide('usehead', head)

app.use(router)

app.mount('#app')

// Initialize Web Vitals tracking
initWebVitals()
