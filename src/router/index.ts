import { createRouter, createWebHistory } from 'vue-router'
import projectsData from '../data/projects.json'
import type { Project } from '../types/project'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
    },
    {
      path: '/portfolio/:slug',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue'),
      props: true,
      beforeEnter: (to) => {
        const slug = to.params.slug as string
        const project = (projectsData as Project[]).find((p) => p.slug === slug)
        if (!project) {
          return { name: 'not-found' }
        }
      },
    },
    {
      path: '/404',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
  ],
  scrollBehavior() {
    // Always load page from the top when navigating to a new route
    return { top: 0, behavior: 'instant' }
  },
})

export default router
