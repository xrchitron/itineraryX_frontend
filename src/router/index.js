import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DistanceCalc from '../views/DistanceCalc.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/distance-calc',
      name: 'distance-calc',
      component: DistanceCalc
    }
  ]
})

export default router
