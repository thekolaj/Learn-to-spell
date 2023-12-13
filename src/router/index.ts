import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:exercise',
      name: 'exercise',
      component: () => import('@/views/ExerciseView/ExerciseView.vue'),
    },
  ],
})

export default router
