import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView/HomeView.vue'
import { getExerciseData } from '@/data'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('@/views/ExerciseView/ExerciseCompletedView.vue'),
    },
    {
      path: '/:category/:exercise',
      name: 'exercise',
      component: () => import('@/views/ExerciseView/ExerciseView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(to => {
  if (to.name === 'exercise') {
    const { category, exercise } = to.params
    if (
      typeof category !== 'string' ||
      typeof exercise !== 'string' ||
      !getExerciseData(category, exercise)
    ) {
      alert(`Exercise ${category}/${exercise} does not exist`)
      return { name: 'home' }
    }
  }
  return true
})

export default router
