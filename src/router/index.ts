import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioOverview.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/portfolio/split-myself-in-two',
      name: 'split-myself-in-two',
      component: () => import('../views/projects/SplitMyselfInTwoView.vue'),
    },
    {
      path: '/portfolio/studie-van-de-jurk',
      name: 'studie-van-de-jurk',
      component: () => import('../views/projects/StudieVanDeJurkView.vue'),
    },
    {
      path: '/portfolio/lost-before-morning',
      name: 'lost-before-morning',
      component: () => import('../views/projects/LostBeforeMorningView.vue'),
    },
    {
      path: '/portfolio/jeans',
      name: 'jeans',
      component: () => import('../views/projects/JeansView.vue'),
    },
    {
      path: '/portfolio/studies',
      name: 'studies',
      component: () => import('../views/projects/StudiesView.vue'),
    },
    {
      path: '/portfolio/papierstudie',
      name: 'papierstudie',
      component: () => import('../views/projects/PapierstudieView.vue'),
    },
  ],
})

export default router
