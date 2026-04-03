import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
  ],
})

/*
// Navigation guard
router.beforeEach((to) => {
  const isLoggedIn = false
  if (to.meta.requiresAuth && !isLoggedIn) {
    return '/login'
  }
})*/

export default router
