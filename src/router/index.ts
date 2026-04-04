import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Popular from '@/views/Popular.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/popular', component: Popular },
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
