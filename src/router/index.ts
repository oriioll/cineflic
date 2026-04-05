import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Popular from '@/views/Popular.vue'
import DetailView from '@/views/DetailView.vue'
import PopularLocal from '@/views/PopularLocal.vue'
import Genres from '@/views/Genres.vue'
import GenresMovies from '@/views/GenresMovies.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/popular', component: Popular },
    { path: '/movie/:id', component: DetailView },
    { path: '/popular/local', component: PopularLocal },
    { path: '/generos', component: Genres },
    { path: '/generos/:id', component: GenresMovies },
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
